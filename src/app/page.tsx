import { BoardsList } from '@/components'
import { prisma } from '@/core/prisma'
import { notFound } from 'next/navigation'

export default async function Home() {
	const boards = await prisma.boards.findMany()

	if (!boards) {
		return notFound()
	}

	return (
		<div className="container mx-auto">
			<BoardsList initialData={boards} />
		</div>
	)
}
