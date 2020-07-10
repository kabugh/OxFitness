/* eslint-disable no-console */
import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(functions.config().stripe.secret);

// When user's account is created, the function updates user's premiumAccount Object
export const premiumAccess = functions.database
  .ref("/users/{id}")
  .onCreate(event => {
    // pure function - currying
    const addDays = (days: number) => (date: string | number | Date) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);

      return result;
    };

    const currentTime = new Date();
    const accessTime: Date = addDays(7)(currentTime);

    const access = {
      activationDate: currentTime,
      isActive: true,
      validUntil: accessTime
    };
    return event.ref.child("premiumAccount").update(access);
  });
// export const checkAccess = functions.database
//   .ref("/users/{id}/workouts")
//   .onUpdate(event => {
//     const currentTime = new Date();
//     const premiumAccount = event.after.child("premiumAccount").val();
//     if (new Date(premiumAccount.validUntil) < currentTime)
//       premiumAccount.isActive = false;
//     return event.after.ref.child("premiumAccount").update(premiumAccount);
//   });
// https://firebase.google.com/docs/functions/schedule-functions#before_you_begin
// Create scheduled function for instance 'every day at 7am' to check whether user's premiumAccess is still valid.

export const payment = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Credentials", "true");
    response.set("Access-Control-Allow-Origin", "*"); // to be changed on https://oxfitness.pl on production
    await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "PLN",
              product_data: {
                name: "OxFitness karnet"
              },
              unit_amount: 4000
            },
            quantity: 1
          }
        ],
        mode: "payment",
        success_url: "https://oxfitness.netlify.app/success",
        cancel_url: "https://oxfitness.netlify.app/cancel"
      },
      function(err: Error, session: any) {
        response.send(session);
      }
    );
  });
});

const endpointSecret = functions.config().stripe.whsecret;
export const successfulPayment = functions.https.onRequest(
  (request: any, response: any) => {
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret
      );
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    // Update user's premiumAccount
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(`Event passed: ${session}`);
    }
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);
