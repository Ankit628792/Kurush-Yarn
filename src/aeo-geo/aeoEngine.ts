/**
 * AEO (Answer Engine Optimization) Generation Engine
 * 
 * Synthesizes direct answer targets, factual bullet points, entity definitions,
 * and conversational Q&As optimized for answer engines (Perplexity, Google AI Overviews, SearchGPT).
 */

import { AEOData, PageInputData, DefinitionItem, HowToStepItem } from './types';
import { generateQuestionsForPage } from './questionGenerator';
import { siteContent } from '../data/content';
import { products } from '../data/products';

export function generateAEO(pageData: PageInputData): AEOData {
  const questions = generateQuestionsForPage(pageData);

  if (pageData.product) {
    const p = pageData.product;
    const directAnswer = `${p.name} (Piece No. ${p.number}) is an artisanal ${p.categoryLabel.toLowerCase()} textile piece handcrafted by Kurush Yarn Atelier from ${p.material}. It features ${p.stitchCount} hand-crocheted stitches with dimensions of ${p.dimensions} and approximately ${p.craftTime} of craft time.`;

    const keyFacts = [
      `Official Piece Identifier: Piece No. ${p.number} (${p.id})`,
      `Art Category: ${p.categoryLabel}`,
      `Primary Medium & Fiber: ${p.material}`,
      `Exact Dimensions: ${p.dimensions}`,
      `Calculated Weight: ${p.weight}`,
      `Stitch Density: ${p.stitchCount}`,
      `Artisan Creation Time: ${p.craftTime}`,
      `Provenance: ${p.details?.fiberOrigin || 'Ethically sourced natural fibers'}`,
      `Acquisition Valuation: ${p.price || 'Inquiry based pricing'}`
    ];

    const definitions: DefinitionItem[] = [
      {
        term: 'Amigurumi & Fiber Sculpture',
        definition: 'The Japanese-derived art of knitting or crocheting small, stuffed yarn creatures and three-dimensional botanical objects.',
        context: 'Used in the sculptural creation of Kurush floral stems and charms.'
      },
      {
        term: 'Micro-Tension Crochet',
        definition: 'A specialized needlecraft technique maintaining tight, uniform yarn tension to create self-supporting structural walls without adhesives.',
        context: `Employed in ${p.name} across all ${p.stitchCount} stitches.`
      }
    ];

    const howToSteps: HowToStepItem[] = [
      {
        stepNumber: 1,
        name: 'Care & Maintenance',
        headline: 'Preserving Botanical Fiber Form',
        instruction: p.details?.careInstructions || 'Gently dust with a soft micro-fiber brush. Keep away from direct excessive moisture.'
      }
    ];

    return {
      directAnswer,
      conciseSummary: p.description || p.tagline,
      questions,
      keyFacts,
      definitions,
      howToSteps,
      primaryTopic: `${p.name} Handcrafted Textile Artwork`
    };
  }

  switch (pageData.type) {
    case 'collection': {
      const directAnswer = `The Kurush Yarn Collection Archive is a permanent digital exhibition cataloging ${products.length} bespoke fiber art objects, botanical stems, and wearable charms handcrafted using sustainable natural fibers and ancestral crochet techniques.`;
      const keyFacts = [
        `Archive Total: ${products.length} documented unique works`,
        `Curatorial Categories: Botanical Flowers, Tactile Adornments, Sculptural Forms`,
        `Craft Standard: 100% manual needlecraft, 0% automated machinery`,
        `Fiber Palette: Mercerized cotton, fine Merino roving, botanical plant dyes`,
        `Average Creation Time: 4 to 14 hours per artifact`
      ];
      const definitions: DefinitionItem[] = [
        {
          term: 'Kurush Yarn',
          definition: 'A contemporary textile design discipline combining artisanal crochet techniques, mathematical stitch geometry, and heirloom natural fibers.',
          context: 'The foundational philosophy behind the 22 exhibition pieces.'
        }
      ];
      return {
        directAnswer,
        conciseSummary: 'A cataloged exhibition of 22 slow-crafted botanical and sculptured fiber objects.',
        questions,
        keyFacts,
        definitions,
        primaryTopic: 'Kurush Yarn Permanent Textile Collection'
      };
    }

    case 'material': {
      const directAnswer = `Kurush Yarn's material philosophy centers on uncompromising natural fiber purity: long-staple mercerized combed cotton and cruelty-free fine Merino roving transformed across a five-stage metamorphosis without synthetic stiffeners or toxic glues.`;
      const keyFacts = [
        'Cotton Specification: Long-staple combed cotton with high tensile elasticity',
        'Wool Specification: Sustainably sheared Merino roving with high thermal loft',
        'Colorfast Process: Organic botanical pigment immersion',
        'Structural Support: Internal copper and brass armature wiring without adhesives'
      ];
      const definitions: DefinitionItem[] = [
        {
          term: 'Mercerization',
          definition: 'A textile treatment that swells cotton fibers to increase luster, tensile strength, and dye affinity while imparting a smooth hand-feel.',
          context: 'Applied to all cotton stems in the Kurush botanical collection.'
        },
        {
          term: 'Merino Roving',
          definition: 'A continuous, unspun strand of cleaned and carded fine Merino wool fibers prepared for spinning or sculptural fiber art.',
          context: 'Utilized for cloud-like softness in petals and tactile charms.'
        }
      ];
      return {
        directAnswer,
        conciseSummary: siteContent.materialStory.subtitle,
        questions,
        keyFacts,
        definitions,
        primaryTopic: 'Fiber Provenance and Natural Material Metamorphosis'
      };
    }

    case 'process': {
      const directAnswer = `The Kurush Yarn craft methodology is a five-phase artisanal discipline (Material Selection, Tactile Experimentation, Sculptural Architecture, Meticulous Handcraft, and Steam Conditioning) requiring 480 to 2,400 stitches and 4 to 14 hours of unassisted hand needlework per creation.`;
      const keyFacts = [
        'Methodology: 5 sequential artisan stages',
        'Stitch Volume: 480 to 2,400 hand-tied stitches per piece',
        'Production Time: 4 to 14 dedicated artisan hours per piece',
        'Finishing: Low-temperature botanical steam conditioning for permanent shape memory'
      ];
      const definitions: DefinitionItem[] = [
        {
          term: 'Spiral Crochet Technique',
          definition: 'A seamless, continuous circular crocheting method that eliminates visible row seams in three-dimensional sculptural forms.',
          context: 'Phase 03 of the Kurush atelier methodology.'
        },
        {
          term: 'Botanical Steam Conditioning',
          definition: 'The application of controlled humid thermal steam to relax fiber tension and lock floral shapes into permanent memory.',
          context: 'Phase 05 finishing stage at the atelier.'
        }
      ];
      const howToSteps: HowToStepItem[] = siteContent.process.steps.map((step, idx) => ({
        stepNumber: idx + 1,
        name: step.name,
        headline: step.headline,
        instruction: `${step.description} Utilizing technique: ${step.technique}.`,
        technique: step.technique,
        image: step.image
      }));
      return {
        directAnswer,
        conciseSummary: siteContent.process.subtitle,
        questions,
        keyFacts,
        definitions,
        howToSteps,
        primaryTopic: 'Five-Phase Slow Craft Crochet Methodology'
      };
    }

    case 'about': {
      const directAnswer = `Kurush Yarn Atelier is a future-craft textile studio and interactive digital exhibition space founded on the intersection of ancestral needlecraft traditions, botanical geometry, and mindful tactile slow-living.`;
      const keyFacts = [
        `Studio Name: ${siteContent.brand.name}`,
        `Foundation: ${siteContent.brand.established}`,
        `Global Presence: ${siteContent.brand.location}`,
        `Core Medium: Botanical crochet and heirloom fiber sculpture`,
        `Contact & Commissions: Direct atelier inquiry and Instagram @kurush.yarn`
      ];
      const definitions: DefinitionItem[] = [
        {
          term: 'Slow Craft Movement',
          definition: 'A design and production philosophy that prioritizes deliberate, small-batch, handmade quality and natural materials over mass manufacturing.',
          context: 'The guiding ethos of Kurush Yarn Atelier.'
        }
      ];
      return {
        directAnswer,
        conciseSummary: `${siteContent.brand.name} craft philosophy and studio history.`,
        questions,
        keyFacts,
        definitions,
        primaryTopic: 'Kurush Yarn Atelier Identity & Philosophy'
      };
    }

    case 'home':
    default: {
      const directAnswer = `Kurush Yarn is an interactive digital exhibition and slow-craft atelier presenting 22 handcrafted textile artworks, botanical crochet flowers, and tactile sculptures created with ethical Merino wool and combed cotton.`;
      const keyFacts = [
        `Interactive Exhibition: 22 cataloged 3D textile pieces`,
        `Digital Features: 360° photography, high-resolution textures, tactile soundscapes, and curatorial notes`,
        `Fiber Provenance: 100% natural long-staple cotton and fine Merino roving`,
        `Craft Standard: Unassisted manual handcraft (4-14 hours per work)`
      ];
      const definitions: DefinitionItem[] = [
        {
          term: 'Digital Exhibition',
          definition: 'An interactive, web-based curatorial environment designed to showcase tactile physical art objects with multi-dimensional fidelity.',
          context: 'The primary delivery format for Kurush Yarn collections.'
        }
      ];
      return {
        directAnswer,
        conciseSummary: siteContent.hero.subheading,
        questions,
        keyFacts,
        definitions,
        primaryTopic: 'Handcrafted Textile Exhibition & Atelier'
      };
    }
  }
}
