import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

export function ThemeToggle() {
	const { isDark, toggleTheme } = useTheme()

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
			onClick={toggleTheme}
			title={isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
		>
			{isDark ? (
				<>
					<Moon size={18} className="text-blue-400" />
					<span className="font-medium">Switch to Light</span>
				</>
			) : (
				<>
					<Sun size={18} className="text-yellow-500" />
					<span className="font-medium">Switch to Dark</span>
				</>
			)}
		</motion.button>
	)
}

