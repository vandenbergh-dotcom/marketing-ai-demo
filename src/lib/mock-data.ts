// Mock data for demo mode — realistic marketing platform data

const now = new Date().toISOString();
const today = new Date();

function daysAgo(n: number) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

// --- Campaigns ---

const campaigns = [
  {
    id: 1, org_id: 1, brand_id: 1, name: "Summer Sale 2026 — NL & BE",
    objective: "conversions", status: "live",
    total_budget: 15000, daily_budget: 500,
    start_date: daysAgo(21), end_date: daysAgo(-10),
    created_at: daysAgo(25) + "T10:00:00Z", updated_at: now,
    platforms: ["meta", "google"],
  },
  {
    id: 2, org_id: 1, brand_id: 1, name: "Brand Awareness — DACH Region",
    objective: "awareness", status: "live",
    total_budget: 25000, daily_budget: 800,
    start_date: daysAgo(30), end_date: daysAgo(-15),
    created_at: daysAgo(35) + "T09:00:00Z", updated_at: now,
    platforms: ["meta", "linkedin"],
  },
  {
    id: 3, org_id: 1, brand_id: 2, name: "Product Launch — AI Assistant",
    objective: "traffic", status: "approved",
    total_budget: 8000, daily_budget: 300,
    start_date: daysAgo(5), end_date: daysAgo(-30),
    created_at: daysAgo(10) + "T14:00:00Z", updated_at: now,
    platforms: ["google"],
  },
  {
    id: 4, org_id: 1, brand_id: 1, name: "Retargeting — Cart Abandoners",
    objective: "conversions", status: "paused",
    total_budget: 5000, daily_budget: 200,
    start_date: daysAgo(45), end_date: daysAgo(5),
    created_at: daysAgo(50) + "T11:00:00Z", updated_at: now,
    platforms: ["meta"],
  },
  {
    id: 5, org_id: 1, brand_id: null, name: "Q1 Lead Generation — Enterprise",
    objective: "leads", status: "draft",
    total_budget: 12000, daily_budget: 400,
    start_date: null, end_date: null,
    created_at: daysAgo(2) + "T16:00:00Z", updated_at: now,
    platforms: [],
  },
  {
    id: 6, org_id: 1, brand_id: 1, name: "Holiday Promo — Black Friday",
    objective: "conversions", status: "completed",
    total_budget: 20000, daily_budget: 1000,
    start_date: daysAgo(75), end_date: daysAgo(45),
    created_at: daysAgo(80) + "T08:00:00Z", updated_at: daysAgo(45) + "T23:59:00Z",
    platforms: ["meta", "google", "tiktok"],
  },
];

const adSets = [
  { id: 1, campaign_id: 1, name: "NL — Interest Targeting", status: "live", platform: "meta", platform_id: "act_123456/adset_1", daily_budget: 300, lifetime_budget: null, bid_strategy: "lowest_cost", targeting_json: { geo_locations: { countries: ["NL"] }, age_min: 25, age_max: 55 }, created_at: daysAgo(21) + "T10:00:00Z", ads: [
    { id: 1, ad_set_id: 1, name: "Carousel — Summer Products", status: "live", headline: "Up to 40% Off Summer Essentials", description: "Shop our biggest sale of the year. Free shipping on orders over €50.", cta: "shop_now", url: "https://example.com/summer-sale", platform_ad_id: "ad_001", review_status: "approved", created_at: daysAgo(21) + "T10:30:00Z" },
    { id: 2, ad_set_id: 1, name: "Video — Brand Story", status: "live", headline: "Why Customers Love Us", description: "Watch how we're changing the game.", cta: "learn_more", url: "https://example.com/story", platform_ad_id: "ad_002", review_status: "approved", created_at: daysAgo(21) + "T10:45:00Z" },
  ]},
  { id: 2, campaign_id: 1, name: "BE — Lookalike Audience", status: "live", platform: "google", platform_id: "customers/123/campaigns/456", daily_budget: 200, lifetime_budget: null, bid_strategy: "target_cpa", targeting_json: { geo_locations: { countries: ["BE"] } }, created_at: daysAgo(21) + "T11:00:00Z", ads: [
    { id: 3, ad_set_id: 2, name: "Search — Summer Sale", status: "live", headline: "Summer Sale — Up to 40% Off", description: "Limited time offer. Shop now and save big.", cta: "shop_now", url: "https://example.com/summer-sale", platform_ad_id: null, review_status: null, created_at: daysAgo(21) + "T11:30:00Z" },
  ]},
  { id: 3, campaign_id: 2, name: "DACH — Brand Video", status: "live", platform: "meta", platform_id: "act_789/adset_3", daily_budget: 500, lifetime_budget: null, bid_strategy: "lowest_cost", targeting_json: { geo_locations: { countries: ["DE", "AT", "CH"] } }, created_at: daysAgo(30) + "T09:00:00Z", ads: [
    { id: 4, ad_set_id: 3, name: "Video — Our Mission", status: "live", headline: "Discover Our Mission", description: "We believe in making marketing accessible for every business.", cta: "learn_more", url: "https://example.com/about", platform_ad_id: "ad_004", review_status: "approved", created_at: daysAgo(30) + "T09:30:00Z" },
  ]},
  { id: 4, campaign_id: 2, name: "LinkedIn — Decision Makers", status: "live", platform: "linkedin", platform_id: null, daily_budget: 300, lifetime_budget: null, bid_strategy: "maximum_delivery", targeting_json: { job_titles: ["CMO", "VP Marketing", "Head of Growth"] }, created_at: daysAgo(30) + "T10:00:00Z", ads: [] },
];

// --- Analytics ---

function generateDailyTrend(days: number) {
  const trend = [];
  for (let i = days; i >= 0; i--) {
    const base = 1000 + Math.random() * 500;
    const weekday = new Date(today.getTime() - i * 86400000).getDay();
    const weekendFactor = (weekday === 0 || weekday === 6) ? 0.7 : 1;
    const impressions = Math.round((base * 50 + Math.random() * 10000) * weekendFactor);
    const clicks = Math.round(impressions * (0.02 + Math.random() * 0.015));
    const spend = Math.round((base * 0.8 + Math.random() * 200) * weekendFactor * 100) / 100;
    const conversions = Math.round(clicks * (0.03 + Math.random() * 0.02));
    trend.push({ date: daysAgo(i), impressions, clicks, spend, conversions });
  }
  return trend;
}

const dailyTrend = generateDailyTrend(30);
const totalImpressions = dailyTrend.reduce((s, d) => s + d.impressions, 0);
const totalClicks = dailyTrend.reduce((s, d) => s + d.clicks, 0);
const totalSpend = dailyTrend.reduce((s, d) => s + d.spend, 0);
const totalConversions = dailyTrend.reduce((s, d) => s + d.conversions, 0);
const totalRevenue = totalConversions * 45;

const overviewSummary = {
  impressions: totalImpressions,
  clicks: totalClicks,
  conversions: totalConversions,
  spend: Math.round(totalSpend * 100) / 100,
  revenue: totalRevenue,
  ctr: Math.round(totalClicks / totalImpressions * 10000) / 100,
  cpc: Math.round(totalSpend / totalClicks * 100) / 100,
  cpm: Math.round(totalSpend / totalImpressions * 100000) / 100,
  cpa: Math.round(totalSpend / totalConversions * 100) / 100,
  roas: Math.round(totalRevenue / totalSpend * 10) / 10,
};

const byPlatform = {
  meta: { impressions: Math.round(totalImpressions * 0.55), clicks: Math.round(totalClicks * 0.5), conversions: Math.round(totalConversions * 0.45), spend: Math.round(totalSpend * 0.5 * 100) / 100, revenue: Math.round(totalRevenue * 0.48), ctr: 2.8, cpc: 0.42, cpm: 5.2, cpa: 12.5, roas: 3.2 },
  google: { impressions: Math.round(totalImpressions * 0.35), clicks: Math.round(totalClicks * 0.38), conversions: Math.round(totalConversions * 0.4), spend: Math.round(totalSpend * 0.38 * 100) / 100, revenue: Math.round(totalRevenue * 0.42), ctr: 3.1, cpc: 0.55, cpm: 6.8, cpa: 14.2, roas: 2.8 },
  linkedin: { impressions: Math.round(totalImpressions * 0.1), clicks: Math.round(totalClicks * 0.12), conversions: Math.round(totalConversions * 0.15), spend: Math.round(totalSpend * 0.12 * 100) / 100, revenue: Math.round(totalRevenue * 0.1), ctr: 1.9, cpc: 1.85, cpm: 12.5, cpa: 28.0, roas: 1.5 },
};

const topCampaigns = [
  { campaign_id: 1, campaign_name: "Summer Sale 2026 — NL & BE", status: "live", impressions: 245000, clicks: 7350, conversions: 312, spend: 3850, revenue: 14040, roas: 3.6, ctr: 3.0 },
  { campaign_id: 2, campaign_name: "Brand Awareness — DACH Region", status: "live", impressions: 520000, clicks: 10400, conversions: 156, spend: 6200, revenue: 7020, roas: 1.1, ctr: 2.0 },
  { campaign_id: 6, campaign_name: "Holiday Promo — Black Friday", status: "completed", impressions: 890000, clicks: 26700, conversions: 1068, spend: 18500, revenue: 48060, roas: 2.6, ctr: 3.0 },
  { campaign_id: 4, campaign_name: "Retargeting — Cart Abandoners", status: "paused", impressions: 85000, clicks: 4250, conversions: 298, spend: 2100, revenue: 13410, roas: 6.4, ctr: 5.0 },
];

const aiInsights = {
  insights: [
    { type: "trend", severity: "info", title: "Strong return on ad spend", description: `ROAS of ${overviewSummary.roas}x indicates healthy campaign performance across platforms.`, metric: "roas", value: overviewSummary.roas, suggestion: "Consider scaling budget for top-performing campaigns to maximize returns." },
    { type: "recommendation", severity: "info", title: "Rebalance platform budget", description: "Meta has 3.2x ROAS vs LinkedIn at 1.5x. LinkedIn spend could be redirected.", metric: "roas", value: null, suggestion: "Consider shifting budget from LinkedIn to Meta for better returns." },
    { type: "anomaly", severity: "warning", title: "LinkedIn CPA above target", description: "LinkedIn CPA is €28.00, significantly higher than Meta (€12.50) and Google (€14.20).", metric: "cpa", value: 85, suggestion: "Review LinkedIn targeting criteria. Consider narrowing to higher-intent job titles or industries." },
    { type: "trend", severity: "info", title: "Weekend performance dip", description: "Weekend traffic drops ~30% but conversion rate remains stable. Budget is constant.", metric: "impressions", value: -30, suggestion: "Consider dayparting to reduce weekend budgets and reallocate to high-performing weekdays." },
  ],
  generated_at: now,
  period: `${daysAgo(30)} to ${daysAgo(0)}`,
};

// --- Content ---

const contentList = [
  { id: 1, org_id: 1, brand_id: 1, type: "ad_copy", title: "Summer Sale — Carousel Ad Copy", status: "approved", platform: "meta", language: "en", category: "promotional", tags: ["summer", "sale"], scheduled_date: daysAgo(18), published_date: daysAgo(18), created_at: daysAgo(22) + "T10:00:00Z", updated_at: now },
  { id: 2, org_id: 1, brand_id: 1, type: "social_post", title: "Brand Story — LinkedIn Post", status: "published", platform: "linkedin", language: "en", category: "branding", tags: ["brand", "story"], scheduled_date: daysAgo(12), published_date: daysAgo(12), created_at: daysAgo(15) + "T14:00:00Z", updated_at: now },
  { id: 3, org_id: 1, brand_id: null, type: "email", title: "Newsletter — Monthly Digest", status: "draft", platform: null, language: "en", category: "newsletter", tags: ["newsletter"], scheduled_date: daysAgo(-5), published_date: null, created_at: daysAgo(3) + "T09:00:00Z", updated_at: now },
  { id: 4, org_id: 1, brand_id: 1, type: "ad_copy", title: "DACH Awareness — Video Script", status: "review", platform: "meta", language: "de", category: "awareness", tags: ["dach", "video"], scheduled_date: null, published_date: null, created_at: daysAgo(5) + "T11:00:00Z", updated_at: now },
  { id: 5, org_id: 1, brand_id: 2, type: "product_description", title: "AI Assistant — Feature Page", status: "approved", platform: null, language: "en", category: "product", tags: ["ai", "product"], scheduled_date: daysAgo(2), published_date: null, created_at: daysAgo(8) + "T13:00:00Z", updated_at: now },
];

const brands = [
  { id: 1, org_id: 1, name: "Marketing AI", description: "AI-powered marketing platform", voice_tone: "Professional, confident, approachable", voice_style: "Clear and concise with data-driven insights", primary_color: "#5c7cfa", secondary_color: "#1a1a2e", logo_url: null, created_at: daysAgo(90) + "T10:00:00Z", updated_at: now },
  { id: 2, org_id: 1, name: "AI Assistant Pro", description: "Enterprise AI assistant product", voice_tone: "Innovative, technical, trustworthy", voice_style: "Expert yet accessible", primary_color: "#10b981", secondary_color: "#064e3b", logo_url: null, created_at: daysAgo(60) + "T10:00:00Z", updated_at: now },
];

const templates = [
  { id: 1, org_id: null, name: "Product Launch", type: "ad_copy", industry: "saas", objective: "conversions", prompt_structure: "Write compelling ad copy for a new product launch...", variable_fields: { product_name: "", key_feature: "", price: "" }, example_output: "Introducing {product_name} — the future of marketing.", is_public: true, usage_count: 234, created_at: daysAgo(120) + "T10:00:00Z" },
  { id: 2, org_id: null, name: "Social Proof Post", type: "social_post", industry: null, objective: "engagement", prompt_structure: "Create a social media post highlighting customer success...", variable_fields: { customer_name: "", result: "" }, example_output: null, is_public: true, usage_count: 189, created_at: daysAgo(100) + "T10:00:00Z" },
  { id: 3, org_id: 1, name: "NL Market — Email", type: "email", industry: "ecommerce", objective: "conversions", prompt_structure: "Write an email for Dutch market customers...", variable_fields: { offer: "", deadline: "" }, example_output: null, is_public: false, usage_count: 12, created_at: daysAgo(30) + "T10:00:00Z" },
];

const audiences = [
  { id: 1, org_id: 1, name: "NL Tech Professionals 25-45", type: "saved", platform: "meta", platform_audience_id: null, demographics_json: { age_min: 25, age_max: 45, genders: [1, 2], countries: ["NL"] }, interests_json: { keywords: ["technology", "SaaS", "startups", "AI"] }, behaviors_json: { keywords: ["online shoppers"] }, size_estimate: 340000, created_at: daysAgo(40) + "T10:00:00Z" },
  { id: 2, org_id: 1, name: "DACH Enterprise Decision Makers", type: "custom", platform: "linkedin", platform_audience_id: null, demographics_json: { countries: ["DE", "AT", "CH"] }, interests_json: { job_titles: ["CMO", "VP Marketing", "Head of Digital"] }, behaviors_json: null, size_estimate: 85000, created_at: daysAgo(35) + "T10:00:00Z" },
  { id: 3, org_id: 1, name: "Cart Abandoners — Last 30 Days", type: "custom", platform: "meta", platform_audience_id: "act_123/audience_001", demographics_json: null, interests_json: null, behaviors_json: { event: "AddToCart", window: "30d" }, size_estimate: 12500, created_at: daysAgo(50) + "T10:00:00Z" },
];

const platformConnections = [
  { id: 1, org_id: 1, platform: "meta", platform_account_id: "act_123456789", account_name: "Marketing AI — Meta Ads", status: "active", last_sync_at: daysAgo(0) + "T06:00:00Z", error_message: null, created_at: daysAgo(90) + "T10:00:00Z" },
  { id: 2, org_id: 1, platform: "google", platform_account_id: "123-456-7890", account_name: "Marketing AI — Google Ads", status: "active", last_sync_at: daysAgo(0) + "T06:15:00Z", error_message: null, created_at: daysAgo(85) + "T10:00:00Z" },
  { id: 3, org_id: 1, platform: "linkedin", platform_account_id: "urn:li:sponsoredAccount:12345", account_name: "Marketing AI — LinkedIn", status: "active", last_sync_at: daysAgo(1) + "T12:00:00Z", error_message: null, created_at: daysAgo(60) + "T10:00:00Z" },
  { id: 4, org_id: 1, platform: "tiktok", platform_account_id: null, account_name: null, status: "disconnected", last_sync_at: null, error_message: null, created_at: daysAgo(30) + "T10:00:00Z" },
];

// --- Route Matcher ---

type MockHandler = (path: string, body?: unknown) => unknown;

const routes: { method: string; pattern: RegExp; handler: MockHandler }[] = [
  // Campaigns
  { method: "GET", pattern: /^\/campaigns$/, handler: () => campaigns },
  { method: "GET", pattern: /^\/campaigns\/(\d+)\/detail$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    const c = campaigns.find(c => c.id === id);
    if (!c) return null;
    const sets = adSets.filter(a => a.campaign_id === id);
    return { ...c, ad_sets: sets, ai_suggestions: { recommended_budget_increase: "15%", suggested_audiences: ["lookalike_purchasers"] } };
  }},
  { method: "GET", pattern: /^\/campaigns\/(\d+)$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    return campaigns.find(c => c.id === id);
  }},
  { method: "POST", pattern: /^\/campaigns$/, handler: (_p, body: any) => ({ ...body, id: 7, org_id: 1, status: "draft", created_at: now, updated_at: now, platforms: [] }) },
  { method: "POST", pattern: /^\/campaigns\/\d+\/(submit|approve|launch|pause)$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    const action = path.split("/").pop();
    const statusMap: Record<string, string> = { submit: "review", approve: "approved", launch: "live", pause: "paused" };
    const c = campaigns.find(c => c.id === id);
    return c ? { ...c, status: statusMap[action!] || c.status } : null;
  }},
  { method: "POST", pattern: /^\/campaigns\/\d+\/push$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    return { campaign_id: id, status: "pushed", platform_results: { meta: { status: "pushed", meta_campaign_id: "c_demo_001" }, google: { status: "pushed", google_resource: "customers/123/campaigns/456" } } };
  }},
  { method: "POST", pattern: /^\/campaigns\/\d+\/sync$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    return { campaign_id: id, synced_platforms: { meta: { status: "synced", platform_status: "active" }, google: { status: "synced", platform_status: "active" } } };
  }},
  { method: "POST", pattern: /^\/campaigns\/\d+\/duplicate$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    const c = campaigns.find(c => c.id === id);
    return { original_id: id, new_id: 8, new_name: `${c?.name} (Copy)` };
  }},

  // Analytics
  { method: "GET", pattern: /^\/analytics\/overview/, handler: () => ({ summary: overviewSummary, by_platform: byPlatform, daily_trend: dailyTrend, top_campaigns: [] }) },
  { method: "GET", pattern: /^\/analytics\/compare/, handler: () => {
    const prevTrend = generateDailyTrend(30);
    const prev = { impressions: Math.round(totalImpressions * 0.85), clicks: Math.round(totalClicks * 0.9), conversions: Math.round(totalConversions * 0.8), spend: Math.round(totalSpend * 0.95 * 100) / 100, revenue: Math.round(totalRevenue * 0.75), ctr: 2.5, cpc: 0.48, cpm: 5.8, cpa: 15.2, roas: 2.1 };
    return { current: overviewSummary, previous: prev, changes: { impressions: 17.6, clicks: 11.1, conversions: 25.0, spend: 5.3, revenue: 33.3, ctr: 12.0, roas: 42.9 }, by_platform_current: byPlatform, by_platform_previous: byPlatform, daily_current: dailyTrend, daily_previous: prevTrend };
  }},
  { method: "GET", pattern: /^\/analytics\/top-campaigns/, handler: () => ({ campaigns: topCampaigns, total_campaigns: topCampaigns.length }) },
  { method: "GET", pattern: /^\/analytics\/campaigns\/\d+/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    const c = topCampaigns.find(tc => tc.campaign_id === id) || topCampaigns[0];
    return { campaign_id: id, campaign_name: c.campaign_name, summary: { impressions: c.impressions, clicks: c.clicks, conversions: c.conversions, spend: c.spend, revenue: c.revenue, ctr: c.ctr, cpc: Math.round(c.spend / c.clicks * 100) / 100, cpm: Math.round(c.spend / c.impressions * 100000) / 100, cpa: Math.round(c.spend / c.conversions * 100) / 100, roas: c.roas }, by_platform: { meta: byPlatform.meta }, daily_trend: dailyTrend.slice(0, 14), ad_set_breakdown: [{ ad_set_id: 1, ad_set_name: "NL — Interest Targeting", platform: "meta", impressions: Math.round(c.impressions * 0.6), clicks: Math.round(c.clicks * 0.55), conversions: Math.round(c.conversions * 0.5), spend: Math.round(c.spend * 0.55), revenue: Math.round(c.revenue * 0.5), ctr: 2.8, roas: 3.1 }, { ad_set_id: 2, ad_set_name: "BE — Lookalike", platform: "google", impressions: Math.round(c.impressions * 0.4), clicks: Math.round(c.clicks * 0.45), conversions: Math.round(c.conversions * 0.5), spend: Math.round(c.spend * 0.45), revenue: Math.round(c.revenue * 0.5), ctr: 3.2, roas: 3.8 }] };
  }},
  { method: "GET", pattern: /^\/analytics\/insights/, handler: () => aiInsights },
  { method: "POST", pattern: /^\/analytics\/export/, handler: () => "date,platform,impressions,clicks,spend\n2026-01-15,meta,52000,1560,480.00\n" },

  // Content
  { method: "GET", pattern: /^\/content$/, handler: () => contentList },
  { method: "POST", pattern: /^\/content\/generate$/, handler: () => ({ content_id: 6, variants: [{ version: 1, headline: "Transform Your Marketing with AI", description: "Reduce costs by 80% while scaling your campaigns across 6 platforms.", text: "Stop overpaying for agency work. Marketing AI gives you enterprise-grade campaign management, AI-powered content creation, and real-time analytics — all in one platform. Join 200+ companies already saving thousands per month.", cta_text: "Start Free Trial", brand_score: 92, brand_score_breakdown: { tone: 95, vocabulary: 88, style: 93 }, character_count: 285 }, { version: 2, headline: "Your AI Marketing Department", description: "Full-stack marketing automation at a fraction of agency costs.", text: "What if you could replace your entire marketing agency with AI? Content generation, campaign management, analytics — powered by Claude AI and DALL-E 3. Set up in minutes, see results in days.", cta_text: "Get Started", brand_score: 88, brand_score_breakdown: { tone: 90, vocabulary: 85, style: 89 }, character_count: 245 }, { version: 3, headline: "Marketing on Autopilot", description: "AI handles the heavy lifting. You make the strategic calls.", text: "From copy creation to campaign optimization, Marketing AI automates the repetitive work so you can focus on strategy. Built for marketers who want agency-quality output without the agency price tag.", cta_text: "See It In Action", brand_score: 85, brand_score_breakdown: { tone: 87, vocabulary: 82, style: 86 }, character_count: 260 }], model_used: "claude-sonnet-4-5-20250929", tokens_used: 1850 }) },

  // Brands
  { method: "GET", pattern: /^\/brands/, handler: () => brands },

  // Templates
  { method: "GET", pattern: /^\/content\/templates/, handler: () => templates },

  // Calendar
  { method: "GET", pattern: /^\/content\/calendar/, handler: () => contentList.filter(c => c.scheduled_date).map(c => ({ id: c.id, title: c.title, type: c.type, platform: c.platform, status: c.status, scheduled_date: c.scheduled_date })) },

  // Platforms
  { method: "GET", pattern: /^\/platforms$/, handler: () => platformConnections },

  // Audiences
  { method: "GET", pattern: /^\/audiences/, handler: () => audiences },

  // Settings
  { method: "GET", pattern: /^\/settings/, handler: () => ({ org_name: "Marketing AI Demo", billing_email: "demo@marketingai.eu", plan: "professional", plan_campaigns: 25, used_campaigns: 6 }) },
];

export function mockRequest<T>(method: string, path: string, body?: unknown): T | null {
  // Strip query string for matching
  const cleanPath = path.split("?")[0];

  for (const route of routes) {
    if (route.method === method && route.pattern.test(cleanPath)) {
      return route.handler(cleanPath, body) as T;
    }
  }

  // Default fallback
  console.warn(`[Mock] No handler for ${method} ${path}`);
  return [] as T;
}
