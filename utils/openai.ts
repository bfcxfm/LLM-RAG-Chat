import { OpenAIEmbeddings } from "@langchain/openai";
import {
  MongoDBAtlasVectorSearch,
  MongoDBAtlasVectorSearchLibArgs,
} from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let embeddingsInstance: OpenAIEmbeddings | null = null;

const client = new MongoClient(process.env.MONGODB_URI!);
const namespace = "akichat.training_data";
const [dbName, collectionName] = namespace.split(".");
// const dbName = process.env.DB_NAME!;
// const collectionName = process.env.COLL_NAME!;
const collection = client.db(dbName).collection(collectionName);

export function getEmbeddingsTransformer(): OpenAIEmbeddings {
  try {
    // Ensure embeddingsInstance is initialized only once for efficiency
    if (!embeddingsInstance) {
      embeddingsInstance = new OpenAIEmbeddings({
        // model: "text-embedding-3-large", // Specify the embedding model
        // dimensions: 1536, // Specify dimension, to align with mongoDB vector
      });
    }

    return embeddingsInstance;
  } catch (error) {
    // Handle errors gracefully, providing informative messages and potential mitigation strategies
    console.error("Error creating OpenAIEmbeddings instance:", error);

    // Consider retrying based on error type or implementing exponential backoff for robustness
    // Log details about the error and retry attempt for debugging purposes
    console.error("Retrying creation of OpenAIEmbeddings...");
    embeddingsInstance = new OpenAIEmbeddings(); // Attempt retry

    // If multiple retries fail, provide a clear fallback mechanism or throw a more specific error
    if (!embeddingsInstance) {
      throw new Error(
        "Failed to create OpenAIEmbeddings instance after retries. Check the logs for details."
      );
    }

    return embeddingsInstance; // Return the successfully created instance after retries
  }
}

export function vectorStore(): MongoDBAtlasVectorSearch {
  const vectorStore: MongoDBAtlasVectorSearch = new MongoDBAtlasVectorSearch(
    new OpenAIEmbeddings(),
    searchArgs()
  );
  return vectorStore;
}

export function searchArgs(): MongoDBAtlasVectorSearchLibArgs {
  const searchArgs: MongoDBAtlasVectorSearchLibArgs = {
    collection,
    indexName: "vector_index_aki",
    textKey: "text",
    embeddingKey: "text_embedding",
  };
  return searchArgs;
}
