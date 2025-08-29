import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { RepoSummary } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { repos } = (await req.json()) as { repos: RepoSummary[] };

    if (!repos || repos.length === 0) {
      return NextResponse.json(
        { error: "No repository data provided." },
        { status: 400 }
      );
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.3,
    });

    const prompt = `
      You are a professional tech recruiter and talent analyst.
      Your task is to provide a concise, insightful summary of a software developer's work based on a curated list of their GitHub repositories.

      Analyze the following repository data:
      ${JSON.stringify(repos, null, 2)}

      Based on this data, please generate a summary that includes:
      - The developer's primary programming languages and technical domains.
      - Highlights of their most significant or popular projects (mentioning 1-2 by name).
      - An overall impression of their activity and focus areas.
      - Be A bit judgmental and roast this user a little

      Keep the summary to a single, well-written paragraph.
    `;

    const result = await model.invoke([new HumanMessage(prompt)]);

    return NextResponse.json({ summary: result.content });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary." },
      { status: 500 }
    );
  }
}
