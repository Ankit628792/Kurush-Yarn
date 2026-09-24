/**
 * DOM & Head Signal Injector for AEO/GEO
 * 
 * Safely injects structured JSON-LD schemas and generative search signals
 * into document.head without conflicting with or duplicating existing SEO tags.
 */

import { OptimizationResult } from './types';
import { setMetaTag, setStructuredData } from '../utils/seo';

const AEO_GEO_SCHEMA_ID = 'kurush-aeo-geo-schema-ld';

export function injectAeoGeoSignals(data: OptimizationResult): void {
  if (typeof document === 'undefined') return;

  // 1. Inject JSON-LD Schema Graph
  if (Array.isArray(data.schema) && data.schema.length > 0) {
    const combinedGraph = {
      '@context': 'https://schema.org',
      '@graph': data.schema
    };
    setStructuredData(AEO_GEO_SCHEMA_ID, combinedGraph);
  }

  // 2. Inject Semantic GEO / AI Discovery Meta Tags
  if (data.entity?.name) {
    setMetaTag('name', 'ai:primary-entity', data.entity.name);
    setMetaTag('name', 'ai:entity-type', data.entity.type);
  }

  if (data.aeo?.directAnswer) {
    // Truncate direct answer for meta tag safety (max 300 chars)
    const directAnsSnippet = data.aeo.directAnswer.slice(0, 300);
    setMetaTag('name', 'ai:direct-answer', directAnsSnippet);
  }

  if (Array.isArray(data.geo?.contextVector) && data.geo.contextVector.length > 0) {
    setMetaTag('name', 'ai:context-vector', data.geo.contextVector.join(', '));
  }

  if (Array.isArray(data.geo?.topics) && data.geo.topics.length > 0) {
    const primaryTopics = data.geo.topics.map((t) => t.name).join(', ');
    setMetaTag('name', 'dcterms.subject', primaryTopics);
  }

  // Geographic and Provenance metadata
  setMetaTag('name', 'geo.placename', 'Bengaluru, India / Kyoto, Japan');
  setMetaTag('name', 'geo.region', 'IN-KA');
  setMetaTag('name', 'content-language', 'en');
  setMetaTag('name', 'generator:aeo-geo', 'Kurush-AEO-GEO-Engine/2.1');
}

export function removeAeoGeoSignals(): void {
  if (typeof document === 'undefined') return;

  const schemaScript = document.getElementById(AEO_GEO_SCHEMA_ID);
  if (schemaScript && schemaScript.parentNode) {
    schemaScript.parentNode.removeChild(schemaScript);
  }
}
