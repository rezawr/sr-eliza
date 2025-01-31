import { IAgentRuntime, elizaLogger } from "@elizaos/core"

export interface srnewsConfig {
  MONGODB_URI: string;
  DATABASE: string;
}

export async function validateSrnewsConfig(
  runtime: IAgentRuntime
): Promise<srnewsConfig> {
  try {
    // Extract settings
    const mongoDbUri = runtime.getSetting("MONGODB_URI");
    const database = runtime.getSetting("DATABASE");

    // Validate MONGODB_URI
    if (!mongoDbUri || typeof mongoDbUri !== "string" || mongoDbUri.trim() === "") {
      throw new Error("SR News MongoDB configuration validation failed: MONGODB_URI is required");
    }

    // Validate database
    if (!database || typeof database !== "string" || database.trim() === "") {
      throw new Error("SR News MongoDB configuration validation failed: DATABASE is required");
    }

    // Return validated config
    return {
      MONGODB_URI: mongoDbUri,
      DATABASE: database
    };

  } catch (error) {
    // Properly log error
    elizaLogger.error("Validation Sr News Configuration:", error.message || error);

    // Handle errors from external validation libraries (e.g., Yup, Zod)
    let errorMessages = "Unknown error occurred.";
    if (error instanceof Error) {
      errorMessages = error.message;
    } else if (error && Array.isArray(error.errors)) {
      errorMessages = error.errors.map((err) => `${err.path?.join(".")}: ${err.message}`).join("\n");
    }

    throw new Error(`SR News configuration validation failed:\n${errorMessages}`);
  }
}
