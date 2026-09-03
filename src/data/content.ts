import { SiteContent } from '../types/product';

export const siteContent: SiteContent = {
  brand: {
    name: 'KURUSH YARN',
    tagline: 'Future craft atelier × interactive digital exhibition',
    location: 'Kyoto — London — Worldwide',
    established: 'Est. 2024'
  },
  hero: {
    headlineStart: 'Made from',
    headlineHighlight: 'Kurush + Yarn.',
    subheading: 'Objects, textures and forms shaped through material, craft and imagination.',
    ctaExplore: 'Explore Collection',
    ctaProcess: 'Discover The Craft'
  },
  materialStory: {
    title: 'The Material Metamorphosis',
    subtitle: 'From a single continuous strand of spun wool to an architectural sculptural form.',
    stages: [
      {
        id: 'yarn',
        step: '01',
        title: 'YARN',
        description: 'Raw, unspun fleece selected for staple length, elasticity, and tactile warmth. Twisted under gentle tension into continuous organic plies.',
        quote: '“Every creation begins as an infinite line waiting for direction.”',
        density: 20
      },
      {
        id: 'fiber',
        step: '02',
        title: 'FIBER',
        description: 'Microscopic cellular fibers interlock under friction, absorbing organic botanical pigments and ambient light.',
        quote: '“At the fiber level, craft is a conversation between friction and light.”',
        density: 45
      },
      {
        id: 'pattern',
        step: '03',
        title: 'PATTERN',
        description: 'Mathematical rhythm translated into loops, chains, and slip stitches. Repeating geometries creating tactile surface resonance.',
        quote: '“Code written in wool — each stitch a binary rhythm of over and under.”',
        density: 70
      },
      {
        id: 'structure',
        step: '04',
        title: 'STRUCTURE',
        description: 'Two dimensions fold into three. Tension and relief generate self-supporting volumes without synthetic adhesives.',
        quote: '“Softness transformed into architectural strength.”',
        density: 85
      },
      {
        id: 'form',
        step: '05',
        title: 'FORM',
        description: 'The completed tactile object emerges. Balanced in weight, rich in sensory intimacy, permanent in purpose.',
        quote: '“A physical poem rendered in yarn.”',
        density: 100
      }
    ]
  },
  process: {
    title: 'The Atelier Methodology',
    subtitle: 'Five disciplined phases guiding every Kurush Yarn creation from inception to archival finishing.',
    steps: [
      {
        number: '01',
        name: 'MATERIAL SELECTION',
        headline: 'Natural Fibers & Ethical Sourcing',
        description:
          'We meticulously source long-staple combed cotton and sustainably sheared merino wool from family-run mills. Each skein is tested for tensile elasticity, tactile drape, and organic plant dye retention.',
        technique: 'Long-staple comb testing & colorfast botanical immersion',
        image: '/images/brand/atelier.jpg'
      },
      {
        number: '02',
        name: 'TACTILE EXPERIMENTATION',
        headline: 'Form Prototyping & Tension Calibration',
        description:
          'Before a collection takes form, our artisans experiment with hook gauges, tension variances, and stitch densities to discover the natural physics and spring of each silhouette.',
        technique: 'Ergonomic tension balance & gauge calibration',
        image: '/images/products/product-03/hero.jpg'
      },
      {
        number: '03',
        name: 'SCULPTURAL ARCHITECTURE',
        headline: 'Three-Dimensional Spatial Weaving',
        description:
          'Translating flat botanical sketches into self-standing three-dimensional volumes using continuous spiral crochet techniques, internal wire armatures, and seamless joining.',
        technique: 'Continuous spiral amigurumi & wire armature sculpting',
        image: '/images/products/product-07/hero.jpg'
      },
      {
        number: '04',
        name: 'METICULOUS HANDCRAFT',
        headline: 'Hours of Deliberate Human Touch',
        description:
          'Every piece demands between 4 to 14 hours of continuous hand-crocheting. No automated machinery can replicate the subtle micro-adjustments made by an experienced artisan’s hands.',
        technique: 'Pure unassisted hand crochet, 480 to 2,400 stitches per piece',
        image: '/images/brand/yarn_macro.jpg'
      },
      {
        number: '05',
        name: 'FINISHING & DIGITAL ARCHIVAL',
        headline: 'Reinforcement, Care & Digital Provenance',
        description:
          'Each completed sculpture is steam-set, inspected for stitch tension consistency, fitted with solid brass/stainless hardware, and documented with high-resolution digital studio captures.',
        technique: 'Gentle organic steam setting & archival registration',
        image: '/images/products/product-01/hero.jpg'
      }
    ]
  },
  atelier: {
    title: 'Atelier Philosophy',
    heading: 'Where ancient craft meets contemporary digital poise.',
    description:
      'Kurush Yarn was founded on a simple conviction: in an increasingly virtual and frictionless world, true luxury resides in tangible, slow-crafted material presence. Every object is created one stitch at a time, celebrating the warmth of human touch.',
    quote: '“We do not just make yarn objects; we weave moments of quiet stillness into modern life.”',
    author: 'Kurush Atelier Studio',
    image: '/images/brand/atelier.jpg',
    stats: [
      { value: '100%', label: 'Handcrafted by Artisans' },
      { value: '0%', label: 'Synthetic Adhesives' },
      { value: '4.8k+', label: 'Stitches per Botanical Set' },
      { value: '∞', label: 'Enduring Tactile Lifetime' }
    ]
  },
  footer: {
    statementLine1: 'Made by hand.',
    statementLine2: 'Reimagined digitally.',
    subtext: 'A permanent digital exhibition of handcrafted textile sculptures, botanicals, and wearable adornments.',
    instagramUrl: 'https://www.instagram.com/kurush.yarn',
    instagramHandle: '@kurush.yarn',
    whatsappNumber: '+918796645605',
    whatsappDisplay: '+91 87966 45605'
  }
};
