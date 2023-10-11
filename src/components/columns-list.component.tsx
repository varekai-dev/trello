'use client'

import { BoardPayload, useBoardQuery } from '@/hooks/use-board-query'
import { CreateColumn } from './create-column.component'

interface ColumnsListProps {
	board: BoardPayload
}

export function ColumnsList({ board }: ColumnsListProps) {
	const { data } = useBoardQuery({
		initialData: board,
	})
	return (
		<div className="flex flex-1 gap-10 overflow-x-auto w-full h-content px-10 pb-5">
			{data.columns.map(column => {
				return (
					<div
						style={{
							minWidth: column.width,
						}}
						key={column.id}
						className="block w-full p-4 border rounded-lg shadow bg-gray-800 border-gray-700"
					>
						<div>
							<h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
								{column.title}
							</h5>
						</div>
					</div>
				)
			})}
			<CreateColumn boardId={board.id} />
		</div>
	)
}
