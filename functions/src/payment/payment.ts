import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(functions.config().stripe.secret);
/* eslint-disable no-console */

export default async (request: any, response: any) => {
  cors(request, response, async () => {
    response.set("Access-Control-Allow-Headers", "Content-Type, Origin");
    response.set("Access-Control-Allow-Credentials", "true");
    response.set("Access-Control-Allow-Method", "POST");
    response.set("Access-Control-Allow-Origin", "https://oxfitness.pl"); // to be changed on https://oxfitness.pl on production
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
        success_url: "https://oxfitness.pl/success",
        cancel_url: "https://oxfitness.pl/cancel"
      },
      function(err: Error, session: any) {
        response.send(session);
      }
    );
  });
};
