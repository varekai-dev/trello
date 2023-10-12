'use client'

import { BoardPayload, useBoardQuery } from '@/hooks/use-board-query'
import { CreateColumn } from './create-column.component'
import { Column } from '.'

interface ColumnsListProps {
  board: BoardPayload
}

export function ColumnsList({ board }: ColumnsListProps) {
  const { data } = useBoardQuery({
    initialData: board,
  })
  return (
    <div className="flex flex-1 gap-10 overflow-x-auto w-full h-content px-10 pb-5">
      {data.columns.map((column) => {
        return <Column key={column.id} column={column} />
      })}
      <CreateColumn boardId={board.id} />
    </div>
  )
}