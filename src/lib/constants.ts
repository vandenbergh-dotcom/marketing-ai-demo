export const PLATFORMS = {
  meta: { name: "Meta", color: "#1877F2" },
  google: { name: "Google", color: "#EA4335" },
  linkedin: { name: "LinkedIn", color: "#0A66C2" },
  tiktok: { name: "TikTok", color: "#000000" },
  pinterest: { name: "Pinterest", color: "#E60023" },
  twitter: { name: "Twitter/X", color: "#1DA1F2" },
} as const;

export const CAMPAIGN_OBJECTIVES = {
  awareness: "Brand Awareness",
  traffic: "Traffic",
  engagement: "Engagement",
  leads: "Lead Generation",
  conversions: "Conversions",
  sales: "Sales",
  app_installs: "App Installs",
} as const;

export const CONTENT_TYPES = {
  ad_copy: "Ad Copy",
  social_post: "Social Post",
  blog_article: "Blog Article",
  email: "Email",
  landing_page: "Landing Page",
  video_script: "Video Script",
  product_description: "Product Description",
} as const;
