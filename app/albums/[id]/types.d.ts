import { DocumentReference, Timestamp } from "firebase-admin/firestore";

export type song = {
  link: string;
  duration: number;
  albumRef?: DocumentReference;
  name: string;
  id: string;
};
export type album = {
  poster: string;
  title: string;
  year: string;
  createdAt: Timestamp;
};
