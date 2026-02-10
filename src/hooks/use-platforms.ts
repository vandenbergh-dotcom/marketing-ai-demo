import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PlatformConnection } from "@/types";

export function usePlatformConnections() {
  return useQuery<PlatformConnection[]>({
    queryKey: ["platform-connections"],
    queryFn: () => api.get("/integrations"),
  });
}

export function useDisconnectPlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connectionId: number) => api.delete(`/integrations/${connectionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-connections"] });
    },
  });
}
