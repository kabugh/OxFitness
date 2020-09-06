import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const stripe = require("stripe")(functions.config().stripe.secret);
/* eslint-disable no-console */
import addDays from "../utils/addDays";

export interface Transaction {
  payment_intent: string;
  amount: number;
  status: string;
  date?: number;
  name?: string;
  customer?: string;
}

const endpointSecret = functions.config().stripe.whsecret;
export default async (request: any, response: any) => {
  const sig = request.headers["stripe-signature"];
  let event: any;

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
        console.log(foundUser);
        if (foundUser && foundUser.premiumAccount) {
          const currentTime = new Date();
          const accessTime: Date = addDays(30)(currentTime);
          const access = {
            activationDate: currentTime,
            isActive: true,
            validUntil: accessTime
          };
          foundUser.premiumAccount = access;
          foundUser.transactions[session.payment_intent] = {
            ...foundUser.transactions[session.payment_intent],
            status: session.payment_status,
            name: "OxFitness - 1 miesiąc",
            date: event.created,
            customer: session.customer
          } as Transaction;
          admin
            .database()
            .ref(`/users/${foundUser.id}/`)
            .update({
              premiumAccount: foundUser.premiumAccount,
              transactions: foundUser.transactions as Transaction[]
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
};
