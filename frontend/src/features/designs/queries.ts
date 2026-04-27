import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import type { DroneDesign } from '../../backend';
import { serializeDesign, deserializeDesign } from './serialization';
import type { DroneDesignConfig } from '../designer/types';

export function useListDesigns() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<DroneDesign[]>({
    queryKey: ['designs'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listDesigns();
      } catch (error: any) {
        if (error.message?.includes('Unauthorized')) {
          return [];
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetDesign(name: string) {
  const { actor } = useActor();

  return useQuery<DroneDesignConfig | null>({
    queryKey: ['design', name],
    queryFn: async () => {
      if (!actor || !name) return null;
      const design = await actor.getDesign(name);
      if (!design) return null;
      return deserializeDesign(design.designData);
    },
    enabled: !!actor && !!name,
  });
}

export function useSaveDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, config }: { name: string; config: DroneDesignConfig }) => {
      if (!actor) throw new Error('Not authenticated');
      const designData = serializeDesign(config);
      return actor.saveDesign(name, designData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
  });
}

export function useDeleteDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.deleteDesign(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
  });
}
