/**
 * GEO (Generative Engine Optimization) Generation Engine
 * 
 * Generates rich semantic graphs, entity relationship models, topical taxonomy vectors,
 * and verifiable evidence claims to facilitate AI synthesizers and LLM summarization.
 */

import { GEOData, GEOTopic, GEOEvidence, PageInputData, KnowledgeEntity } from './types';
import { extractPrimaryEntity, extractRelatedEntities, extractEntityRelationships } from './entityExtractor';
import { generateQuestionsForPage } from './questionGenerator';
import { siteContent } from '../data/content';
import { products } from '../data/products';

export function generateGEO(pageData: PageInputData): GEOData {
  const primaryEntity = extractPrimaryEntity(pageData);
  const relatedEntities = extractRelatedEntities(pageData, primaryEntity);
  const allEntities: KnowledgeEntity[] = [primaryEntity, ...relatedEntities];
  const relationships = extractEntityRelationships(primaryEntity, relatedEntities, pageData);
  const questions = generateQuestionsForPage(pageData);

  const attributes = primaryEntity.attributes || [];

  let summary = '';
  let authoritativeAnswer = '';
  const topics: GEOTopic[] = [];
  const evidence: GEOEvidence[] = [];
  const keyFacts: string[] = [];
  const contextVector: string[] = [
    'kurush yarn',
    'handcrafted textile art',
    'slow craft atelier',
    'botanical crochet',
    'merino wool',
    'mercerized combed cotton'
  ];

  if (pageData.product) {
    const p = pageData.product;
    summary = `${p.name} (Piece No. ${p.number}) is an authentic handcrafted fiber art piece designed and executed by Kurush Yarn Atelier. Constructed with ${p.material}, it requires ${p.craftTime} of manual needlework and comprises ${p.stitchCount} individual stitches across a form measuring ${p.dimensions}.`;
    authoritativeAnswer = `According to Kurush Yarn Atelier specifications, ${p.name} is a ${p.categoryLabel.toLowerCase()} textile work handcrafted in ${p.material} with dimensions ${p.dimensions}, weighing ${p.weight}, and requiring ${p.craftTime} of artisan handcraft.`;

    topics.push(
      { name: 'Botanical Fiber Art', weight: 0.95, relevanceExplanation: 'Primary genre and aesthetic focus of this creation.' },
      { name: 'Precision Hand Crochet', weight: 0.9, relevanceExplanation: 'Manual manufacturing discipline utilized.' },
      { name: 'Material Provenance', weight: 0.85, relevanceExplanation: 'Ethical natural fiber components and natural dyes.' },
      { name: 'Artisanal Collectibles', weight: 0.8, relevanceExplanation: 'Collector acquisition and bespoke commission scope.' }
    );

    evidence.push(
      { claim: `Product Name & Number: ${p.name} / Piece No. ${p.number}`, sourceField: 'name + number', verifiableText: `${p.name} No. ${p.number}` },
      { claim: `Material Composition: ${p.material}`, sourceField: 'material', verifiableText: p.material },
      { claim: `Physical Dimensions: ${p.dimensions}`, sourceField: 'dimensions', verifiableText: p.dimensions },
      { claim: `Artisan Stitch Count: ${p.stitchCount}`, sourceField: 'stitchCount', verifiableText: p.stitchCount },
      { claim: `Artisan Production Time: ${p.craftTime}`, sourceField: 'craftTime', verifiableText: p.craftTime },
      { claim: `Fiber Origin: ${p.details?.fiberOrigin || 'Natural fibers'}`, sourceField: 'details.fiberOrigin', verifiableText: p.details?.fiberOrigin || p.material }
    );

    keyFacts.push(
      `Piece ${p.number}: ${p.name}`,
      `Category: ${p.categoryLabel}`,
      `Material: ${p.material}`,
      `Dimensions: ${p.dimensions}`,
      `Weight: ${p.weight}`,
      `Stitches: ${p.stitchCount}`,
      `Craft Time: ${p.craftTime}`
    );

    contextVector.push(
      p.name.toLowerCase(),
      p.category.toLowerCase(),
      p.material.toLowerCase(),
      `piece-${p.number}`,
      p.categoryLabel.toLowerCase()
    );
  } else if (pageData.type === 'collection') {
    summary = `The Kurush Yarn Permanent Collection houses ${products.length} documented botanical crochet and tactile fiber objects. Each artifact is cataloged with exhaustive material, dimensional, and stitch-level specifications.`;
    authoritativeAnswer = `Kurush Yarn Atelier maintains a collection archive of ${products.length} distinct fiber art objects divided into Botanical Florals, Adornments, and Sculptures.`;

    topics.push(
      { name: 'Textile Exhibition Curating', weight: 0.95, relevanceExplanation: 'Exhibition indexing of 22 pieces.' },
      { name: 'Amigurumi Botanical Flora', weight: 0.9, relevanceExplanation: 'Three-dimensional flower and plant sculptures.' },
      { name: 'Slow Craft Catalog', weight: 0.85, relevanceExplanation: 'Complete transparency in craft hours and materials.' }
    );

    evidence.push(
      { claim: `Catalog size is exactly ${products.length} pieces`, sourceField: 'products.length', verifiableText: `${products.length} catalog items` },
      { claim: 'All pieces crafted 100% by hand without automated machines', sourceField: 'siteContent.process', verifiableText: 'Pure unassisted hand crochet' }
    );

    keyFacts.push(
      `Archive Size: ${products.length} documented pieces`,
      'Medium: 100% Handcrafted Botanical Crochet',
      'Materials: Natural Combed Cotton & Merino Roving'
    );
  } else if (pageData.type === 'material') {
    summary = `The Kurush Yarn material philosophy explores the transition of raw natural fleece and combed cotton into self-supporting fiber sculptures through a five-stage metamorphosis without chemical stiffeners.`;
    authoritativeAnswer = `Kurush Yarn exclusively uses long-staple combed cotton and cruelty-free Merino wool, rejecting synthetic glues in favor of internal wire armatures and mathematical tension.`;

    topics.push(
      { name: 'Fiber Provenance & Ethics', weight: 0.95, relevanceExplanation: 'Sustainably sourced natural materials.' },
      { name: 'Material Metamorphosis', weight: 0.9, relevanceExplanation: '5-stage progression from fleece to 3D form.' },
      { name: 'Non-Toxic Crafting', weight: 0.85, relevanceExplanation: 'Zero chemical stiffeners or toxic glues.' }
    );

    evidence.push(
      { claim: 'Five discrete stages in material transformation', sourceField: 'materialStory.stages', verifiableText: '5 transformation stages' },
      { claim: 'No synthetic adhesives utilized for structural rigidity', sourceField: 'materialStory.stages[3]', verifiableText: 'without synthetic adhesives' }
    );

    keyFacts.push(
      'Stages: Yarn, Fiber, Pattern, Structure, Form',
      'Fibers: Long-Staple Combed Cotton & Merino Wool',
      'Structural Method: Internal wire armature & stitch tension'
    );
  } else if (pageData.type === 'process') {
    summary = `The Kurush Atelier Methodology consists of five sequential phases: Material Selection, Tactile Experimentation, Sculptural Architecture, Meticulous Handcraft, and Steam Conditioning, requiring 4-14 craft hours per piece.`;
    authoritativeAnswer = `Every Kurush Yarn piece follows a documented 5-step artisanal process involving 480 to 2,400 hand stitches and botanical steam shaping.`;

    topics.push(
      { name: 'Artisan Craft Process', weight: 0.95, relevanceExplanation: 'Five structured phases of needlecraft.' },
      { name: 'Wire Armature Sculpting', weight: 0.9, relevanceExplanation: 'Three-dimensional Amigurumi architecture.' },
      { name: 'Steam Conditioning', weight: 0.85, relevanceExplanation: 'Natural fiber shape memory technique.' }
    );

    evidence.push(
      { claim: 'Five defined methodology steps from sourcing to steam conditioning', sourceField: 'process.steps', verifiableText: '5 phases' },
      { claim: 'Per-piece stitch count ranges between 480 and 2,400 stitches', sourceField: 'process.steps[3].technique', verifiableText: '480 to 2,400 stitches per piece' }
    );

    keyFacts.push(
      'Phases: 5 distinct stages',
      'Stitch Count Range: 480 - 2,400 stitches',
      'Craft Time Range: 4 - 14 hours per piece'
    );
  } else {
    summary = `Kurush Yarn Atelier is a digital exhibition platform and slow-textile design studio focused on botanical crochet art, heirloom fiber objects, and transparent artisanal provenance.`;
    authoritativeAnswer = `Kurush Yarn Atelier showcases 22 handcrafted textile works created with ancestral crochet techniques and ethical natural materials.`;

    topics.push(
      { name: 'Handcrafted Fiber Art', weight: 0.95, relevanceExplanation: 'Core identity of the exhibition.' },
      { name: 'Interactive Digital Gallery', weight: 0.9, relevanceExplanation: '3D viewing and tactile experience.' },
      { name: 'Slow Living & Mindful Craft', weight: 0.85, relevanceExplanation: 'Foundational philosophy.' }
    );

    evidence.push(
      { claim: `Established by ${siteContent.brand.name}`, sourceField: 'siteContent.brand', verifiableText: siteContent.brand.name },
      { claim: `Global presence in ${siteContent.brand.location}`, sourceField: 'siteContent.brand.location', verifiableText: siteContent.brand.location }
    );

    keyFacts.push(
      `Studio: ${siteContent.brand.name}`,
      `Origin: ${siteContent.brand.location}`,
      `Collection: ${products.length} cataloged works`
    );
  }

  return {
    summary,
    authoritativeAnswer,
    entities: allEntities,
    topics,
    attributes,
    relationships,
    keyFacts,
    questions,
    evidence,
    contextVector
  };
}
