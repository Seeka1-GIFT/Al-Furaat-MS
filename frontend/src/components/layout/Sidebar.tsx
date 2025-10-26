import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LayoutGrid, Users, User, CalendarCheck2, BookOpenText, Home, FileText, Briefcase, CreditCard, ArrowRightLeft, Gavel, ChevronDown, DollarSign } from 'lucide-react'

const nav = [
	{ to: '/dashboard', label: 'Dashboard', icon: Home },
	{ to: '/students', label: 'Students', icon: Users },
	{ to: '/teachers', label: 'Teachers', icon: User },
	{ to: '/employees', label: 'Employees', icon: Briefcase },
	{ to: '/classes', label: 'Classes', icon: LayoutGrid },
	{ to: '/attendance', label: 'Attendance', icon: CalendarCheck2 },
	{ to: '/financial-management', label: 'Financial', icon: DollarSign },
	{ to: '/examinations', label: 'Examinations', icon: FileText },
	{ to: '/id-cards', label: 'ID Cards', icon: CreditCard },
	{ to: '/transfers', label: 'Transfers', icon: ArrowRightLeft },
]

export function Sidebar() {
	const [disciplineOpen, setDisciplineOpen] = useState(false)
	
	return (
		<aside className="row-span-2 w-60 border-r border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
			<div className="h-14 flex items-center px-4 border-b border-gray-200/60 dark:border-gray-800/60">
				<Link to="/" className="font-bold tracking-tight text-gray-900 dark:text-gray-100">
					AF-SMS
				</Link>
			</div>
			<nav className="p-3 space-y-1">
				{nav.map(({ to, label, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
								isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium text-gray-900 dark:text-white' : ''
							}`
						}
					>
						<Icon size={16} />
						<span>{label}</span>
					</NavLink>
				))}
				
				{/* Discipline Section with Submenu */}
				<div className="space-y-1">
					<button
						onClick={() => setDisciplineOpen(!disciplineOpen)}
						className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
					>
						<Gavel size={16} />
						<span className="flex-1 text-left">Discipline</span>
						<ChevronDown size={16} className={`transition-transform ${disciplineOpen ? 'rotate-180' : ''}`} />
					</button>
					{disciplineOpen && (
						<div className="ml-8 space-y-1">
							<NavLink
								to="/discipline-form"
								className={({ isActive }) =>
									`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
										isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium text-gray-900 dark:text-white' : ''
									}`
								}
							>
								<FileText size={14} />
								<span>Discipline Form</span>
							</NavLink>
							<NavLink
								to="/view-discipline"
								className={({ isActive }) =>
									`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
										isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium text-gray-900 dark:text-white' : ''
									}`
								}
							>
								<FileText size={14} />
								<span>View Discipline</span>
							</NavLink>
						</div>
					)}
				</div>
			</nav>
		</aside>
	)
}


