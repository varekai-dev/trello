import { ColumnsList } from '@/components'
import { api } from '@/core/api'
import { prisma } from '@/core/prisma'
import { Metadata } from 'next'

import { notFound } from 'next/navigation'

interface PageParams {
  id: string
}

interface PageProps {
  params: PageParams
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params
  const { data: metadata } = await api(`/api/boards/${id}/metadata`)

  return {
    title: `${metadata.title} | Trello Clone`,
  }
}

export default async function BoardPage(props: PageProps) {
  const board = await prisma.boards.findUnique({
    where: {
      id: props.params.id,
    },
    include: {
      columns: {
        orderBy: {
          order: 'asc',
        },
        include: {
          cards: true,
        },
      },
    },
  })

  if (!board) {
    return notFound()
  }

  return (
    <>
      <ColumnsList board={board} />
    </>
  )
}
