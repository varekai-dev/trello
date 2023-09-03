import { NextResponse } from 'next/server'
import { updateColumnOrderDto } from '../dto'
import { prisma } from '@/core/prisma'

export async function PUT(req: Request) {
	const bodyRaw = await req.json()
	const validateBody = updateColumnOrderDto.safeParse(bodyRaw)

	if (!validateBody.success) {
		return NextResponse.json(validateBody.error.issues, { status: 400 })
	}

	const queries = validateBody.data.map(({ id, order }) =>
		prisma.columns.update({
			where: {
				id,
			},
			data: {
				order,
			},
		})
	)

	await prisma.$transaction(queries)

	return NextResponse.json({})
}
