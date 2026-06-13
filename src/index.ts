export interface Task {
  id: string;
  title: string;
  points: number;
  completed: boolean;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
}
