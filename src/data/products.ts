import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'product-01',
    slug: 'oreo-biscuit-keychain',
    number: '01',
    name: 'Oreo Biscuit Keychain',
    subtitle: 'Handmade Crochet Confectionery Key Adornment',
    category: 'charm',
    categoryLabel: 'Keychain',
    tagline: 'A cute handmade crochet Oreo biscuit keychain, perfect for adding a playful touch to your keys, bags, or backpacks.',
    description:
      'A cute handmade crochet Oreo biscuit keychain, perfect for adding a playful touch to your keys, bags, or backpacks. Handcrafted using dense spiral single-crochet discs in deep cocoa yarn with a fluffy white cream center and reinforced silver keyring hardware.',
    material: '100% Mercerized Combed Cotton & Alloy Keyring',
    palette: ['#392220', '#FBF8F8', '#8A5A54'],
    dimensions: 'Ø 6.0 cm',
    weight: '13 g',
    stitchCount: '300 hand stitches',
    craftTime: '1.5 hours per piece',
    originalImage: '/images/products/product-01/hero.jpg',
    heroImage: '/images/products/product-01/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-01/hero.jpg',
        alt: 'Handmade crochet Oreo Biscuit Keychain'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/product-01/angled.jpg',
        alt: 'Handmade crochet Oreo Biscuit Keychain'
      },
      {
        type: 'side',
        label: '03',
        src: '/images/products/product-01/side.jpg',
        alt: 'Handmade crochet Oreo Biscuit Keychain'
      }],
    details: {
      dimensions: 'Diameter: 6.0 cm | Thickness: ~2.5 cm | Weight: 13 g',
      process: 'Hand-crocheted spiral circle technique with 300 individual stitches, stuffed with hypoallergenic organic cotton and securely joined with reinforced split keyring.',
      story:
        'A delightful, nostalgic handmade accessory. Designed to bring whimsical charm to daily essentials, handbags, backpacks, and keys with an ultra-light 13g weight.',
      fiberOrigin: '100% hypoallergenic organic combed cotton yarn from ethical mills.',
      careInstructions: 'Spot clean gently with a damp muslin cloth and mild detergent. Air dry flat in shade.',
      hardware: 'Brushed solid nickel-free alloy split keyring with sturdy link chain'
    },
    price: '₹119',
    edition: 'Atelier Open Edition'
  },
  {
    id: 'product-02',
    slug: 'sunflower-keychain',
    number: '02',
    name: 'Sunflower Keychain',
    subtitle: 'Handmade Crochet Sunflower Key Adornment',
    category: 'charm',
    categoryLabel: 'Keychain',
    tagline: 'A cheerful handmade crochet sunflower keychain, perfect for decorating your keys, bags, or backpacks.',
    description:
      'A cheerful handmade crochet sunflower keychain, perfect for decorating your keys, bags, or backpacks.',
    material: '100% Mercerized Combed Cotton Yarn & Silver Alloy Keyring',
    palette: ['#E6A117', '#392220', '#2E4A28'],
    dimensions: 'Ø 6.0 cm',
    weight: '10 g',
    stitchCount: '620 hand stitches',
    craftTime: '1.0 hour per piece',
    originalImage: '/images/products/product-02/hero.jpg',
    heroImage: '/images/products/product-02/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-02/hero.jpg',
        alt: 'Handmade crochet Sunflower Keychain'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/product-02/top.jpg',
        alt: 'Handmade crochet Sunflower Keychain top view'
      },
      {
        type: 'side',
        label: '03',
        src: '/images/products/product-02/side.jpg',
        alt: 'Handmade crochet Sunflower Keychain side view'
      },
      {
        type: 'detail',
        label: '04',
        src: '/images/products/product-02/bottom.jpg',
        alt: 'Handmade crochet Sunflower Keychain bottom view'
      }],
    details: {
      dimensions: 'Diameter: 6.0 cm | Thickness: ~1.8 cm | Weight: 10 g',
      process: 'Hand-crocheted spiral center disc with 620 individual stitches, encircled with vibrant yellow pointed petals and joined with a reinforced silver keyring.',
      story:
        'A cheerful handmade crochet sunflower keychain, perfect for decorating your keys, bags, or backpacks with radiant handmade warmth.',
      fiberOrigin: '100% hypoallergenic organic combed cotton yarn in botanical yellow, rich chocolate brown, and forest green.',
      careInstructions: 'Spot clean gently with a damp cloth and mild soap. Air dry flat in shade.',
      hardware: 'Polished silver nickel-free alloy split keyring with reinforced link chain'
    },
    price: '₹119',
    edition: 'Atelier Open Edition'
  },
  {
    id: 'product-03-pink',
    slug: 'pink-tulip-flower-bulb',
    number: '03',
    name: 'Pink Tulip Flower Bulb',
    subtitle: 'Blossom Pink Handcrafted Bulb',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A handmade crochet pink tulip flower bulb, carefully crafted in soft petal pink cotton.',
    description:
      'A handmade crochet pink tulip flower bulb in blossom pink yarn with neat green stem and sculpted leaf.',
    material: '100% Fine Combed Cotton Yarn & Organic Fill',
    palette: ['#F194B8', '#387332'],
    colors: ['#F194B8'],
    dimensions: '25 cm',
    weight: '17 g',
    stitchCount: '1,200 hand stitches',
    craftTime: '2.0 hours per piece',
    originalImage: '/images/products/product-03/pink_front.jpg',
    heroImage: '/images/products/product-03/pink_front.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-03/pink_front.jpg',
        alt: 'Handmade crochet Pink Tulip Flower Bulb'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/product-03/pink_angled.jpg',
        alt: 'Handmade crochet Pink Tulip Flower Bulb angled view'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/product-03/pink_grown.jpg',
        alt: 'Handmade crochet Pink Tulip Flower Bulb with blooming stem'
      }],
    details: {
      dimensions: 'Length: 25 cm | Weight: 17 g',
      process: 'Handmade crochet tulip flower bulb crafted with 1,200 individual stitches in blossom pink cotton.',
      story: 'Crafted to capture the gentle optimism of springtime blossom pink, adding soft pastel serenity to any interior space.',
      fiberOrigin: '100% fine combed cotton yarn.',
      careInstructions: 'Gently dust with a soft brush or dry cloth. Store in a dry place.'
    },
    price: '₹149',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-03-peach',
    slug: 'peach-tulip-flower-bulb',
    number: '04',
    name: 'Peach Tulip Flower Bulb',
    subtitle: 'Pastel Peach Handcrafted Bulb',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A handmade crochet peach tulip flower bulb in soft pastel peach-orange yarn with green stem.',
    description:
      'A handmade crochet peach tulip flower bulb, carefully crafted in delicate peach yarn with neat green foliage.',
    material: '100% Fine Combed Cotton Yarn & Organic Fill',
    palette: ['#F4A582', '#387332'],
    colors: ['#F4A582'],
    dimensions: '25 cm',
    weight: '17 g',
    stitchCount: '1,200 hand stitches',
    craftTime: '2.0 hours per piece',
    originalImage: '/images/products/product-03/peach_front.jpg',
    heroImage: '/images/products/product-03/peach_front.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-03/peach_front.jpg',
        alt: 'Handmade crochet Peach Tulip Flower Bulb'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/product-03/peach_angled.jpg',
        alt: 'Handmade crochet Peach Tulip Flower Bulb angled view'
      }],
    details: {
      dimensions: 'Length: 25 cm | Weight: 17 g',
      process: 'Handmade crochet tulip flower bulb crafted with 1,200 individual stitches in warm peach cotton.',
      story: 'Radiating soft, sunny warmth with delicate peach tones and subtle botanical realism.',
      fiberOrigin: '100% fine combed cotton yarn.',
      careInstructions: 'Gently dust with a soft brush or dry cloth. Store in a dry place.'
    },
    price: '₹149',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-04',
    slug: 'bloomed-tulip-flower',
    number: '05',
    name: 'Bloomed Tulip Flower',
    subtitle: 'Handmade Crochet Bloomed Tulip Flower',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A handmade crochet bloomed tulip flower, carefully crafted to showcase graceful open petals in rich artisan hues.',
    description:
      'A handmade crochet bloomed tulip flower, carefully crafted to showcase graceful open petals in rich artisan hues. Supported by a flexible green stem wrapped in neat cotton yarn with botanical foliage, offering everlasting beauty without fading.',
    material: '100% Fine Combed Cotton Yarn & Flexible Wire Core',
    palette: ['#3B6EB5', '#D62D74', '#7A4B96', '#7BAFE0'],
    colors: ['#3B6EB5', '#D62D74', '#7A4B96', '#7BAFE0'],
    dimensions: '28 cm',
    weight: '22 g',
    stitchCount: '1,450 hand stitches',
    craftTime: '3.0 hours per piece',
    originalImage: '/images/products/bloomed-tulip/deep_pink_hero.jpg',
    heroImage: '/images/products/bloomed-tulip/deep_pink_hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/bloomed-tulip/deep_pink_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Deep Pink'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/bloomed-tulip/deep_pink_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Deep Pink Angled'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/bloomed-tulip/blue_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Blue'
      },
      {
        type: 'detail',
        label: '04',
        src: '/images/products/bloomed-tulip/blue_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Blue Angled'
      },
      {
        type: 'detail',
        label: '05',
        src: '/images/products/bloomed-tulip/purple_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Purple'
      },
      {
        type: 'detail',
        label: '06',
        src: '/images/products/bloomed-tulip/purple_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Purple Angled'
      },
      {
        type: 'detail',
        label: '07',
        src: '/images/products/bloomed-tulip/sky_blue_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Sky Blue'
      },
      {
        type: 'detail',
        label: '08',
        src: '/images/products/bloomed-tulip/sky_blue_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower - Sky Blue Angled'
      }],
    variants: [
      {
        name: 'Blue',
        images: [
          '/images/products/bloomed-tulip/blue_hero.jpg',
          '/images/products/bloomed-tulip/blue_angle.jpg'
        ]
      },
      {
        name: 'Deep Pink',
        images: [
          '/images/products/bloomed-tulip/deep_pink_hero.jpg',
          '/images/products/bloomed-tulip/deep_pink_angle.jpg'
        ]
      },
      {
        name: 'Purple',
        images: [
          '/images/products/bloomed-tulip/purple_hero.jpg',
          '/images/products/bloomed-tulip/purple_angle.jpg'
        ]
      },
      {
        name: 'Sky Blue',
        images: [
          '/images/products/bloomed-tulip/sky_blue_hero.jpg',
          '/images/products/bloomed-tulip/sky_blue_angle.jpg'
        ]
      }
    ],
    details: {
      dimensions: 'Length: 28 cm | Flower Head: 8.5 cm × 7.0 cm | Weight: 22 g',
      process: 'Hand-crocheted open petal fluting with 1,450 individual stitches, hypoallergenic organic fill, and bendable wire-reinforced botanical stem.',
      story:
        'A handmade crochet bloomed tulip flower, carefully crafted to capture the fleeting wonder of a full spring bloom in everlasting fiber art. Designed to bring vibrant botanical warmth to desks, bedside tables, and ceramic vases.',
      fiberOrigin: '100% fine combed cotton yarn in royal blue, deep pink, violet purple, and pastel sky blue tones.',
      careInstructions: 'Gently dust with a soft dry cloth or cool blow dryer. Stems are bendable to fit various vases.'
    },
    price: '₹179',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-05',
    slug: 'bloomed-tulip-blue',
    number: '06',
    name: 'Bloomed Tulip - Blue',
    subtitle: 'Royal Blue Open Blossom',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A vibrant royal blue handmade crochet bloomed tulip flower on bendable green stem.',
    description:
      'A vibrant royal blue handmade crochet bloomed tulip flower on a flexible wire-reinforced green stem with sculpted foliage.',
    material: '100% Fine Combed Cotton Yarn & Wire Core',
    palette: ['#3B6EB5', '#2E4A28'],
    colors: ['#3B6EB5'],
    dimensions: '28 cm',
    weight: '22 g',
    stitchCount: '1,450 hand stitches',
    craftTime: '3.0 hours per piece',
    originalImage: '/images/products/bloomed-tulip/blue_hero.jpg',
    heroImage: '/images/products/bloomed-tulip/blue_hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/bloomed-tulip/blue_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower in Blue'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/bloomed-tulip/blue_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower Blue angled view'
      }],
    details: {
      dimensions: 'Length: 28 cm | Weight: 22 g',
      process: 'Hand-crocheted open petal structure with 1,450 individual stitches in saturated royal blue cotton.',
      story: 'A calming, rich blue bloomed tulip handcrafted to bring serenity and botanical color to any corner of your home.',
      fiberOrigin: '100% fine combed cotton yarn.',
      careInstructions: 'Gently dust with a soft brush. Keep in dry interior spaces.'
    },
    price: '₹179',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-06',
    slug: 'bloomed-tulip-deep-pink',
    number: '07',
    name: 'Bloomed Tulip - Deep Pink',
    subtitle: 'Rich Magenta Blossom',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A striking deep pink handmade crochet bloomed tulip flower with lush green foliage.',
    description:
      'A striking deep pink handmade crochet bloomed tulip flower crafted with vivid magenta-rose yarn and slender bendable stem.',
    material: '100% Fine Combed Cotton Yarn & Wire Core',
    palette: ['#D62D74', '#2E4A28'],
    colors: ['#D62D74'],
    dimensions: '28 cm',
    weight: '22 g',
    stitchCount: '1,450 hand stitches',
    craftTime: '3.0 hours per piece',
    originalImage: '/images/products/bloomed-tulip/deep_pink_hero.jpg',
    heroImage: '/images/products/bloomed-tulip/deep_pink_hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/bloomed-tulip/deep_pink_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower in Deep Pink'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/bloomed-tulip/deep_pink_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower Deep Pink angled view'
      }],
    details: {
      dimensions: 'Length: 28 cm | Weight: 22 g',
      process: 'Hand-crocheted open petal contouring with rich magenta yarn loops and neat stem wrapping.',
      story: 'Radiating passionate warmth and playful vibrancy, this deep pink tulip never wilts or fades.',
      fiberOrigin: '100% combed cotton yarn with rich dye saturation.',
      careInstructions: 'Spot clean or dry dust. Avoid wet washing.'
    },
    price: '₹179',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-07',
    slug: 'bloomed-tulip-purple',
    number: '08',
    name: 'Bloomed Tulip - Purple',
    subtitle: 'Violet Bloom & Emerald Stem',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'An elegant purple handmade crochet bloomed tulip flower with fluted petal curves.',
    description:
      'An elegant violet-purple handmade crochet bloomed tulip flower crafted with delicate precision and bendable stem.',
    material: '100% Fine Combed Cotton Yarn & Wire Core',
    palette: ['#7A4B96', '#2E4A28'],
    colors: ['#7A4B96'],
    dimensions: '28 cm',
    weight: '22 g',
    stitchCount: '1,450 hand stitches',
    craftTime: '3.0 hours per piece',
    originalImage: '/images/products/bloomed-tulip/purple_hero.jpg',
    heroImage: '/images/products/bloomed-tulip/purple_hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/bloomed-tulip/purple_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower in Purple'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/bloomed-tulip/purple_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower Purple angled view'
      }],
    details: {
      dimensions: 'Length: 28 cm | Weight: 22 g',
      process: '1,450 hand stitches creating refined spherical-to-fluted petal geometry in violet cotton.',
      story: 'A serene and regal touch of nature, crafted for minimalists and floral enthusiasts alike.',
      fiberOrigin: '100% fine combed cotton yarn.',
      careInstructions: 'Dust with a soft brush. Keep away from water.'
    },
    price: '₹179',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-08',
    slug: 'bloomed-tulip-sky-blue',
    number: '09',
    name: 'Bloomed Tulip - Sky Blue',
    subtitle: 'Pastel Sky Blue Bloom',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A gentle pastel sky blue handmade crochet bloomed tulip flower with fresh spring charm.',
    description:
      'A gentle pastel sky blue handmade crochet bloomed tulip flower with graceful open petal contour and flexible stem.',
    material: '100% Fine Combed Cotton Yarn & Wire Core',
    palette: ['#7BAFE0', '#2E4A28'],
    colors: ['#7BAFE0'],
    dimensions: '28 cm',
    weight: '22 g',
    stitchCount: '1,450 hand stitches',
    craftTime: '3.0 hours per piece',
    originalImage: '/images/products/bloomed-tulip/sky_blue_hero.jpg',
    heroImage: '/images/products/bloomed-tulip/sky_blue_hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/bloomed-tulip/sky_blue_hero.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower in Sky Blue'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/bloomed-tulip/sky_blue_angle.jpg',
        alt: 'Handmade crochet Bloomed Tulip Flower Sky Blue angled view'
      }],
    details: {
      dimensions: 'Length: 28 cm | Weight: 22 g',
      process: 'Hand-crocheted open petal structure in soft baby sky blue cotton with organic fill.',
      story: 'Evoking crisp morning skies and spring breezes, bringing an airy lightness to interior spaces.',
      fiberOrigin: '100% fine combed cotton yarn.',
      careInstructions: 'Gently dust with a dry cloth. Bend stem gently to fit vases.'
    },
    price: '₹179',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-09',
    slug: 'meadow-daisy-flower-stem',
    number: '10',
    name: 'Meadow Daisy Stem',
    subtitle: 'Ivory & Chamomile Sculptural Bloom',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'Pure white fluted petals framing a dense textured yellow pollen dome with green stem and leaf.',
    description:
      'A handmade crochet daisy flower stem featuring pure white petals, a textured golden-yellow dome floret, and a slender green stem with a delicate leaf.',
    material: '100% Fine Combed Cotton Yarn & Organic Fill',
    palette: ['#FBF8F8', '#EBB02D', '#3B6E32'],
    dimensions: '25 cm',
    weight: '11 g',
    stitchCount: '600 hand stitches',
    craftTime: '1.5 hours per piece',
    originalImage: '/images/products/product-04/front.jpg',
    heroImage: '/images/products/product-04/front.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-04/front.jpg',
        alt: 'Handcrafted Meadow Daisy Stem front view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/product-04/angled.jpg',
        alt: 'Handcrafted Meadow Daisy Stem three-quarter angled view'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/product-04/macro.jpg',
        alt: 'Close-up macro detail of yellow daisy center and white petals'
      }],
    details: {
      dimensions: 'Length: 25 cm | Weight: 11 g',
      process: 'Hand-crocheted daisy flower stem crafted with 600 precision stitches and delicate leaf armature.',
      story:
        'Inspired by fresh morning meadows and wild daisies. Features an enduring hand-crocheted bloom that adds permanent cheer to any table, vase, or workspace.',
      fiberOrigin: '100% fine combed cotton yarn in chamomile yellow, milk white, and meadow green.',
      careInstructions: 'Keep in dry interior environments. Gently dust with a soft dry cloth.'
    },
    price: '₹139',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-10',
    slug: 'papillon-magenta-hair-bows',
    number: '11',
    name: 'Papillon Hair Adornments (Set of 2)',
    subtitle: 'Sculpted Magenta Butterfly Clips',
    category: 'wearable',
    categoryLabel: 'Wearable Accent',
    tagline: 'Vibrant hot-pink sculptural butterflies adding kinetic textile charm to hairstyles.',
    description:
      'A matching pair of handcrafted butterfly bow adornments crocheted in radiant magenta wool. Mounted on salon-grade alligator clips with non-slip silicone pads to hold securely in fine or thick hair.',
    material: 'Vibrant Magenta Mercerized Wool & Alloy Clips',
    palette: ['#E30B67', '#A20546', '#F5EFF1'],
    dimensions: 'W 6.8 cm × H 5.2 cm (each)',
    weight: '18 g (pair)',
    stitchCount: '340 hand stitches per bow',
    craftTime: '3.5 hours for the pair',
    originalImage: '/images/products/product-06/hero.jpg',
    heroImage: '/images/products/product-06/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-06/hero.jpg',
        alt: 'Pair of handcrafted magenta butterfly hair bows'
      }],
    details: {
      dimensions: 'Width: 68mm | Height: 52mm | Clip Length: 45mm',
      process: 'Symmetrical two-wing crochet with center yarn-wrap cinch and reinforced back base.',
      story:
        'Designed as wearable micro-sculptures. The wings possess slight natural elasticity, mimicking fluttering movement as you walk.',
      fiberOrigin: 'Australian fine merino wool blended with silk sheen thread.',
      careInstructions: 'Spot clean only. Store in protective cotton dust pouch when travelling.'
    },
    price: '₹99 (Pair)',
    edition: 'Atelier Wearable Series'
  },
  {
    id: 'product-11',
    slug: 'lily-flower-pot',
    number: '12',
    name: 'Lily Flower Pot',
    subtitle: 'Handcrafted Blooming Lily in Woven Pot',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A self-standing handmade crochet lily flower in a charming woven pot.',
    description:
      'A handmade crochet lily flower pot featuring blooming lilies with delicate stamen, vibrant green leaves, and a textured crochet pot base.',
    material: '100% Fine Combed Cotton Yarn & Organic Fill',
    palette: ['#F37A68', '#427A3A', '#B57C4F', '#392220'],
    dimensions: '20 cm',
    weight: '50 g',
    stitchCount: '1,800 hand stitches',
    craftTime: '4.0 hours per piece',
    originalImage: '/images/products/product-07/hero.jpg',
    heroImage: '/images/products/product-07/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-07/front.jpg',
        alt: 'Handmade crochet Lily Flower Pot front view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/product-07/angled.jpg',
        alt: 'Handmade crochet Lily Flower Pot angled perspective'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/product-07/top.jpg',
        alt: 'Handmade crochet Lily Flower Pot top overhead view'
      },
      {
        type: 'detail',
        label: '04',
        src: '/images/products/product-07/lifestyle.jpg',
        alt: 'Handmade crochet Lily Flower Pot styled on wooden desk decor placement'
      }],
    details: {
      dimensions: 'Height: 20 cm | Weight: 50 g',
      process: 'Hand-crocheted blooming lily flowers with 1,800 precision stitches, soft organic fill, and woven pot base.',
      story:
        'Crafted to bring everlasting botanical charm and warmth to desks, shelves, and bedside tables with delicate floral realism.',
      fiberOrigin: '100% fine combed cotton yarn and natural fibers.',
      careInstructions: 'Keep in dry interior spaces. Gently dust with a soft dry cloth.'
    },
    price: '₹349',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-12',
    slug: 'jasmine-hair-ornament',
    number: '13',
    name: 'Jasmine Hair Ornament',
    subtitle: 'Handmade Crochet Jasmine Floral Hair Adornment (Gajra / Veni)',
    category: 'wearable',
    categoryLabel: 'Hair Accessories',
    tagline: 'A delicate handmade crochet jasmine hair ornament, perfect for adding an elegant floral touch to traditional, festive, or everyday hairstyles.',
    description:
      'A delicate handmade crochet jasmine hair ornament, perfect for adding an elegant floral touch to traditional, festive, or everyday hairstyles.',
    material: '100% Fine Combed Mercerized Cotton Yarn',
    palette: ['#FFFFFF', '#4A7C36', '#FAF6F0'],
    colors: [],
    variants: [],
    dimensions: '30 cm',
    weight: '20 g',
    stitchCount: '1,500 hand stitches',
    craftTime: '4.0 hours per piece',
    originalImage: '/images/products/product-08/hero.jpg',
    heroImage: '/images/products/product-08/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/product-08/front.jpg',
        alt: 'Handmade crochet Jasmine Hair Ornament S-curve layout'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/product-08/coiled.jpg',
        alt: 'Handmade crochet Jasmine Hair Ornament coiled garland ring'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/product-08/lifestyle.jpg',
        alt: 'Handmade crochet Jasmine Hair Ornament styled on elegant hair bun preview'
      },
      {
        type: 'detail',
        label: '04',
        src: '/images/products/product-08/detail.jpg',
        alt: 'Macro stitch texture of delicate white crochet jasmine petals and green calyx'
      }],
    details: {
      dimensions: 'Length: 30 cm | Weight: 20 g',
      process: 'Hand-crocheted clusters of 1,500 delicate jasmine flower stitches interwoven on a flexible green yarn foundation cord.',
      story:
        'Inspired by traditional Indian fresh flower gajras and venis, this everlasting crochet hair ornament adds subtle elegance, festive beauty, and timeless floral charm to buns, braids, and open hairstyles without withering.',
      fiberOrigin: '100% hypoallergenic organic combed cotton yarn from ethical mills.',
      careInstructions: 'Store flat or gently coiled in a dry box. Spot clean gently with a soft dry or slightly damp cloth.'
    },
    price: '₹349',
    edition: 'Atelier Wearable Collection'
  },
  {
    id: 'product-14',
    slug: 'tulip-headband-yellow',
    number: '14',
    name: 'Tulip Headband - Yellow',
    subtitle: 'Sunny Yellow Row Tulip Crochet Headband',
    category: 'wearable',
    categoryLabel: 'Hair Accessories',
    tagline: 'A handcrafted white band featuring a continuous row of sunny yellow pop-up tulip buds and floral tassel ties.',
    description:
      'A radiant handmade white crochet headband featuring a continuous row of small, bright sunny yellow pop-up tulip buds aligned along emerald green leafy stitches, finished with flexible braided tie strings and delicate flower tassels.',
    material: '100% Fine Combed Cotton Yarn & Braided Tie Strings',
    palette: ['#E6A117', '#4A7C36', '#FAF6F0'],
    colors: ['#E6A117'],
    dimensions: 'Band Length: 28 cm (+ adjustable ties)',
    weight: '9 g',
    stitchCount: '650 hand stitches',
    craftTime: '1.2 hours per piece',
    originalImage: '/images/products/tulip-headband/yellow_hero.jpg',
    heroImage: '/images/products/tulip-headband/yellow_hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/tulip-headband/yellow_hero.jpg',
        alt: 'Handmade crochet Yellow Tulip Headband with aligned tulip row and floral ties'
      }],
    details: {
      dimensions: 'Band Length: 28 cm | Tie Length: 25 cm (each side) | Width: 2.8 cm | Weight: 9 g',
      process: 'Hand-crocheted white cotton base band with a continuous row of sculpted yellow pop-up tulip blossoms, leafy green base stitches, and dual flower tassel braided tie cords.',
      story: 'Crafted with a cheerful row of small golden-yellow tulips that bring warm sunny radiance and botanical charm to any hairstyle.',
      fiberOrigin: '100% fine combed cotton yarn in sunny marigold yellow, emerald green, and crisp white.',
      careInstructions: 'Spot clean gently with a soft dry or slightly damp cloth. Air dry flat.'
    },
    price: '₹149',
    edition: 'Atelier Wearable Collection'
  },
  {
    id: 'product-15',
    slug: 'tulip-headband-pink',
    number: '15',
    name: 'Tulip Headband - Pink',
    subtitle: 'Vibrant Pink Row Tulip Crochet Headband',
    category: 'wearable',
    categoryLabel: 'Hair Accessories',
    tagline: 'A handcrafted white band featuring a continuous row of bright pink pop-up tulip buds and floral tassel ties.',
    description:
      'A charming handmade white crochet headband featuring a continuous row of small, vivid pink pop-up tulip buds aligned along emerald green leafy stitches, finished with flexible braided tie strings and delicate flower tassels.',
    material: '100% Fine Combed Cotton Yarn & Braided Tie Strings',
    palette: ['#E85D75', '#4A7C36', '#FAF6F0'],
    colors: ['#E85D75'],
    dimensions: 'Band Length: 28 cm (+ adjustable ties)',
    weight: '9 g',
    stitchCount: '650 hand stitches',
    craftTime: '1.2 hours per piece',
    originalImage: '/images/products/tulip-headband/pink_hero.jpg',
    heroImage: '/images/products/tulip-headband/pink_hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/tulip-headband/pink_hero.jpg',
        alt: 'Handmade crochet Pink Tulip Row Headband full view with flower ties'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/tulip-headband/pink_close.jpg',
        alt: 'Close-up row of small crochet pink tulip buds and green leaves'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/tulip-headband/pink_preview.jpg',
        alt: 'Handmade crochet Pink Tulip Headband styled preview'
      }],
    details: {
      dimensions: 'Band Length: 28 cm | Tie Length: 25 cm each | Weight: 9 g',
      process: 'Hand-crocheted white base band with a continuous row of raised puff-stitch pink tulips, green leafy bases, and dual flower-tipped tie cords.',
      story: 'Designed with a playful row of blooming miniature tulips that bring cheerful spring vitality and delicate floral charm to any hairstyle.',
      fiberOrigin: '100% fine combed cotton yarn in rose blossom pink, emerald green, and natural ivory.',
      careInstructions: 'Spot clean gently with mild detergent. Air dry flat.'
    },
    price: '₹149',
    edition: 'Atelier Wearable Collection'
  },
  {
    id: 'product-16',
    slug: 'tulip-headband-light-pink',
    number: '16',
    name: 'Tulip Headband - Light Pink',
    subtitle: 'Pastel Baby Pink Row Tulip Crochet Headband',
    category: 'wearable',
    categoryLabel: 'Hair Accessories',
    tagline: 'A handcrafted white band featuring a continuous row of delicate light baby pink pop-up tulip buds and floral tassel ties.',
    description:
      'A dreamy handmade white crochet headband featuring a dense, neat row of small pastel baby pink pop-up tulip buds bordered by emerald green leaf stitches, finished with flexible braided tie cords and miniature flower tassels.',
    material: '100% Fine Combed Cotton Yarn & Braided Tie Strings',
    palette: ['#F5A9B8', '#4A7C36', '#FAF6F0'],
    colors: ['#F5A9B8'],
    dimensions: 'Band Length: 28 cm (+ adjustable ties)',
    weight: '9 g',
    stitchCount: '650 hand stitches',
    craftTime: '1.2 hours per piece',
    originalImage: '/images/products/tulip-headband/ltpink_hero.jpg',
    heroImage: '/images/products/tulip-headband/ltpink_hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/tulip-headband/ltpink_hero.jpg',
        alt: 'Handmade crochet Light Pink Tulip Row Headband full view with flower ties'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/tulip-headband/ltpink_close.jpg',
        alt: 'Close-up row of small crochet light pink tulip buds and green leaves'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/tulip-headband/ltpink_preview.jpg',
        alt: 'Handmade crochet Light Pink Tulip Headband styled preview'
      }],
    details: {
      dimensions: 'Band Length: 28 cm | Tie Length: 25 cm each | Weight: 9 g',
      process: 'Hand-crocheted white base band featuring a continuous linear row of raised puff-stitch baby pink tulips, emerald green leaf bases, and dual flower-tipped tie cords.',
      story: 'Crafted with a row of delicate miniature baby pink tulips that evoke soft morning blossoms, lending a gentle romantic accent to any hairstyle.',
      fiberOrigin: '100% fine combed cotton yarn in pastel baby pink, emerald green, and natural ivory.',
      careInstructions: 'Spot clean gently with a damp muslin cloth. Air dry flat.'
    },
    price: '₹149',
    edition: 'Atelier Wearable Collection'
  },
  {
    id: 'product-17',
    slug: 'cat-paw-keychain',
    number: '17',
    name: 'Cat Paw Keychain',
    subtitle: 'Handmade Crochet Cat Paw Key Adornment',
    category: 'charm',
    categoryLabel: 'Keychain',
    tagline: 'A cute handmade crochet cat paw keychain, perfect for cat lovers and a fun addition to your everyday accessories.',
    description:
      'A cute handmade crochet cat paw keychain, perfect for cat lovers and a fun addition to your everyday accessories. Handcrafted with soft hypoallergenic cotton yarn featuring plush 3D pink paw pads and durable silver alloy keyring.',
    material: '100% Fine Combed Cotton Yarn & Silver Alloy Keyring',
    palette: ['#F7A8B8', '#FBF8F8', '#8E8E93', '#392220'],
    dimensions: '6.5cm x 7.5cm',
    weight: '15 g',
    stitchCount: '370 hand stitches',
    craftTime: '2.0 hours per piece',
    originalImage: '/images/products/cat-paw/hero.jpg',
    heroImage: '/images/products/cat-paw/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/cat-paw/top.jpg',
        alt: 'Handmade crochet Cat Paw Keychain top view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/cat-paw/bottom.jpg',
        alt: 'Handmade crochet Cat Paw Keychain bottom view'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/cat-paw/lifestyle.jpg',
        alt: 'Handmade crochet Cat Paw Keychain on backpack zipper preview'
      }],
    details: {
      dimensions: 'Width: 6.5 cm | Height: 7.5 cm | Weight: 15 g',
      process: 'Hand-crocheted 3D sculpted paw shape with 370 individual stitches, dimensional pink toe pads, and reinforced silver alloy split keyring.',
      story:
        'A playful and endearing handmade accessory for cat enthusiasts, bringing soft tactile comfort and whimsy to bags, keys, and backpacks.',
      fiberOrigin: '100% hypoallergenic organic combed cotton yarn in cloud white, gentle grey, and petal pink.',
      careInstructions: 'Spot clean gently with a damp cloth and mild soap. Air dry flat away from direct heat.',
      hardware: 'Polished silver nickel-free alloy split keyring with sturdy link chain'
    },
    price: '₹139',
    edition: 'Atelier Open Edition'
  },
  {
    id: 'product-18',
    slug: 'puppy-paw-keychain',
    number: '18',
    name: 'Puppy Paw Keychain',
    subtitle: 'Handmade Crochet Puppy Paw Key Adornment',
    category: 'charm',
    categoryLabel: 'Keychain',
    tagline: 'A cute handmade crochet puppy paw keychain, perfect for dog lovers and adding a playful touch to your everyday accessories.',
    description:
      'A cute handmade crochet puppy paw keychain, perfect for dog lovers and adding a playful touch to your everyday accessories. Handcrafted with warm cream and rich brown cotton yarn with raised toe pads and sturdy silver hardware.',
    material: '100% Fine Combed Cotton Yarn & Silver Alloy Keyring',
    palette: ['#D4A373', '#5E3023', '#FBF8F8', '#392220'],
    dimensions: '6.5cm x 7.5cm',
    weight: '15 g',
    stitchCount: '370 hand stitches',
    craftTime: '2.0 hours per piece',
    originalImage: '/images/products/puppy-paw/hero.jpg',
    heroImage: '/images/products/puppy-paw/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'side',
        label: '01',
        src: '/images/products/puppy-paw/side.jpg',
        alt: 'Handmade crochet Puppy Paw Keychain side view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/puppy-paw/bottom.jpg',
        alt: 'Handmade crochet Puppy Paw Keychain bottom view'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/puppy-paw/lifestyle.jpg',
        alt: 'Handmade crochet Puppy Paw Keychain styled with keys preview'
      }],
    details: {
      dimensions: 'Width: 6.5 cm | Height: 7.5 cm | Weight: 15 g',
      process: 'Hand-crocheted dimensional puppy paw structure with 370 precision stitches, chocolate brown pad insets, and reinforced link chain.',
      story:
        'Designed for dog lovers who appreciate handmade warmth. Perfectly weighted and ultra-soft to keep with daily essentials.',
      fiberOrigin: '100% fine combed cotton yarn in biscuit cream and earthy chocolate brown.',
      careInstructions: 'Spot clean gently with a damp muslin cloth. Air dry flat.',
      hardware: 'Polished silver nickel-free alloy split keyring with sturdy link chain'
    },
    price: '₹139',
    edition: 'Atelier Open Edition'
  },
  {
    id: 'product-19',
    slug: 'daisy-flower-keychain',
    number: '19',
    name: 'Daisy Flower Keychain',
    subtitle: 'Handmade Crochet Daisy Blossom Key Adornment',
    category: 'charm',
    categoryLabel: 'Keychain',
    tagline: 'A cheerful handmade crochet daisy flower keychain, perfect for adding a bright floral touch to your everyday accessories.',
    description:
      'A cheerful handmade crochet daisy flower keychain, perfect for adding a bright floral touch to your everyday accessories. Handcrafted with pristine white cotton petals around a sunny yellow pollen floret and botanical leaf.',
    material: '100% Fine Combed Cotton Yarn & Silver Alloy Keyring',
    palette: ['#FFFFFF', '#EBB02D', '#3B6E32', '#FAF6F0'],
    dimensions: '6.5cm x 6.5cm',
    weight: '14 g',
    stitchCount: '370 hand stitches',
    craftTime: '2.0 hours per piece',
    originalImage: '/images/products/daisy-keychain/hero.jpg',
    heroImage: '/images/products/daisy-keychain/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/daisy-keychain/top.jpg',
        alt: 'Handmade crochet Daisy Flower Keychain top view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/daisy-keychain/bottom.jpg',
        alt: 'Handmade crochet Daisy Flower Keychain bottom view'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/daisy-keychain/lifestyle.jpg',
        alt: 'Handmade crochet Daisy Flower Keychain clipped on tote bag preview'
      }],
    details: {
      dimensions: 'Diameter: 6.5 cm | Weight: 14 g',
      process: 'Hand-crocheted radiating white petals around a domed yellow center floret with 370 stitches and leaf attachment.',
      story:
        'A pocket-sized ray of sunshine. The daisy keychain carries carefree botanical optimism wherever your journeys take you.',
      fiberOrigin: '100% hypoallergenic organic combed cotton yarn in ivory white, chamomile yellow, and leaf green.',
      careInstructions: 'Spot clean with a damp cloth and mild soap. Air dry in shade.',
      hardware: 'Polished silver nickel-free alloy split keyring with sturdy link chain'
    },
    price: '₹139',
    edition: 'Atelier Open Edition'
  },
  {
    id: 'product-20',
    slug: 'blue-butterfly-hair-bow-clip',
    number: '20',
    name: 'Blue Butterfly Hair Bow Clip',
    subtitle: 'Handmade Pastel Blue Butterfly Hair Clip',
    category: 'wearable',
    categoryLabel: 'Hair Accessories',
    tagline: 'A delicate handmade crochet blue butterfly hair bow clip, perfect for adding a whimsical aesthetic to any hairstyle.',
    description:
      'A delicate handmade crochet blue butterfly hair bow clip, crafted with layered pastel blue wings and fine stitchwork on a secure alligator clip.',
    material: '100% Fine Combed Cotton Yarn & Nickel-Free Alligator Hair Clip',
    palette: ['#8ECAE6', '#219EBC', '#FFFFFF', '#FAF6F0'],
    colors: ['#8ECAE6'],
    dimensions: '7cm x 5cm',
    weight: '4 g',
    stitchCount: '400 hand stitches',
    craftTime: '1.0 hour per piece',
    originalImage: '/images/products/blue-butterfly-clip/hero.jpg',
    heroImage: '/images/products/blue-butterfly-clip/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/blue-butterfly-clip/front.jpg',
        alt: 'Handmade crochet Blue Butterfly Hair Bow Clip front view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/blue-butterfly-clip/angle.jpg',
        alt: 'Handmade crochet Blue Butterfly Hair Bow Clip angled detail'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/blue-butterfly-clip/lifestyle.jpg',
        alt: 'Handmade crochet Blue Butterfly Hair Bow Clip styled in hair preview'
      }],
    details: {
      dimensions: '7cm x 5cm | Weight: 4 g',
      process: 'Handcrafted with 400 micro stitches forming sculpted 3D butterfly wings securely mounted on a non-slip alligator clip.',
      story:
        'Inspired by graceful fluttering butterflies, bringing effortless charm and vintage handcrafted warmth to everyday hairstyles.',
      fiberOrigin: '100% fine combed cotton yarn in pastel sky blue and soft ivory.',
      careInstructions: 'Spot clean gently with a damp cloth. Keep dry to preserve clip grip.',
      hardware: 'Polished silver nickel-free alligator hair clip'
    },
    price: '₹119',
    edition: 'Atelier Wearable Collection'
  },
  {
    id: 'product-21',
    slug: 'pink-butterfly-hair-bow-clip',
    number: '21',
    name: 'Pink Butterfly Hair Bow Clip',
    subtitle: 'Handmade Blossom Pink Butterfly Hair Clip',
    category: 'wearable',
    categoryLabel: 'Hair Accessories',
    tagline: 'A lovely handmade crochet pink butterfly hair bow clip, designed to bring a romantic touch to your hair.',
    description:
      'A lovely handmade crochet pink butterfly hair bow clip, crafted with double-layered blush pink wings and delicate stitchwork on a secure alligator clip.',
    material: '100% Fine Combed Cotton Yarn & Nickel-Free Alligator Hair Clip',
    palette: ['#FFB5A7', '#FCD5CE', '#FFFFFF', '#FAF6F0'],
    colors: ['#FFB5A7'],
    dimensions: '7cm x 5cm',
    weight: '4 g',
    stitchCount: '400 hand stitches',
    craftTime: '1.0 hour per piece',
    originalImage: '/images/products/pink-butterfly-clip/hero.jpg',
    heroImage: '/images/products/pink-butterfly-clip/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/pink-butterfly-clip/front.jpg',
        alt: 'Handmade crochet Pink Butterfly Hair Bow Clip front view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/pink-butterfly-clip/angle.jpg',
        alt: 'Handmade crochet Pink Butterfly Hair Bow Clip angled detail'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/pink-butterfly-clip/lifestyle.jpg',
        alt: 'Handmade crochet Pink Butterfly Hair Bow Clip styled in hair preview'
      }],
    details: {
      dimensions: '7cm x 5cm | Weight: 4 g',
      process: 'Handcrafted with 400 micro stitches forming sculpted 3D butterfly wings securely mounted on a non-slip alligator clip.',
      story:
        'Capturing romantic floral springtime vibes, adding a sweet and graceful accent to buns, braids, or loose waves.',
      fiberOrigin: '100% fine combed cotton yarn in blossom pink and tender rose.',
      careInstructions: 'Spot clean gently with a damp cloth. Keep dry to preserve clip grip.',
      hardware: 'Polished silver nickel-free alligator hair clip'
    },
    price: '₹119',
    edition: 'Atelier Wearable Collection'
  },
  {
    id: 'product-22',
    slug: 'rose-flower',
    number: '22',
    name: 'Rose Flower',
    subtitle: 'Handmade Crimson Red Rose Flower',
    category: 'botanical',
    categoryLabel: 'Flowers',
    tagline: 'A beautiful handmade crochet rose flower, perfect for gifting, decoration, and creating everlasting floral arrangements.',
    description:
      'A beautiful handmade crochet rose flower, perfect for gifting, decoration, and creating everlasting floral arrangements.',
    material: '100% Fine Combed Cotton Yarn & Flexible Floral Stem',
    palette: ['#B91C1C', '#15803D', '#166534', '#FAF6F0'],
    colors: ['#B91C1C'],
    dimensions: '25 cm',
    weight: '11 g',
    stitchCount: '600 hand stitches',
    craftTime: '1.5 hours per piece',
    originalImage: '/images/products/rose-flower/hero.jpg',
    heroImage: '/images/products/rose-flower/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: '01',
        src: '/images/products/rose-flower/front.jpg',
        alt: 'Handmade crochet Rose Flower front view'
      },
      {
        type: 'detail',
        label: '02',
        src: '/images/products/rose-flower/top.jpg',
        alt: 'Handmade crochet Rose Flower top view petal detail'
      },
      {
        type: 'detail',
        label: '03',
        src: '/images/products/rose-flower/angle.jpg',
        alt: 'Handmade crochet Rose Flower stem and leaf detail'
      }],
    details: {
      dimensions: 'Length: 25 cm | Weight: 11 g',
      process: 'Handcrafted with 600 individual micro stitches forming sculpted spiral petals and a flexible stem with dual crochet leaves.',
      story:
        'A timeless symbol of love and beauty, hand-crocheted in rich crimson red yarn to bloom forever without wilting.',
      fiberOrigin: '100% fine combed cotton yarn in deep scarlet red and forest green.',
      careInstructions: 'Gently dust with a soft dry cloth. Keep away from excessive moisture to maintain structural form.'
    },
    price: '₹139',
    edition: 'Botanical Heritage Collection'
  }
];
