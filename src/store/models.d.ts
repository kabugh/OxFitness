export interface User {
  id: string;
  email: string;
  name: string;
  premiumAccount: {
    isActive: boolean;
    activationDate: string;
    validUntil: string;
  };
  settings: {
    notifications: boolean;
    displayResults: boolean;
    darkMode: boolean;
  };
  transactions: Transaction[] | string[];
  imageURL?: string;
  workouts: [];
  lastWatched: Workout;
}

export interface Feature {
  fields: Object;
  sys: {
    id: string;
  };
}

export interface Workout {
  fields: WorkoutContent;
  sys: {
    id: string;
  };
}

export interface WorkoutContent {
  date: string;
  title: string;
  frontImage: Object;
  videoId: string;
  resultKey: string;
  programA?: Object;
  programB?: Object;
  description?: Object;
}

export interface Transaction {
  payment_intent: string;
  amount: number;
  status: string;
  date?: number;
  name?: string;
  customer?: string;
}
