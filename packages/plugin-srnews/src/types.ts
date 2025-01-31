import { ObjectId } from "mongodb"

export interface Article {
  title: string;
  content: string;
}

export interface Source {
  url: string;
  name: string;
}

export interface NewsDocument {
  _id: ObjectId,
  source: Source,
  article: Article
}