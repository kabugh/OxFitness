/* eslint-disable no-console */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: functions.config().database.url
});

export const premiumAccess = functions.database
  .ref("/users/{id}")
  .onCreate(async event => {
    await (await import("./premiumAccount/premiumAccess")).default(event);
  });

export const checkAccess = functions.https.onCall(async (data, context) => {
  await (await import("./premiumAccount/checkAccess")).default(data, context);
});

export const payment = functions.https.onRequest(async (request, response) => {
  await (await import("./payment/payment")).default(request, response);
});

export const successfulPayment = functions.https.onRequest(
  async (request, response) => {
    await (await import("./payment/successfulPayment")).default(
      request,
      response
    );
  }
);
