/**
 * PRODUCTION-GRADE GEMINI V1 INTEGRATION
 *
 * Why direct fetch instead of SDK:
 * - SDK has a v1beta routing bug (always uses v1beta even when apiVersion:"v1" is set)
 * - Direct v1 fetch is stable, explicit, and works with Google AI Studio keys
 * - Explicitly targets https://generativelanguage.googleapis.com/v1/ (not v1beta)
 */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "models/gemini-2.5-flash";
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1";

export const chatSession = {
  async sendMessage(prompt) {
    try {
      const url = `${API_ENDPOINT}/${MODEL}:generateContent?key=${API_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(
          `[${response.status}] ${
            errorData.error?.message || response.statusText
          }`
        );
        error.status = response.status;
        throw error;
      }

      const result = await response.json();
      const textContent =
        result.candidates?.[0]?.content?.parts?.[0]?.text || "";

      return {
        response: {
          text: () => textContent,
        },
      };
    } catch (error) {
      // Log full error details for debugging
      console.error("[Gemini API Error]", {
        status: error.status,
        message: error.message,
        endpoint: `${API_ENDPOINT}/${MODEL}:generateContent`,
      });
      throw error;
    }
  },
};
