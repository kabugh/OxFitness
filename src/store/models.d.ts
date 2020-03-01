export interface User {
  id: string;
  email: string;
  premiumAccount: boolean;
  imageURL?: string;
}

export interface Feature {
  fields: Object;
  sys: {
    id: string;
  };
}

export interface Workout {
  fields: Object;
  sys: {
    id: string;
  };
}
