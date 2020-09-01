import * as admin from "firebase-admin";
/* eslint-disable no-console */

export default async (data: any, context: any) => {
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
};
