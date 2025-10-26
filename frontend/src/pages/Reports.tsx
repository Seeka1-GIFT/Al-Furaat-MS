import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, BookOpen, GraduationCap, UserCheck, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function Reports() {
	const [selectedReport, setSelectedReport] = useState<string>('overview')
	const [dateRange, setDateRange] = useState('month')
	
	const reportTypes = [
		{ id: 'overview', label: 'Overview', icon: Activity },
		{ id: 'students', label: 'Students Report', icon: Users },
		{ id: 'academics', label: 'Academic Performance', icon: BookOpen },
		{ id: 'attendance', label: 'Attendance Report', icon: UserCheck },
		{ id: 'financial', label: 'Financial Report', icon: DollarSign },
		{ id: 'exams', label: 'Examinations Report', icon: GraduationCap },
	]

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">Reports & Statistics</h2>
					<p className="text-gray-600 dark:text-gray-400">Comprehensive reports and analytics</p>
				</div>
				<div className="flex items-center gap-3">
					<select
						value={dateRange}
						onChange={(e) => setDateRange(e.target.value)}
						className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
					>
						<option value="week">This Week</option>
						<option value="month">This Month</option>
						<option value="quarter">This Quarter</option>
						<option value="year">This Year</option>
						<option value="custom">Custom Range</option>
					</select>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
					>
						<Download size={16} />
						Export All
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						<FileText size={16} />
						Generate Report
					</motion.button>
				</div>
			</div>

			{/* Report Type Selection */}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
				{reportTypes.map((type) => (
					<motion.button
						key={type.id}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => setSelectedReport(type.id)}
						className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
							selectedReport === type.id
								? 'border-primary bg-primary/10 text-primary'
								: 'border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 hover:border-primary/50'
						}`}
					>
						<type.icon size={24} />
						<span className="text-xs font-medium text-center">{type.label}</span>
					</motion.button>
				))}
			</div>

			{/* Overview Report */}
			{selectedReport === 'overview' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					{/* Key Metrics */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<div className="flex items-center justify-between mb-2">
								<div className="rounded-lg p-2 bg-blue-100 dark:bg-blue-900">
									<Users size={20} className="text-blue-600 dark:text-blue-400" />
								</div>
								<span className="text-xs text-green-600 flex items-center gap-1">
									<TrendingUp size={12} />
									12%
								</span>
							</div>
							<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,245</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
						</div>

						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<div className="flex items-center justify-between mb-2">
								<div className="rounded-lg p-2 bg-green-100 dark:bg-green-900">
									<UserCheck size={20} className="text-green-600 dark:text-green-400" />
								</div>
								<span className="text-xs text-green-600 flex items-center gap-1">
									<TrendingUp size={12} />
									5%
								</span>
							</div>
							<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">87.3%</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</p>
						</div>

						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<div className="flex items-center justify-between mb-2">
								<div className="rounded-lg p-2 bg-purple-100 dark:bg-purple-900">
									<GraduationCap size={20} className="text-purple-600 dark:text-purple-400" />
								</div>
								<span className="text-xs text-red-600 flex items-center gap-1">
									<TrendingDown size={12} />
									2%
								</span>
							</div>
							<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">78.5%</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">Pass Rate</p>
						</div>

						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<div className="flex items-center justify-between mb-2">
								<div className="rounded-lg p-2 bg-orange-100 dark:bg-orange-900">
									<DollarSign size={20} className="text-orange-600 dark:text-orange-400" />
								</div>
								<span className="text-xs text-green-600 flex items-center gap-1">
									<TrendingUp size={12} />
									18%
								</span>
							</div>
							<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$124K</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">Revenue (Month)</p>
						</div>
					</div>

					{/* Charts Section */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Enrollment Trend */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<TrendingUp size={20} className="text-primary" />
								Enrollment Trend
							</h3>
							<div className="h-64 flex items-end justify-around gap-2">
								{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
									const height = 40 + Math.random() * 50
									return (
										<div key={month} className="flex-1 flex flex-col items-center gap-2">
											<div className="text-xs font-semibold">{Math.floor(200 + idx * 50)}</div>
											<div className="w-full bg-gradient-to-t from-primary to-purple-600 rounded-t hover:opacity-80 transition-opacity cursor-pointer" style={{ height: `${height}%` }} />
											<span className="text-xs text-gray-600 dark:text-gray-400">{month}</span>
										</div>
									)
								})}
							</div>
						</div>

						{/* Grade Distribution */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<BarChart3 size={20} className="text-primary" />
								Grade Distribution
							</h3>
							<div className="space-y-4">
								{[
									{ grade: 'A (90-100%)', count: 245, percentage: 19.7, color: 'bg-green-500' },
									{ grade: 'B (80-89%)', count: 412, percentage: 33.1, color: 'bg-blue-500' },
									{ grade: 'C (70-79%)', count: 378, percentage: 30.4, color: 'bg-yellow-500' },
									{ grade: 'D (60-69%)', count: 156, percentage: 12.5, color: 'bg-orange-500' },
									{ grade: 'F (Below 60%)', count: 54, percentage: 4.3, color: 'bg-red-500' },
								].map((item) => (
									<div key={item.grade}>
										<div className="flex justify-between text-sm mb-2">
											<span className="font-medium">{item.grade}</span>
											<span className="text-gray-600 dark:text-gray-400">{item.count} students ({item.percentage}%)</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
											<div
												className={`${item.color} h-3 rounded-full transition-all`}
												style={{ width: `${item.percentage}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Detailed Statistics */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Class Performance */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<BookOpen size={20} className="text-primary" />
								Top Performing Classes
							</h3>
							<div className="space-y-3">
								{[
									{ class: 'Grade 10A', avg: 88.5, students: 45 },
									{ class: 'Grade 11B', avg: 86.2, students: 42 },
									{ class: 'Grade 9C', avg: 84.7, students: 48 },
									{ class: 'Grade 12A', avg: 83.1, students: 38 },
									{ class: 'Grade 8B', avg: 81.9, students: 50 },
								].map((item, idx) => (
									<div key={item.class} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
											{idx + 1}
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium">{item.class}</p>
											<p className="text-xs text-gray-500">{item.students} students</p>
										</div>
										<span className="text-sm font-semibold text-green-600">{item.avg}%</span>
									</div>
								))}
							</div>
						</div>

						{/* Attendance Summary */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<UserCheck size={20} className="text-primary" />
								Attendance Overview
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
									<span className="text-sm flex items-center gap-2">
										<CheckCircle size={16} className="text-green-600" />
										Present
									</span>
									<span className="font-semibold text-green-700 dark:text-green-400">1,087 (87.3%)</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
									<span className="text-sm flex items-center gap-2">
										<XCircle size={16} className="text-red-600" />
										Absent
									</span>
									<span className="font-semibold text-red-700 dark:text-red-400">98 (7.9%)</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
									<span className="text-sm flex items-center gap-2">
										<Clock size={16} className="text-yellow-600" />
										Late
									</span>
									<span className="font-semibold text-yellow-700 dark:text-yellow-400">42 (3.4%)</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
									<span className="text-sm flex items-center gap-2">
										<AlertCircle size={16} className="text-blue-600" />
										Excused
									</span>
									<span className="font-semibold text-blue-700 dark:text-blue-400">18 (1.4%)</span>
								</div>
							</div>
						</div>

						{/* Financial Summary */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<DollarSign size={20} className="text-primary" />
								Financial Summary
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
									<span className="text-sm font-medium">Total Revenue</span>
									<span className="text-lg font-bold text-green-600">$124,500</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
									<span className="text-sm font-medium">Collected</span>
									<span className="text-lg font-bold text-blue-600">$98,750</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
									<span className="text-sm font-medium">Pending</span>
									<span className="text-lg font-bold text-orange-600">$25,750</span>
								</div>
								<div className="pt-3 border-t border-gray-200 dark:border-gray-700">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Collection Rate</span>
										<span className="font-semibold text-primary">79.3%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Students Report */}
			{selectedReport === 'students' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="font-semibold mb-4">Student Statistics</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-sm text-gray-600">Total Students</span>
									<span className="font-semibold">1,245</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600">Male Students</span>
									<span className="font-semibold">678 (54.5%)</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600">Female Students</span>
									<span className="font-semibold">567 (45.5%)</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600">New Admissions</span>
									<span className="font-semibold text-green-600">142</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-gray-600">Dropouts</span>
									<span className="font-semibold text-red-600">12</span>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="font-semibold mb-4">Grade-wise Distribution</h3>
							<div className="space-y-3">
								{[
									{ grade: 'Grade 8', count: 210 },
									{ grade: 'Grade 9', count: 198 },
									{ grade: 'Grade 10', count: 215 },
									{ grade: 'Grade 11', count: 208 },
									{ grade: 'Grade 12', count: 185 },
									{ grade: 'Others', count: 229 },
								].map((item) => (
									<div key={item.grade}>
										<div className="flex justify-between text-sm mb-1">
											<span>{item.grade}</span>
											<span className="font-medium">{item.count} students</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
											<div
												className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
												style={{ width: `${(item.count / 1245) * 100}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="font-semibold mb-4">Category Breakdown</h3>
							<div className="space-y-3">
								<div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
									<div className="flex justify-between mb-1">
										<span className="text-sm font-medium">Regular Students</span>
										<span className="font-bold text-blue-600">1,089</span>
									</div>
									<div className="text-xs text-gray-600">87.5% of total</div>
								</div>
								<div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
									<div className="flex justify-between mb-1">
										<span className="text-sm font-medium">Charity Students</span>
										<span className="font-bold text-purple-600">156</span>
									</div>
									<div className="text-xs text-gray-600">12.5% of total</div>
								</div>
								<div className="text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
									<div className="flex justify-between">
										<span>Orphan Students</span>
										<span className="font-medium">89</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold">Export Student Reports</h3>
							<div className="flex gap-2">
								<button className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
									<Download size={16} className="inline mr-2" />
									Excel
								</button>
								<button className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
									<Download size={16} className="inline mr-2" />
									PDF
								</button>
							</div>
						</div>
						<p className="text-sm text-gray-600">Generate detailed student reports including personal information, academic records, and attendance history.</p>
					</div>
				</motion.div>
			)}

			{/* Academic Performance Report */}
			{selectedReport === 'academics' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h3 className="text-lg font-semibold mb-6">Academic Performance Overview</h3>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
								<div className="text-3xl font-bold text-green-600">78.5%</div>
								<div className="text-sm text-gray-600 mt-1">Average Pass Rate</div>
							</div>
							<div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
								<div className="text-3xl font-bold text-blue-600">74.2</div>
								<div className="text-sm text-gray-600 mt-1">Average Score</div>
							</div>
							<div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
								<div className="text-3xl font-bold text-purple-600">245</div>
								<div className="text-sm text-gray-600 mt-1">A Grade Students</div>
							</div>
							<div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
								<div className="text-3xl font-bold text-orange-600">54</div>
								<div className="text-sm text-gray-600 mt-1">Need Attention</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="font-semibold mb-4">Subject-wise Performance</h3>
							<div className="space-y-3">
								{[
									{ subject: 'Mathematics', avg: 82.5, pass: 85 },
									{ subject: 'English', avg: 78.2, pass: 88 },
									{ subject: 'Science', avg: 76.8, pass: 82 },
									{ subject: 'Social Studies', avg: 74.5, pass: 79 },
									{ subject: 'Arabic', avg: 71.2, pass: 76 },
								].map((item) => (
									<div key={item.subject}>
										<div className="flex justify-between text-sm mb-1">
											<span className="font-medium">{item.subject}</span>
											<span>Avg: {item.avg}% | Pass: {item.pass}%</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
											<div
												className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
												style={{ width: `${item.avg}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="font-semibold mb-4">Performance Trends</h3>
							<div className="h-48 flex items-end justify-around gap-2">
								{['Term 1', 'Term 2', 'Term 3', 'Term 4'].map((term, idx) => {
									const height = 60 + idx * 8
									return (
										<div key={term} className="flex-1 flex flex-col items-center gap-2">
											<div className="text-xs font-semibold">{70 + idx * 3}%</div>
											<div className="w-full bg-gradient-to-t from-green-500 to-green-600 rounded-t hover:opacity-80 transition-opacity cursor-pointer" style={{ height: `${height}%` }} />
											<span className="text-xs text-gray-600 dark:text-gray-400">{term}</span>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Other report types placeholders */}
			{['attendance', 'financial', 'exams'].includes(selectedReport) && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-12 text-center"
				>
					<FileText size={48} className="mx-auto mb-4 text-gray-400" />
					<h3 className="text-xl font-semibold mb-2">
						{reportTypes.find(r => r.id === selectedReport)?.label}
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Detailed {selectedReport} reports will be displayed here
					</p>
					<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90">
						<FileText size={16} />
						Generate {reportTypes.find(r => r.id === selectedReport)?.label}
					</button>
				</motion.div>
			)}
		</div>
	)
}





