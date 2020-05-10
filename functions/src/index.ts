import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
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
