export interface Task {
  id: string;
  title: string;
  completed: boolean;
  coordinates?: {
    latitude: string;
    longitude: string;
  };
  photoUri?: string;
}
