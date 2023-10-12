'use client'

import { Columns } from '@prisma/client'
import { DragEvent, useRef, useState } from 'react'

interface ColumnProps {
  column: Columns
}

const MIN_WIDTH = 200

export function Column({ column }: ColumnProps) {
  const initialDragX = useRef<number>(0)
  const [width, setWidth] = useState(column.width)

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

  return (
    <div
      style={{
        minWidth: column.width,
        width,
      }}
      key={column.id}
      className="block w-full p-4 border rounded-lg shadow bg-gray-800 border-gray-700 relative roup/resize:hover:border-2"
    >
      <div>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{column.title}</h5>
        <div
          className="absolute -right-px top-[0.5rem] bottom-[0.5rem] cursor-move w-px bg-gray-700 select-none opacity-0"
          draggable
          onDragStart={onResizeStart}
          onDrag={onResize}
        />
      </div>
    </div>
  )
}
