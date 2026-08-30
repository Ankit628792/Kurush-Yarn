export type AngleType =
  | 'front'
  | 'angle-left'
  | 'angle-right'
  | 'side'
  | 'back'
  | 'detail'
  | 'texture';

export interface ProductAngle {
  type: AngleType;
  label: string;
  src: string;
  alt: string;
  description?: string;
}

export interface Product {
  id: string;
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  category: 'botanical' | 'charm' | 'wearable' | 'sculpture';
  categoryLabel: string;
  tagline: string;
  description: string;
  material: string;
  palette: string[];
  dimensions: string;
  weight: string;
  stitchCount: string;
  craftTime: string;
  originalImage: string;
  heroImage: string;
  gallery: ProductAngle[];
  details: {
    dimensions: string;
    process: string;
    story: string;
    fiberOrigin: string;
    careInstructions: string;
    hardware?: string;
  };
  price?: string;
  edition?: string;
  featured?: boolean;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    location: string;
    established: string;
  };
  hero: {
    headlineStart: string;
    headlineHighlight: string;
    subheading: string;
    ctaExplore: string;
    ctaProcess: string;
  };
  materialStory: {
    title: string;
    subtitle: string;
    stages: {
      id: string;
      title: string;
      step: string;
      description: string;
      quote: string;
      density: number;
    }[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: {
      number: string;
      name: string;
      headline: string;
      description: string;
      technique: string;
      image: string;
    }[];
  };
  atelier: {
    title: string;
    heading: string;
    description: string;
    quote: string;
    author: string;
    image: string;
    stats: { value: string; label: string }[];
  };
  footer: {
    statementLine1: string;
    statementLine2: string;
    subtext: string;
    instagramUrl: string;
    instagramHandle: string;
  };
}
