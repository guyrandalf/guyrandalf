import "server-only";
import { createXai } from "@ai-sdk/xai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

// Provider-agnostic AI layer. Adding a provider is one entry here + one key.
// The UI exposes a switcher so reviewers can watch the same feature run on
// different vendors, this is deliberately NOT locked to one model company.
export type ProviderId = "xai" | "google";

export interface ProviderInfo {
  id: ProviderId;
  label: string;
  model: string;
  /** Shown in the UI: why this provider is in the mix. */
  reason: string;
}

export const PROVIDERS: Record<ProviderId, ProviderInfo> = {
  xai: {
    id: "xai",
    label: "Grok · xAI",
    model: process.env.XAI_MODEL ?? "grok-4.3",
    reason:
      "Cheap, fast, 1M-token context, strong tool-calling. The default for high-volume generation.",
  },
  google: {
    id: "google",
    label: "Gemini · Google",
    model: process.env.GEMINI_MODEL ?? "gemini-3-flash-preview",
    reason:
      "Free-tier friendly and multimodal. Here to prove the platform is provider-agnostic, not vendor-locked.",
  },
};

export const DEFAULT_PROVIDER: ProviderId =
  ((): ProviderId => {
    const configured = process.env.AI_PROVIDER;
    return configured && configured in PROVIDERS
      ? (configured as ProviderId)
      : "xai";
  })();

/** Coerce an untrusted provider id (from the client) to a known one. */
export function resolveProvider(id?: string | null): ProviderId {
  return id && id in PROVIDERS ? (id as ProviderId) : DEFAULT_PROVIDER;
}

/** Return an AI SDK language model for the given provider. */
export function languageModel(id: ProviderId): LanguageModel {
  const info = PROVIDERS[id];
  if (id === "google") {
    // Reads GOOGLE_GENERATIVE_AI_API_KEY.
    return createGoogleGenerativeAI()(info.model);
  }
  // Reads XAI_API_KEY; base URL https://api.x.ai/v1. `.chat()` = Chat Completions.
  return createXai().chat(info.model);
}
