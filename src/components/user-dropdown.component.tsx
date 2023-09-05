'use client'

import { useClickAway } from '@uidotdev/usehooks'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const UserDropdown: FC = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownClasses = clsx({
		hidden: !isDropdownOpen,
		'absolute top-8 right-0': true,
	})

	const toggleDropDown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const dropdownRef = useClickAway<HTMLDivElement>(e => {
		const element = e.target as HTMLDivElement
		if (element.closest('#user-menu-button')) setIsDropdownOpen(false)
	})

	return (
		<div className="flex items-center relative">
			<button
				type="button"
				className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
				id="user-menu-button"
				aria-expanded="false"
				data-dropdown-toggle="user-dropdown"
				data-dropdown-placement="bottom"
				onClick={toggleDropDown}
			>
				<span className="sr-only">Open user menu</span>
				<Image
					src="/assets/profile-picture-3.jpg"
					width={32}
					height={32}
					alt="user photo"
					className="rounded-full w-8 h-8"
					id="user-avatar"
				/>
			</button>

			<div
				className={twMerge(
					'z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600',
					dropdownClasses
				)}
				id="user-dropdown"
				ref={dropdownRef}
			>
				<div className="px-4 py-3">
					<span className="block text-sm text-gray-900 dark:text-white">
						Bonnie Green
					</span>
					<span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
						name@flowbite.com
					</span>
				</div>
				<ul className="py-2" aria-labelledby="user-menu-button">
					<li>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						>
							Settings
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						>
							Earnings
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						>
							Sign out
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
