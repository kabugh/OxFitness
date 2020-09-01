import addDays from "../utils/addDays";

export default async (event: any) => {
  const currentTime = new Date();
  const accessTime: Date = addDays(0)(currentTime);

  const access = {
    activationDate: currentTime,
    isActive: false,
    validUntil: accessTime
  };
  return event.ref.child("premiumAccount").update(access);
};
