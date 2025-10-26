import React from 'react'
import { ThemeToggle } from '../ThemeToggle'

export function Navbar() {
	return (
		<header className="h-14 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 sticky top-0 backdrop-blur z-50 flex items-center justify-between px-4">
			<h1 className="font-semibold text-gray-900 dark:text-gray-100">Al-Furaat SMS</h1>
			<ThemeToggle />
		</header>
	)
}


