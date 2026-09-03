import { Product } from '../types/product';
import { products } from '../data/products';
import {
  VisitorRecord,
  ProductViewRecord,
  VisitorInquiryRecord,
  InquiryFeedItem,
  AnalyticsStats,
} from '../types/analytics';

const STORAGE_KEY_VISITORS = 'kurush_analytics_real_visitors_v2';
const STORAGE_KEY_CURRENT_VISITOR_ID = 'kurush_current_visitor_id';

/**
 * Parses user agent into human-readable device/browser info
 */
function parseDeviceDetails() {
  if (typeof window === 'undefined') {
    return {
      browser: 'Browser',
      os: 'Operating System',
      deviceType: 'desktop' as const,
      screen: '1920x1080',
    };
  }

  const ua = navigator.userAgent;
  let browser = 'Chrome';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

  let os = 'Unknown OS';
  if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('iPhone')) os = 'iOS';
  else if (ua.includes('iPad')) os = 'iPadOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Linux')) os = 'Linux';

  let deviceType: 'mobile' | 'desktop' | 'tablet' = 'desktop';
  if (/iPad|Tablet/i.test(ua) || (os === 'macOS' && navigator.maxTouchPoints > 1)) {
    deviceType = 'tablet';
  } else if (/iPhone|Android|Mobile/i.test(ua)) {
    deviceType = 'mobile';
  }

  const screen = `${window.screen.width || 1440}x${window.screen.height || 900}`;

  return { browser, os, deviceType, screen };
}

/**
 * Estimates country and city based on browser Intl timezone and locale
 */
function estimateLocation() {
  if (typeof Intl === 'undefined') {
    return {
      locale: 'en-US',
      timezone: 'UTC',
      countryEstimate: 'Global',
      cityEstimate: 'Online Visitor',
    };
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const locale = navigator.language || 'en';

  const tzMap: Record<string, { country: string; city: string }> = {
    'Asia/Kolkata': { country: 'India', city: 'Mumbai / Delhi' },
    'Asia/Calcutta': { country: 'India', city: 'Mumbai' },
    'America/New_York': { country: 'United States', city: 'New York' },
    'America/Los_Angeles': { country: 'United States', city: 'San Francisco' },
    'America/Chicago': { country: 'United States', city: 'Chicago' },
    'Europe/London': { country: 'United Kingdom', city: 'London' },
    'Europe/Paris': { country: 'France', city: 'Paris' },
    'Europe/Rome': { country: 'Italy', city: 'Milan' },
    'Europe/Berlin': { country: 'Germany', city: 'Berlin' },
    'Asia/Tokyo': { country: 'Japan', city: 'Tokyo' },
    'Asia/Singapore': { country: 'Singapore', city: 'Singapore' },
    'Asia/Dubai': { country: 'UAE', city: 'Dubai' },
    'Australia/Sydney': { country: 'Australia', city: 'Sydney' },
    'America/Toronto': { country: 'Canada', city: 'Toronto' },
  };

  const matched = tzMap[timezone];
  if (matched) {
    return {
      locale,
      timezone,
      countryEstimate: matched.country,
      cityEstimate: matched.city,
    };
  }

  const parts = timezone.split('/');
  const city = parts[1] ? parts[1].replace(/_/g, ' ') : timezone;
  const continent = parts[0] || 'International';

  return {
    locale,
    timezone,
    countryEstimate: continent,
    cityEstimate: city,
  };
}

class AnalyticsTrackerService {
  private visitors: VisitorRecord[] = [];
  private currentVisitorId: string = '';
  private initialized: boolean = false;

  constructor() {
    this.init();
  }

  public init() {
    if (typeof window === 'undefined') return;
    if (this.initialized) return;

    try {
      // Purge legacy mock seed storage keys if any
      try {
        localStorage.removeItem('kurush_analytics_visitors_v1');
      } catch {}

      // 1. Load authentic visitors from localStorage (no mock seed data)
      const raw = localStorage.getItem(STORAGE_KEY_VISITORS);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            // Strip out any legacy test/mock seed IDs
            this.visitors = parsed.filter(
              (v: VisitorRecord) =>
                !v.id.startsWith('vis_mumbai_') &&
                !v.id.startsWith('vis_london_') &&
                !v.id.startsWith('vis_delhi_') &&
                !v.id.startsWith('vis_newyork_') &&
                !v.id.startsWith('vis_bangalore_') &&
                !v.id.startsWith('vis_tokyo_') &&
                !v.id.startsWith('vis_paris_') &&
                !v.id.startsWith('vis_sim_')
            );
          } else {
            this.visitors = [];
          }
        } catch {
          this.visitors = [];
        }
      } else {
        this.visitors = [];
      }

      // 2. Identify or create current visitor
      let curId = localStorage.getItem(STORAGE_KEY_CURRENT_VISITOR_ID);
      if (!curId) {
        const randHex = Math.random().toString(16).substring(2, 8);
        curId = `vis_${Date.now().toString(36)}_${randHex}`;
        localStorage.setItem(STORAGE_KEY_CURRENT_VISITOR_ID, curId);
      }
      this.currentVisitorId = curId;

      // 3. Register or update current visitor record
      this.recordCurrentVisitorSession();
      this.initialized = true;
    } catch (e) {
      console.warn('AnalyticsTracker initialization error:', e);
    }
  }

  private recordCurrentVisitorSession() {
    const nowIso = new Date().toISOString();
    const device = parseDeviceDetails();
    const location = estimateLocation();
    const referrer = document.referrer
      ? document.referrer.includes(window.location.hostname)
        ? 'Internal Exhibition Navigation'
        : document.referrer
      : 'Direct Access / Shared Link';

    let visitor = this.visitors.find((v) => v.id === this.currentVisitorId);
    if (!visitor) {
      const aliasNum = (this.visitors.length + 1001).toString();
      visitor = {
        id: this.currentVisitorId,
        alias: `Visitor #${aliasNum} (You / Current Session)`,
        firstVisited: nowIso,
        lastActive: nowIso,
        sessionCount: 1,
        totalPageViews: 1,
        device,
        location,
        referrer,
        visitedProducts: [],
        inquiries: [],
      };
      this.visitors.unshift(visitor);
    } else {
      visitor.lastActive = nowIso;
      visitor.sessionCount = (visitor.sessionCount || 1) + 1;
      visitor.totalPageViews = (visitor.totalPageViews || 0) + 1;
      visitor.device = device;
      // Mark as current user in alias if not already
      if (!visitor.alias.includes('(You')) {
        visitor.alias += ' (You / Current Session)';
      }
    }

    this.saveVisitors();
    this.notifyUpdate();
  }

  private saveVisitors() {
    try {
      localStorage.setItem(STORAGE_KEY_VISITORS, JSON.stringify(this.visitors));
    } catch (e) {
      console.warn('Could not persist analytics to localStorage:', e);
    }
  }

  private notifyUpdate() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kurush_analytics_update'));
    }
  }

  /**
   * Tracks when a visitor views a specific product piece
   */
  public trackProductView(product: Product) {
    if (!product || !this.currentVisitorId) return;
    const nowIso = new Date().toISOString();

    const visitor = this.visitors.find((v) => v.id === this.currentVisitorId);
    if (!visitor) return;

    visitor.lastActive = nowIso;
    visitor.totalPageViews = (visitor.totalPageViews || 0) + 1;

    let prodRecord = visitor.visitedProducts.find((p) => p.productId === product.id);
    if (prodRecord) {
      prodRecord.viewCount += 1;
      prodRecord.lastViewedAt = nowIso;
    } else {
      prodRecord = {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        category: product.category,
        price: product.price,
        thumbnail: product.heroImage || product.originalImage,
        viewCount: 1,
        firstViewedAt: nowIso,
        lastViewedAt: nowIso,
      };
      visitor.visitedProducts.push(prodRecord);
    }

    this.saveVisitors();
    this.notifyUpdate();
  }

  /**
   * Tracks when a visitor submits or opens an inquiry
   */
  public trackInquiry(data: {
    productName: string;
    productSlug?: string;
    price?: string;
    thumbnail?: string;
    customNotes?: string;
    isBespoke?: boolean;
    channel?: 'whatsapp' | 'instagram' | 'direct';
  }) {
    if (!this.currentVisitorId) this.init();
    const nowIso = new Date().toISOString();
    const visitor = this.visitors.find((v) => v.id === this.currentVisitorId);
    if (!visitor) return;

    const newInquiry: VisitorInquiryRecord = {
      id: `inq_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: nowIso,
      productName: data.productName,
      productSlug: data.productSlug,
      productPrice: data.price,
      productThumbnail: data.thumbnail,
      customNotes: data.customNotes,
      isBespoke: !!data.isBespoke,
      channel: data.channel || 'whatsapp',
      status: 'new',
    };

    visitor.inquiries.unshift(newInquiry);
    visitor.lastActive = nowIso;

    // If product wasn't already recorded as visited, add it
    if (data.productName && !visitor.visitedProducts.some((p) => p.productName === data.productName)) {
      const matched = products.find((p) => p.name === data.productName);
      visitor.visitedProducts.push({
        productId: matched?.id || data.productSlug || 'bespoke',
        productName: data.productName,
        productSlug: data.productSlug || '',
        price: data.price,
        thumbnail: data.thumbnail || matched?.heroImage,
        viewCount: 1,
        firstViewedAt: nowIso,
        lastViewedAt: nowIso,
      });
    }

    this.saveVisitors();
    this.notifyUpdate();
  }

  /**
   * Returns all recorded visitors (sorted by most recently active)
   */
  public getVisitors(): VisitorRecord[] {
    return [...this.visitors].sort(
      (a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
    );
  }

  /**
   * Returns a chronological feed of all inquiries across all visitors
   */
  public getAllInquiries(): InquiryFeedItem[] {
    const feed: InquiryFeedItem[] = [];

    for (const v of this.visitors) {
      for (const inq of v.inquiries) {
        feed.push({
          id: inq.id,
          visitorId: v.id,
          visitorAlias: v.alias,
          timestamp: inq.timestamp,
          productName: inq.productName,
          productSlug: inq.productSlug,
          productPrice: inq.productPrice,
          productThumbnail: inq.productThumbnail,
          customNotes: inq.customNotes,
          isBespoke: inq.isBespoke,
          channel: inq.channel,
          device: `${v.device.os} · ${v.device.browser}`,
          location: `${v.location.cityEstimate || ''}, ${v.location.countryEstimate || ''}`,
          status: inq.status,
        });
      }
    }

    return feed.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Compiles catalog-wide metrics grouped by product
   */
  public getProductEngagement() {
    const productStatsMap = new Map<
      string,
      {
        product: Product;
        uniqueVisitors: number;
        totalViews: number;
        totalInquiries: number;
        recentVisitors: string[];
        lastViewed: string;
      }
    >();

    // Initialize map with all products in catalog
    for (const p of products) {
      productStatsMap.set(p.id, {
        product: p,
        uniqueVisitors: 0,
        totalViews: 0,
        totalInquiries: 0,
        recentVisitors: [],
        lastViewed: '',
      });
    }

    // Accumulate metrics from all visitors
    for (const v of this.visitors) {
      for (const vp of v.visitedProducts) {
        const item = productStatsMap.get(vp.productId);
        if (item) {
          item.uniqueVisitors += 1;
          item.totalViews += vp.viewCount;
          if (!item.recentVisitors.includes(v.alias)) {
            item.recentVisitors.push(v.alias);
          }
          if (!item.lastViewed || new Date(vp.lastViewedAt) > new Date(item.lastViewed)) {
            item.lastViewed = vp.lastViewedAt;
          }
        }
      }

      for (const inq of v.inquiries) {
        const matched = products.find(
          (p) => p.name.toLowerCase() === inq.productName.toLowerCase() || p.slug === inq.productSlug
        );
        if (matched) {
          const item = productStatsMap.get(matched.id);
          if (item) {
            item.totalInquiries += 1;
          }
        }
      }
    }

    return Array.from(productStatsMap.values()).sort((a, b) => b.totalViews - a.totalViews);
  }

  /**
   * Summary overview numbers
   */
  public getStats(): AnalyticsStats {
    const visitors = this.getVisitors();
    const inquiries = this.getAllInquiries();

    let totalSessions = 0;
    let totalProductViews = 0;
    const now = Date.now();
    let activeToday = 0;

    for (const v of visitors) {
      totalSessions += v.sessionCount || 1;
      for (const p of v.visitedProducts) {
        totalProductViews += p.viewCount;
      }
      const lastActiveMs = new Date(v.lastActive).getTime();
      if (now - lastActiveMs < 86400000) {
        activeToday += 1;
      }
    }

    const inquiryRate =
      visitors.length > 0 ? Math.round((inquiries.length / visitors.length) * 100) : 0;

    return {
      totalVisitors: visitors.length,
      totalSessions,
      totalProductViews,
      totalInquiries: inquiries.length,
      activeToday,
      inquiryRate,
    };
  }

  /**
   * Updates status of an inquiry (new -> contacted -> fulfilled)
   */
  public updateInquiryStatus(inquiryId: string, status: 'new' | 'contacted' | 'fulfilled') {
    for (const v of this.visitors) {
      const inq = v.inquiries.find((i) => i.id === inquiryId);
      if (inq) {
        inq.status = status;
        break;
      }
    }
    this.saveVisitors();
    this.notifyUpdate();
  }

  /**
   * Adds a simulated new collector visit for demonstration & testing
   */
  public simulateVisitor() {
    const cities = [
      { city: 'San Francisco', country: 'United States', tz: 'America/Los_Angeles', locale: 'en-US' },
      { city: 'Paris', country: 'France', tz: 'Europe/Paris', locale: 'fr-FR' },
      { city: 'Milan', country: 'Italy', tz: 'Europe/Rome', locale: 'it-IT' },
      { city: 'Dubai', country: 'UAE', tz: 'Asia/Dubai', locale: 'en-AE' },
      { city: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore', locale: 'en-SG' },
      { city: 'Hyderabad', country: 'India', tz: 'Asia/Kolkata', locale: 'en-IN' },
    ];
    const pickedCity = cities[Math.floor(Math.random() * cities.length)];
    const devices: ('mobile' | 'desktop' | 'tablet')[] = ['mobile', 'desktop', 'tablet'];
    const deviceType = devices[Math.floor(Math.random() * devices.length)];
    const browsers = ['Safari', 'Chrome', 'Firefox', 'Edge'];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];

    const id = `vis_sim_${Date.now().toString(36)}_${Math.random().toString(16).substring(2, 6)}`;
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    const nowIso = new Date().toISOString();
    const newVisitor: VisitorRecord = {
      id,
      alias: `Collector #${Math.floor(1000 + Math.random() * 9000)} (Simulated)`,
      firstVisited: nowIso,
      lastActive: nowIso,
      sessionCount: 1,
      totalPageViews: 2,
      device: {
        browser,
        os: deviceType === 'mobile' ? 'iOS' : 'macOS',
        deviceType,
        screen: deviceType === 'mobile' ? '390x844' : '1920x1080',
      },
      location: {
        locale: pickedCity.locale,
        timezone: pickedCity.tz,
        countryEstimate: pickedCity.country,
        cityEstimate: pickedCity.city,
      },
      referrer: 'Instagram / @kurush.yarn',
      visitedProducts: randomProduct
        ? [
            {
              productId: randomProduct.id,
              productName: randomProduct.name,
              productSlug: randomProduct.slug,
              category: randomProduct.category,
              price: randomProduct.price,
              thumbnail: randomProduct.heroImage,
              viewCount: 1,
              firstViewedAt: nowIso,
              lastViewedAt: nowIso,
            },
          ]
        : [],
      inquiries: [],
    };

    this.visitors.unshift(newVisitor);
    this.saveVisitors();
    this.notifyUpdate();
  }

  /**
   * Exports data as formatted JSON string
   */
  public exportJSON(): string {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        stats: this.getStats(),
        visitors: this.getVisitors(),
        inquiries: this.getAllInquiries(),
      },
      null,
      2
    );
  }

  /**
   * Exports inquiry and visitor list as CSV
   */
  public exportCSV(): string {
    const inquiries = this.getAllInquiries();
    const headers = [
      'Inquiry ID',
      'Visitor ID',
      'Visitor Alias',
      'Timestamp',
      'Product Name',
      'Price',
      'Channel',
      'Status',
      'Device',
      'Location',
      'Custom Notes',
    ];

    const rows = inquiries.map((i) => [
      i.id,
      i.visitorId,
      `"${i.visitorAlias.replace(/"/g, '""')}"`,
      i.timestamp,
      `"${i.productName.replace(/"/g, '""')}"`,
      i.productPrice || '',
      i.channel,
      i.status,
      `"${i.device.replace(/"/g, '""')}"`,
      `"${i.location.replace(/"/g, '""')}"`,
      `"${(i.customNotes || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  /**
   * Clears all analytics records and resets to current visitor session
   */
  public clearAllData() {
    this.visitors = [];
    this.saveVisitors();
    this.recordCurrentVisitorSession();
    this.notifyUpdate();
  }
}

export const analyticsTracker = new AnalyticsTrackerService();
