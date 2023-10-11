import { api } from '@/core/api'
import { Columns } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createColumnDto as CreateColumnOriginal } from '@/app/api/columns/dto'
import { BoardPayload } from './use-board-query'

type CreateColumnDto = Omit<CreateColumnOriginal, 'width'>

const createColumnFn = async (column: CreateColumnDto) => {
  const { data } = await api.post<Columns>('api/columns', column)
  return data
}

interface UseCreateColumnMutationOptions {
  boardId: string
}

export const useCreateColumnMutation = ({ boardId }: UseCreateColumnMutationOptions) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createColumnFn,
    onSuccess: (newColumn) => {
      queryClient.setQueryData<BoardPayload | undefined>(['board', boardId], (oldData) => {
        if (!oldData) return
        return {
          ...oldData,
          columns: [
            ...oldData.columns,
            {
              ...newColumn,
              cards: [],
            },
          ],
        }
      })
    },
  })

  return mutation
}
