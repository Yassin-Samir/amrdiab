import { Timestamp } from "firebase-admin/firestore";

export type song = {
  link: string;
  duration: number;
  name: string;
  id: string;
};
export type album = {
  poster: string;
  title: string;
  year: string;
  createdAt: Timestamp;
};
