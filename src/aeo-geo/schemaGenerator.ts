/**
 * Schema.org Generator for AEO/GEO Signals
 * 
 * Generates rich, validated, and non-duplicative JSON-LD graph objects.
 * Accurately aligns schema types (Product, VisualArtwork, HowTo, FAQPage, CollectionPage, BreadcrumbList)
 * with the page's genuine content.
 */

import { PageInputData, QAItem, HowToStepItem } from './types';
import { getAppOrigin, getProductPieceUrl, getAbsoluteAssetUrl } from '../utils/url';
import { siteContent } from '../data/content';
import { products } from '../data/products';

export function generateStructuredData(
  pageData: PageInputData,
  aeoData?: { questions: QAItem[]; howToSteps?: HowToStepItem[] }
): Record<string, unknown>[] {
  const origin = getAppOrigin();
  const schemas: Record<string, unknown>[] = [];
  const currentUrl = pageData.url.startsWith('http') ? pageData.url : `${origin}${pageData.url.startsWith('/') ? '' : '/'}${pageData.url}`;

  // 1. BreadcrumbList Schema (Universally valid)
  const breadcrumbItems = pageData.breadcrumbs || [
    { name: 'Atelier Home', url: origin },
    { name: pageData.title.split('—')[0].trim(), url: currentUrl }
  ];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${origin}${crumb.url.startsWith('/') ? '' : '/'}${crumb.url}`
    }))
  });

  // 2. Specific Page Type Schemas
  if (pageData.product) {
    const p = pageData.product;
    const heroImg = getAbsoluteAssetUrl(p.heroImage);
    const pieceUrl = getProductPieceUrl(p.slug);
    const cleanPrice = p.price ? p.price.replace(/[^0-9.]/g, '') : '199';

    // VisualArtwork Schema (High-fidelity art provenance)
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VisualArtwork',
      name: p.name,
      alternateName: `Piece No. ${p.number}`,
      artMedium: `Handcrafted Crochet with ${p.material}`,
      artform: 'Fiber Sculpture & Botanical Amigurumi',
      artworkSurface: 'Textile Fiber and Internal Wire Armature',
      creator: {
        '@type': 'Organization',
        name: siteContent.brand.name,
        url: origin
      },
      description: p.description || p.tagline,
      image: heroImg,
      depth: p.dimensions,
      width: p.dimensions,
      height: p.dimensions,
      material: p.material
    });

    // FAQPage Schema for the product if genuine Q&A items exist
    if (aeoData?.questions && aeoData.questions.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: aeoData.questions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      });
    }

    return schemas;
  }

  switch (pageData.type) {
    case 'collection':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Kurush Yarn Permanent Collection Archive',
        description: `Exhibition archive containing ${products.length} bespoke botanical crochet objects and fiber sculptures.`,
        url: currentUrl,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: getProductPieceUrl(item.slug),
            name: item.name,
            image: getAbsoluteAssetUrl(item.heroImage),
            description: item.tagline || item.description
          }))
        }
      });
      break;

    case 'process':
      // HowTo Schema for the 5-phase craft process
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Artisanal Fiber Sculpture & Botanical Crochet Craft Process',
        description: siteContent.process.subtitle,
        totalTime: 'PT10H', // Average 10 hours
        step: siteContent.process.steps.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: `Phase ${step.number}: ${step.name}`,
          itemListElement: [
            {
              '@type': 'HowToDirection',
              text: `${step.headline}. ${step.description}`
            },
            {
              '@type': 'HowToTip',
              text: `Technique: ${step.technique}`
            }
          ]
        }))
      });

      if (aeoData?.questions && aeoData.questions.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: aeoData.questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          }))
        });
      }
      break;

    case 'material':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Material Metamorphosis: Natural Fiber Provenance & Craft Ethics',
        description: siteContent.materialStory.subtitle,
        author: {
          '@type': 'Organization',
          name: siteContent.brand.name,
          url: origin
        },
        publisher: {
          '@type': 'Organization',
          name: siteContent.brand.name,
          logo: {
            '@type': 'ImageObject',
            url: `${origin}/logo.png`
          }
        },
        mainEntityOfPage: currentUrl
      });

      if (aeoData?.questions && aeoData.questions.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: aeoData.questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          }))
        });
      }
      break;

    case 'about':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: `About ${siteContent.brand.name}`,
        description: siteContent.brand.tagline,
        url: currentUrl,
        mainEntity: {
          '@type': 'ArtGallery',
          name: siteContent.brand.name,
          description: siteContent.atelier.description,
          url: origin,
          address: {
            '@type': 'PostalAddress',
            addressLocality: siteContent.brand.location
          }
        }
      });

      if (aeoData?.questions && aeoData.questions.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: aeoData.questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          }))
        });
      }
      break;

    case 'home':
    default:
      if (aeoData?.questions && aeoData.questions.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: aeoData.questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer
            }
          }))
        });
      }
      break;
  }

  return schemas;
}
