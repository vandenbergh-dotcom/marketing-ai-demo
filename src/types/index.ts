export interface Campaign {
  id: number;
  org_id: number;
  brand_id: number | null;
  name: string;
  objective: string;
  status: string;
  total_budget: number | null;
  daily_budget: number | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  platforms?: string[];
}

export interface AdSet {
  id: number;
  campaign_id: number;
  name: string;
  status: string;
  platform: string;
  platform_id: string | null;
  daily_budget: number | null;
  lifetime_budget: number | null;
  bid_strategy: string | null;
  targeting_json: Record<string, unknown> | null;
  created_at: string;
}

export interface Ad {
  id: number;
  ad_set_id: number;
  name: string;
  status: string;
  headline: string | null;
  description: string | null;
  cta: string | null;
  url: string | null;
  platform_ad_id: string | null;
  review_status: string | null;
  created_at: string;
}

export interface CampaignDetail extends Campaign {
  platforms: string[];
  ad_sets: (AdSet & { ads: Ad[] })[];
  ai_suggestions: Record<string, unknown> | null;
}

export interface Audience {
  id: number;
  org_id: number;
  name: string;
  type: string;
  platform: string;
  platform_audience_id: string | null;
  demographics_json: Record<string, unknown> | null;
  interests_json: Record<string, unknown> | null;
  behaviors_json: Record<string, unknown> | null;
  size_estimate: number | null;
  created_at: string;
}

export interface CampaignPushResult {
  campaign_id: number;
  status: string;
  platform_results: Record<string, Record<string, unknown>>;
}

export interface CampaignSyncResult {
  campaign_id: number;
  synced_platforms: Record<string, Record<string, unknown>>;
}

export interface CampaignDuplicateResult {
  original_id: number;
  new_id: number;
  new_name: string;
}

export interface Content {
  id: number;
  org_id: number;
  brand_id: number | null;
  type: string;
  title: string;
  status: string;
  platform: string | null;
  language: string;
  category: string | null;
  tags: string[] | null;
  scheduled_date: string | null;
  published_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentVersion {
  id: number;
  content_id: number;
  version_number: number;
  headline: string | null;
  description: string | null;
  body_text: string;
  cta_text: string | null;
  ai_model_used: string | null;
  brand_score: number | null;
  brand_score_breakdown: {
    tone: number;
    vocabulary: number;
    style: number;
  } | null;
  tokens_used: number | null;
  created_at: string;
}

export interface VariantDetail {
  version: number;
  headline: string | null;
  description: string | null;
  text: string;
  cta_text: string | null;
  brand_score: number | null;
  brand_score_breakdown: {
    tone: number;
    vocabulary: number;
    style: number;
  } | null;
  character_count: number | null;
}

export interface GenerateResponse {
  content_id: number;
  variants: VariantDetail[];
  model_used: string;
  tokens_used: number | null;
}

export interface ImageGenerateResponse {
  images: {
    id: number;
    url: string | null;
    thumbnail_url: string | null;
    prompt_used: string;
    revised_prompt?: string;
    error?: string;
  }[];
  model_used: string;
  cost_usd: number | null;
}

export interface ContentTemplate {
  id: number;
  org_id: number | null;
  name: string;
  type: string;
  industry: string | null;
  objective: string | null;
  prompt_structure: string;
  variable_fields: Record<string, unknown> | null;
  example_output: string | null;
  is_public: boolean;
  usage_count: number;
  created_at: string;
}

export interface ContentReview {
  id: number;
  content_id: number;
  reviewer_id: number | null;
  status: string;
  comment: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface Brand {
  id: number;
  org_id: number;
  name: string;
  description: string | null;
  voice_tone: string | null;
  voice_style: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrandTrainResult {
  brand_id: number;
  tone: string;
  style: string;
  vocabulary: string[];
  dos: string[];
  donts: string[];
  examples_stored: number;
}

export interface CalendarItem {
  id: number;
  title: string;
  type: string;
  platform: string | null;
  status: string;
  scheduled_date: string;
}

export interface PlatformConnection {
  id: number;
  org_id: number;
  platform: string;
  platform_account_id: string | null;
  account_name: string | null;
  status: string;
  last_sync_at: string | null;
  error_message: string | null;
  created_at: string;
}

export interface MetricSummary {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpm: number;
  cpa: number;
  roas: number;
}

export interface DailyTrend {
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

export interface AnalyticsOverview {
  summary: MetricSummary;
  by_platform: Record<string, MetricSummary>;
  daily_trend: DailyTrend[];
  top_campaigns: unknown[];
}

export interface ComparisonData {
  current: MetricSummary;
  previous: MetricSummary;
  changes: Record<string, number>;
  by_platform_current: Record<string, MetricSummary>;
  by_platform_previous: Record<string, MetricSummary>;
  daily_current: DailyTrend[];
  daily_previous: DailyTrend[];
}

export interface TopCampaignRow {
  campaign_id: number;
  campaign_name: string;
  status: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  roas: number;
  ctr: number;
}

export interface TopCampaignsData {
  campaigns: TopCampaignRow[];
  total_campaigns: number;
}

export interface CampaignAnalytics {
  campaign_id: number;
  campaign_name: string;
  summary: MetricSummary;
  by_platform: Record<string, MetricSummary>;
  daily_trend: DailyTrend[];
  ad_set_breakdown: {
    ad_set_id: number;
    ad_set_name: string;
    platform: string;
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    revenue: number;
    ctr: number;
    roas: number;
  }[];
}

export interface AIInsight {
  type: string;
  severity: string;
  title: string;
  description: string;
  metric: string | null;
  value: number | null;
  suggestion: string | null;
}

export interface AIInsightsData {
  insights: AIInsight[];
  generated_at: string;
  period: string;
}
