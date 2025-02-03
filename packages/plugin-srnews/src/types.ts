import { ObjectId } from "mongodb"
import { z } from "zod";

export interface Article {
  title: string;
  content: string;
}

export interface Source {
  url: string;
  date: Date;
  category: string;
  name: string;
}

export interface NewsDocument {
  _id: ObjectId,
  source: Source,
  article: Article
}

export const CategorySchema = z.object({
  text: z.string().describe("The text of the tweet"),
});