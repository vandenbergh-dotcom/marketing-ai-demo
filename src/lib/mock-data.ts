// Mock data for demo mode — Berghaus outdoor clothing campaigns

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
    id: 1, org_id: 1, brand_id: 1, name: "Spring/Summer 2026 — New Season Drop",
    objective: "conversions", status: "live",
    total_budget: 45000, daily_budget: 1500,
    start_date: daysAgo(18), end_date: daysAgo(-12),
    created_at: daysAgo(25) + "T10:00:00Z", updated_at: now,
    platforms: ["meta", "google"],
  },
  {
    id: 2, org_id: 1, brand_id: 1, name: "Hillwalker Gore-Tex — UK & Ireland Push",
    objective: "conversions", status: "live",
    total_budget: 32000, daily_budget: 1100,
    start_date: daysAgo(28), end_date: daysAgo(-5),
    created_at: daysAgo(32) + "T09:00:00Z", updated_at: now,
    platforms: ["meta", "google", "tiktok"],
  },
  {
    id: 3, org_id: 1, brand_id: 1, name: "Trango Heritage Collection — Brand Campaign",
    objective: "awareness", status: "live",
    total_budget: 28000, daily_budget: 900,
    start_date: daysAgo(14), end_date: daysAgo(-20),
    created_at: daysAgo(18) + "T14:00:00Z", updated_at: now,
    platforms: ["meta", "linkedin"],
  },
  {
    id: 4, org_id: 1, brand_id: 1, name: "Extrem Range — Mountaineering Enthusiasts",
    objective: "traffic", status: "approved",
    total_budget: 18000, daily_budget: 600,
    start_date: daysAgo(3), end_date: daysAgo(-30),
    created_at: daysAgo(8) + "T11:00:00Z", updated_at: now,
    platforms: ["google"],
  },
  {
    id: 5, org_id: 1, brand_id: 1, name: "Retargeting — Cart Abandoners & Browsers",
    objective: "conversions", status: "live",
    total_budget: 12000, daily_budget: 400,
    start_date: daysAgo(30), end_date: daysAgo(-3),
    created_at: daysAgo(35) + "T11:00:00Z", updated_at: now,
    platforms: ["meta"],
  },
  {
    id: 6, org_id: 1, brand_id: 1, name: "Winter Clearance Sale — Up to 50% Off",
    objective: "conversions", status: "completed",
    total_budget: 55000, daily_budget: 1800,
    start_date: daysAgo(65), end_date: daysAgo(35),
    created_at: daysAgo(70) + "T08:00:00Z", updated_at: daysAgo(35) + "T23:59:00Z",
    platforms: ["meta", "google", "tiktok"],
  },
  {
    id: 7, org_id: 1, brand_id: 1, name: "Summer Hiking Essentials — Tech Tees & Shorts",
    objective: "conversions", status: "draft",
    total_budget: 22000, daily_budget: 750,
    start_date: null, end_date: null,
    created_at: daysAgo(2) + "T16:00:00Z", updated_at: now,
    platforms: [],
  },
  {
    id: 8, org_id: 1, brand_id: 1, name: "Wandermoor Wind Smock — Product Launch",
    objective: "traffic", status: "paused",
    total_budget: 15000, daily_budget: 500,
    start_date: daysAgo(40), end_date: daysAgo(10),
    created_at: daysAgo(45) + "T10:00:00Z", updated_at: daysAgo(10) + "T18:00:00Z",
    platforms: ["meta", "google"],
  },
];

const adSets = [
  // Campaign 1: Spring/Summer New Season
  { id: 1, campaign_id: 1, name: "UK — Outdoor Enthusiasts 25-54", status: "live", platform: "meta", platform_id: "act_berghaus_01/adset_ss26_uk", daily_budget: 900, lifetime_budget: null, bid_strategy: "lowest_cost", targeting_json: { geo_locations: { countries: ["GB"] }, age_min: 25, age_max: 54, interests: ["hiking", "outdoor activities", "trail running"] }, created_at: daysAgo(18) + "T10:00:00Z", ads: [
    { id: 1, ad_set_id: 1, name: "Carousel — New Season Collection", status: "live", headline: "New Season. New Adventures.", description: "Lightweight, breathable gear built for spring & summer trails. Shop the new collection.", cta: "shop_now", url: "https://www.berghaus.com/new-season", platform_ad_id: "ad_bh_001", review_status: "approved", created_at: daysAgo(18) + "T10:30:00Z" },
    { id: 2, ad_set_id: 1, name: "Video — Trail Running Edit", status: "live", headline: "Built for the Trail", description: "Sweat-wicking Tech Tees and lightweight layers — tested on Britain's toughest trails.", cta: "shop_now", url: "https://www.berghaus.com/new-season", platform_ad_id: "ad_bh_002", review_status: "approved", created_at: daysAgo(18) + "T10:45:00Z" },
  ]},
  { id: 2, campaign_id: 1, name: "UK — Google Shopping & Search", status: "live", platform: "google", platform_id: "customers/berghaus/campaigns/ss26", daily_budget: 600, lifetime_budget: null, bid_strategy: "target_roas", targeting_json: { geo_locations: { countries: ["GB"] }, keywords: ["hiking jackets", "outdoor clothing", "waterproof jacket", "berghaus new season"] }, created_at: daysAgo(18) + "T11:00:00Z", ads: [
    { id: 3, ad_set_id: 2, name: "Search — New Season Jackets", status: "live", headline: "Berghaus New Season 2026 — Shop Now", description: "Lightweight jackets, Tech Tees & trail-ready gear. Free delivery over £80. Official Berghaus store.", cta: "shop_now", url: "https://www.berghaus.com/new-season", platform_ad_id: "ad_bh_003", review_status: "approved", created_at: daysAgo(18) + "T11:30:00Z" },
    { id: 4, ad_set_id: 2, name: "Shopping — Fleeces & Midlayers", status: "live", headline: "Berghaus Fleeces from £55", description: "Technical fleeces for layering. Polartec® fabric. Multiple colours.", cta: "shop_now", url: "https://www.berghaus.com/fleeces", platform_ad_id: "ad_bh_004", review_status: "approved", created_at: daysAgo(18) + "T11:45:00Z" },
  ]},

  // Campaign 2: Hillwalker
  { id: 3, campaign_id: 2, name: "UK — Hillwalker Awareness", status: "live", platform: "meta", platform_id: "act_berghaus_01/adset_hw_uk", daily_budget: 500, lifetime_budget: null, bid_strategy: "lowest_cost", targeting_json: { geo_locations: { countries: ["GB"] }, age_min: 30, age_max: 60, interests: ["hillwalking", "Lake District", "Scottish Highlands", "mountaineering"] }, created_at: daysAgo(28) + "T09:00:00Z", ads: [
    { id: 5, ad_set_id: 3, name: "Single Image — Hillwalker on Ridge", status: "live", headline: "The Hillwalker. Trusted Since Day One.", description: "Two-layer Gore-Tex shell. Breathable. Waterproof. Built for British hills. From £190.", cta: "shop_now", url: "https://www.berghaus.com/hillwalker", platform_ad_id: "ad_bh_005", review_status: "approved", created_at: daysAgo(28) + "T09:30:00Z" },
    { id: 6, ad_set_id: 3, name: "Carousel — Hillwalker Colourways", status: "live", headline: "One Jacket. Every Condition.", description: "The Hillwalker InterActive Gore-Tex jacket in 6 colours. Men's & women's.", cta: "shop_now", url: "https://www.berghaus.com/hillwalker", platform_ad_id: "ad_bh_006", review_status: "approved", created_at: daysAgo(28) + "T09:45:00Z" },
  ]},
  { id: 4, campaign_id: 2, name: "Ireland — Hillwalker Conversions", status: "live", platform: "google", platform_id: "customers/berghaus/campaigns/hw_ie", daily_budget: 350, lifetime_budget: null, bid_strategy: "target_cpa", targeting_json: { geo_locations: { countries: ["IE"] }, keywords: ["waterproof jacket", "gore-tex jacket", "hillwalking jacket", "berghaus hillwalker"] }, created_at: daysAgo(28) + "T10:00:00Z", ads: [
    { id: 7, ad_set_id: 4, name: "Search — Hillwalker IE", status: "live", headline: "Berghaus Hillwalker Gore-Tex — From €210", description: "The UK's most trusted waterproof jacket. 2-layer Gore-Tex. Free returns. Official store.", cta: "shop_now", url: "https://www.berghaus.com/hillwalker", platform_ad_id: "ad_bh_007", review_status: "approved", created_at: daysAgo(28) + "T10:30:00Z" },
  ]},
  { id: 5, campaign_id: 2, name: "TikTok — Young Hikers 18-35", status: "live", platform: "tiktok", platform_id: null, daily_budget: 250, lifetime_budget: null, bid_strategy: "lowest_cost", targeting_json: { geo_locations: { countries: ["GB"] }, age_min: 18, age_max: 35, interests: ["hiking", "outdoors", "adventure travel"] }, created_at: daysAgo(28) + "T11:00:00Z", ads: [
    { id: 8, ad_set_id: 5, name: "Video — Hillwalker Rain Test", status: "live", headline: "POV: It starts raining and you're wearing a Hillwalker", description: "Gore-Tex. Enough said.", cta: "shop_now", url: "https://www.berghaus.com/hillwalker", platform_ad_id: "ad_bh_008", review_status: "approved", created_at: daysAgo(28) + "T11:30:00Z" },
  ]},

  // Campaign 3: Trango Heritage
  { id: 6, campaign_id: 3, name: "UK — Trango Brand Awareness", status: "live", platform: "meta", platform_id: "act_berghaus_01/adset_trango_uk", daily_budget: 600, lifetime_budget: null, bid_strategy: "lowest_cost", targeting_json: { geo_locations: { countries: ["GB"] }, age_min: 25, age_max: 50, interests: ["mountaineering", "climbing", "outdoor fashion", "heritage brands"] }, created_at: daysAgo(14) + "T14:00:00Z", ads: [
    { id: 9, ad_set_id: 6, name: "Video — K2 1986 Story", status: "live", headline: "Born on the Journey to K2", description: "In 1986, we designed the Trango for the British K2 expedition. Named after the Trango Towers. Three layers of Gore-Tex. An icon reborn.", cta: "learn_more", url: "https://www.berghaus.com/icons/trango.list", platform_ad_id: "ad_bh_009", review_status: "approved", created_at: daysAgo(14) + "T14:30:00Z" },
  ]},
  { id: 7, campaign_id: 3, name: "LinkedIn — Outdoor Industry", status: "live", platform: "linkedin", platform_id: null, daily_budget: 300, lifetime_budget: null, bid_strategy: "maximum_delivery", targeting_json: { industries: ["Outdoor & Sporting Goods", "Retail"], job_titles: ["Buyer", "Merchandiser", "Brand Manager"] }, created_at: daysAgo(14) + "T15:00:00Z", ads: [] },
];

// --- Analytics ---

function generateDailyTrend(days: number) {
  const trend = [];
  for (let i = days; i >= 0; i--) {
    const base = 2800 + Math.random() * 800;
    const weekday = new Date(today.getTime() - i * 86400000).getDay();
    const weekendFactor = (weekday === 0 || weekday === 6) ? 0.75 : 1;
    const impressions = Math.round((base * 55 + Math.random() * 15000) * weekendFactor);
    const clicks = Math.round(impressions * (0.025 + Math.random() * 0.012));
    const spend = Math.round((base * 1.1 + Math.random() * 300) * weekendFactor * 100) / 100;
    const conversions = Math.round(clicks * (0.035 + Math.random() * 0.02));
    trend.push({ date: daysAgo(i), impressions, clicks, spend, conversions });
  }
  return trend;
}

const dailyTrend = generateDailyTrend(30);
const totalImpressions = dailyTrend.reduce((s, d) => s + d.impressions, 0);
const totalClicks = dailyTrend.reduce((s, d) => s + d.clicks, 0);
const totalSpend = dailyTrend.reduce((s, d) => s + d.spend, 0);
const totalConversions = dailyTrend.reduce((s, d) => s + d.conversions, 0);
const totalRevenue = totalConversions * 85; // Average order value £85

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
  meta: { impressions: Math.round(totalImpressions * 0.48), clicks: Math.round(totalClicks * 0.44), conversions: Math.round(totalConversions * 0.42), spend: Math.round(totalSpend * 0.45 * 100) / 100, revenue: Math.round(totalRevenue * 0.44), ctr: 2.7, cpc: 0.52, cpm: 6.1, cpa: 18.50, roas: 3.4 },
  google: { impressions: Math.round(totalImpressions * 0.38), clicks: Math.round(totalClicks * 0.42), conversions: Math.round(totalConversions * 0.44), spend: Math.round(totalSpend * 0.40 * 100) / 100, revenue: Math.round(totalRevenue * 0.46), ctr: 3.3, cpc: 0.61, cpm: 7.2, cpa: 16.80, roas: 3.8 },
  tiktok: { impressions: Math.round(totalImpressions * 0.10), clicks: Math.round(totalClicks * 0.09), conversions: Math.round(totalConversions * 0.08), spend: Math.round(totalSpend * 0.10 * 100) / 100, revenue: Math.round(totalRevenue * 0.06), ctr: 1.8, cpc: 0.38, cpm: 4.5, cpa: 22.40, roas: 2.1 },
  linkedin: { impressions: Math.round(totalImpressions * 0.04), clicks: Math.round(totalClicks * 0.05), conversions: Math.round(totalConversions * 0.06), spend: Math.round(totalSpend * 0.05 * 100) / 100, revenue: Math.round(totalRevenue * 0.04), ctr: 1.5, cpc: 2.10, cpm: 14.8, cpa: 32.00, roas: 1.2 },
};

const topCampaigns = [
  { campaign_id: 1, campaign_name: "Spring/Summer 2026 — New Season Drop", status: "live", impressions: 1850000, clicks: 55500, conversions: 2442, spend: 27000, revenue: 207570, roas: 7.7, ctr: 3.0 },
  { campaign_id: 2, campaign_name: "Hillwalker Gore-Tex — UK & Ireland Push", status: "live", impressions: 1420000, clicks: 42600, conversions: 1704, spend: 30800, revenue: 144840, roas: 4.7, ctr: 3.0 },
  { campaign_id: 5, campaign_name: "Retargeting — Cart Abandoners & Browsers", status: "live", impressions: 320000, clicks: 16000, conversions: 1280, spend: 8400, revenue: 108800, roas: 13.0, ctr: 5.0 },
  { campaign_id: 3, campaign_name: "Trango Heritage Collection — Brand Campaign", status: "live", impressions: 980000, clicks: 19600, conversions: 392, spend: 12600, revenue: 33320, roas: 2.6, ctr: 2.0 },
  { campaign_id: 6, campaign_name: "Winter Clearance Sale — Up to 50% Off", status: "completed", impressions: 2850000, clicks: 85500, conversions: 4275, spend: 52000, revenue: 363375, roas: 7.0, ctr: 3.0 },
  { campaign_id: 8, campaign_name: "Wandermoor Wind Smock — Product Launch", status: "paused", impressions: 540000, clicks: 18900, conversions: 567, spend: 12500, revenue: 48195, roas: 3.9, ctr: 3.5 },
];

const aiInsights = {
  insights: [
    { type: "trend", severity: "info", title: "Retargeting delivers highest ROAS", description: "Cart abandoner retargeting campaign is returning 13.0x ROAS — by far the best-performing campaign. Consider increasing daily budget from £400 to £600.", metric: "roas", value: 13.0, suggestion: "Scale retargeting budget by 50% and add browse-abandoner segment for similar performance." },
    { type: "anomaly", severity: "warning", title: "TikTok CPA trending upward", description: "TikTok cost per acquisition has risen 18% over the past 7 days (£18.90 → £22.40). The Hillwalker rain test video is seeing fatigue after 28 days.", metric: "cpa", value: 18, suggestion: "Refresh TikTok creative with new UGC-style content. Consider a Lake District POV hike video to re-engage the 18-35 audience." },
    { type: "recommendation", severity: "info", title: "Shift budget from LinkedIn to Google", description: "Google delivers 3.8x ROAS vs LinkedIn at 1.2x. The Trango heritage story works better as a search/shopping campaign than a B2B awareness play.", metric: "roas", value: null, suggestion: "Reduce LinkedIn spend by 40% and redirect to Google Shopping for the Trango collection." },
    { type: "trend", severity: "info", title: "Hillwalker 2.0 outselling classic model", description: "The Hillwalker 2.0 Gemini 3-in-1 variant accounts for 62% of Hillwalker campaign conversions despite being a higher price point (£240 vs £190).", metric: "conversions", value: 62, suggestion: "Feature the Hillwalker 2.0 Gemini more prominently in creative. The 3-in-1 value proposition resonates strongly." },
    { type: "anomaly", severity: "warning", title: "Weekend conversion rate drop in Scotland", description: "Scotland geo-segment shows 35% lower conversion rate on weekends despite stable traffic. Likely due to customers being outdoors rather than shopping.", metric: "conversions", value: -35, suggestion: "Implement dayparting for Scottish audience: reduce weekend bids by 30%, boost Monday-Tuesday bids by 15% to capture post-weekend purchase intent." },
  ],
  generated_at: now,
  period: `${daysAgo(30)} to ${daysAgo(0)}`,
};

// --- Content ---

const contentList = [
  { id: 1, org_id: 1, brand_id: 1, type: "ad_copy", title: "Spring/Summer '26 — Carousel Ad Copy", status: "approved", platform: "meta", language: "en", category: "promotional", tags: ["spring", "summer", "new season"], scheduled_date: daysAgo(18), published_date: daysAgo(18), created_at: daysAgo(22) + "T10:00:00Z", updated_at: now },
  { id: 2, org_id: 1, brand_id: 1, type: "ad_copy", title: "Hillwalker Gore-Tex — Search Ad Copy", status: "approved", platform: "google", language: "en", category: "product", tags: ["hillwalker", "gore-tex", "waterproof"], scheduled_date: daysAgo(28), published_date: daysAgo(28), created_at: daysAgo(30) + "T14:00:00Z", updated_at: now },
  { id: 3, org_id: 1, brand_id: 1, type: "social_post", title: "Trango Heritage — Instagram Story Sequence", status: "published", platform: "meta", language: "en", category: "branding", tags: ["trango", "heritage", "K2", "mountaineering"], scheduled_date: daysAgo(14), published_date: daysAgo(14), created_at: daysAgo(16) + "T09:00:00Z", updated_at: now },
  { id: 4, org_id: 1, brand_id: 1, type: "email", title: "New Season Launch — Customer Email", status: "published", platform: null, language: "en", category: "newsletter", tags: ["new season", "spring", "launch"], scheduled_date: daysAgo(18), published_date: daysAgo(18), created_at: daysAgo(20) + "T11:00:00Z", updated_at: now },
  { id: 5, org_id: 1, brand_id: 1, type: "ad_copy", title: "Extrem Range — Google Ads Copy", status: "review", platform: "google", language: "en", category: "product", tags: ["extrem", "mountaineering", "technical"], scheduled_date: null, published_date: null, created_at: daysAgo(5) + "T13:00:00Z", updated_at: now },
  { id: 6, org_id: 1, brand_id: 1, type: "social_post", title: "TikTok — Hillwalker Rain Test Script", status: "approved", platform: "tiktok", language: "en", category: "product", tags: ["hillwalker", "tiktok", "ugc"], scheduled_date: daysAgo(25), published_date: daysAgo(25), created_at: daysAgo(28) + "T15:00:00Z", updated_at: now },
  { id: 7, org_id: 1, brand_id: 1, type: "product_description", title: "Wandermoor Wind Smock — PDP Copy", status: "approved", platform: null, language: "en", category: "product", tags: ["wandermoor", "wind smock", "summer"], scheduled_date: daysAgo(38), published_date: daysAgo(38), created_at: daysAgo(42) + "T10:00:00Z", updated_at: now },
  { id: 8, org_id: 1, brand_id: 1, type: "email", title: "Summer Hiking Essentials — Pre-launch Teaser", status: "draft", platform: null, language: "en", category: "newsletter", tags: ["summer", "hiking", "tech tee"], scheduled_date: daysAgo(-5), published_date: null, created_at: daysAgo(3) + "T09:00:00Z", updated_at: now },
];

const brands = [
  { id: 1, org_id: 1, name: "Berghaus", description: "Outdoor clothing & equipment since 1966. Born in the North East of England.", voice_tone: "Confident, adventurous, authentic, no-nonsense", voice_style: "Direct and active. Short punchy sentences mixed with technical product detail. Heritage references woven naturally. British outdoor voice — never preachy, always practical.", primary_color: "#000000", secondary_color: "#FFB3C7", logo_url: null, created_at: daysAgo(90) + "T10:00:00Z", updated_at: now },
];

const templates = [
  { id: 1, org_id: null, name: "Seasonal Collection Launch", type: "ad_copy", industry: "outdoor_apparel", objective: "conversions", prompt_structure: "Write compelling ad copy for a new seasonal outdoor clothing collection launch. Emphasise technical features and adventure lifestyle...", variable_fields: { collection_name: "", key_products: "", season: "", price_from: "" }, example_output: "New Season. New Adventures. Lightweight, breathable gear built for the trail.", is_public: true, usage_count: 312, created_at: daysAgo(120) + "T10:00:00Z" },
  { id: 2, org_id: null, name: "Technical Product Feature", type: "ad_copy", industry: "outdoor_apparel", objective: "conversions", prompt_structure: "Write product-focused ad copy highlighting technical specifications and materials (Gore-Tex, Polartec, Hydroshell etc)...", variable_fields: { product_name: "", technology: "", benefit: "", price: "" }, example_output: "Two-layer Gore-Tex shell. Breathable. Waterproof. Built for British hills.", is_public: true, usage_count: 245, created_at: daysAgo(100) + "T10:00:00Z" },
  { id: 3, org_id: 1, name: "Heritage Brand Story", type: "social_post", industry: "outdoor_apparel", objective: "engagement", prompt_structure: "Create a social media post telling the story behind an iconic Berghaus product. Reference expeditions, heritage, and British outdoor culture...", variable_fields: { product_name: "", year: "", expedition: "" }, example_output: "In 1986, we designed the Trango for the British K2 expedition. An icon was born.", is_public: false, usage_count: 28, created_at: daysAgo(30) + "T10:00:00Z" },
  { id: 4, org_id: null, name: "UGC-Style TikTok Script", type: "social_post", industry: null, objective: "awareness", prompt_structure: "Write a short-form video script in UGC/POV style for outdoor clothing. Keep it authentic, Gen-Z friendly, not overly polished...", variable_fields: { product: "", scenario: "", hook: "" }, example_output: "POV: It starts raining and you're wearing a Hillwalker. *smiles in Gore-Tex*", is_public: true, usage_count: 189, created_at: daysAgo(60) + "T10:00:00Z" },
];

const audiences = [
  { id: 1, org_id: 1, name: "UK Hillwalkers & Hikers 30-60", type: "saved", platform: "meta", platform_audience_id: null, demographics_json: { age_min: 30, age_max: 60, genders: [1, 2], countries: ["GB"] }, interests_json: { keywords: ["hillwalking", "hiking", "Lake District", "Scottish Highlands", "Snowdonia", "Peak District"] }, behaviors_json: { keywords: ["outdoor gear shoppers"] }, size_estimate: 2800000, created_at: daysAgo(40) + "T10:00:00Z" },
  { id: 2, org_id: 1, name: "UK Trail Runners 18-40", type: "saved", platform: "meta", platform_audience_id: null, demographics_json: { age_min: 18, age_max: 40, genders: [1, 2], countries: ["GB"] }, interests_json: { keywords: ["trail running", "fell running", "ultramarathon", "parkrun"] }, behaviors_json: { keywords: ["fitness enthusiasts"] }, size_estimate: 1450000, created_at: daysAgo(38) + "T10:00:00Z" },
  { id: 3, org_id: 1, name: "Cart Abandoners — Last 14 Days", type: "custom", platform: "meta", platform_audience_id: "act_berghaus/audience_cart_14d", demographics_json: null, interests_json: null, behaviors_json: { event: "AddToCart", window: "14d" }, size_estimate: 45000, created_at: daysAgo(50) + "T10:00:00Z" },
  { id: 4, org_id: 1, name: "Product Page Browsers — Gore-Tex", type: "custom", platform: "meta", platform_audience_id: "act_berghaus/audience_goretex_browse", demographics_json: null, interests_json: null, behaviors_json: { event: "ViewContent", window: "30d", filter: "Gore-Tex" }, size_estimate: 128000, created_at: daysAgo(35) + "T10:00:00Z" },
  { id: 5, org_id: 1, name: "Ireland — Outdoor Enthusiasts", type: "saved", platform: "google", platform_audience_id: null, demographics_json: { countries: ["IE"] }, interests_json: { keywords: ["hiking", "outdoor activities", "camping", "waterproof clothing"] }, behaviors_json: null, size_estimate: 380000, created_at: daysAgo(30) + "T10:00:00Z" },
  { id: 6, org_id: 1, name: "Mountaineering Enthusiasts — UK", type: "saved", platform: "google", platform_audience_id: null, demographics_json: { age_min: 25, age_max: 55, countries: ["GB"] }, interests_json: { keywords: ["mountaineering", "climbing", "alpinism", "scrambling", "winter hiking"] }, behaviors_json: null, size_estimate: 620000, created_at: daysAgo(25) + "T10:00:00Z" },
];

const platformConnections = [
  { id: 1, org_id: 1, platform: "meta", platform_account_id: "act_berghaus_uk", account_name: "Berghaus UK — Meta Ads", status: "active", last_sync_at: daysAgo(0) + "T06:00:00Z", error_message: null, created_at: daysAgo(90) + "T10:00:00Z" },
  { id: 2, org_id: 1, platform: "google", platform_account_id: "842-119-5523", account_name: "Berghaus UK — Google Ads", status: "active", last_sync_at: daysAgo(0) + "T06:15:00Z", error_message: null, created_at: daysAgo(85) + "T10:00:00Z" },
  { id: 3, org_id: 1, platform: "tiktok", platform_account_id: "berghaus_uk_ads", account_name: "Berghaus UK — TikTok Ads", status: "active", last_sync_at: daysAgo(1) + "T12:00:00Z", error_message: null, created_at: daysAgo(60) + "T10:00:00Z" },
  { id: 4, org_id: 1, platform: "linkedin", platform_account_id: "urn:li:sponsoredAccount:berghaus", account_name: "Berghaus — LinkedIn", status: "active", last_sync_at: daysAgo(1) + "T14:00:00Z", error_message: null, created_at: daysAgo(45) + "T10:00:00Z" },
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
    return { ...c, ad_sets: sets, ai_suggestions: { recommended_budget_increase: "20%", suggested_audiences: ["lookalike_purchasers", "gore_tex_browsers"], creative_refresh: "Hillwalker 2.0 Gemini imagery performs 34% better than classic model" } };
  }},
  { method: "GET", pattern: /^\/campaigns\/(\d+)$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    return campaigns.find(c => c.id === id);
  }},
  { method: "POST", pattern: /^\/campaigns$/, handler: (_p, body: any) => ({ ...body, id: 9, org_id: 1, status: "draft", created_at: now, updated_at: now, platforms: [] }) },
  { method: "POST", pattern: /^\/campaigns\/\d+\/(submit|approve|launch|pause)$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    const action = path.split("/").pop();
    const statusMap: Record<string, string> = { submit: "review", approve: "approved", launch: "live", pause: "paused" };
    const c = campaigns.find(c => c.id === id);
    return c ? { ...c, status: statusMap[action!] || c.status } : null;
  }},
  { method: "POST", pattern: /^\/campaigns\/\d+\/push$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    return { campaign_id: id, status: "pushed", platform_results: { meta: { status: "pushed", meta_campaign_id: "c_berghaus_" + id }, google: { status: "pushed", google_resource: "customers/berghaus/campaigns/" + id } } };
  }},
  { method: "POST", pattern: /^\/campaigns\/\d+\/sync$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    return { campaign_id: id, synced_platforms: { meta: { status: "synced", platform_status: "active" }, google: { status: "synced", platform_status: "active" } } };
  }},
  { method: "POST", pattern: /^\/campaigns\/\d+\/duplicate$/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    const c = campaigns.find(c => c.id === id);
    return { original_id: id, new_id: 10, new_name: `${c?.name} (Copy)` };
  }},

  // Analytics
  { method: "GET", pattern: /^\/analytics\/overview/, handler: () => ({ summary: overviewSummary, by_platform: byPlatform, daily_trend: dailyTrend, top_campaigns: [] }) },
  { method: "GET", pattern: /^\/analytics\/compare/, handler: () => {
    const prevTrend = generateDailyTrend(30);
    const prev = { impressions: Math.round(totalImpressions * 0.82), clicks: Math.round(totalClicks * 0.88), conversions: Math.round(totalConversions * 0.76), spend: Math.round(totalSpend * 0.91 * 100) / 100, revenue: Math.round(totalRevenue * 0.72), ctr: 2.4, cpc: 0.58, cpm: 6.2, cpa: 19.8, roas: 2.8 };
    return { current: overviewSummary, previous: prev, changes: { impressions: 22.0, clicks: 13.6, conversions: 31.6, spend: 9.9, revenue: 38.9, ctr: 16.7, roas: 35.7 }, by_platform_current: byPlatform, by_platform_previous: byPlatform, daily_current: dailyTrend, daily_previous: prevTrend };
  }},
  { method: "GET", pattern: /^\/analytics\/top-campaigns/, handler: () => ({ campaigns: topCampaigns, total_campaigns: topCampaigns.length }) },
  { method: "GET", pattern: /^\/analytics\/campaigns\/\d+/, handler: (path) => {
    const id = parseInt(path.match(/\/campaigns\/(\d+)/)?.[1] || "0");
    const c = topCampaigns.find(tc => tc.campaign_id === id) || topCampaigns[0];
    return { campaign_id: id, campaign_name: c.campaign_name, summary: { impressions: c.impressions, clicks: c.clicks, conversions: c.conversions, spend: c.spend, revenue: c.revenue, ctr: c.ctr, cpc: Math.round(c.spend / c.clicks * 100) / 100, cpm: Math.round(c.spend / c.impressions * 100000) / 100, cpa: Math.round(c.spend / c.conversions * 100) / 100, roas: c.roas }, by_platform: { meta: byPlatform.meta, google: byPlatform.google }, daily_trend: dailyTrend.slice(0, 14), ad_set_breakdown: [{ ad_set_id: 1, ad_set_name: "UK — Outdoor Enthusiasts 25-54", platform: "meta", impressions: Math.round(c.impressions * 0.45), clicks: Math.round(c.clicks * 0.42), conversions: Math.round(c.conversions * 0.40), spend: Math.round(c.spend * 0.45), revenue: Math.round(c.revenue * 0.42), ctr: 2.8, roas: 3.6 }, { ad_set_id: 2, ad_set_name: "UK — Google Shopping & Search", platform: "google", impressions: Math.round(c.impressions * 0.38), clicks: Math.round(c.clicks * 0.40), conversions: Math.round(c.conversions * 0.42), spend: Math.round(c.spend * 0.38), revenue: Math.round(c.revenue * 0.44), ctr: 3.4, roas: 4.2 }, { ad_set_id: 5, ad_set_name: "TikTok — Young Hikers 18-35", platform: "tiktok", impressions: Math.round(c.impressions * 0.17), clicks: Math.round(c.clicks * 0.18), conversions: Math.round(c.conversions * 0.18), spend: Math.round(c.spend * 0.17), revenue: Math.round(c.revenue * 0.14), ctr: 1.9, roas: 2.3 }] };
  }},
  { method: "GET", pattern: /^\/analytics\/insights/, handler: () => aiInsights },
  { method: "POST", pattern: /^\/analytics\/export/, handler: () => "date,platform,impressions,clicks,spend,conversions,revenue\n2026-02-01,meta,162000,4860,2250.00,194,16490\n2026-02-01,google,128000,5376,2180.00,215,18275\n2026-02-02,meta,158000,4740,2190.00,185,15725\n" },

  // Content
  { method: "GET", pattern: /^\/content$/, handler: () => contentList },
  { method: "POST", pattern: /^\/content\/generate$/, handler: () => ({ content_id: 9, variants: [{ version: 1, headline: "New Season. New Adventures.", description: "Lightweight, breathable gear built for spring & summer trails. Free delivery over £80.", text: "The mountain doesn't care what you're wearing. But you should. Our Spring/Summer '26 collection brings sweat-wicking Tech Tees, ultralight wind smocks, and trail-ready shorts — all tested on Britain's toughest terrain. From the Lakes to the Highlands, gear up for the season ahead.", cta_text: "Shop New Season", brand_score: 94, brand_score_breakdown: { tone: 96, vocabulary: 92, style: 94 }, character_count: 310 }, { version: 2, headline: "Built for the Trail. Proven on the Mountain.", description: "Technical outdoor clothing engineered for every adventure. Berghaus Spring/Summer '26.", text: "Forty years of expedition heritage in every stitch. Our new season range pairs cutting-edge fabric technology with the no-nonsense durability Berghaus is known for. Polartec® fleeces. Gore-Tex® shells. Sweat-wicking baselayers. Whatever the forecast, you're ready.", cta_text: "Explore the Range", brand_score: 91, brand_score_breakdown: { tone: 93, vocabulary: 88, style: 92 }, character_count: 295 }, { version: 3, headline: "Less Weight. More Mountain.", description: "Ultralight layers that pack down small and perform big. New for SS26.", text: "Pack light, go further. Our Spring/Summer collection strips back the weight without cutting corners on performance. The Wandermoor Wind Smock weighs just 280g. The Tech Tee dries in half the time of cotton. And the Extrem shorts move with you on every scramble. This is outdoor clothing that works as hard as you do.", cta_text: "Shop SS26", brand_score: 88, brand_score_breakdown: { tone: 90, vocabulary: 85, style: 89 }, character_count: 345 }], model_used: "claude-sonnet-4-5-20250929", tokens_used: 2100 }) },

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
  { method: "GET", pattern: /^\/settings/, handler: () => ({ name: "Berghaus UK", billing_email: "digital@berghaus.com", plan_tier: "enterprise" }) },
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
