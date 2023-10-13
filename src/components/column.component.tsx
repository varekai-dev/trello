'use client'

import { ColumnPayload, useColumnQuery } from '@/hooks/use-column-query'
import { useUpdateColumnMutation } from '@/hooks/use-update-column-mutation'
import { Columns } from '@prisma/client'
import { DragEvent, useEffect, useRef, useState } from 'react'

interface ColumnProps {
  column: ColumnPayload
}

const MIN_WIDTH = 200

export function Column({ column }: ColumnProps) {
  const { data } = useColumnQuery({ initialData: column })

  const initialDragX = useRef<number>(0)
  const [width, setWidth] = useState(data.width)

  useEffect(() => {
    setWidth(data.width)
  }, [data.width])

  const onResizeStart = (e: DragEvent<HTMLDivElement>) => {
    initialDragX.current = e.clientX
  }

  const onResize = (e: DragEvent<HTMLDivElement>) => {
    const movedBy = e.clientX - initialDragX.current
    if (e.clientX === 0) return
    initialDragX.current = e.clientX
    setWidth((width) => {
      const newWidth = width + movedBy
      if (newWidth < MIN_WIDTH) return MIN_WIDTH
      return newWidth
    })
  }

  const { mutateAsync } = useUpdateColumnMutation()
  const onResizeEnd = async () => {
    await mutateAsync({
      columnId: data.id,
      data: { width },
    })
  }

  return (
    <div
      style={{
        minWidth: column.width,
        width,
      }}
      key={data.id}
      className="block w-full p-4 border rounded-lg shadow bg-gray-800 border-gray-700 relative roup/resize:hover:border-2"
    >
      <div>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
        <div
          className="absolute -right-px top-[0.5rem] bottom-[0.5rem] cursor-move w-px bg-gray-700 select-none opacity-0"
          draggable
          onDragStart={onResizeStart}
          onDrag={onResize}
          onDragEnd={onResizeEnd}
        />
      </div>
    </div>
  )
}
