import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client, orpc } from '@/orpc/client';

export function useGroups(tournamentId: string) {
  return useQuery(orpc.group.list.queryOptions({ input: { tournamentId } }));
}

function useInvalidateGroups() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['tournament'] });
    queryClient.invalidateQueries({ queryKey: ['group'] });
  };
}

export function useCreateGroup(options?: { onSuccess?: () => void }) {
  const invalidate = useInvalidateGroups();

  return useMutation({
    mutationFn: (data: { name: string; tournamentId: string }) =>
      client.group.create(data),
    onSuccess: () => {
      invalidate();
      toast.success('Group created');
      options?.onSuccess?.();
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useUpdateGroup(options?: { onSuccess?: () => void }) {
  const invalidate = useInvalidateGroups();

  return useMutation({
    mutationFn: (data: { id: string; name: string }) =>
      client.group.update(data),
    onSuccess: () => {
      invalidate();
      toast.success('Group updated');
      options?.onSuccess?.();
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useDeleteGroup(options?: { onSuccess?: () => void }) {
  const invalidate = useInvalidateGroups();

  return useMutation({
    mutationFn: (data: { id: string }) => client.group.delete(data),
    onSuccess: () => {
      invalidate();
      toast.success('Group deleted');
      options?.onSuccess?.();
    },
    onError: (err) => toast.error(err.message),
  });
}
