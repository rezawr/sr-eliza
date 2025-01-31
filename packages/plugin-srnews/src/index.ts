import { Plugin } from "@elizaos/core"
import { getNewsAction } from "./actions/getNews"

export const srnewsPlugin: Plugin = {
  name: "srnews",
  description: "",
  actions: [
    getNewsAction
  ],
  evaluators: [],
  providers: []
}

export default srnewsPlugin;