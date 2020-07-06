import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(process.env.VUE_APP_stripeSecretKey);

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
        success_url: "https://oxfitness.netlify.app/dashboard",
        cancel_url: "https://oxfitness.netlify.app/cancel"
      },
      function(err: Error, session: any) {
        response.set("Access-Control-Allow-Headers", "Content-Type");
        response.send(session);
      }
    );
  });
});
