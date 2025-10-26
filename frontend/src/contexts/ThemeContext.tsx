import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface ThemeContextType {
	isDark: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [isDark, setIsDark] = useState(() => {
		// Check if there's a saved preference
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('theme')
			if (saved === 'light' || saved === 'dark') {
				return saved === 'dark'
			}
		}
		return false // Default to LIGHT mode
	})

	useEffect(() => {
		const root = document.documentElement
		
		// Apply theme based on isDark state
		if (isDark) {
			root.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else {
			root.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		}
	}, [isDark])

	const toggleTheme = () => {
		setIsDark(prev => !prev)
	}

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

