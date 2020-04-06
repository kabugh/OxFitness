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
  fields: WorkoutContent;
  sys: {
    id: string;
  };
}

export interface WorkoutContent {
  date: string;
  dayOfTheWeek: string;
  videoId: string;
  programA?: Object;
  programB?: Object;
  description?: Object;
}
