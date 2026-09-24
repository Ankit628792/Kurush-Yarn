/**
 * AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) System Types
 * 
 * Defines standard contracts, schemas, entity relationships, and metadata structures
 * for AI-first search indexing, generative synthesis, and rich answer engine extraction.
 */

import { Product } from '../types/product';

export type PageType =
  | 'home'
  | 'collection'
  | 'product'
  | 'material'
  | 'process'
  | 'about'
  | 'saved'
  | 'analytics'
  | 'legal'
  | 'utility'
  | 'error';

export interface PageInputData {
  url: string;
  title: string;
  description: string;
  type: PageType;
  section?: string;
  product?: Product | null;
  contentSnippet?: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  rawContent?: Record<string, unknown>;
}

export interface EntityAttribute {
  key: string;
  label: string;
  value: string | number | boolean;
  unit?: string;
  evidenceSnippet?: string;
}

export interface EntityRelationship {
  sourceEntity: string;
  relationship: string; // e.g. 'craftedWith', 'originatingFrom', 'belongsToCollection', 'showcasesTechnique'
  targetEntity: string;
  evidence: string;
}

export interface KnowledgeEntity {
  name: string;
  type: 'Artwork' | 'Product' | 'Material' | 'Technique' | 'Organization' | 'Person' | 'Place' | 'Concept';
  description: string;
  alternateNames?: string[];
  attributes?: EntityAttribute[];
  sameAs?: string[];
  url?: string;
  image?: string;
}

export interface QAItem {
  question: string;
  answer: string;
  category?: 'overview' | 'technique' | 'materials' | 'dimensions' | 'acquisition' | 'care' | 'provenance';
  sourceSnippet?: string;
  confidenceScore?: number;
}

export interface DefinitionItem {
  term: string;
  definition: string;
  context: string;
  synonyms?: string[];
}

export interface HowToStepItem {
  stepNumber: number;
  name: string;
  headline: string;
  instruction: string;
  technique?: string;
  image?: string;
}

export interface AEOData {
  directAnswer: string;
  conciseSummary: string;
  questions: QAItem[];
  keyFacts: string[];
  definitions: DefinitionItem[];
  howToSteps?: HowToStepItem[];
  primaryTopic: string;
}

export interface GEOTopic {
  name: string;
  weight: number; // 0.0 - 1.0
  relevanceExplanation: string;
}

export interface GEOEvidence {
  claim: string;
  sourceField: string;
  verifiableText: string;
}

export interface GEOData {
  summary: string;
  authoritativeAnswer: string;
  entities: KnowledgeEntity[];
  topics: GEOTopic[];
  attributes: EntityAttribute[];
  relationships: EntityRelationship[];
  keyFacts: string[];
  questions: QAItem[];
  evidence: GEOEvidence[];
  contextVector: string[]; // Key semantic descriptors for vector/LLM embeddings
}

export interface ValidationWarning {
  field: string;
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export interface ValidationResult {
  isValid: boolean;
  warnings: ValidationWarning[];
  passedChecksCount: number;
  failedChecksCount: number;
  validationTimestamp: string;
}

export interface OptimizationResult {
  page: {
    url: string;
    title: string;
    description: string;
    type: PageType;
    section?: string;
  };
  entity: KnowledgeEntity;
  aeo: AEOData;
  geo: GEOData;
  schema: Record<string, unknown>[];
  validation: ValidationResult;
  metaTags: Array<{ name?: string; property?: string; content: string }>;
  generatedAt: string;
  isCached?: boolean;
}
