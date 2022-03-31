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

export interface Ireactions {
  angry: string[];
  care: string[];
  love: string[];
  haha: string[];
  wow: string[];
  sad: string[];
  like: string[];
}

export interface Icomment {
  id: string;
  author: string;
  date: number;
  body: string;
  image: string;
  reactions: Ireactions;
}

export interface Ipost extends Document {
  author: string;
  date: number;
  body: string;
  image?: string;
  reactions: Ireactions;
  comments: Icomment[];
}

export interface InewPost {
  author: string;
  date: number;
  body: string;
  image: string;
  comments: Icomment[];
  reactions: Ireactions;
}
