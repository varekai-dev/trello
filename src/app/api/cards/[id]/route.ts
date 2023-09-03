import { NextResponse } from 'next/server'
import { updateCardDto } from '../dto'
import { prisma } from '@/core/prisma'

interface CardRouteContext {
	params: {
		id: string
	}
}

export async function PUT(req: Request, { params }: CardRouteContext) {
	const { id } = params
	const bodyRaw = await req.json()

	const validateBody = updateCardDto.safeParse(bodyRaw)

	if (!validateBody.success) {
		return NextResponse.json(validateBody.error.issues, { status: 400 })
	}

	const findCard = await prisma.cards.findUnique({
		where: {
			id,
		},
	})

	if (!findCard) {
		return NextResponse.json({
			code: 'not_found',
			message: 'Card not found',
		})
	}

	const card = await prisma.cards.update({
		where: {
			id,
		},
		data: validateBody.data,
	})

	return NextResponse.json(card)
}

export async function DELETE(req: Request, { params }: CardRouteContext) {
	const { id } = params

	const findCard = await prisma.cards.findUnique({
		where: {
			id,
		},
	})

	if (!findCard) {
		return NextResponse.json({
			code: 'not_found',
			message: 'Card not found',
		})
	}

	await prisma.cards.delete({
		where: {
			id,
		},
	})

	return NextResponse.json({})
}
