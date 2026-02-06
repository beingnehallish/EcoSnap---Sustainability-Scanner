
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult, Alternative, WasteResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async scanProduct(imageDataBase64: string): Promise<ScanResult> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageDataBase64 } },
          { text: "Analyze this product. Identify its type, give an eco-score from 1 to 10 based on material sustainability and recyclability, explain why, and provide a tip. Return as JSON." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productType: { type: Type.STRING },
            ecoScore: { type: Type.NUMBER },
            reason: { type: Type.STRING },
            tip: { type: Type.STRING }
          },
          required: ["productType", "ecoScore", "reason", "tip"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }

  async getAlternatives(productName: string): Promise<Alternative[]> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 eco-friendly alternatives for '${productName}'. For each, give the name of the alternative and a short benefit. Return as a JSON array of objects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              benefit: { type: Type.STRING }
            },
            required: ["name", "benefit"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  }

  async getWasteGuidance(itemName: string): Promise<WasteResult> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Which waste bin should '${itemName}' go in? Choices: 'Wet Waste', 'Dry Waste', 'E-Waste', 'Hazardous Waste'. Also provide a short disposal tip. Return as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            binType: { type: Type.STRING },
            disposalTip: { type: Type.STRING }
          },
          required: ["binType", "disposalTip"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }
}

export const geminiService = new GeminiService();
