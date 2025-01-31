import {
  elizaLogger,
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core"
import { validateSrnewsConfig } from "../environment"
import { srnewsService } from "../services";
import { getNewsExamples } from "../examples";

export const getNewsAction: Action = {
  name: "SRNEWS_GET_ALL_NEWS",
  similes: [
    "NEWS",
    "BERITA",
    "INDONESIA_STOCK_EXCHANGE",
    "IDX",
  ],
  description: "Get Indonesia stock exchange/IDX latest news",
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
      const result = await service.getNews();
      elizaLogger.info("successfully get news from sr mongo db");

      if (!result || result.length === 0) {
        callback({
          text: "There are currently no latest news updates from the Indonesia Stock Exchange (IDX).",
        });
        return true;
      }

      const latestNews = result
        .slice(0, 5)
        .map((news, index) => `${index + 1}. ${news.article.title} - [Read more](${news.source.url})`)
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
  examples: getNewsExamples as ActionExample[][],
} as Action