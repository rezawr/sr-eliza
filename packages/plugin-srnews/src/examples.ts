import { ActionExample } from "@elizaos/core";

export const getNewsExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "Berikan saya berita terbaru hari ini!",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Saya akan mengambil berita terbaru hari ini.",
        action: "SRNEWS_SUMMARY_NEWS",
      },
    }
  ]
];

export const getNewsByCategoryExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "Bagaimana perkembangan <category> Indonesia hari ini?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Saya akan mengambil berita terbaru tentang <category> Indonesia.",
        action: "SRNEWS_SUMMARY_NEWS",
      },
    }
  ],
  [
    {
        user: "{{user1}}",
        content: {
          text: "Berita terbaru dari <category> apa hari ini?",
        },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Saya akan mengambil berita terbaru tentang <category>.",
        action: "SRNEWS_SUMMARY_NEWS",
      },
    }
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "Apa saja <category> yang dilakukan oleh perusahaan di Indonesia baru-baru ini?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Saya akan mengambil berita terbaru tentang <category> di Indonesia.",
        action: "SRNEWS_SUMMARY_NEWS",
      },
    }
  ],
]
