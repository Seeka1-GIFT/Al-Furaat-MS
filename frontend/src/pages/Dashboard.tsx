import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
	BarChart3, Users, GraduationCap, Wallet, TrendingUp, TrendingDown,
	CalendarCheck, BookOpen, Plus, Bell, FileText, X, CheckCircle
} from 'lucide-react'
import { 
	LineChart, Line, BarChart, Bar, AreaChart, Area,
	XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'

// Mock data for charts
const attendanceData = [
	{ name: 'Mon', present: 1150, absent: 90 },
	{ name: 'Tue', present: 1180, absent: 60 },
	{ name: 'Wed', present: 1200, absent: 40 },
	{ name: 'Thu', present: 1190, absent: 50 },
	{ name: 'Fri', present: 1175, absent: 65 },
]

const revenueData = [
	{ month: 'Jan', revenue: 65000, expenses: 45000 },
	{ month: 'Feb', revenue: 72000, expenses: 48000 },
	{ month: 'Mar', revenue: 68000, expenses: 46000 },
	{ month: 'Apr', revenue: 78000, expenses: 52000 },
	{ month: 'May', revenue: 84200, expenses: 54000 },
]

const enrollmentData = [
	{ month: 'Jan', students: 1100 },
	{ month: 'Feb', students: 1150 },
	{ month: 'Mar', students: 1180 },
	{ month: 'Apr', students: 1210 },
	{ month: 'May', students: 1240 },
]

const notifications = [
	{ id: 1, title: 'New student registered', message: 'Ahmed Hassan has been registered to Grade 10A', time: '5 min ago', type: 'info' },
	{ id: 2, title: 'Attendance marked', message: 'Daily attendance has been completed', time: '1 hour ago', type: 'success' },
	{ id: 3, title: 'Fee payment pending', message: '15 students have pending fee payments', time: '2 hours ago', type: 'warning' },
]

export default function Dashboard() {
	const navigate = useNavigate()
	const [showNotifications, setShowNotifications] = useState(false)
	const [showQuickAction, setShowQuickAction] = useState<string | null>(null)

	const stats = [
		{ 
			label: 'Total Students', 
			value: '1,240', 
			icon: Users, 
			change: '+12%', 
			trending: 'up',
			bgColor: 'bg-blue-100 dark:bg-blue-900/30',
			iconColor: 'text-blue-600 dark:text-blue-400',
			onClick: () => navigate('/students')
		},
		{ 
			label: 'Total Teachers', 
			value: '62', 
			icon: GraduationCap, 
			change: '+3%', 
			trending: 'up',
			bgColor: 'bg-green-100 dark:bg-green-900/30',
			iconColor: 'text-green-600 dark:text-green-400',
			onClick: () => navigate('/teachers')
		},
		{ 
			label: 'Monthly Revenue', 
			value: '$84.2K', 
			icon: Wallet, 
			change: '+8%', 
			trending: 'up',
			bgColor: 'bg-purple-100 dark:bg-purple-900/30',
			iconColor: 'text-purple-600 dark:text-purple-400',
			onClick: () => {}
		},
		{ 
			label: 'Attendance Rate', 
			value: '96.8%', 
			icon: CalendarCheck, 
			change: '-1.2%', 
			trending: 'down',
			bgColor: 'bg-orange-100 dark:bg-orange-900/30',
			iconColor: 'text-orange-600 dark:text-orange-400',
			onClick: () => navigate('/attendance')
		},
	]

	const quickActions = [
		{
			id: 'add-student',
			label: 'Add New Student',
			icon: Plus,
			iconColor: 'text-blue-500',
			action: () => navigate('/students'),
			description: 'Register a new student to the system'
		},
		{
			id: 'mark-attendance',
			label: 'Mark Attendance',
			icon: CalendarCheck,
			iconColor: 'text-green-500',
			action: () => navigate('/attendance'),
			description: 'Record student attendance for today'
		},
		{
			id: 'generate-report',
			label: 'Generate Report',
			icon: FileText,
			iconColor: 'text-purple-500',
			action: () => navigate('/reports'),
			description: 'Create detailed reports and analytics'
		},
		{
			id: 'view-timetable',
			label: 'View Timetable',
			icon: BookOpen,
			iconColor: 'text-orange-500',
			action: () => navigate('/classes'),
			description: 'Check class schedules and timetables'
		},
	]

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="relative">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowNotifications(!showNotifications)}
							className="relative inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
						>
							<Bell size={16} />
							<span className="hidden sm:inline">Notifications</span>
							{notifications.length > 0 && (
								<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
									{notifications.length}
								</span>
							)}
						</motion.button>

						{/* Notifications Dropdown */}
						<AnimatePresence>
							{showNotifications && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-hidden"
								>
									<div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
										<h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
										<button
											onClick={() => setShowNotifications(false)}
											className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
										>
											<X size={18} />
										</button>
									</div>
									<div className="max-h-96 overflow-y-auto">
										{notifications.map((notification) => (
											<motion.div
												key={notification.id}
												whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
												className="p-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0 cursor-pointer"
											>
												<div className="flex items-start gap-3">
													<div className={`mt-1 p-1 rounded-full ${
														notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
														notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
														'bg-blue-100 dark:bg-blue-900/30'
													}`}>
														<CheckCircle size={14} className={
															notification.type === 'success' ? 'text-green-600' :
															notification.type === 'warning' ? 'text-yellow-600' :
															'text-blue-600'
														} />
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium text-gray-900 dark:text-white">
															{notification.title}
														</p>
														<p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
															{notification.message}
														</p>
														<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
															{notification.time}
														</p>
													</div>
												</div>
											</motion.div>
										))}
									</div>
									<div className="p-3 bg-gray-50 dark:bg-gray-800/50 text-center">
										<button className="text-xs text-primary hover:underline font-medium">
											View All Notifications
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat, index) => {
					const Icon = stat.icon
					const TrendIcon = stat.trending === 'up' ? TrendingUp : TrendingDown
					return (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							whileHover={{ scale: 1.02, y: -5 }}
							onClick={stat.onClick}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur cursor-pointer hover:shadow-lg transition-shadow"
						>
							<div className="flex items-center justify-between mb-4">
								<div className={`rounded-lg p-2 ${stat.bgColor}`}>
									<Icon size={20} className={stat.iconColor} />
								</div>
								<div className={`flex items-center gap-1 text-xs font-medium ${
									stat.trending === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
								}`}>
									<TrendIcon size={14} />
									<span>{stat.change}</span>
								</div>
							</div>
							<div>
								<p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
							</div>
						</motion.div>
					)
				})}
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Weekly Attendance Chart */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weekly Attendance</h3>
						<button 
							onClick={() => navigate('/attendance')}
							className="text-xs text-primary hover:underline font-medium"
						>
							View Details
						</button>
					</div>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={attendanceData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
							<XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
							<YAxis stroke="#9CA3AF" fontSize={12} />
							<Tooltip 
								contentStyle={{ 
									backgroundColor: '#1F2937', 
									border: 'none', 
									borderRadius: '8px',
									color: '#F9FAFB'
								}} 
							/>
							<Legend />
							<Bar dataKey="present" fill="#10B981" name="Present" radius={[4, 4, 0, 0]} />
							<Bar dataKey="absent" fill="#EF4444" name="Absent" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</motion.div>

				{/* Monthly Revenue Chart */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Revenue Overview</h3>
						<button 
							onClick={() => navigate('/reports')}
							className="text-xs text-primary hover:underline font-medium"
						>
							View Details
						</button>
					</div>
					<ResponsiveContainer width="100%" height={250}>
						<AreaChart data={revenueData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
							<XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
							<YAxis stroke="#9CA3AF" fontSize={12} />
							<Tooltip 
								contentStyle={{ 
									backgroundColor: '#1F2937', 
									border: 'none', 
									borderRadius: '8px',
									color: '#F9FAFB'
								}} 
							/>
							<Legend />
							<Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Revenue" />
							<Area type="monotone" dataKey="expenses" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.4} name="Expenses" />
						</AreaChart>
					</ResponsiveContainer>
				</motion.div>
			</div>

			{/* Enrollment Trend & Quick Actions */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Enrollment Trend */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="lg:col-span-2 rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Student Enrollment Trend</h3>
						<button 
							onClick={() => navigate('/students')}
							className="text-xs text-primary hover:underline font-medium"
						>
							View Details
						</button>
					</div>
					<ResponsiveContainer width="100%" height={200}>
						<LineChart data={enrollmentData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
							<XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
							<YAxis stroke="#9CA3AF" fontSize={12} />
							<Tooltip 
								contentStyle={{ 
									backgroundColor: '#1F2937', 
									border: 'none', 
									borderRadius: '8px',
									color: '#F9FAFB'
								}} 
							/>
							<Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} name="Students" />
						</LineChart>
					</ResponsiveContainer>
				</motion.div>

				{/* Quick Actions */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Actions</h3>
					<div className="space-y-2">
						{quickActions.map((action, index) => {
							const Icon = action.icon
							return (
								<motion.button
									key={action.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.6 + index * 0.1 }}
									whileHover={{ scale: 1.02, x: 5 }}
									whileTap={{ scale: 0.98 }}
									onClick={action.action}
									onMouseEnter={() => setShowQuickAction(action.id)}
									onMouseLeave={() => setShowQuickAction(null)}
									className="w-full flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left relative group"
								>
									<Icon size={16} className={action.iconColor} />
									<span className="text-gray-900 dark:text-gray-100 font-medium">{action.label}</span>
									
									{/* Tooltip */}
									{showQuickAction === action.id && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap z-10 pointer-events-none"
										>
											{action.description}
											<div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
										</motion.div>
									)}
								</motion.button>
							)
						})}
					</div>
				</motion.div>
			</div>

		</div>
	)
}

