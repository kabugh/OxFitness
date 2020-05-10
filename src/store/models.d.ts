export interface User {
  id: string;
  email: string;
  name: string;
  premiumAccount: {
    isActive: boolean;
    activationDate: string;
    validUntil: string;
  };
  imageURL?: string;
  workouts: [];
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
  dayOfTheWeek: string;
  videoId: string;
  resultKey: string;
  programA?: Object;
  programB?: Object;
  description?: Object;
}
