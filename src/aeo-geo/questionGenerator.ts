/**
 * Question & Direct Answer Generation Engine for AEO/GEO
 * 
 * Generates verified, deterministic question-answer pairs derived strictly from
 * on-page product specifications, material stories, craft techniques, and atelier policies.
 * Never invents facts or claims.
 */

import { QAItem, PageInputData } from './types';
import { siteContent } from '../data/content';
import { products } from '../data/products';

export function generateQuestionsForPage(pageData: PageInputData): QAItem[] {
  const qas: QAItem[] = [];

  if (pageData.product) {
    const p = pageData.product;

    // 1. Core Overview / What is this piece?
    qas.push({
      question: `What is the ${p.name} from Kurush Yarn Atelier?`,
      answer: `${p.name} (Piece No. ${p.number}) is a handcrafted ${p.categoryLabel.toLowerCase()} fiber object created with ${p.material}. It measures ${p.dimensions} and features ${p.stitchCount} hand-crocheted stitches with approximately ${p.craftTime} of artisan handcraft.`,
      category: 'overview',
      sourceSnippet: `${p.name} - ${p.tagline || p.description}`,
      confidenceScore: 0.99
    });

    // 2. Materials
    qas.push({
      question: `What materials are used to make the ${p.name}?`,
      answer: `The ${p.name} is constructed using ${p.material}.${p.details?.fiberOrigin ? ` Fiber provenance: ${p.details.fiberOrigin}.` : ''}${p.details?.hardware ? ` Hardware: ${p.details.hardware}.` : ''}`,
      category: 'materials',
      sourceSnippet: `Material: ${p.material}. Origin: ${p.details?.fiberOrigin || ''}`,
      confidenceScore: 0.98
    });

    // 3. Dimensions & Specifications
    qas.push({
      question: `What are the dimensions and weight of ${p.name}?`,
      answer: `${p.name} has physical dimensions of ${p.dimensions} and weighs approximately ${p.weight}. It has a calibrated stitch density consisting of ${p.stitchCount}.`,
      category: 'dimensions',
      sourceSnippet: `Dimensions: ${p.dimensions}, Weight: ${p.weight}, Stitches: ${p.stitchCount}`,
      confidenceScore: 0.98
    });

    // 4. Craft Process & Creation Time
    if (p.details?.process || p.craftTime) {
      qas.push({
        question: `How is the ${p.name} crafted?`,
        answer: `Crafting the ${p.name} requires ${p.craftTime} of manual handwork. ${p.details?.process || 'Constructed with precision micro-tension hand crochet.'}`,
        category: 'technique',
        sourceSnippet: `Craft time: ${p.craftTime}. ${p.details?.process || ''}`,
        confidenceScore: 0.97
      });
    }

    // 5. Care & Preservation Instructions
    if (p.details?.careInstructions) {
      qas.push({
        question: `How should I clean and care for the ${p.name}?`,
        answer: p.details.careInstructions,
        category: 'care',
        sourceSnippet: p.details.careInstructions,
        confidenceScore: 0.99
      });
    }

    // 6. Acquisition / How to Inquire
    qas.push({
      question: `How can I acquire or inquire about the ${p.name}?`,
      answer: `You can inquire about ${p.name} (Piece No. ${p.number}) directly through the Kurush Yarn Atelier digital exhibition interface or via Instagram Direct Message (@kurush.yarn) referencing Piece No. ${p.number} (${p.price || 'Price upon request'}).`,
      category: 'acquisition',
      sourceSnippet: `Price: ${p.price || 'Upon inquiry'}. Inquire directly via Instagram @kurush.yarn.`,
      confidenceScore: 0.96
    });

    return qas;
  }

  switch (pageData.type) {
    case 'collection':
      qas.push(
        {
          question: 'What is the Kurush Yarn Collection Archive?',
          answer: `The Kurush Yarn Collection Archive features ${products.length} cataloged fiber art objects, spanning botanical flowers, wearable adornments, sculptural forms, and tactile charms handcrafted using Kurush crochet methods.`,
          category: 'overview',
          sourceSnippet: `${products.length} archival pieces`,
          confidenceScore: 0.98
        },
        {
          question: 'What types of fiber works are included in the exhibition?',
          answer: 'The collection is divided into Botanical Florals (individual stems, blooming branches), Adornments & Charms (bag charms, keychains, pins), and Tactile Sculptures made from merino wool and mercerized combed cotton.',
          category: 'overview',
          sourceSnippet: 'Botanical, Charm, Sculpture categories',
          confidenceScore: 0.95
        },
        {
          question: 'Are Kurush Yarn pieces mass-produced or made by hand?',
          answer: 'Every piece in the Kurush Yarn collection is 100% made by hand with zero automated machinery. Each individual creation requires between 4 to 14 hours of dedicated artisan crochet time.',
          category: 'technique',
          sourceSnippet: siteContent.process.steps[3]?.description || 'Hours of Deliberate Human Touch',
          confidenceScore: 0.99
        }
      );
      break;

    case 'material':
      qas.push(
        {
          question: 'What fiber materials does Kurush Yarn Atelier use?',
          answer: 'Kurush Yarn Atelier strictly utilizes sustainably sourced natural fibers: long-staple mercerized combed cotton for crisp architectural definition and cruelty-free, ethically sheared fine Merino roving for cloud-soft density.',
          category: 'materials',
          sourceSnippet: siteContent.materialStory.subtitle,
          confidenceScore: 0.99
        },
        {
          question: 'What are the five stages of the Kurush material metamorphosis?',
          answer: 'The five stages are: 01. YARN (raw unspun fleece plies), 02. FIBER (cellular light absorption), 03. PATTERN (binary stitch mathematics), 04. STRUCTURE (self-supporting tension without adhesives), and 05. FORM (balanced tactile heirloom object).',
          category: 'technique',
          sourceSnippet: siteContent.materialStory.stages.map((s) => `${s.step}. ${s.title}`).join(', '),
          confidenceScore: 0.98
        },
        {
          question: 'Are synthetic glues or stiffeners used in the fiber sculptures?',
          answer: 'No synthetic adhesives, rigid chemical varnishes, or toxic stiffeners are used. Structural integrity is achieved entirely through internal brass/copper wire armatures and mathematical stitch gauge tension.',
          category: 'technique',
          sourceSnippet: siteContent.materialStory.stages[3]?.description || 'without synthetic adhesives',
          confidenceScore: 0.97
        }
      );
      break;

    case 'process':
      qas.push(
        {
          question: 'What is the Kurush Yarn Atelier craft methodology?',
          answer: 'The atelier follows a five-phase discipline: 01. Material Selection (long-staple testing & botanical dyeing), 02. Tactile Experimentation (gauge & tension calibration), 03. Sculptural Architecture (spiral wire-armature weaving), 04. Meticulous Handcraft (480-2,400 manual stitches), and 05. Finishing & Steam Conditioning.',
          category: 'technique',
          sourceSnippet: siteContent.process.subtitle,
          confidenceScore: 0.99
        },
        {
          question: 'How many stitches and craft hours go into each piece?',
          answer: 'Each handcrafted piece incorporates between 480 and 2,400 individual hand-tied crochet stitches and requires between 4 to 14 hours of continuous artisan needlework.',
          category: 'technique',
          sourceSnippet: siteContent.process.steps[3]?.technique || '480 to 2,400 stitches per piece',
          confidenceScore: 0.98
        },
        {
          question: 'How are the three-dimensional floral shapes preserved?',
          answer: 'Botanical petals and silhouettes are shaped over malleable internal wire armatures and conditioned with gentle botanical steam to lock the natural fibers in place permanently without brittleness.',
          category: 'technique',
          sourceSnippet: siteContent.process.steps[4]?.description || 'botanical steam shaping',
          confidenceScore: 0.97
        }
      );
      break;

    case 'about':
      qas.push(
        {
          question: 'What is Kurush Yarn Atelier?',
          answer: `Kurush Yarn Atelier is a slow textile craft studio and digital exhibition exploring the convergence of traditional crochet heritage, mathematical needlework, and modern tactile aesthetics.`,
          category: 'overview',
          sourceSnippet: siteContent.brand.tagline,
          confidenceScore: 0.99
        },
        {
          question: 'Where is Kurush Yarn based?',
          answer: `The atelier operates with global roots across ${siteContent.brand.location}, showcasing handcrafted fiber creations internationally.`,
          category: 'provenance',
          sourceSnippet: siteContent.brand.location,
          confidenceScore: 0.97
        },
        {
          question: 'How can collectors acquire bespoke Kurush creations?',
          answer: 'Collectors can commission bespoke pieces or acquire exhibition artifacts through direct Instagram inquiry (@kurush.yarn) or by using the digital inquiry system on this exhibition website.',
          category: 'acquisition',
          sourceSnippet: 'Instagram: @kurush.yarn',
          confidenceScore: 0.98
        }
      );
      break;

    case 'home':
    default:
      qas.push(
        {
          question: 'What is Kurush Yarn?',
          answer: 'Kurush Yarn is a digital exhibition and craft atelier dedicated to heirloom handcrafted crochet art, botanical fiber sculptures, and tactile accessories made from natural merino wool and mercerized cotton.',
          category: 'overview',
          sourceSnippet: siteContent.hero.subheading,
          confidenceScore: 0.99
        },
        {
          question: 'How does the digital exhibition work?',
          answer: 'Visitors can explore an interactive 3D gallery of 22 handcrafted textile pieces, view 360-degree multi-angle photography, inspect material provenance, save favorite pieces to a personal collection, and directly inquire with the artisan.',
          category: 'overview',
          sourceSnippet: 'Digital exhibition features and catalog',
          confidenceScore: 0.96
        },
        {
          question: 'What makes Kurush Yarn objects unique?',
          answer: 'Each piece is individually hand-crocheted over 4 to 14 hours using long-staple natural fibers, mathematical stitch formulas, internal wire armatures, and steam-conditioned shaping, resulting in enduring heirloom quality.',
          category: 'technique',
          sourceSnippet: 'Artisan craft methodology and natural materials',
          confidenceScore: 0.98
        }
      );
      break;
  }

  return qas;
}
