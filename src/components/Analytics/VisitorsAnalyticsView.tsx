import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Eye,
  MessageCircle,
  TrendingUp,
  ArrowLeft,
  Search,
  Filter,
  Download,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShoppingBag,
  Share2,
  Calendar,
  Layers,
  Lock,
  Trash2,
} from 'lucide-react';
import { analyticsTracker } from '../../utils/analyticsTracker';
import {
  VisitorRecord,
  InquiryFeedItem,
  AnalyticsStats,
} from '../../types/analytics';
import { getProductPieceUrl } from '../../utils/url';

interface VisitorsAnalyticsViewProps {
  onBackToCatalog: () => void;
  onSelectProduct?: (slug: string) => void;
  onLock?: () => void;
}

type TabType = 'visitors' | 'products' | 'inquiries';
type FilterType = 'all' | 'inquired' | 'today' | 'mobile' | 'desktop';

export const VisitorsAnalyticsView: React.FC<VisitorsAnalyticsViewProps> = ({
  onBackToCatalog,
  onSelectProduct,
  onLock,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('visitors');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedVisitorId, setExpandedVisitorId] = useState<string | null>(null);

  // State loaded from tracker
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryFeedItem[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({
    totalVisitors: 0,
    totalSessions: 0,
    totalProductViews: 0,
    totalInquiries: 0,
    activeToday: 0,
    inquiryRate: 0,
  });
  const [productEngagement, setProductEngagement] = useState<ReturnType<typeof analyticsTracker.getProductEngagement>>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const loadData = () => {
    setVisitors(analyticsTracker.getVisitors());
    setInquiries(analyticsTracker.getAllInquiries());
    setStats(analyticsTracker.getStats());
    setProductEngagement(analyticsTracker.getProductEngagement());
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('kurush_analytics_update', handleUpdate);
    return () => window.removeEventListener('kurush_analytics_update', handleUpdate);
  }, []);

  const handleClearData = () => {
    if (window.confirm('Reset all collected visitor logs? Only the current active visit will remain.')) {
      analyticsTracker.clearAllData();
      loadData();
      setExportNotice('Reset visitor analytics database.');
      setTimeout(() => setExportNotice(null), 3000);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = analyticsTracker.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kurush-visitors-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice('Exported full analytics JSON file.');
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleExportCSV = () => {
    const csvStr = analyticsTracker.exportCSV();
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kurush-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice('Exported inquiries CSV spreadsheet.');
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleStatusChange = (inquiryId: string, status: 'new' | 'contacted' | 'fulfilled') => {
    analyticsTracker.updateInquiryStatus(inquiryId, status);
    loadData();
  };

  // Filter and search logic for visitors
  const filteredVisitors = useMemo(() => {
    const now = Date.now();
    return visitors.filter((v) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesAlias = v.alias.toLowerCase().includes(q);
        const matchesCity = v.location.cityEstimate?.toLowerCase().includes(q);
        const matchesCountry = v.location.countryEstimate?.toLowerCase().includes(q);
        const matchesProduct = v.visitedProducts.some((p) => p.productName.toLowerCase().includes(q));
        if (!matchesAlias && !matchesCity && !matchesCountry && !matchesProduct) {
          return false;
        }
      }

      // Filter chips
      if (activeFilter === 'inquired') {
        return v.inquiries.length > 0;
      }
      if (activeFilter === 'today') {
        const lastMs = new Date(v.lastActive).getTime();
        return now - lastMs < 86400000;
      }
      if (activeFilter === 'mobile') {
        return v.device.deviceType === 'mobile';
      }
      if (activeFilter === 'desktop') {
        return v.device.deviceType === 'desktop';
      }

      return true;
    });
  }, [visitors, searchQuery, activeFilter]);

  // Filter and search for inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        inq.productName.toLowerCase().includes(q) ||
        inq.visitorAlias.toLowerCase().includes(q) ||
        inq.location.toLowerCase().includes(q) ||
        (inq.customNotes && inq.customNotes.toLowerCase().includes(q))
      );
    });
  }, [inquiries, searchQuery]);

  // Format relative time helper
  const formatTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const mins = Math.floor(diffMs / 60000);
      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } catch {
      return isoString;
    }
  };

  return (
    <div
      id="visitors-analytics-container"
      className="min-h-screen bg-[#FAF7F2] text-[#3D2B1F] font-sans selection:bg-[#3D2B1F] selection:text-[#FAF7F2]"
    >
      {/* Top Utility Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#3D2B1F]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              id="back-to-catalog-btn"
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F] hover:text-[#D4A373] transition-colors py-2 px-3 rounded-lg hover:bg-[#3D2B1F]/5 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Return to Exhibition</span>
              <span className="sm:hidden">Exhibition</span>
            </button>
            <div className="h-4 w-px bg-[#3D2B1F]/20" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#3D2B1F]/70"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Atelier Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {onLock && (
              <button
                id="lock-analytics-btn"
                onClick={onLock}
                title="Lock Atelier Dashboard"
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#3D2B1F]/5 hover:bg-[#3D2B1F]/10 text-[#3D2B1F] py-2 px-3 sm:px-4 rounded-full transition-all border border-[#3D2B1F]/15 cursor-pointer"
              >
                <Lock size={12} className="text-[#3D2B1F]/70" />
                <span className="hidden sm:inline">Lock Chamber</span>
                <span className="sm:hidden">Lock</span>
              </button>
            )}

            <button
              id="export-options-btn"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#3D2B1F] hover:bg-[#3D2B1F]/90 text-[#FDFCFB] py-2 px-3.5 sm:px-4 rounded-full transition-all shadow-xs cursor-pointer"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>

            <button
              id="refresh-analytics-btn"
              onClick={loadData}
              title={`Refreshed at ${lastRefreshed.toLocaleTimeString()}`}
              className="p-2 text-[#3D2B1F]/70 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/5 rounded-full transition-colors cursor-pointer"
              aria-label="Refresh metrics"
            >
              <RefreshCw size={15} />
            </button>

            <button
              id="clear-analytics-btn"
              onClick={handleClearData}
              title="Reset visitor and inquiry records"
              className="p-2 text-[#3D2B1F]/40 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              aria-label="Reset analytics"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Export Toast Notification */}
      {exportNotice && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-emerald-800 text-white text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} />
              <span>{exportNotice}</span>
            </div>
            <button
              onClick={() => setExportNotice(null)}
              className="text-white/80 hover:text-white text-xs underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* Title & Introduction Section */}
        <section className="space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold">
            <span>Kurush Atelier</span>
            <span>·</span>
            <span>Audience &amp; Acquisitions Registry</span>
          </div>
          <h1
            className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#3D2B1F] tracking-tight"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Visitor &amp; Inquiry Intelligence
          </h1>
          <p className="text-sm text-[#3D2B1F]/75 max-w-2xl font-sans leading-relaxed">
            Live catalog tracking of collectors exploring the digital exhibition, detailed product browsing journeys, and atelier acquisition inquiries.
          </p>
        </section>

        {/* Executive Summary Metrics Grid */}
        <section aria-label="Key Performance Metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Metric 1: Total Visitors */}
          <div
            id="metric-total-visitors"
            className="bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-[#3D2B1F]/60 mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                Unique Visitors
              </span>
              <Users size={18} className="text-[#3D2B1F]/70" />
            </div>
            <div>
              <div
                className="font-editorial text-3xl sm:text-4xl text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                {stats.totalVisitors}
              </div>
              <div className="text-[11px] text-[#3D2B1F]/60 mt-1 flex items-center gap-1.5 font-sans">
                <span className="text-emerald-700 font-semibold">{stats.activeToday}</span> active in the last 24h
              </div>
            </div>
          </div>

          {/* Metric 2: Total Sessions & Views */}
          <div
            id="metric-total-views"
            className="bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-[#3D2B1F]/60 mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                Product Impressions
              </span>
              <Eye size={18} className="text-[#3D2B1F]/70" />
            </div>
            <div>
              <div
                className="font-editorial text-3xl sm:text-4xl text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                {stats.totalProductViews}
              </div>
              <div className="text-[11px] text-[#3D2B1F]/60 mt-1 font-sans">
                across <span className="font-semibold">{stats.totalSessions}</span> visitor sessions
              </div>
            </div>
          </div>

          {/* Metric 3: Total Inquiries */}
          <div
            id="metric-total-inquiries"
            className="bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-[#3D2B1F]/60 mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                Studio Inquiries
              </span>
              <MessageCircle size={18} className="text-[#128C7E]" />
            </div>
            <div>
              <div
                className="font-editorial text-3xl sm:text-4xl text-[#128C7E]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                {stats.totalInquiries}
              </div>
              <div className="text-[11px] text-[#3D2B1F]/60 mt-1 font-sans">
                via WhatsApp (+91 87966 45605)
              </div>
            </div>
          </div>

          {/* Metric 4: Inquire Conversion Rate */}
          <div
            id="metric-conversion-rate"
            className="bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-[#3D2B1F]/60 mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                Conversion Rate
              </span>
              <TrendingUp size={18} className="text-[#D4A373]" />
            </div>
            <div>
              <div
                className="font-editorial text-3xl sm:text-4xl text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                {stats.inquiryRate}%
              </div>
              <div className="text-[11px] text-[#3D2B1F]/60 mt-1 font-sans">
                visitors who initiated an inquiry
              </div>
            </div>
          </div>
        </section>

        {/* View Selection Tabs & Search Controls */}
        <section className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3D2B1F]/15 pb-4">
            {/* Main Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="tab-visitors"
                onClick={() => setActiveTab('visitors')}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'visitors'
                    ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-xs'
                    : 'bg-[#3D2B1F]/5 text-[#3D2B1F]/70 hover:bg-[#3D2B1F]/10 hover:text-[#3D2B1F]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <span className="flex items-center gap-1.5">
                  <Users size={13} />
                  <span>Who Visited ({filteredVisitors.length})</span>
                </span>
              </button>

              <button
                id="tab-products"
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-xs'
                    : 'bg-[#3D2B1F]/5 text-[#3D2B1F]/70 hover:bg-[#3D2B1F]/10 hover:text-[#3D2B1F]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <span className="flex items-center gap-1.5">
                  <ShoppingBag size={13} />
                  <span>Products Visited ({productEngagement.filter((p) => p.totalViews > 0).length})</span>
                </span>
              </button>

              <button
                id="tab-inquiries"
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-xs'
                    : 'bg-[#3D2B1F]/5 text-[#3D2B1F]/70 hover:bg-[#3D2B1F]/10 hover:text-[#3D2B1F]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={13} />
                  <span>Who Inquired ({inquiries.length})</span>
                </span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3D2B1F]/40" />
              <input
                id="analytics-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search visitor, city, or product..."
                className="w-full bg-[#FDFCFB] border border-[#3D2B1F]/20 rounded-full pl-9 pr-4 py-2 text-xs text-[#3D2B1F] placeholder:text-[#3D2B1F]/40 focus:outline-none focus:border-[#3D2B1F] shadow-xs font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#3D2B1F]/50 hover:text-[#3D2B1F] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sub-Filters (When on Visitors tab) */}
          {activeTab === 'visitors' && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#3D2B1F]/70">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F]/50 mr-1">
                Filter:
              </span>
              {[
                { id: 'all', label: 'All Collectors' },
                { id: 'inquired', label: 'Inquired Only' },
                { id: 'today', label: 'Active Today' },
                { id: 'mobile', label: 'Mobile' },
                { id: 'desktop', label: 'Desktop' },
              ].map((f) => (
                <button
                  key={f.id}
                  id={`filter-${f.id}`}
                  onClick={() => setActiveFilter(f.id as FilterType)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer border ${
                    activeFilter === f.id
                      ? 'bg-[#3D2B1F] text-[#FDFCFB] border-[#3D2B1F]'
                      : 'bg-white text-[#3D2B1F]/75 border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* TAB 1: WHO HAS VISITED (Visitors List & Detailed History) */}
        {activeTab === 'visitors' && (
          <section id="visitors-list-section" className="space-y-4">
            {filteredVisitors.length === 0 ? (
              <div className="p-12 text-center bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl">
                <Users size={32} className="mx-auto text-[#3D2B1F]/30 mb-3" />
                <h3 className="text-base font-semibold text-[#3D2B1F]">No visitors matched your criteria</h3>
                <p className="text-xs text-[#3D2B1F]/60 mt-1">Try clearing your search query or changing filters.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredVisitors.map((visitor) => {
                  const isExpanded = expandedVisitorId === visitor.id;
                  const hasInquiries = visitor.inquiries.length > 0;
                  const DeviceIcon =
                    visitor.device.deviceType === 'mobile'
                      ? Smartphone
                      : visitor.device.deviceType === 'tablet'
                      ? Tablet
                      : Monitor;

                  return (
                    <div
                      key={visitor.id}
                      id={`visitor-card-${visitor.id}`}
                      className="bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl overflow-hidden shadow-xs hover:border-[#3D2B1F]/30 transition-all"
                    >
                      {/* Visitor Row Summary */}
                      <div
                        onClick={() => setExpandedVisitorId(isExpanded ? null : visitor.id)}
                        className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none hover:bg-[#FAF7F2]/50 transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 flex items-center justify-center text-[#3D2B1F] flex-shrink-0 mt-0.5 sm:mt-0">
                            <DeviceIcon size={18} />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold text-[#3D2B1F]">{visitor.alias}</h3>
                              {hasInquiries && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#128C7E]/10 text-[#075E54] border border-[#128C7E]/20">
                                  <MessageCircle size={10} />
                                  <span>Inquired ({visitor.inquiries.length})</span>
                                </span>
                              )}
                              {visitor.sessionCount > 1 && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#3D2B1F]/5 text-[#3D2B1F]/70 font-mono">
                                  {visitor.sessionCount} visits
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#3D2B1F]/60 mt-1 font-sans">
                              <span className="flex items-center gap-1">
                                <Globe size={12} />
                                <span>
                                  {visitor.location.cityEstimate
                                    ? `${visitor.location.cityEstimate}, `
                                    : ''}
                                  {visitor.location.countryEstimate || 'Unknown Region'}
                                </span>
                              </span>
                              <span>·</span>
                              <span>
                                {visitor.device.os} ({visitor.device.browser})
                              </span>
                              <span>·</span>
                              <span className="text-[#3D2B1F]/50">
                                Source: {visitor.referrer.split('/')[0]}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Activity Stats & Expand Button */}
                        <div className="flex items-center justify-between md:justify-end gap-5 pt-2 md:pt-0 border-t md:border-t-0 border-[#3D2B1F]/10">
                          <div className="text-left md:text-right">
                            <div className="text-xs font-semibold text-[#3D2B1F]">
                              {visitor.visitedProducts.length} Piece{visitor.visitedProducts.length === 1 ? '' : 's'} Explored
                            </div>
                            <div className="text-[11px] text-[#3D2B1F]/50 flex items-center md:justify-end gap-1 mt-0.5">
                              <Clock size={11} />
                              <span>Active {formatTimeAgo(visitor.lastActive)}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="p-1.5 rounded-full text-[#3D2B1F]/60 hover:bg-[#3D2B1F]/10 transition-colors"
                            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Section: Visited Products & Inquiries */}
                      {isExpanded && (
                        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#3D2B1F]/10 bg-[#FAF7F2]/40 space-y-5 animate-in fade-in duration-200">
                          {/* Products Visited List */}
                          <div>
                            <h4
                              className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3D2B1F]/70 mb-3"
                              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                            >
                              Exhibition Pieces Visited by this Collector ({visitor.visitedProducts.length})
                            </h4>

                            {visitor.visitedProducts.length === 0 ? (
                              <p className="text-xs text-[#3D2B1F]/50 italic">
                                Browsed general catalog / intro story without opening single-piece modal yet.
                              </p>
                            ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {visitor.visitedProducts.map((p) => (
                                  <div
                                    key={p.productId}
                                    className="p-3 bg-white rounded-xl border border-[#3D2B1F]/15 flex items-center gap-3 shadow-2xs"
                                  >
                                    {p.thumbnail ? (
                                      <img
                                        src={p.thumbnail}
                                        alt={p.productName}
                                        className="w-12 h-12 rounded-lg object-cover bg-[#F5F0EA] border border-[#3D2B1F]/10 flex-shrink-0"
                                      />
                                    ) : (
                                      <div className="w-12 h-12 rounded-lg bg-[#3D2B1F]/5 flex items-center justify-center text-xs text-[#3D2B1F]/50 flex-shrink-0">
                                        <ShoppingBag size={18} />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <h5 className="text-xs font-semibold text-[#3D2B1F] truncate">
                                        {p.productName}
                                      </h5>
                                      <div className="flex items-center justify-between text-[11px] text-[#3D2B1F]/60 mt-0.5">
                                        <span>{p.price || 'Bespoke'}</span>
                                        <span className="font-mono bg-[#3D2B1F]/5 px-1.5 py-0.2 rounded">
                                          {p.viewCount} view{p.viewCount === 1 ? '' : 's'}
                                        </span>
                                      </div>
                                      <div className="text-[10px] text-[#3D2B1F]/40 mt-0.5">
                                        Last seen {formatTimeAgo(p.lastViewedAt)}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Inquiries Sent by This Collector */}
                          {visitor.inquiries.length > 0 && (
                            <div className="pt-2 border-t border-[#3D2B1F]/10">
                              <h4
                                className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#128C7E] mb-3 flex items-center gap-1.5"
                                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                              >
                                <MessageCircle size={12} />
                                <span>Inquiries Submitted by this Collector ({visitor.inquiries.length})</span>
                              </h4>
                              <div className="space-y-2">
                                {visitor.inquiries.map((inq) => (
                                  <div
                                    key={inq.id}
                                    className="p-3.5 bg-emerald-50/50 border border-emerald-900/15 rounded-xl text-xs space-y-1.5"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <div className="font-semibold text-[#3D2B1F] flex items-center gap-2">
                                        <span>{inq.productName}</span>
                                        {inq.productPrice && (
                                          <span className="text-[#3D2B1F]/60 font-normal">
                                            ({inq.productPrice})
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-[10px] text-[#3D2B1F]/50 font-mono">
                                        {new Date(inq.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                    {inq.customNotes && (
                                      <p className="text-xs text-[#3D2B1F]/80 italic bg-white/70 p-2 rounded-lg border border-[#3D2B1F]/10">
                                        &ldquo;{inq.customNotes}&rdquo;
                                      </p>
                                    )}
                                    <div className="flex items-center justify-between text-[11px] pt-1">
                                      <span className="text-[10px] uppercase font-semibold text-[#075E54]">
                                        Channel: {inq.channel}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-emerald-100 text-emerald-800">
                                        Status: {inq.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Technical & Environment Details */}
                          <div className="pt-2 border-t border-[#3D2B1F]/10 flex flex-wrap gap-y-1 gap-x-4 text-[11px] text-[#3D2B1F]/50 font-mono">
                            <span>ID: {visitor.id}</span>
                            <span>Timezone: {visitor.location.timezone}</span>
                            <span>Screen: {visitor.device.screen}</span>
                            <span>First Visited: {new Date(visitor.firstVisited).toLocaleDateString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: PRODUCTS VISITED (Catalog Engagement Breakdown) */}
        {activeTab === 'products' && (
          <section id="products-engagement-section" className="space-y-4">
            <div className="bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl overflow-hidden shadow-xs">
              <div className="px-6 py-4 border-b border-[#3D2B1F]/10 flex items-center justify-between bg-[#FAF7F2]/50">
                <h3
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-[#3D2B1F]"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  Exhibition Catalog — Engagement Breakdown
                </h3>
                <span className="text-xs text-[#3D2B1F]/60">
                  Ranked by total collector impressions
                </span>
              </div>

              <div className="divide-y divide-[#3D2B1F]/10">
                {productEngagement.map(({ product, uniqueVisitors, totalViews, totalInquiries, lastViewed }) => (
                  <div
                    key={product.id}
                    id={`product-row-${product.id}`}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF7F2]/40 transition-colors"
                  >
                    {/* Left: Product Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={product.heroImage || product.originalImage}
                        alt={product.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-[#F5F0EA] border border-[#3D2B1F]/15 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#3D2B1F]/60">#{product.number}</span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4A373]">
                            {product.categoryLabel || product.category}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-[#3D2B1F]">{product.name}</h4>
                        <div className="text-xs text-[#3D2B1F]/60 font-sans mt-0.5">
                          {product.price || 'Bespoke Quote'} · {product.material}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center sm:text-right">
                      <div className="p-2 sm:p-0 bg-[#3D2B1F]/5 sm:bg-transparent rounded-xl">
                        <div className="text-base sm:text-lg font-bold text-[#3D2B1F]">{uniqueVisitors}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#3D2B1F]/60">Collectors</div>
                      </div>

                      <div className="p-2 sm:p-0 bg-[#3D2B1F]/5 sm:bg-transparent rounded-xl">
                        <div className="text-base sm:text-lg font-bold text-[#3D2B1F]">{totalViews}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#3D2B1F]/60">Total Views</div>
                      </div>

                      <div className="p-2 sm:p-0 bg-[#3D2B1F]/5 sm:bg-transparent rounded-xl">
                        <div className="text-base sm:text-lg font-bold text-[#128C7E]">{totalInquiries}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#128C7E]">Inquiries</div>
                      </div>
                    </div>

                    {/* Right: Direct Piece Deep-Link Trigger */}
                    <div className="flex items-center justify-end">
                      <a
                        href={getProductPieceUrl(product.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#3D2B1F] hover:text-[#D4A373] bg-[#3D2B1F]/5 hover:bg-[#3D2B1F]/10 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <span>View Piece</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: WHO HAS INQUIRED (Inquiry Log & Direct Actions) */}
        {activeTab === 'inquiries' && (
          <section id="inquiries-feed-section" className="space-y-4">
            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl">
                <MessageCircle size={32} className="mx-auto text-[#128C7E]/40 mb-3" />
                <h3 className="text-base font-semibold text-[#3D2B1F]">No inquiries logged yet</h3>
                <p className="text-xs text-[#3D2B1F]/60 mt-1">
                  Inquiries initiated through the WhatsApp modal (+91 87966 45605) appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    id={`inquiry-row-${inq.id}`}
                    className="p-5 bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-2xl shadow-xs hover:border-[#3D2B1F]/30 transition-all space-y-3"
                  >
                    {/* Top Row: Product, Visitor, and Timestamp */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3D2B1F]/10 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#128C7E]/10 text-[#075E54] flex items-center justify-center flex-shrink-0">
                          <MessageCircle size={17} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-[#3D2B1F]">{inq.productName}</h4>
                            {inq.productPrice && (
                              <span className="text-xs text-[#3D2B1F]/60 font-mono">({inq.productPrice})</span>
                            )}
                            {inq.isBespoke && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-[#D4A373]/20 text-[#3D2B1F]">
                                Bespoke
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#3D2B1F]/60 font-sans mt-0.5">
                            From <span className="font-semibold text-[#3D2B1F]">{inq.visitorAlias}</span> · {inq.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#3D2B1F]/50 font-mono">
                        <Clock size={12} />
                        <span>{new Date(inq.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Middle: Custom Notes or Inquired text */}
                    {inq.customNotes ? (
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#3D2B1F]/10 text-xs text-[#3D2B1F] leading-relaxed">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F]/60 block mb-1">
                          Collector Notes &amp; Custom Sizing Request:
                        </span>
                        &ldquo;{inq.customNotes}&rdquo;
                      </div>
                    ) : (
                      <div className="text-xs text-[#3D2B1F]/60 italic">
                        Standard availability and acquisition inquiry initiated via WhatsApp.
                      </div>
                    )}

                    {/* Bottom: Channel details & Status Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                      <div className="flex items-center gap-3 text-[#3D2B1F]/60">
                        <span className="font-semibold text-[#075E54] uppercase text-[10px] tracking-wider">
                          WhatsApp Inquiry (+91 87966 45605)
                        </span>
                        <span>·</span>
                        <span>{inq.device}</span>
                      </div>

                      {/* Interactive Status Switcher */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F]/60">
                          Status:
                        </span>
                        {(['new', 'contacted', 'fulfilled'] as const).map((statusVal) => (
                          <button
                            key={statusVal}
                            onClick={() => handleStatusChange(inq.id, statusVal)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                              inq.status === statusVal
                                ? statusVal === 'new'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : statusVal === 'contacted'
                                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-white text-[#3D2B1F]/50 border border-[#3D2B1F]/15 hover:border-[#3D2B1F]/30'
                            }`}
                          >
                            {statusVal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer / Atelier Intelligence Notice */}
      <footer className="border-t border-[#3D2B1F]/15 mt-16 py-8 bg-[#FAF7F2]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3D2B1F]/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#3D2B1F]">Kurush Atelier</span>
            <span>·</span>
            <span>Visitor Intelligence &amp; Acquisition Tracking</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={handleExportJSON}
              className="hover:text-[#3D2B1F] underline cursor-pointer"
            >
              Export JSON
            </button>
            <button
              onClick={handleExportCSV}
              className="hover:text-[#3D2B1F] underline cursor-pointer"
            >
              Export CSV
            </button>
            <button
              onClick={handleClearData}
              className="text-red-700/80 hover:text-red-800 underline cursor-pointer"
            >
              Reset Data
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
