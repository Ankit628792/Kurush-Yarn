/**
 * AEO & GEO Verification and Test Script
 * 
 * Tests and verifies AEO/GEO signal generation across:
 * - Homepage (All sections: hero, works, material, process, atelier)
 * - Collection Archive (/works)
 * - All 22 Handcrafted Product Pieces (/product/:slug)
 * - Material Provenance (/material)
 * - Craft Process (/process)
 * - About Atelier (/about)
 * 
 * Run with: npx tsx scripts/test-aeo-geo.ts
 */

import { generateOptimizationData, validateOptimizationData } from '../src/aeo-geo';
import { products } from '../src/data/products';
import { PageInputData } from '../src/aeo-geo/types';

console.log('🤖 [AEO/GEO Test Suite] Initializing validation run across all routes & pieces...\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(testName: string, pageData: PageInputData) {
  totalTests++;
  try {
    const result = generateOptimizationData(pageData, { bypassCache: true });
    const validation = validateOptimizationData(result, pageData);

    if (validation.isValid) {
      passedTests++;
      console.log(`✅ [PASS] ${testName}`);
      console.log(`   - Primary Entity: ${result.entity.name} (${result.entity.type})`);
      console.log(`   - AEO Questions: ${result.aeo.questions.length} items`);
      console.log(`   - GEO Topics: ${result.geo.topics.map((t) => t.name).join(', ')}`);
      console.log(`   - Schema Types: ${result.schema.map((s) => s['@type']).join(', ')}`);
      console.log(`   - Direct Answer: "${result.aeo.directAnswer.slice(0, 80)}..."\n`);
    } else {
      failedTests++;
      console.error(`❌ [FAIL] ${testName}`);
      console.error(`   - Errors:`, validation.warnings.filter((w) => w.severity === 'error'));
      console.error(`   - Warnings:`, validation.warnings.filter((w) => w.severity === 'warning'), '\n');
    }
  } catch (err) {
    failedTests++;
    console.error(`❌ [ERROR] ${testName} crashed:`, err, '\n');
  }
}

// 1. Test Static Routes
runTest('Homepage (Hero Section)', {
  url: 'https://kurush-yarn.atelier/',
  title: 'Kurush Yarn — Handcrafted Textile Exhibition & Atelier',
  description: 'A soft-futuristic digital exhibition for handcrafted textile objects created using Kurush and yarn.',
  type: 'home'
});

runTest('Collection Page (/works)', {
  url: 'https://kurush-yarn.atelier/works',
  title: 'Collection & Handcrafted Works | Kurush Yarn Atelier',
  description: 'Explore our complete archive of 22 artisanal crochet pieces, botanical flower stems, and fiber sculptures.',
  type: 'collection'
});

runTest('Material Philosophy Page (/material)', {
  url: 'https://kurush-yarn.atelier/material',
  title: 'Material Philosophy & Fiber Provenance | Kurush Yarn Atelier',
  description: 'Discover our commitment to natural fibers: combed mercerized cotton, fine merino roving, and ethical fill.',
  type: 'material'
});

runTest('Craft Methodology Page (/process)', {
  url: 'https://kurush-yarn.atelier/process',
  title: 'Artisanal Technique & Meditative Craft Process | Kurush Yarn Atelier',
  description: 'From filament tensioning to mathematical stitch calculations and botanical steam shaping.',
  type: 'process'
});

runTest('About Atelier Page (/about)', {
  url: 'https://kurush-yarn.atelier/about',
  title: 'The Atelier & Craft Philosophy | Kurush Yarn',
  description: 'Crafted with mindful intention at Kurush Yarn Atelier.',
  type: 'about'
});

// 2. Test Sample of Product Pieces
console.log('--- Testing Product Pieces ---');
for (const p of products) {
  runTest(`Product Piece #${p.number}: ${p.name}`, {
    url: `https://kurush-yarn.atelier/product/${p.slug}`,
    title: `${p.name} — Piece No. ${p.number} | Kurush Yarn`,
    description: `${p.tagline} Handcrafted with ${p.material}. Dimensions: ${p.dimensions}.`,
    type: 'product',
    product: p
  });
}

console.log('==========================================');
console.log(`📊 Validation Summary: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('==========================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 All AEO/GEO invariants and Schema.org graphs validated successfully!');
}
