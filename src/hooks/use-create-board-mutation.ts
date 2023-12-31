import { CrateBoardDto } from '@/app/api/boards/dto'
import { api } from '@/core/api'
import { Boards } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useBoardsQueryKey } from './use-boards-query'

const createBoardFn = async (board: CrateBoardDto) => {
  const { data } = await api.post<Boards>('api/boards', board)
  return data
}

export const useCreateBoardMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBoardFn,
    onSuccess: () => {
      queryClient.invalidateQueries(useBoardsQueryKey)
    },
  })

  return mutation
}
