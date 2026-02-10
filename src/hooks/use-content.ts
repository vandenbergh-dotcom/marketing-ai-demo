import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  Content, ContentVersion, ContentTemplate, Brand,
  GenerateResponse, ImageGenerateResponse, CalendarItem,
} from "@/types";

// --- Content List ---

export function useContentList(params?: {
  status?: string;
  type?: string;
  platform?: string;
  q?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set("status", params.status);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.platform) searchParams.set("platform", params.platform);
  if (params?.q) searchParams.set("q", params.q);
  const qs = searchParams.toString();

  return useQuery<Content[]>({
    queryKey: ["content", params],
    queryFn: () => api.get(`/content${qs ? `?${qs}` : ""}`),
  });
}

// --- Content Versions ---

export function useContentVersions(contentId: number | null) {
  return useQuery<ContentVersion[]>({
    queryKey: ["content-versions", contentId],
    queryFn: () => api.get(`/content/${contentId}/versions`),
    enabled: !!contentId,
  });
}

// --- Generate Content ---

export function useGenerateContent() {
  const queryClient = useQueryClient();
  return useMutation<GenerateResponse, Error, Record<string, unknown>>({
    mutationFn: (data) => api.post("/content/generate", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

// --- Generate A/B Variants ---

export function useGenerateVariants(contentId: number) {
  const queryClient = useQueryClient();
  return useMutation<GenerateResponse, Error, Record<string, unknown>>({
    mutationFn: (data) => api.post(`/content/${contentId}/variants`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-versions", contentId] });
    },
  });
}

// --- Generate Image ---

export function useGenerateImage() {
  return useMutation<ImageGenerateResponse, Error, Record<string, unknown>>({
    mutationFn: (data) => api.post("/content/generate-image", data),
  });
}

// --- Update Content ---

export function useUpdateContent(contentId: number) {
  const queryClient = useQueryClient();
  return useMutation<Content, Error, Record<string, unknown>>({
    mutationFn: (data) => api.put(`/content/${contentId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

// --- Delete Content ---

export function useDeleteContent() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (contentId) => api.delete(`/content/${contentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

// --- Templates ---

export function useTemplates(params?: { type?: string; industry?: string; q?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.type) searchParams.set("type", params.type);
  if (params?.industry) searchParams.set("industry", params.industry);
  if (params?.q) searchParams.set("q", params.q);
  const qs = searchParams.toString();

  return useQuery<ContentTemplate[]>({
    queryKey: ["templates", params],
    queryFn: () => api.get(`/content/templates${qs ? `?${qs}` : ""}`),
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation<ContentTemplate, Error, Record<string, unknown>>({
    mutationFn: (data) => api.post("/content/templates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
}

// --- Brands ---

export function useBrands() {
  return useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: () => api.get("/brands"),
  });
}

export function useTrainBrandVoice(brandId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { examples: string[]; description?: string }) =>
      api.post(`/brands/${brandId}/train-voice`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

// --- Calendar ---

export function useContentCalendar(startDate?: string, endDate?: string) {
  const searchParams = new URLSearchParams();
  if (startDate) searchParams.set("start_date", startDate);
  if (endDate) searchParams.set("end_date", endDate);
  const qs = searchParams.toString();

  return useQuery<CalendarItem[]>({
    queryKey: ["content-calendar", startDate, endDate],
    queryFn: () => api.get(`/content/calendar${qs ? `?${qs}` : ""}`),
  });
}

// --- Approval ---

export function useSubmitReview(contentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { reviewer_ids: number[] }) =>
      api.post(`/content/${contentId}/submit-review`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

export function useApproveContent(contentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data?: { comment?: string }) =>
      api.post(`/content/${contentId}/approve`, data || {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}
