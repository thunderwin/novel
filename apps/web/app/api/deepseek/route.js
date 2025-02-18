const { OpenAI } = require("openai");
import { NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://api.zhizengzeng.com/v1",
  apiKey: "sk-zk253719dc96ed145590105ff2c7347b41d66f2bdeba91f3",
});

export async function POST(req) {
  const { title } = await req.json();
  const response = await chat(title);
  return NextResponse.json(response);
}

async function chat(title) {
  const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: "你是一个 Seo 专家，擅长写 seo 标题",
      },
      {
        role: "user",
        content: `把 ${title} 写成一个英文 seo 标题`,
      },
    ],
  });
  return response;
}
