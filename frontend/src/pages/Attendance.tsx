import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Calendar, CheckCircle, XCircle, Clock, Download, BarChart3, Users, TrendingUp, AlertCircle, FileText, CalendarDays } from 'lucide-react'

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused'

interface AttendanceRecord {
	id: number
	student: string
	rollNumber: string
	class: string
	date: string
	status: AttendanceStatus
	time: string
	remarks?: string
}

export default function Attendance() {
	const [activeTab, setActiveTab] = useState<'mark' | 'records' | 'reports' | 'analytics'>('mark')
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
	const [selectedClass, setSelectedClass] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	
	// Mock data - would come from API
	const classes = ['10A', '9B', '11C', '8A', '7A', '12B']
	
	const students = [
		{ id: 1, name: 'Ahmed Hassan', rollNumber: 'STU001', class: '10A', status: 'Present' as AttendanceStatus },
		{ id: 2, name: 'Fatima Ali', rollNumber: 'STU002', class: '10A', status: 'Present' as AttendanceStatus },
		{ id: 3, name: 'Omar Mohamed', rollNumber: 'STU003', class: '10A', status: 'Present' as AttendanceStatus },
		{ id: 4, name: 'Aisha Ibrahim', rollNumber: 'STU004', class: '10A', status: 'Present' as AttendanceStatus },
		{ id: 5, name: 'Hassan Abdi', rollNumber: 'STU005', class: '10A', status: 'Present' as AttendanceStatus },
		{ id: 6, name: 'Mariam Yusuf', rollNumber: 'STU006', class: '10A', status: 'Present' as AttendanceStatus },
	]
	
	const [attendanceData, setAttendanceData] = useState(students)
	
	const attendanceRecords: AttendanceRecord[] = [
		{ id: 1, student: 'Ahmed Hassan', rollNumber: 'STU001', class: '10A', date: '2024-01-15', status: 'Present', time: '08:15' },
		{ id: 2, student: 'Fatima Ali', rollNumber: 'STU002', class: '9B', date: '2024-01-15', status: 'Absent', time: '08:20', remarks: 'Sick' },
		{ id: 3, student: 'Omar Mohamed', rollNumber: 'STU003', class: '11C', date: '2024-01-15', status: 'Present', time: '08:10' },
		{ id: 4, student: 'Aisha Ibrahim', rollNumber: 'STU004', class: '8A', date: '2024-01-15', status: 'Late', time: '08:25', remarks: 'Traffic' },
		{ id: 5, student: 'Hassan Abdi', rollNumber: 'STU005', class: '10A', date: '2024-01-14', status: 'Present', time: '08:12' },
		{ id: 6, student: 'Mariam Yusuf', rollNumber: 'STU006', class: '9B', date: '2024-01-14', status: 'Excused', time: '08:00', remarks: 'Medical appointment' },
	]
	
	const handleStatusChange = (studentId: number, newStatus: AttendanceStatus) => {
		setAttendanceData(prev => 
			prev.map(student => 
				student.id === studentId ? { ...student, status: newStatus } : student
			)
		)
	}
	
	const handleSaveAttendance = () => {
		alert('Attendance saved successfully!')
		console.log('Saving attendance:', attendanceData)
	}

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Present':
				return <CheckCircle size={16} className="text-green-500" />
			case 'Absent':
				return <XCircle size={16} className="text-red-500" />
			case 'Late':
				return <Clock size={16} className="text-yellow-500" />
			default:
				return <Clock size={16} className="text-gray-500" />
		}
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Present':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			case 'Absent':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
			case 'Late':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">Attendance Management</h2>
					<p className="text-gray-600 dark:text-gray-400">Track, manage and analyze student attendance</p>
				</div>
				<div className="flex items-center gap-3">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
					>
						<Download size={16} />
						Export Report
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
			
			{/* Tabs */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav className="-mb-px flex space-x-8">
					{[
						{ id: 'mark', label: 'Mark Attendance', icon: Calendar },
						{ id: 'records', label: 'Attendance Records', icon: FileText },
						{ id: 'reports', label: 'Reports', icon: BarChart3 },
						{ id: 'analytics', label: 'Analytics', icon: TrendingUp },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as any)}
							className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
								activeTab === tab.id
									? 'border-primary text-primary'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
							}`}
						>
							<tab.icon size={16} />
							{tab.label}
						</button>
					))}
				</nav>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-green-100 dark:bg-green-900">
							<CheckCircle size={20} className="text-green-600 dark:text-green-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Present Today</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">456</p>
							<p className="text-xs text-green-600 dark:text-green-400">85.2%</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.1 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-red-100 dark:bg-red-900">
							<XCircle size={20} className="text-red-600 dark:text-red-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Absent Today</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">42</p>
							<p className="text-xs text-red-600 dark:text-red-400">7.8%</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-yellow-100 dark:bg-yellow-900">
							<Clock size={20} className="text-yellow-600 dark:text-yellow-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Late Today</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">18</p>
							<p className="text-xs text-yellow-600 dark:text-yellow-400">3.4%</p>
						</div>
					</div>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.3 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-blue-100 dark:bg-blue-900">
							<AlertCircle size={20} className="text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Excused Today</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">19</p>
							<p className="text-xs text-blue-600 dark:text-blue-400">3.6%</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Tab Content */}
			{activeTab === 'mark' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-4"
				>
					{/* Date and Class Selection */}
					<div className="flex items-center gap-4 flex-wrap">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Select Date
							</label>
							<input
								type="date"
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.target.value)}
								className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Select Class
							</label>
							<select
								value={selectedClass}
								onChange={(e) => setSelectedClass(e.target.value)}
								className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
							>
								<option value="all">All Classes</option>
								{classes.map((cls) => (
									<option key={cls} value={cls}>{cls}</option>
								))}
							</select>
						</div>
						<div className="flex-1"></div>
						<div className="flex gap-2">
							<button
								onClick={() => setAttendanceData(students.map(s => ({ ...s, status: 'Present' })))}
								className="px-4 py-2 text-sm rounded-lg bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
							>
								Mark All Present
							</button>
							<button
								onClick={handleSaveAttendance}
								className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90"
							>
								Save Attendance
							</button>
						</div>
					</div>

					{/* Attendance Marking Table */}
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roll No</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Name</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
										<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Present</th>
										<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Absent</th>
										<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Late</th>
										<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Excused</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{attendanceData.map((student, index) => (
										<motion.tr
											key={student.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{student.rollNumber}</td>
											<td className="px-6 py-4">
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
											</td>
											<td className="px-6 py-4">
												<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
													{student.class}
												</span>
											</td>
											<td className="px-6 py-4 text-center">
												<input
													type="radio"
													name={`attendance-${student.id}`}
													checked={student.status === 'Present'}
													onChange={() => handleStatusChange(student.id, 'Present')}
													className="w-4 h-4 text-green-600 focus:ring-green-500"
												/>
											</td>
											<td className="px-6 py-4 text-center">
												<input
													type="radio"
													name={`attendance-${student.id}`}
													checked={student.status === 'Absent'}
													onChange={() => handleStatusChange(student.id, 'Absent')}
													className="w-4 h-4 text-red-600 focus:ring-red-500"
												/>
											</td>
											<td className="px-6 py-4 text-center">
												<input
													type="radio"
													name={`attendance-${student.id}`}
													checked={student.status === 'Late'}
													onChange={() => handleStatusChange(student.id, 'Late')}
													className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
												/>
											</td>
											<td className="px-6 py-4 text-center">
												<input
													type="radio"
													name={`attendance-${student.id}`}
													checked={student.status === 'Excused'}
													onChange={() => handleStatusChange(student.id, 'Excused')}
													className="w-4 h-4 text-blue-600 focus:ring-blue-500"
												/>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</motion.div>
			)}

			{activeTab === 'records' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-4"
				>
					{/* Search and Filter Bar */}
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search attendance records..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
							/>
						</div>
						<input
							type="date"
							className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
						/>
						<select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
							<option>All Classes</option>
							{classes.map((cls) => (
								<option key={cls} value={cls}>{cls}</option>
							))}
						</select>
						<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
							<Filter size={16} />
							Filter
						</button>
					</div>

					{/* Attendance Records Table */}
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roll No</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Remarks</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{attendanceRecords.map((record, index) => (
										<motion.tr
											key={record.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{record.rollNumber}</td>
											<td className="px-6 py-4">
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{record.student}</div>
											</td>
											<td className="px-6 py-4">
												<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
													{record.class}
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{record.date}</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2">
													{getStatusIcon(record.status)}
													<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(record.status)}`}>
														{record.status}
													</span>
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{record.time}</td>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{record.remarks || '-'}</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													<button className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" title="View">
														<Eye size={16} className="text-gray-400" />
													</button>
													<button className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" title="Edit">
														<Edit size={16} className="text-gray-400" />
													</button>
													<button className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" title="Delete">
														<Trash2 size={16} className="text-red-400" />
													</button>
												</div>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</motion.div>
			)}

			{activeTab === 'reports' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Monthly Summary */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<CalendarDays size={20} className="text-primary" />
								Monthly Summary
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-600 dark:text-gray-400">January 2024</span>
									<span className="text-sm font-semibold">22 Days</span>
								</div>
								<div className="space-y-2">
									<div className="flex justify-between items-center p-2 rounded bg-green-50 dark:bg-green-900/20">
										<span className="text-sm flex items-center gap-2">
											<CheckCircle size={16} className="text-green-600" />
											Total Present
										</span>
										<span className="font-semibold text-green-700 dark:text-green-400">9,845 (88.2%)</span>
									</div>
									<div className="flex justify-between items-center p-2 rounded bg-red-50 dark:bg-red-900/20">
										<span className="text-sm flex items-center gap-2">
											<XCircle size={16} className="text-red-600" />
											Total Absent
										</span>
										<span className="font-semibold text-red-700 dark:text-red-400">892 (8.0%)</span>
									</div>
									<div className="flex justify-between items-center p-2 rounded bg-yellow-50 dark:bg-yellow-900/20">
										<span className="text-sm flex items-center gap-2">
											<Clock size={16} className="text-yellow-600" />
											Total Late
										</span>
										<span className="font-semibold text-yellow-700 dark:text-yellow-400">312 (2.8%)</span>
									</div>
									<div className="flex justify-between items-center p-2 rounded bg-blue-50 dark:bg-blue-900/20">
										<span className="text-sm flex items-center gap-2">
											<AlertCircle size={16} className="text-blue-600" />
											Total Excused
										</span>
										<span className="font-semibold text-blue-700 dark:text-blue-400">111 (1.0%)</span>
									</div>
								</div>
							</div>
						</div>

						{/* Class-wise Report */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<Users size={20} className="text-primary" />
								Class-wise Attendance
							</h3>
							<div className="space-y-3">
								{classes.slice(0, 6).map((cls, idx) => {
									const percentage = 85 + Math.random() * 10
									return (
										<div key={cls}>
											<div className="flex justify-between text-sm mb-1">
												<span className="font-medium">Class {cls}</span>
												<span className="text-gray-600 dark:text-gray-400">{percentage.toFixed(1)}%</span>
											</div>
											<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
												<div
													className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all"
													style={{ width: `${percentage}%` }}
												/>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>

					{/* Generate Custom Report */}
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<FileText size={20} className="text-primary" />
							Generate Custom Report
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									From Date
								</label>
								<input
									type="date"
									className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									To Date
								</label>
								<input
									type="date"
									className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Class
								</label>
								<select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
									<option>All Classes</option>
									{classes.map((cls) => (
										<option key={cls} value={cls}>{cls}</option>
									))}
								</select>
							</div>
						</div>
						<div className="flex gap-3">
							<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
								<FileText size={16} />
								Generate Report
							</button>
							<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
								<Download size={16} />
								Export Excel
							</button>
							<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
								<Download size={16} />
								Export PDF
							</button>
						</div>
					</div>
				</motion.div>
			)}

			{activeTab === 'analytics' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Attendance Trend */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<TrendingUp size={20} className="text-primary" />
								Attendance Trend (Last 7 Days)
							</h3>
							<div className="h-64 flex items-end justify-around gap-2">
								{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
									const height = 60 + Math.random() * 30
									return (
										<div key={day} className="flex-1 flex flex-col items-center gap-2">
											<div className="w-full bg-gradient-to-t from-primary to-purple-600 rounded-t hover:opacity-80 transition-opacity" style={{ height: `${height}%` }} />
											<span className="text-xs text-gray-600 dark:text-gray-400">{day}</span>
										</div>
									)
								})}
							</div>
						</div>

						{/* Status Distribution */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<BarChart3 size={20} className="text-primary" />
								Status Distribution
							</h3>
							<div className="space-y-4">
								{[
									{ label: 'Present', value: 85.2, color: 'bg-green-500', count: 456 },
									{ label: 'Absent', value: 7.8, color: 'bg-red-500', count: 42 },
									{ label: 'Late', value: 3.4, color: 'bg-yellow-500', count: 18 },
									{ label: 'Excused', value: 3.6, color: 'bg-blue-500', count: 19 },
								].map((item) => (
									<div key={item.label}>
										<div className="flex justify-between text-sm mb-2">
											<span className="font-medium">{item.label}</span>
											<span className="text-gray-600 dark:text-gray-400">{item.count} ({item.value}%)</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
											<div
												className={`${item.color} h-3 rounded-full transition-all`}
												style={{ width: `${item.value}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Top Performers */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<TrendingUp size={20} className="text-green-600" />
								Best Attendance (This Month)
							</h3>
							<div className="space-y-3">
								{[
									{ name: 'Ahmed Hassan', class: '10A', percentage: 100 },
									{ name: 'Fatima Ali', class: '9B', percentage: 98.5 },
									{ name: 'Omar Mohamed', class: '11C', percentage: 97.2 },
									{ name: 'Aisha Ibrahim', class: '8A', percentage: 96.8 },
									{ name: 'Hassan Abdi', class: '10A', percentage: 95.5 },
								].map((student, idx) => (
									<div key={student.name} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
											{idx + 1}
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium">{student.name}</p>
											<p className="text-xs text-gray-500">{student.class}</p>
										</div>
										<span className="text-sm font-semibold text-green-600">{student.percentage}%</span>
									</div>
								))}
							</div>
						</div>

						{/* Attention Required */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<AlertCircle size={20} className="text-red-600" />
								Attention Required (Low Attendance)
							</h3>
							<div className="space-y-3">
								{[
									{ name: 'Mariam Yusuf', class: '9B', percentage: 65.2, absences: 8 },
									{ name: 'Ali Hassan', class: '8A', percentage: 68.5, absences: 7 },
									{ name: 'Khadija Omar', class: '10A', percentage: 72.1, absences: 6 },
									{ name: 'Mohamed Abdi', class: '11C', percentage: 74.8, absences: 5 },
									{ name: 'Hawa Ibrahim', class: '7A', percentage: 76.5, absences: 5 },
								].map((student) => (
									<div key={student.name} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
										<div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
											<AlertCircle size={16} className="text-red-600" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium">{student.name}</p>
											<p className="text-xs text-gray-500">{student.class} • {student.absences} absences</p>
										</div>
										<span className="text-sm font-semibold text-red-600">{student.percentage}%</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	)
}
