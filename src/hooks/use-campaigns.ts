import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  Campaign, CampaignDetail, AdSet, Ad, Audience,
  CampaignPushResult, CampaignSyncResult, CampaignDuplicateResult,
} from "@/types";

// --- Campaigns ---

export function useCampaigns(status?: string) {
  return useQuery<Campaign[]>({
    queryKey: ["campaigns", status],
    queryFn: () => {
      const params = status ? `?status=${status}` : "";
      return api.get(`/campaigns${params}`);
    },
  });
}

export function useCampaign(id: number) {
  return useQuery<Campaign>({
    queryKey: ["campaign", id],
    queryFn: () => api.get(`/campaigns/${id}`),
    enabled: !!id,
  });
}

export function useCampaignDetail(id: number) {
  return useQuery<CampaignDetail>({
    queryKey: ["campaign-detail", id],
    queryFn: () => api.get(`/campaigns/${id}/detail`),
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Campaign>) => api.post("/campaigns", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function useUpdateCampaign(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Campaign>) => api.put(`/campaigns/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", id] });
    },
  });
}

export function useCampaignAction(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (action: string) => api.post(`/campaigns/${id}/${action}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", id] });
    },
  });
}

// --- Campaign Actions: Push, Sync, Duplicate ---

export function usePushCampaign(id: number) {
  const queryClient = useQueryClient();
  return useMutation<CampaignPushResult, Error, { platforms?: string[] }>({
    mutationFn: (data) => api.post(`/campaigns/${id}/push`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function useSyncCampaign(id: number) {
  const queryClient = useQueryClient();
  return useMutation<CampaignSyncResult>({
    mutationFn: () => api.post(`/campaigns/${id}/sync`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", id] });
    },
  });
}

export function useDuplicateCampaign(id: number) {
  const queryClient = useQueryClient();
  return useMutation<CampaignDuplicateResult>({
    mutationFn: () => api.post(`/campaigns/${id}/duplicate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

// --- Ad Sets ---

export function useCreateAdSet(campaignId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdSet>) =>
      api.post(`/campaigns/${campaignId}/ad-sets`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", campaignId] });
    },
  });
}

export function useUpdateAdSet(campaignId: number, adSetId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdSet>) =>
      api.put(`/campaigns/${campaignId}/ad-sets/${adSetId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", campaignId] });
    },
  });
}

export function useDeleteAdSet(campaignId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adSetId: number) =>
      api.delete(`/campaigns/${campaignId}/ad-sets/${adSetId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", campaignId] });
    },
  });
}

// --- Ads ---

export function useCreateAd(campaignId: number, adSetId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Ad>) =>
      api.post(`/campaigns/${campaignId}/ad-sets/${adSetId}/ads`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", campaignId] });
    },
  });
}

export function useUpdateAd(campaignId: number, adSetId: number, adId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Ad>) =>
      api.put(`/campaigns/${campaignId}/ad-sets/${adSetId}/ads/${adId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", campaignId] });
    },
  });
}

export function useDeleteAd(campaignId: number, adSetId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adId: number) =>
      api.delete(`/campaigns/${campaignId}/ad-sets/${adSetId}/ads/${adId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign-detail", campaignId] });
    },
  });
}

// --- Audiences ---

export function useAudiences(platform?: string) {
  return useQuery<Audience[]>({
    queryKey: ["audiences", platform],
    queryFn: () => {
      const params = platform ? `?platform=${platform}` : "";
      return api.get(`/audiences${params}`);
    },
  });
}

export function useAudience(id: number) {
  return useQuery<Audience>({
    queryKey: ["audience", id],
    queryFn: () => api.get(`/audiences/${id}`),
    enabled: !!id,
  });
}

export function useCreateAudience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Audience>) => api.post("/audiences", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audiences"] });
    },
  });
}

export function useUpdateAudience(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Audience>) => api.put(`/audiences/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audiences"] });
      queryClient.invalidateQueries({ queryKey: ["audience", id] });
    },
  });
}

export function useDeleteAudience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/audiences/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audiences"] });
    },
  });
}
