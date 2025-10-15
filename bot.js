import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

// তোমার bot token .env.local থেকে নিচ্ছে
const bot = new Telegraf(process.env.BOT_TOKEN);

// যখন কেউ /start পাঠাবে, তখন এই মেসেজ যাবে
bot.start((ctx) => {
  ctx.reply("👋 Welcome to Showzy! Click the button below to open the app.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Open Showzy",
            web_app: { url: "https://showzy.vercel.app/" },
          },
        ],
      ],
    },
  });
});

bot.launch();
console.log("✅ Showzy Telegram bot is running...");
