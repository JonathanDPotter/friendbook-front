import { Document } from "mongoose";
import { Iuser } from "./user";

export enum Reactions {
  LIKE = "like",
  LOVE = "love",
  CARE = "care",
  HAHA = "haha",
  WOW = "wow",
  SAD = "sad",
  ANGRY = "angry",
}

export interface Icomment {
  id: string;
  author: Iuser;
  date: number;
  body: string;
  image: string;
  reactions: Reactions[];
}

export interface Ipost extends Document {
  author: Iuser;
  date: number;
  body: string;
  image?: string;
  reactions: Reactions[];
  comments: Icomment[];
}

export interface InewPost {
  author: Iuser;
  date: number;
  body: string;
  image: string;
  comments: Icomment[];
  reactions: Reactions[];
}
