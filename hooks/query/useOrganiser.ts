import { useQuery } from '@tanstack/react-query'
import { getOrganiser } from '@/actions/organiser'

export const useOrganiser = (id: string) => {
  return useQuery({
    queryKey: ['organiser', id],
    queryFn: () => getOrganiser(id),
    enabled: !!id,
  })
}
