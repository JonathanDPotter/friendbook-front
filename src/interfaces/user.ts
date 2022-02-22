import { Document } from "mongoose";

export interface Iuser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  image: string;
}

export interface InewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  image: string;
}

export interface Icredentials {
  email: string;
  password: string;
}
