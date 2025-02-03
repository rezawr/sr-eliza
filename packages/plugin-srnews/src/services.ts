import { MongoClient } from "mongodb"
import { NewsDocument } from "./types"
import { elizaLogger } from "@elizaos/core";

async function _connectDb(uri, database) {
  try {
    const client = new MongoClient(uri)
    await client.connect();
    elizaLogger.info("<srnews mongodb> Connected to MongoDB");

    return client.db(database)
  } catch (error) {
      elizaLogger.error("MongoDB connection failed:", error);
      throw new Error(error)
    }
}

export const srnewsService = (mongoDbUri: string, database: string) => {
  const getNews = async (): Promise<NewsDocument[]> => {
    if (!mongoDbUri || !database) {
      throw new Error("Invalid Parameter")
    }

    const client = await _connectDb(mongoDbUri, database);
    const collection = client.collection<NewsDocument>("news");

    const result: NewsDocument[] = await collection.find().sort({ "source.date": -1 }).toArray();

    return result
  }

  const getNewsByCategory = async (category: string): Promise<NewsDocument[]> => {
    if (!mongoDbUri || !database) {
      throw new Error("Invalid Parameter")
    }

    const client = await _connectDb(mongoDbUri, database);
    const collection = client.collection<NewsDocument>("");

    const result: NewsDocument[] =  await collection.find({
      "source.category": {
        $regex: category,
        $options: "i"
      }
    })
    .sort({ "source.date": -1 })
    .toArray();

    return result;
  }

  return { getNews, getNewsByCategory }
}