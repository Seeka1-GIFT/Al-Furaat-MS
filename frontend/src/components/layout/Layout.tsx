import React, { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export function Layout({ children }: PropsWithChildren) {
	return (
		<div className="min-h-dvh grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-white dark:bg-gray-950">
			<Sidebar />
			<div className="grid grid-rows-[auto_1fr]">
				<Navbar />
				<main className="p-6 bg-gray-50/50 dark:bg-gray-950">{children}</main>
			</div>
		</div>
	)
}


