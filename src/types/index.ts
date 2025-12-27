import type { Timestamp } from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";

export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  path: string;
  downloadURL: string;
  ownerId: string;
  createdAt: Timestamp;
}

export interface UserData {
  storageUsed: number;
}

export type User = FirebaseUser & UserData;
