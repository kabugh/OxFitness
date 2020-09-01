/* eslint-disable no-console */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(functions.config().stripe.secret);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: functions.config().database.url
});
// pure function - currying
const addDays = (days: number) => (date: string | number | Date) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
};

export const premiumAccess = functions.database
  .ref("/users/{id}")
  .onCreate(event => {
    const currentTime = new Date();
    const accessTime: Date = addDays(0)(currentTime);

    const access = {
      activationDate: currentTime,
      isActive: false,
      validUntil: accessTime
    };
    return event.ref.child("premiumAccount").update(access);
  });

export const checkAccess = functions.https.onCall((data, context) => {
  let uid = "";
  if (context.auth) uid = context.auth.uid;

  const currentTime = new Date();
  let premiumAccount: {
    activationDate: string;
    isActive: boolean;
    validUntil: string;
  } = {
    activationDate: "",
    isActive: false,
    validUntil: ""
  };

  const user = admin.database().ref(`users/${uid}`);
  user
    .once("value")
    .then(snapshot => {
      const receivedData = snapshot.val();
      if ("premiumAccount" in receivedData)
        premiumAccount = receivedData.premiumAccount;
      if (new Date(premiumAccount.validUntil) < currentTime) {
        premiumAccount = {
          activationDate: premiumAccount.activationDate,
          isActive: false,
          validUntil: premiumAccount.validUntil
        };
        user
          .child("premiumAccount")
          .update(premiumAccount)
          .catch((e: any) => console.log(e));
      }
    })
    .catch(e => console.log(e));
});

export const payment = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    response.set("Access-Control-Allow-Headers", "Content-Type, Origin");
    response.set("Access-Control-Allow-Credentials", "true");
    response.set("Access-Control-Allow-Method", "POST");
    response.set(
      "Access-Control-Allow-Origin",
      "https://oxfitness.netlify.app"
    ); // to be changed on https://oxfitness.pl on production
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
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      let foundUser: any = {};
      admin
        .database()
        .ref("users")
        .orderByChild("transactions")
        .once("value")
        .then((snapshot: any) => {
          const users: Object = snapshot.val();
          foundUser = Object.values(users).find((user: any) => {
            if (user.transactions)
              return Object.keys(user.transactions).find(
                key => key === session.payment_intent
              );
            else return undefined;
          });
          if (foundUser && foundUser.premiumAccount) {
            const currentTime = new Date();
            const accessTime: Date = addDays(30)(currentTime);
            const access = {
              activationDate: currentTime,
              isActive: true,
              validUntil: accessTime
            };
            foundUser.premiumAccount = access;
            foundUser.transactions[session.payment_intent] = "succeeded";
            admin
              .database()
              .ref(`/users/${foundUser.id}/`)
              .update({
                premiumAccount: foundUser.premiumAccount,
                transactions: foundUser.transactions
              })
              .catch((e: Error) => {
                console.log(e);
              });
          }
        })
        .catch((e: Error) => console.log(e));
    }
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);
