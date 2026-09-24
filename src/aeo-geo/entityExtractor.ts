/**
 * Entity Extraction Engine for AEO/GEO
 * 
 * Deterministically extracts primary and secondary entities, attributes,
 * and verified semantic relationships from structured application data.
 */

import { KnowledgeEntity, EntityAttribute, EntityRelationship, PageInputData } from './types';
import { siteContent } from '../data/content';
import { products } from '../data/products';

export function extractPrimaryEntity(pageData: PageInputData): KnowledgeEntity {
  if (pageData.product) {
    const p = pageData.product;
    return {
      name: p.name,
      type: 'Artwork',
      description: p.description || p.tagline || `${p.name} handcrafted fiber creation.`,
      alternateNames: [
        `Piece No. ${p.number}`,
        p.subtitle,
        p.categoryLabel ? `${p.categoryLabel}: ${p.name}` : undefined
      ].filter(Boolean) as string[],
      url: pageData.url,
      image: p.heroImage,
      attributes: [
        { key: 'category', label: 'Art Category', value: p.categoryLabel, evidenceSnippet: `Category: ${p.categoryLabel}` },
        { key: 'material', label: 'Primary Fiber Material', value: p.material, evidenceSnippet: `Material: ${p.material}` },
        { key: 'dimensions', label: 'Physical Dimensions', value: p.dimensions, evidenceSnippet: `Dimensions: ${p.dimensions}` },
        { key: 'weight', label: 'Weight', value: p.weight, evidenceSnippet: `Weight: ${p.weight}` },
        { key: 'stitchCount', label: 'Stitch Count', value: p.stitchCount, evidenceSnippet: `Stitch count: ${p.stitchCount}` },
        { key: 'craftTime', label: 'Artisan Craft Time', value: p.craftTime, evidenceSnippet: `Craft time: ${p.craftTime}` },
        { key: 'fiberOrigin', label: 'Fiber Provenance', value: p.details?.fiberOrigin || 'Ethically sourced natural fibers', evidenceSnippet: p.details?.fiberOrigin },
        { key: 'price', label: 'Acquisition Value', value: p.price || 'Upon Inquiry', evidenceSnippet: `Price: ${p.price}` }
      ]
    };
  }

  switch (pageData.type) {
    case 'collection':
      return {
        name: 'Kurush Yarn Permanent Textile Collection',
        type: 'Artwork',
        description: `Curated digital archive of ${products.length} bespoke botanical crochet stems, sculptural flora, and tactile fiber objects.`,
        alternateNames: ['Kurush Archive', 'Handcrafted Crochet Works', 'Tactile Fiber Gallery'],
        url: pageData.url,
        image: '/images/products/product-07/hero.jpg',
        attributes: [
          { key: 'totalPieces', label: 'Total Cataloged Pieces', value: products.length, evidenceSnippet: `${products.length} archival pieces` },
          { key: 'primaryMedium', label: 'Artistic Medium', value: 'Botanical Crochet & Amigurumi Sculpture', evidenceSnippet: 'Continuous spiral crochet & wire armatures' },
          { key: 'atelier', label: 'Producing Atelier', value: siteContent.brand.name, evidenceSnippet: siteContent.brand.name }
        ]
      };

    case 'material':
      return {
        name: 'Kurush Yarn Material Provenance & Philosophy',
        type: 'Material',
        description: siteContent.materialStory.subtitle,
        alternateNames: ['Ethical Fiber Provenance', 'Long-Staple Combed Cotton', 'Sustainably Sheared Merino Roving'],
        url: pageData.url,
        image: '/images/products/product-03/hero.jpg',
        attributes: [
          { key: 'cottonStandard', label: 'Cotton Standard', value: 'Long-staple mercerized combed cotton', evidenceSnippet: 'Sustainably sourced long-staple combed cotton' },
          { key: 'woolStandard', label: 'Wool Standard', value: 'Cruelty-free ethically sheared Merino roving', evidenceSnippet: 'Sustainably sheared merino wool from family-run mills' },
          { key: 'coreStages', label: 'Transformation Stages', value: siteContent.materialStory.stages.length, evidenceSnippet: '5-stage metamorphosis' }
        ]
      };

    case 'process':
      return {
        name: 'Kurush Yarn Atelier Craft Methodology',
        type: 'Technique',
        description: siteContent.process.subtitle,
        alternateNames: ['Slow Crochet Craft Process', 'Tactile Amigurumi Architecture', 'Botanical Sculpting Method'],
        url: pageData.url,
        image: '/images/brand/atelier.jpg',
        attributes: [
          { key: 'phasesCount', label: 'Methodology Phases', value: siteContent.process.steps.length, evidenceSnippet: `${siteContent.process.steps.length} disciplined phases` },
          { key: 'craftTimeRange', label: 'Crafting Duration', value: '4 to 14 hours per piece', evidenceSnippet: 'Every piece demands between 4 to 14 hours' },
          { key: 'stitchRange', label: 'Stitch Range', value: '480 to 2,400 stitches per piece', evidenceSnippet: '480 to 2,400 stitches per piece' }
        ]
      };

    case 'about':
      return {
        name: siteContent.brand.name,
        type: 'Organization',
        description: `${siteContent.brand.name} is a future craft atelier and slow textile design studio specializing in contemporary botanical needlecraft and heirloom fiber sculptures.`,
        alternateNames: ['Kurush Yarn Studio', 'Kurush Atelier'],
        url: pageData.url,
        image: siteContent.atelier.image || '/images/brand/atelier.jpg',
        attributes: [
          { key: 'established', label: 'Established', value: siteContent.brand.established, evidenceSnippet: siteContent.brand.established },
          { key: 'location', label: 'Studio Base', value: siteContent.brand.location, evidenceSnippet: siteContent.brand.location },
          { key: 'philosophy', label: 'Core Philosophy', value: siteContent.atelier.quote, evidenceSnippet: siteContent.atelier.quote }
        ]
      };

    case 'home':
    default:
      return {
        name: 'Kurush Yarn Atelier',
        type: 'Organization',
        description: 'Immersive digital exhibition and slow-craft atelier for handcrafted botanical crochet, heirloom fiber sculptures, and tactile textile adornments.',
        alternateNames: ['Kurush Yarn', 'Kurush Atelier'],
        url: pageData.url,
        image: '/images/products/product-07/hero.jpg',
        attributes: [
          { key: 'catalogSize', label: 'Catalog Size', value: `${products.length} Bespoke Works`, evidenceSnippet: `${products.length} pieces` },
          { key: 'origin', label: 'Provenance', value: siteContent.brand.location, evidenceSnippet: siteContent.brand.location },
          { key: 'aesthetic', label: 'Design Aesthetic', value: 'Soft-futuristic tactile botanical art', evidenceSnippet: 'Tactile warmth and geometric precision' }
        ]
      };
  }
}

export function extractRelatedEntities(pageData: PageInputData, primary: KnowledgeEntity): KnowledgeEntity[] {
  const related: KnowledgeEntity[] = [];

  // Atelier Organization is always a foundational related entity
  if (primary.name !== siteContent.brand.name) {
    related.push({
      name: siteContent.brand.name,
      type: 'Organization',
      description: 'Slow-craft fiber art atelier and digital exhibition space.',
      url: '/about'
    });
  }

  if (pageData.product) {
    const p = pageData.product;
    // Material entity
    related.push({
      name: p.material,
      type: 'Material',
      description: `Natural fiber composite utilized in ${p.name}: ${p.details?.fiberOrigin || 'Ethically sourced fibers'}.`,
      attributes: [
        { key: 'materialComposition', label: 'Composition', value: p.material, evidenceSnippet: p.material }
      ]
    });

    // Technique entity
    related.push({
      name: 'Continuous Spiral Needlecraft',
      type: 'Technique',
      description: p.details?.process || 'Mathematical stitch gauge calculation and tensioned crochet architecture.',
      attributes: [
        { key: 'stitchCount', label: 'Stitches', value: p.stitchCount, evidenceSnippet: p.stitchCount },
        { key: 'craftTime', label: 'Creation Duration', value: p.craftTime, evidenceSnippet: p.craftTime }
      ]
    });

    // Category entity
    related.push({
      name: `${p.categoryLabel} Collection`,
      type: 'Concept',
      description: `Botanical and ornamental grouping for ${p.categoryLabel} artifacts.`,
      url: '/works'
    });
  } else if (pageData.type === 'material') {
    siteContent.materialStory.stages.forEach((stage) => {
      related.push({
        name: `${stage.title} (Stage ${stage.step})`,
        type: 'Material',
        description: stage.description,
        attributes: [
          { key: 'densityIndex', label: 'Material Density', value: `${stage.density}%`, evidenceSnippet: `Density ${stage.density}` }
        ]
      });
    });
  } else if (pageData.type === 'process') {
    siteContent.process.steps.forEach((step) => {
      related.push({
        name: `Phase ${step.number}: ${step.name}`,
        type: 'Technique',
        description: step.description,
        attributes: [
          { key: 'techniqueSummary', label: 'Technique', value: step.technique, evidenceSnippet: step.technique }
        ]
      });
    });
  } else {
    // Featured works as related entities
    products.slice(0, 4).forEach((p) => {
      related.push({
        name: p.name,
        type: 'Artwork',
        description: p.tagline || p.subtitle,
        url: `/product/${p.slug}`,
        image: p.heroImage
      });
    });
  }

  return related;
}

export function extractEntityRelationships(
  primary: KnowledgeEntity,
  related: KnowledgeEntity[],
  pageData: PageInputData
): EntityRelationship[] {
  const relationships: EntityRelationship[] = [];

  if (pageData.product) {
    const p = pageData.product;
    relationships.push({
      sourceEntity: p.name,
      relationship: 'craftedBy',
      targetEntity: siteContent.brand.name,
      evidence: `${p.name} is designed and handcrafted exclusively by ${siteContent.brand.name}.`
    });

    relationships.push({
      sourceEntity: p.name,
      relationship: 'composedOf',
      targetEntity: p.material,
      evidence: `Handcrafted with ${p.material}.`
    });

    relationships.push({
      sourceEntity: p.name,
      relationship: 'belongsToCollection',
      targetEntity: 'Kurush Yarn Permanent Collection',
      evidence: `Piece No. ${p.number} in the curated exhibition archive.`
    });

    if (p.details?.process) {
      relationships.push({
        sourceEntity: p.name,
        relationship: 'requiresTechnique',
        targetEntity: 'Continuous Spiral Needlecraft',
        evidence: p.details.process
      });
    }
  } else if (pageData.type === 'material') {
    relationships.push({
      sourceEntity: siteContent.brand.name,
      relationship: 'curatesMaterialStandard',
      targetEntity: 'Long-staple Combed Cotton & Merino Wool',
      evidence: siteContent.materialStory.subtitle
    });
  } else if (pageData.type === 'process') {
    relationships.push({
      sourceEntity: siteContent.brand.name,
      relationship: 'executesMethodology',
      targetEntity: 'Five-Phase Atelier Craft Method',
      evidence: siteContent.process.subtitle
    });
  }

  return relationships;
}
