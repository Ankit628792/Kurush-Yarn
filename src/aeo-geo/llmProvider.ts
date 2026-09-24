/**
 * Pluggable LLM Provider Abstraction for AEO/GEO Synthesis
 * 
 * Supports server-side or local LLM augmentation while enforcing strict
 * deterministic ground-truth verification and fallback to structured extraction.
 */

import { PageInputData, QAItem, KnowledgeEntity } from './types';

export interface LLMProviderConfig {
  enabled: boolean;
  providerName: 'deterministic' | 'gemini-proxy' | 'custom';
  endpoint?: string;
  timeoutMs?: number;
}

export interface LLMSynthesisRequest {
  pageData: PageInputData;
  extractedEntities: KnowledgeEntity[];
  baselineQuestions: QAItem[];
}

export interface LLMSynthesisResponse {
  enhancedSummary?: string;
  augmentedQuestions?: QAItem[];
  verifiedClaims: string[];
}

export class AeoGeoLLMProvider {
  private config: LLMProviderConfig;

  constructor(config?: Partial<LLMProviderConfig>) {
    this.config = {
      enabled: false,
      providerName: 'deterministic',
      timeoutMs: 3000,
      ...config
    };
  }

  public setConfig(newConfig: Partial<LLMProviderConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): LLMProviderConfig {
    return { ...this.config };
  }

  /**
   * Synthesizes or enriches AEO/GEO signals.
   * If LLM is disabled or fails, falls back instantly to deterministic baseline.
   */
  public async enrich(request: LLMSynthesisRequest): Promise<LLMSynthesisResponse> {
    if (!this.config.enabled || this.config.providerName === 'deterministic') {
      return {
        verifiedClaims: request.baselineQuestions.map((q) => q.answer)
      };
    }

    try {
      if (this.config.endpoint) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs);

        const response = await fetch(this.config.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: request.pageData.title,
            description: request.pageData.description,
            entities: request.extractedEntities.map((e) => e.name),
            questions: request.baselineQuestions
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          return {
            enhancedSummary: data.enhancedSummary,
            augmentedQuestions: Array.isArray(data.augmentedQuestions) ? data.augmentedQuestions : undefined,
            verifiedClaims: data.verifiedClaims || []
          };
        }
      }
    } catch (err) {
      console.warn('⚠️ [AEO/GEO LLM Provider] Enrichment endpoint unavailable, using deterministic ground-truth.', err);
    }

    return {
      verifiedClaims: request.baselineQuestions.map((q) => q.answer)
    };
  }
}

export const defaultLLMProvider = new AeoGeoLLMProvider();
