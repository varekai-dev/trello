import { UpdateBoardDto } from '@/app/api/boards/dto'
import { api } from '@/core/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Boards } from '@prisma/client'

const updateBoardFn = async (boardId: string, data: UpdateBoardDto) => {
  const { data: board } = await api.patch<Boards>(`api/boards/${boardId}`, data)
  return board
}

export const useUpdateBoardMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: { boardId: string; data: UpdateBoardDto }) => updateBoardFn(data.boardId, data.data),
    onMutate: async (data) => {
      queryClient.setQueryData(['boards', data.boardId], (old: Boards | undefined) => {
        if (!old) return
        return {
          ...old,
          ...data.data,
        }
      })
    },
  })
  return mutation
}
