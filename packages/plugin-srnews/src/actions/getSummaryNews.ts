import { Action, ActionExample, composeContext, elizaLogger, generateObject, HandlerCallback, IAgentRuntime, Memory, ModelClass, State } from "@elizaos/core";
import { validateSrnewsConfig } from "../environment";
import { getNewsByCategoryExamples } from "../examples";
import { srnewsService } from "../services";
import { z } from "zod";

export const getSummaryNews: Action  = {
  name: "SRNEWS_SUMMARY_NEWS",
  similes: [
    "NEWS",
    "SUMMARY",
    "KESIMPULAN",
    "INDONESIA_STOCK_EXCHANGE",
    "IDX",
  ],
  description: "get summary of news provided in database",
  validate: async (runtime: IAgentRuntime) => {
    await validateSrnewsConfig(runtime);
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]:unknown },
    callback: HandlerCallback,
  ) => {
    const config = await validateSrnewsConfig(runtime);
    const service = srnewsService(config.MONGODB_URI, config.DATABASE)

    try {
      let category = ""
      const userMessage = message.content?.text || "";
      const context = composeContext({
        state,
        template: `Diantara kategori Ekonomi, Makro ekonomi, Mikro ekonomi,  Pasar saham, Saham. apa kategori untuk berita berikut : ${userMessage}. berikan 1 jawabn pasti dari kategori tersedia. Return the tweet in TEXT format like: {"saham"}`,
      });

      const categoryContentObject = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
        schema: z.string().describe("The text of the category"),
        stop: ["\n"],
      });

      const categoryParseResult = z.string().safeParse(categoryContentObject);
      if (!categoryParseResult.success) {
        elizaLogger.error("Failed to extract category from generated object.");
      } else {
        category = categoryParseResult.data.trim();
        elizaLogger.info(`Extracted category: ${category}`);
      }

      const result = await service.getNewsByCategory(category);
      elizaLogger.info("successfully get news from sr mongo db");

      if (!result || result.length === 0) {
        callback({  
          text: "There are currently no latest news updates from the Indonesia Stock Exchange (IDX).",
        });
        return true;
      }

      const latestNews = result
        .slice(0, 5)
        .map((news, index) => `${index + 1}. ${news.article.content}`)
        .join("\n");

      if (callback) {
        callback({
          text: `Here are the latest news updates from the Indonesia Stock Exchange (IDX):\n\n${latestNews}`,
        });
      }
    } catch(error) {
      elizaLogger.error("error in sr news plugin handler:", error)
      callback({
        text: `Error fetching News: ${error.message}`,
        content: { error: error.message },
      });
    return false;
    }
  },
  examples: getNewsByCategoryExamples as ActionExample[][],
} as Action;