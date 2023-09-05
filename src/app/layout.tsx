import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Trello Clone',
	description: 'Trello Clone build with Next.js and Tailwind CSS',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="dark">{children}</body>
		</html>
	)
}
