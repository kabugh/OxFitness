/* eslint-disable no-console */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
const cors = require("cors")({ origin: true });

const messagingKey = functions.config().messaging.key;

export default async (request: any, response: any) => {
  const token = request.body.token;
  console.log("token", token);

  cors(request, response, () => {
    axios
      .post(
        `https://iid.googleapis.com/iid/v1/${token}/rel/topics/general`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${messagingKey}`
          }
        }
      )
      .then(() => {
        admin
          .database()
          .ref("/tokens/")
          .push({ token: request.body.token })
          .then(() =>
            response
              .status(200)
              .send("Notifications subscription successfully added.")
          )
          .catch(e => console.log(e));
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        response.status(500).send({
          message: "An error has occurred.",
          error: err.response
        });
      });
  });
};
