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
  };
  transactions: string[];
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
