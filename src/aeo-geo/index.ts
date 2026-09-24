/**
 * Unified AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) System
 * 
 * Provides automated, dynamic generation of AI-first answer signals, structured knowledge graphs,
 * entity relationships, and Schema.org structured data working harmoniously alongside existing SEO.
 */

import { PageInputData, OptimizationResult, KnowledgeEntity } from './types';
import { extractPrimaryEntity, extractRelatedEntities } from './entityExtractor';
import { generateQuestionsForPage } from './questionGenerator';
import { generateAEO } from './aeoEngine';
import { generateGEO } from './geoEngine';
import { generateStructuredData } from './schemaGenerator';
import { validateOptimizationData, validateAEO, validateGEO, validateSchema } from './validator';
import { aeoGeoCache } from './cache';
import { injectAeoGeoSignals, removeAeoGeoSignals } from './injector';
import { defaultLLMProvider } from './llmProvider';

export * from './types';
export {
  generateAEO,
  generateGEO,
  generateStructuredData,
  validateAEO,
  validateGEO,
  validateSchema,
  validateOptimizationData,
  aeoGeoCache,
  injectAeoGeoSignals,
  removeAeoGeoSignals,
  defaultLLMProvider
};

/**
 * Extracts all knowledge entities for a page
 */
export function extractEntities(pageData: PageInputData): KnowledgeEntity[] {
  const primary = extractPrimaryEntity(pageData);
  const related = extractRelatedEntities(pageData, primary);
  return [primary, ...related];
}

/**
 * Generates verified Q&A items for a page
 */
export function generateQuestions(pageData: PageInputData) {
  return generateQuestionsForPage(pageData);
}

/**
 * Main Entry Point: Generates complete, validated AEO and GEO optimization data.
 * Supports caching, entity extraction, answer synthesis, and schema building.
 */
export function generateOptimizationData(
  pageData: PageInputData,
  options: { bypassCache?: boolean } = {}
): OptimizationResult {
  const cacheKey = aeoGeoCache.generateKey(pageData);

  if (!options.bypassCache) {
    const cached = aeoGeoCache.get(cacheKey);
    if (cached) {
      return cached;
    }
  }

  // 1. Extract Primary Entity
  const entity = extractPrimaryEntity(pageData);

  // 2. Generate AEO Layer (Direct answers, Q&As, Key facts, Definitions)
  const aeo = generateAEO(pageData);

  // 3. Generate GEO Layer (Summaries, Entity Graphs, Topical Vectors, Evidence)
  const geo = generateGEO(pageData);

  // 4. Generate Schema.org structured data (VisualArtwork, HowTo, FAQPage, CollectionPage)
  const schema = generateStructuredData(pageData, {
    questions: aeo.questions,
    howToSteps: aeo.howToSteps
  });

  // 5. Build preliminary result for validation
  const preliminaryResult = {
    page: {
      url: pageData.url,
      title: pageData.title,
      description: pageData.description,
      type: pageData.type,
      section: pageData.section
    },
    entity,
    aeo,
    geo,
    schema
  };

  // 6. Validate generated output against strict correctness rules
  const validation = validateOptimizationData(preliminaryResult, pageData);

  // 7. Collect metadata tags for injection
  const metaTags: Array<{ name?: string; property?: string; content: string }> = [
    { name: 'ai:primary-entity', content: entity.name },
    { name: 'ai:entity-type', content: entity.type },
    { name: 'ai:direct-answer', content: aeo.directAnswer.slice(0, 300) },
    { name: 'ai:context-vector', content: geo.contextVector.join(', ') }
  ];

  const fullResult: OptimizationResult = {
    ...preliminaryResult,
    validation,
    metaTags,
    generatedAt: new Date().toISOString(),
    isCached: false
  };

  // 8. Cache result
  aeoGeoCache.set(cacheKey, fullResult);

  return fullResult;
}
