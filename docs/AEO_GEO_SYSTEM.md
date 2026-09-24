# Dynamic AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) System

A high-performance, deterministic signal generation engine for Kurush Yarn Atelier that prepares web content for AI search engines, answer engines (Perplexity, Google AI Overviews, SearchGPT), and LLMs while preserving existing SEO implementations.

---

## 1. System Architecture Overview

The system operates alongside the traditional SEO layer (`src/utils/seo.ts`) to produce normalized, structured knowledge graphs and Schema.org JSON-LD trees without generating duplicate tags or invalid claims.

```
                  ┌─────────────────────────────────────┐
                  │ Page Context (Route / Product / SEO)│
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │       aeoGeoCache (Memoization)     │
                  └──────────────────┬──────────────────┘
                                     │ (Miss or Bypass)
               ┌─────────────────────┼─────────────────────┐
               ▼                     ▼                     ▼
     ┌──────────────────┐  ┌──────────────────┐  ┌───────────────────┐
     │  EntityExtractor │  │ QuestionGenerator│  │  SchemaGenerator  │
     │  - Primary Entity│  │  - Factual Q&As  │  │  - VisualArtwork  │
     │  - Relationships │  │  - Key Facts     │  │  - HowTo / FAQ    │
     │  - Provenance    │  │  - Definitions   │  │  - BreadcrumbList │
     └─────────┬────────┘  └─────────┬────────┘  └─────────┬─────────┘
               │                     │                     │
               └─────────────────────┼─────────────────────┘
                                     ▼
                  ┌─────────────────────────────────────┐
                  │            AEO / GEO Engine         │
                  │  - Direct Answer Synthesis          │
                  │  - Generative Topic Vectors         │
                  │  - Evidentiary Claim Mapping        │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │       Validator (15 Strict Checks)  │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │ Head Injector & React Hook Syncer   │
                  │ - <script id="kurush-aeo-geo-schema">│
                  │ - Meta signals (ai:*, geo:*, etc.)  │
                  └─────────────────────────────────────┘
```

---

## 2. Core API Reference

The primary API entry point is `generateOptimizationData(pageData)`:

```typescript
import { generateOptimizationData, OptimizationResult } from './aeo-geo';

const result: OptimizationResult = generateOptimizationData({
  url: 'https://kurush-yarn.atelier/product/bloomed-tulip-deep-pink',
  title: 'Bloomed Tulip - Deep Pink — Piece No. 07 | Kurush Yarn',
  description: 'Handcrafted floral stem with mercerized combed cotton.',
  type: 'product',
  product: productInstance
});
```

### Output Data Model

```json
{
  "page": {
    "url": "https://kurush-yarn.atelier/product/bloomed-tulip-deep-pink",
    "title": "Bloomed Tulip - Deep Pink — Piece No. 07 | Kurush Yarn",
    "description": "Handcrafted floral stem with mercerized combed cotton.",
    "type": "product"
  },
  "entity": {
    "name": "Bloomed Tulip - Deep Pink",
    "type": "Artwork",
    "description": "Sculptural floral stem.",
    "attributes": [
      { "key": "material", "label": "Primary Fiber Material", "value": "100% Mercerized Combed Cotton" },
      { "key": "stitchCount", "label": "Stitch Count", "value": "1,420 stitches" },
      { "key": "craftTime", "label": "Artisan Craft Time", "value": "6.5 hours" }
    ]
  },
  "aeo": {
    "directAnswer": "Bloomed Tulip - Deep Pink (Piece No. 07) is an artisanal flowers textile piece handcrafted by Kurush Yarn Atelier...",
    "questions": [
      { "question": "What is the Bloomed Tulip - Deep Pink?", "answer": "...", "category": "overview" },
      { "question": "What materials are used to make the Bloomed Tulip - Deep Pink?", "answer": "...", "category": "materials" }
    ],
    "keyFacts": [
      "Official Piece Identifier: Piece No. 07 (KY-07)",
      "Primary Medium & Fiber: 100% Mercerized Combed Cotton",
      "Stitch Density: 1,420 stitches"
    ]
  },
  "geo": {
    "summary": "...",
    "authoritativeAnswer": "...",
    "entities": [...],
    "topics": [
      { "name": "Botanical Fiber Art", "weight": 0.95 },
      { "name": "Precision Hand Crochet", "weight": 0.9 }
    ],
    "relationships": [
      { "sourceEntity": "Bloomed Tulip - Deep Pink", "relationship": "craftedBy", "targetEntity": "Kurush Yarn Atelier" }
    ],
    "evidence": [
      { "claim": "Material Composition: 100% Mercerized Combed Cotton", "sourceField": "material", "verifiableText": "100% Mercerized Combed Cotton" }
    ]
  },
  "schema": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "...": "..." },
    { "@context": "https://schema.org", "@type": "VisualArtwork", "...": "..." },
    { "@context": "https://schema.org", "@type": "FAQPage", "...": "..." }
  ],
  "validation": {
    "isValid": true,
    "warnings": [],
    "passedChecksCount": 15,
    "failedChecksCount": 0
  }
}
```

---

## 3. How AEO Generation Works

1. **Direct Answer Extraction**: Synthesizes a 1–2 sentence direct, authoritative answer containing the primary entity name, classification, materials, dimensional specs, and artisan craft time.
2. **Deterministic Q&A Generation**: Creates contextual question-and-answer pairs extracted strictly from verified on-page attributes (Overview, Materials, Dimensions, Crafting Process, Care, Acquisition).
3. **Key Fact Summaries**: Generates high-entropy factual bullet points that answer engines can quote verbatim.
4. **Entity Definitions**: Defines specialized terms (e.g., *Mercerization*, *Amigurumi*, *Micro-Tension Crochet*, *Botanical Steam Conditioning*).

---

## 4. How GEO Generation Works

1. **Knowledge Graph Triples**: Maps subject-predicate-object relationships (e.g. `[Bloomed Tulip] --[craftedBy]--> [Kurush Yarn Atelier]`).
2. **Topical Relevance Taxonomy**: Assigns weighted topic vectors with rationale to guide semantic understanding and embeddings.
3. **Evidentiary Traceability**: Every claim in the GEO model references a direct on-page source snippet (`sourceField` and `verifiableText`) to guarantee zero hallucinations.
4. **Context Vector Descriptors**: Generates clean semantic tokens for embedding and vector similarity indexing.

---

## 5. Adding New Schema Types

To add a new Schema.org type (e.g. `Event`, `Course`, `VideoObject`):

1. Open `src/aeo-geo/schemaGenerator.ts`.
2. Add a new `case` inside `generateStructuredData(pageData, aeoData)`:

```typescript
case 'event':
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: pageData.title,
    startDate: pageData.rawContent?.startDate,
    location: {
      '@type': 'Place',
      name: 'Kurush Yarn Atelier Kyoto',
      address: 'Kyoto, Japan'
    }
  });
  break;
```

3. Update the validator in `src/aeo-geo/validator.ts` if specific required properties should be enforced.

---

## 6. Caching & Invalidation

The caching layer is managed by `aeoGeoCache` (`src/aeo-geo/cache.ts`):

- **Key Format**: `[pageType]:[productId]:[section]:[url]`
- **TTL**: 24 hours (configurable).
- **Eviction**: Automatic LRU eviction when capacity exceeds 100 entries.
- **Manual Invalidation**:
  ```typescript
  import { aeoGeoCache } from './aeo-geo';
  
  // Invalidate specific page
  aeoGeoCache.invalidate('product:product-07:default:/product/bloomed-tulip-deep-pink');
  
  // Invalidate all
  aeoGeoCache.invalidate();
  ```

---

## 7. Pluggable LLM Provider Configuration

The LLM Provider (`src/aeo-geo/llmProvider.ts`) defaults to high-speed deterministic extraction. To connect a server-side proxy route:

```typescript
import { defaultLLMProvider } from './aeo-geo';

defaultLLMProvider.setConfig({
  enabled: true,
  providerName: 'gemini-proxy',
  endpoint: '/api/aeo-enrichment',
  timeoutMs: 4000
});
```

*Note: All synthesized claims undergo mandatory verification against on-page ground-truth before injection.*
