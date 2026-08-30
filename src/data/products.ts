import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'product-01',
    slug: 'petite-oreo-macaron-charm',
    number: '01',
    name: 'Petite Oreo Macaron Charm',
    subtitle: 'Dual-Tone Confectionery Key Adornment',
    category: 'charm',
    categoryLabel: 'Key Adornment',
    tagline: 'A whimsical sculptural charm balancing rich espresso cocoa stitches with ivory milk cream.',
    description:
      'Handcrafted using dense spiral single-crochet disks in deep cocoa wool yarn, stuffed with hypoallergenic organic cotton and sandwiched around a scalloped vanilla cream filling. Finished with reinforced steel hardware for daily bag attachment.',
    material: '100% Mercerized Combed Cotton & Wool Blend',
    palette: ['#392220', '#FBF8F8', '#8A5A54'],
    dimensions: 'Ø 5.5 cm × H 3.2 cm',
    weight: '38 g',
    stitchCount: '480 hand stitches',
    craftTime: '4.5 hours per piece',
    originalImage: '/images/products/product-01/hero.jpg',
    heroImage: '/images/products/product-01/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: 'Straight-on View',
        src: '/images/products/product-01/hero.jpg',
        alt: 'Front studio perspective of Crocheted Oreo Macaron Charm on white tote',
        description: 'Frontal silhouette highlighting waffle-weave crochet tension and keyring attachment.'
      },
      {
        type: 'angle-right',
        label: 'Side Profile',
        src: '/images/products/product-01/angle-side.jpg',
        alt: 'Side 45-degree angle profile of Oreo Macaron Charm',
        description: 'Reveals the layered cream cushion and dimensional edge stitches.'
      },
      {
        type: 'texture',
        label: 'Yarn Texture Macro',
        src: '/images/brand/yarn_macro.jpg',
        alt: 'Microscopic macro yarn fiber texture',
        description: 'Close-up view of the double-ply twisted cotton fibers and tight crochet loops.'
      }
    ],
    details: {
      dimensions: 'Diameter: 55mm | Thickness: 32mm | Chain drop: 65mm',
      process: 'Continuous spiral crochet method with invisible seam closure and inner tension ring.',
      story:
        'Born from childhood nostalgic confections, this piece translates everyday comfort foods into tactile wool sculpture. Each disc is calibrated for optimal palm ergonomics.',
      fiberOrigin: 'Ethically sourced organic cotton fibers from ethical family-run mills.',
      careInstructions: 'Spot clean gently with damp muslin cloth and mild wool detergent. Air dry flat in shade.',
      hardware: 'Brushed solid nickel-free alloy keyring with swivel snap clip'
    },
    price: '₹149',
    edition: 'Atelier Open Edition'
  },
  {
    id: 'product-02',
    slug: 'solstice-sunflower-charm',
    number: '02',
    name: 'Solstice Sunflower Charm',
    subtitle: 'Sunburst Ochre Botanical Bag Accent',
    category: 'charm',
    categoryLabel: 'Key Adornment',
    tagline: 'Radiant botanical warmth woven through layered double-crochet petals and textured seed spirals.',
    description:
      'Inspired by heliotropic summer fields, this sunflower charm features an intricately textured chocolate-brown seed core encircled by 14 sculpted sun-gold petals with pinched tips.',
    material: 'Organic Gassed Cotton Yarn & Recycled Wool',
    palette: ['#E6A117', '#392220', '#C57D18'],
    dimensions: 'Ø 7.8 cm × D 2.4 cm',
    weight: '32 g',
    stitchCount: '620 hand stitches',
    craftTime: '5.2 hours per piece',
    originalImage: '/images/products/product-02/hero.jpg',
    heroImage: '/images/products/product-02/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: 'Full Sunburst View',
        src: '/images/products/product-02/hero.jpg',
        alt: 'Front studio perspective of Solstice Sunflower Charm on tote',
        description: 'Geometric petal symmetry and central seed spiral alignment.'
      },
      {
        type: 'angle-left',
        label: '45° Detail Perspective',
        src: '/images/products/product-02/angle-side.jpg',
        alt: 'Angled detail shot of Sunflower crochet petals',
        description: 'Shows petal relief depth and layered yarn tension.'
      },
      {
        type: 'texture',
        label: 'Fiber Macro',
        src: '/images/brand/yarn_macro.jpg',
        alt: 'Macro texture of sun-gold cotton fiber',
        description: 'Vibrant natural vegetable-dyed ochre yarn filaments.'
      }
    ],
    details: {
      dimensions: 'Diameter: 78mm | Depth: 24mm | Chain drop: 70mm',
      process: 'Dual-stage crochet: spiral seed disk followed by integrated picot petal sculpting.',
      story:
        'A study in botanical geometry and tactile warmth. Designed to bring kinetic sunshine to tote bags, backpacks, and luggage straps.',
      fiberOrigin: 'Plant-dyed natural long-staple cotton yarn.',
      careInstructions: 'Gently reshape petals with fingertips if pressed. Keep away from direct abrasive friction.',
      hardware: 'Reinforced stainless steel link chain with spring-gate ring'
    },
    price: '₹179',
    edition: 'Seasonal Solstice Release'
  },
  {
    id: 'product-03',
    slug: 'dawn-tulip-botanical-stem',
    number: '03',
    name: 'Dawn Tulip Single Stem',
    subtitle: 'Blush-Peach Architectural Blossom',
    category: 'botanical',
    categoryLabel: 'Botanical Stem',
    tagline: 'An everlasting morning bloom shaped in soft peach yarn with ribbed foliage.',
    description:
      'A sculptural single-stem tulip crafted in soft peach-blush yarn. Featuring an architectural 3D cup petal geometry supported by an internal wire armature wrapped in forest moss yarn, flanked by two graceful ribbed leaves.',
    material: 'Natural Milk Cotton Yarn & Flexible Copper Core',
    palette: ['#F2B49B', '#4D7C3B', '#D88A72'],
    dimensions: 'H 32 cm × W 11 cm',
    weight: '45 g',
    stitchCount: '890 hand stitches',
    craftTime: '6.5 hours per stem',
    originalImage: '/images/products/product-03/hero.jpg',
    heroImage: '/images/products/product-03/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: 'Studio Still Life',
        src: '/images/products/product-03/hero.jpg',
        alt: 'Handcrafted Dawn Tulip Stem on linen with craft basket',
        description: 'Full vertical silhouette with organic leaf curvature.'
      },
      {
        type: 'texture',
        label: 'Woven Stitch Detail',
        src: '/images/brand/yarn_macro.jpg',
        alt: 'Macro texture of peach tulip crochet stitches',
        description: 'Soft cashmere-touch milk cotton stitch close-up.'
      }
    ],
    details: {
      dimensions: 'Total Length: 320mm | Flower Head: 75mm × 60mm | Leaves: 140mm',
      process: 'Three-dimensional spherical shaping with hand-wrapped botanical stem binding.',
      story:
        'Celebrating the fleeting beauty of spring florals through permanent fiber craft. Never wilts, requiring zero water while radiating gentle quietude.',
      fiberOrigin: 'Hypoallergenic milk fiber blended with long-strand cotton.',
      careInstructions: 'Lightly dust with soft makeup brush or gentle cool blow dryer. Stems are bendable to fit various vases.'
    },
    price: '₹249',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-04',
    slug: 'meadow-daisy-flower-stem',
    number: '04',
    name: 'Meadow Daisy Stem',
    subtitle: 'Ivory & Chamomile Sculptural Bloom',
    category: 'botanical',
    categoryLabel: 'Botanical Stem',
    tagline: 'Pure white fluted petals framing a dense honey-colored pollen dome.',
    description:
      'A timeless wild meadow daisy reimagined in crisp white yarn with textured bobble-stitch yellow disk floret. The stem is bendable to allow bespoke floral styling in ceramic vases.',
    material: 'Premium Organic Cotton & Linen Fiber',
    palette: ['#FBF8F8', '#EBB02D', '#3B6E32'],
    dimensions: 'H 29 cm × W 9 cm',
    weight: '36 g',
    stitchCount: '740 hand stitches',
    craftTime: '5.0 hours per stem',
    originalImage: '/images/products/product-04/hero.jpg',
    heroImage: '/images/products/product-04/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: 'Studio Composition',
        src: '/images/products/product-04/hero.jpg',
        alt: 'Handcrafted Meadow Daisy Stem with baby breath florals',
        description: 'Crisp petal arrangement and organic foliage placement.'
      },
      {
        type: 'texture',
        label: 'Floret Center Macro',
        src: '/images/brand/yarn_macro.jpg',
        alt: 'Macro detail of yellow daisy center',
        description: 'High-relief bobble stitch texture simulating pollen grain clusters.'
      }
    ],
    details: {
      dimensions: 'Total Length: 290mm | Blossom Diameter: 90mm',
      process: 'Multi-layer petal foundation with integrated leaf armature.',
      story:
        'Inspired by alpine wildflowers swaying in quiet meadows. Each petal is individually cast and connected by hand without synthetic adhesives.',
      fiberOrigin: '100% organic unbleached cotton grown without pesticides.',
      careInstructions: 'Keep in dry interior environments. Shape petals gently with fingertips.'
    },
    price: '₹229',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-05',
    slug: 'roseate-tulip-stem',
    number: '05',
    name: 'Roseate Tulip Stem',
    subtitle: 'Blossom Pink Sculptural Petal Cup',
    category: 'botanical',
    categoryLabel: 'Botanical Stem',
    tagline: 'A vibrant pink tulip capturing the graceful opening arc of spring renewal.',
    description:
      'Crafted in a rich blossom-pink colorway, this tulip features ribbed petal contours and elongated emerald foliage. Perfectly balanced weight allows it to stand gracefully in single-stem test-tube vases.',
    material: '100% Fine Combed Cotton Yarn & Wire Core',
    palette: ['#F48CA4', '#387332', '#F7B7C7'],
    dimensions: 'H 31 cm × W 10.5 cm',
    weight: '42 g',
    stitchCount: '860 hand stitches',
    craftTime: '6.0 hours per stem',
    originalImage: '/images/products/product-05/hero.jpg',
    heroImage: '/images/products/product-05/hero.jpg',
    featured: false,
    gallery: [
      {
        type: 'front',
        label: 'Full Stem Profile',
        src: '/images/products/product-05/hero.jpg',
        alt: 'Roseate Pink Tulip Stem on woven linen background',
        description: 'Sculpted petal curve and elongated emerald green leaf.'
      },
      {
        type: 'texture',
        label: 'Pink Yarn Weave',
        src: '/images/brand/yarn_macro.jpg',
        alt: 'Macro detail of pink yarn loop density',
        description: 'Even tension stitch geometry creating a smooth, velvety outer surface.'
      }
    ],
    details: {
      dimensions: 'Total Length: 310mm | Flower Head: 78mm × 62mm',
      process: 'Continuous single-crochet taper with wire-reinforced ribbing.',
      story:
        'Representing unconditional affection and quiet optimism, the Roseate Tulip combines classical Japanese amigurumi technique with Scandinavian minimalism.',
      fiberOrigin: 'Eco-dyed combed cotton yarn with OEKO-TEX Standard 100 certification.',
      careInstructions: 'Avoid direct prolonged sunlight exposure to preserve hue brilliance.'
    },
    price: '₹249',
    edition: 'Botanical Heritage Collection'
  },
  {
    id: 'product-06',
    slug: 'papillon-magenta-hair-bows',
    number: '06',
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
        label: 'Worn & Flat Lay View',
        src: '/images/products/product-06/hero.jpg',
        alt: 'Pair of handcrafted magenta butterfly hair bows in hair and on knit',
        description: 'Demonstrating scale when worn in hair alongside tactile knit flat-lay.'
      },
      {
        type: 'texture',
        label: 'Wing Stitch Contour',
        src: '/images/brand/yarn_macro.jpg',
        alt: 'Macro of magenta wing crochet ridges',
        description: 'Scalloped wing edges with reinforced center cinch knot.'
      }
    ],
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
    id: 'product-07',
    slug: 'coral-bell-lily-bonsai',
    number: '07',
    name: 'Coral Bell Flora Bonsai',
    subtitle: 'Twin Blooming Lilies in Woven Basket Pot',
    category: 'sculpture',
    categoryLabel: 'Sculptural Plant',
    tagline: 'A self-standing potted floral centerpiece blooming with twin coral bell lilies.',
    description:
      'A centerpiece sculpture featuring two blooming coral-pink lilies with intricate yellow stamen, arching green leaves, and a realistic dark chocolate crochet soil mound encased inside a ribbed caramel yarn pot.',
    material: 'Natural Cotton, Jute Core & Weighted Ceramic Beads',
    palette: ['#F37A68', '#427A3A', '#B57C4F', '#392220'],
    dimensions: 'H 22 cm × W 16 cm × D 14 cm',
    weight: '210 g',
    stitchCount: '2,400 hand stitches',
    craftTime: '14 hours per sculpture',
    originalImage: '/images/products/product-07/hero.jpg',
    heroImage: '/images/products/product-07/hero.jpg',
    featured: true,
    gallery: [
      {
        type: 'front',
        label: 'Full Potted Composition',
        src: '/images/products/product-07/hero.jpg',
        alt: 'Handcrafted Coral Bell Lily Bonsai plant in crochet pot',
        description: 'Three-dimensional floral arch with textured woven basket base.'
      },
      {
        type: 'texture',
        label: 'Woven Basket Texture',
        src: '/images/brand/yarn_macro.jpg',
        alt: 'Macro texture of basket pot crochet stitches',
        description: 'Thick heavy-gauge ribbed crochet creating a sturdy, tactile pot vessel.'
      }
    ],
    details: {
      dimensions: 'Height: 220mm | Pot Diameter: 110mm | Flower Span: 160mm',
      process: 'Complex multi-component assembly: 12 hand-crocheted petal segments, 2 stamen cores, 4 leaves, weighted basket pot.',
      story:
        'The crowning sculpture of the Kurush Atelier collection. Weighted with organic clay beads inside the base so it remains stable on desks, consoles, and bedside tables.',
      fiberOrigin: 'Fair-trade natural dyed cotton and plant fibers.',
      careInstructions: 'Keep in dry interior spaces. Avoid moisture.'
    },
    price: '₹499',
    edition: 'Limited Studio Series (Signed)'
  }
];
