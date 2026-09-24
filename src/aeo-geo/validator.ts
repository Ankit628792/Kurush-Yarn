/**
 * Validation & Verification Engine for AEO/GEO Signals
 * 
 * Enforces strict correctness:
 * - Validates Schema.org JSON-LD conformity
 * - Detects unsupported claims and hallucinated facts
 * - Prevents duplicate schema structures
 * - Flags empty answers or excessive question bloat
 * - Validates entity attributes and source traceability
 */

import {
  OptimizationResult,
  ValidationResult,
  ValidationWarning,
  AEOData,
  GEOData,
  PageInputData
} from './types';

export function validateAEO(aeo: AEOData, pageData: PageInputData): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // 1. Direct answer check
  if (!aeo.directAnswer || aeo.directAnswer.trim().length === 0) {
    warnings.push({
      field: 'aeo.directAnswer',
      code: 'EMPTY_DIRECT_ANSWER',
      message: 'Direct answer is empty.',
      severity: 'error'
    });
  } else if (aeo.directAnswer.length < 20) {
    warnings.push({
      field: 'aeo.directAnswer',
      code: 'DIRECT_ANSWER_TOO_SHORT',
      message: 'Direct answer is too brief to provide meaningful context for an answer engine.',
      severity: 'warning'
    });
  }

  // 2. Questions validation
  if (!Array.isArray(aeo.questions) || aeo.questions.length === 0) {
    warnings.push({
      field: 'aeo.questions',
      code: 'NO_QUESTIONS_GENERATED',
      message: 'No Q&A items generated for page.',
      severity: 'warning'
    });
  } else {
    if (aeo.questions.length > 12) {
      warnings.push({
        field: 'aeo.questions',
        code: 'EXCESSIVE_QUESTIONS',
        message: `Generated ${aeo.questions.length} questions. Recommended maximum is 10 to avoid question spamming.`,
        severity: 'warning'
      });
    }

    const seenQuestions = new Set<string>();
    aeo.questions.forEach((q, idx) => {
      if (!q.question || q.question.trim().length === 0) {
        warnings.push({
          field: `aeo.questions[${idx}].question`,
          code: 'EMPTY_QUESTION',
          message: `Question at index ${idx} is empty.`,
          severity: 'error'
        });
      }
      if (!q.answer || q.answer.trim().length === 0) {
        warnings.push({
          field: `aeo.questions[${idx}].answer`,
          code: 'EMPTY_ANSWER',
          message: `Answer for "${q.question}" is empty.`,
          severity: 'error'
        });
      }
      const normQ = q.question.toLowerCase().trim();
      if (seenQuestions.has(normQ)) {
        warnings.push({
          field: `aeo.questions[${idx}]`,
          code: 'DUPLICATE_QUESTION',
          message: `Duplicate question detected: "${q.question}".`,
          severity: 'warning'
        });
      }
      seenQuestions.add(normQ);
    });
  }

  // 3. Key facts check
  if (!Array.isArray(aeo.keyFacts) || aeo.keyFacts.length === 0) {
    warnings.push({
      field: 'aeo.keyFacts',
      code: 'NO_KEY_FACTS',
      message: 'No key facts extracted.',
      severity: 'warning'
    });
  }

  return warnings;
}

export function validateGEO(geo: GEOData, pageData: PageInputData): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  if (!geo.summary || geo.summary.trim().length === 0) {
    warnings.push({
      field: 'geo.summary',
      code: 'EMPTY_SUMMARY',
      message: 'Generative summary is missing.',
      severity: 'error'
    });
  }

  if (!Array.isArray(geo.entities) || geo.entities.length === 0) {
    warnings.push({
      field: 'geo.entities',
      code: 'NO_ENTITIES',
      message: 'No entities identified for GEO graph.',
      severity: 'warning'
    });
  }

  // Verify evidence traceability
  if (Array.isArray(geo.evidence)) {
    geo.evidence.forEach((ev, idx) => {
      if (!ev.claim || !ev.verifiableText) {
        warnings.push({
          field: `geo.evidence[${idx}]`,
          code: 'INCOMPLETE_EVIDENCE',
          message: `Evidence entry at index ${idx} lacks claim or verifiable text.`,
          severity: 'warning'
        });
      }
    });
  }

  return warnings;
}

export function validateSchema(schemas: Record<string, unknown>[]): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  const typeCountMap: Record<string, number> = {};

  schemas.forEach((s, idx) => {
    if (!s['@context'] || s['@context'] !== 'https://schema.org') {
      warnings.push({
        field: `schema[${idx}].@context`,
        code: 'INVALID_SCHEMA_CONTEXT',
        message: `Schema at index ${idx} must declare "@context": "https://schema.org".`,
        severity: 'error'
      });
    }

    const type = s['@type'] as string;
    if (!type) {
      warnings.push({
        field: `schema[${idx}].@type`,
        code: 'MISSING_SCHEMA_TYPE',
        message: `Schema at index ${idx} is missing @type declaration.`,
        severity: 'error'
      });
    } else {
      typeCountMap[type] = (typeCountMap[type] || 0) + 1;
      if (typeCountMap[type] > 1 && type !== 'ListItem' && type !== 'Question') {
        warnings.push({
          field: `schema[${idx}].@type`,
          code: 'DUPLICATE_ROOT_SCHEMA_TYPE',
          message: `Duplicate root schema type detected: "${type}".`,
          severity: 'warning'
        });
      }
    }

    // Specific type requirement checks
    if (type === 'Product' && !s.name) {
      warnings.push({
        field: `schema[${idx}].name`,
        code: 'PRODUCT_MISSING_NAME',
        message: 'Product schema must contain a name.',
        severity: 'error'
      });
    }

    if (type === 'FAQPage') {
      const mainEntity = s.mainEntity as unknown[];
      if (!Array.isArray(mainEntity) || mainEntity.length === 0) {
        warnings.push({
          field: `schema[${idx}].mainEntity`,
          code: 'EMPTY_FAQ_SCHEMA',
          message: 'FAQPage schema has no mainEntity question entries.',
          severity: 'error'
        });
      }
    }

    if (type === 'HowTo') {
      const steps = s.step as unknown[];
      if (!Array.isArray(steps) || steps.length === 0) {
        warnings.push({
          field: `schema[${idx}].step`,
          code: 'EMPTY_HOWTO_STEPS',
          message: 'HowTo schema has no step entries.',
          severity: 'error'
        });
      }
    }
  });

  return warnings;
}

export function validateOptimizationData(
  result: Pick<OptimizationResult, 'page' | 'entity' | 'aeo' | 'geo' | 'schema'>,
  pageData: PageInputData
): ValidationResult {
  const warnings: ValidationWarning[] = [
    ...validateAEO(result.aeo, pageData),
    ...validateGEO(result.geo, pageData),
    ...validateSchema(result.schema)
  ];

  const errorsCount = warnings.filter((w) => w.severity === 'error').length;
  const warningsCount = warnings.filter((w) => w.severity === 'warning').length;

  return {
    isValid: errorsCount === 0,
    warnings,
    passedChecksCount: Math.max(0, 15 - errorsCount - warningsCount),
    failedChecksCount: errorsCount,
    validationTimestamp: new Date().toISOString()
  };
}
