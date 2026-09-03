export interface ProductViewRecord {
  productId: string;
  productName: string;
  productSlug: string;
  category?: string;
  price?: string;
  thumbnail?: string;
  viewCount: number;
  firstViewedAt: string;
  lastViewedAt: string;
}

export interface VisitorInquiryRecord {
  id: string;
  timestamp: string;
  productName: string;
  productSlug?: string;
  productPrice?: string;
  productThumbnail?: string;
  customNotes?: string;
  isBespoke: boolean;
  channel: 'instagram' | 'direct';
  status: 'new' | 'contacted' | 'fulfilled';
}

export interface VisitorRecord {
  id: string;
  alias: string;
  firstVisited: string;
  lastActive: string;
  sessionCount: number;
  totalPageViews: number;
  device: {
    browser: string;
    os: string;
    deviceType: 'mobile' | 'desktop' | 'tablet';
    screen: string;
  };
  location: {
    locale: string;
    timezone: string;
    countryEstimate?: string;
    cityEstimate?: string;
  };
  referrer: string;
  visitedProducts: ProductViewRecord[];
  inquiries: VisitorInquiryRecord[];
}

export interface InquiryFeedItem {
  id: string;
  visitorId: string;
  visitorAlias: string;
  timestamp: string;
  productName: string;
  productSlug?: string;
  productPrice?: string;
  productThumbnail?: string;
  customNotes?: string;
  isBespoke: boolean;
  channel: 'instagram' | 'direct';
  device: string;
  location: string;
  status: 'new' | 'contacted' | 'fulfilled';
}

export interface AnalyticsStats {
  totalVisitors: number;
  totalSessions: number;
  totalProductViews: number;
  totalInquiries: number;
  activeToday: number;
  inquiryRate: number; // percentage
}
