export interface User {
  id: string;
  email: string;
  premiumAccount: boolean;
  imageURL?: string;
}

export interface Workout {
  fields: Object;
  sys: {
    id: string;
  };
}
