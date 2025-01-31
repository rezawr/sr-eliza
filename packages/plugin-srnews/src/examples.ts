import { ActionExample } from "@elizaos/core";

export const getNewsExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "Bagaimana perkembangan ekonomi Indonesia hari ini?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Saya akan mengambil berita terbaru tentang ekonomi Indonesia.",
        action: "SRNEWS_GET_ALL_NEWS",
      },
    }
  ],
  [
    {
        user: "{{user1}}",
        content: {
          text: "Berita terbaru dari Bursa Efek Indonesia apa hari ini?",
        },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Saya akan mengambil berita terbaru tentang Bursa Efek Indonesia.",
        action: "SRNEWS_GET_ALL_NEWS",
      },
    }
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "Apa saja aksi korporasi yang dilakukan oleh perusahaan di Indonesia baru-baru ini?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Saya akan mengambil berita terbaru tentang aksi korporasi di Indonesia.",
        action: "SRNEWS_GET_ALL_NEWS",
      },
    }
  ],
];
