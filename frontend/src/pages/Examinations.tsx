import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
	Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye,
	Calendar, FileText, Award, TrendingUp, Download, Printer,
	Clock, BookOpen, CheckCircle, AlertTriangle, X, BarChart3, UserCheck
} from 'lucide-react'

interface Exam {
	id: number
	name: string
	grade: string
	subject: string
	date: string
	totalMarks: number
	status: string
	duration?: string
	instructions?: string
}

export default function Examinations() {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState<'exams' | 'marks' | 'results' | 'reports' | 'invigilation'>('exams')
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState<string>('all')
	const [showFilterMenu, setShowFilterMenu] = useState(false)
	const [viewingExam, setViewingExam] = useState<Exam | null>(null)
	const [editingExam, setEditingExam] = useState<Exam | null>(null)
	const [deletingExam, setDeletingExam] = useState<Exam | null>(null)
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [showEditForm, setShowEditForm] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const filterMenuRef = useRef<HTMLDivElement>(null)
	
	// Invigilation state
	const [invigilatorSearchQuery, setInvigilatorSearchQuery] = useState('')
	const [viewingInvigilator, setViewingInvigilator] = useState<any>(null)
	const [editingInvigilator, setEditingInvigilator] = useState<any>(null)
	const [showAssignInvigilatorForm, setShowAssignInvigilatorForm] = useState(false)
	const [invigilatorList, setInvigilatorList] = useState([
		{ id: 1, name: 'Dr. Mohamed Abdi', examName: 'Mid Term Exam - Term 1', subject: 'Mathematics', grade: '10A', date: '2025-02-15', time: '09:00 - 11:00', room: 'Room 101', status: 'Assigned' },
		{ id: 2, name: 'Ms. Khadija Hassan', examName: 'Mid Term Exam - Term 1', subject: 'Physics', grade: '10A', date: '2025-02-18', time: '09:00 - 11:00', room: 'Room 102', status: 'Assigned' },
		{ id: 3, name: 'Mr. Abdirahman Ali', examName: 'Final Exam - Term 1', subject: 'English', grade: '9B', date: '2024-12-20', time: '10:00 - 13:00', room: 'Room 201', status: 'Completed' },
		{ id: 4, name: 'Ms. Amina Yusuf', examName: 'Monthly Test', subject: 'Chemistry', grade: '11C', date: '2025-01-10', time: '08:00 - 09:00', room: 'Room 105', status: 'Completed' },
	])

	const [exams, setExams] = useState<Exam[]>([
		{ id: 1, name: 'Mid Term Exam - Term 1', grade: '10A', subject: 'Mathematics', date: '2025-02-15', totalMarks: 100, status: 'Upcoming', duration: '2 hours', instructions: 'Calculators are not allowed. Show all work for full credit.' },
		{ id: 2, name: 'Mid Term Exam - Term 1', grade: '10A', subject: 'Physics', date: '2025-02-18', totalMarks: 100, status: 'Upcoming', duration: '2 hours', instructions: 'Formula sheet will be provided. Bring your own calculator.' },
		{ id: 3, name: 'Final Exam - Term 1', grade: '9B', subject: 'English', date: '2024-12-20', totalMarks: 100, status: 'Completed', duration: '3 hours', instructions: 'Dictionary allowed. Write clearly and legibly.' },
		{ id: 4, name: 'Monthly Test', grade: '11C', subject: 'Chemistry', date: '2025-01-10', totalMarks: 50, status: 'Completed', duration: '1 hour', instructions: 'Periodic table will be provided.' },
	])

	const studentMarks = [
		{ id: 1, rollNumber: 'ST001', name: 'Ahmed Hassan', grade: '10A', mathematics: 85, physics: 78, chemistry: 92, biology: 88, total: 343, percentage: 85.75, rank: 2 },
		{ id: 2, rollNumber: 'ST002', name: 'Fatima Ali', grade: '10A', mathematics: 92, physics: 88, chemistry: 90, biology: 94, total: 364, percentage: 91.00, rank: 1 },
		{ id: 3, rollNumber: 'ST003', name: 'Omar Mohamed', grade: '10A', mathematics: 78, physics: 82, chemistry: 85, biology: 80, total: 325, percentage: 81.25, rank: 3 },
		{ id: 4, rollNumber: 'ST004', name: 'Aisha Ibrahim', grade: '10A', mathematics: 88, physics: 85, chemistry: 87, biology: 91, total: 351, percentage: 87.75, rank: 4 },
	]


	// Filter exams based on search and status
	const filteredExams = useMemo(() => {
		return exams.filter(exam => {
			const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			                     exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
			                     exam.grade.toLowerCase().includes(searchQuery.toLowerCase())
			const matchesStatus = filterStatus === 'all' || exam.status === filterStatus
			return matchesSearch && matchesStatus
		})
	}, [exams, searchQuery, filterStatus])

	// Get unique statuses for filter
	const statuses = useMemo(() => {
		const uniqueStatuses = Array.from(new Set(exams.map(exam => exam.status)))
		return uniqueStatuses
	}, [exams])

	// Close filter menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
				setShowFilterMenu(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Handle view exam
	const handleViewExam = (exam: Exam) => {
		setViewingExam(exam)
	}

	// Handle edit exam (show info modal first)
	const handleEditExam = (exam: Exam) => {
		setEditingExam(exam)
	}

	// Open edit form
	const openEditForm = () => {
		setShowEditForm(true)
		// Don't close editingExam yet, we need its data for the form
	}

	// Handle update exam
	const handleUpdateExam = (examData: any) => {
		if (editingExam) {
			const updatedExams = exams.map(e => 
				e.id === editingExam.id ? { ...e, ...examData } : e
			)
			setExams(updatedExams)
			setShowEditForm(false)
			setEditingExam(null)
			setSuccessMessage(`✓ ${examData.name} has been updated successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
		}
	}

	// Handle delete exam
	const handleDeleteExam = (id: number) => {
		const exam = exams.find(e => e.id === id)
		if (exam) {
			setDeletingExam(exam)
		}
	}

	// Confirm delete
	const confirmDelete = () => {
		if (deletingExam) {
			setExams(exams.filter(e => e.id !== deletingExam.id))
			setSuccessMessage(`✓ ${deletingExam.name} has been deleted successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
			setDeletingExam(null)
		}
	}

	// Cancel delete
	const cancelDelete = () => {
		setDeletingExam(null)
	}

	// Handle create exam
	const handleCreateExam = (examData: any) => {
		const newExam: Exam = {
			id: exams.length + 1,
			name: examData.name,
			grade: examData.grade,
			subject: examData.subject,
			date: examData.date,
			totalMarks: examData.totalMarks,
			status: examData.status,
			duration: examData.duration,
			instructions: examData.instructions
		}
		setExams([...exams, newExam])
		setShowCreateForm(false)
		setSuccessMessage(`✓ ${examData.name} has been created successfully!`)
		setTimeout(() => setSuccessMessage(''), 3000)
	}

	// Handle report generation
	const handleGenerateReport = (reportType: string) => {
		switch (reportType) {
			case 'exam-schedule':
				alert('Exam Schedule Report generated successfully!\n\nThis report includes all upcoming exams with dates, times, and subjects.')
				break
			case 'results-summary':
				alert('Results Summary Report generated successfully!\n\nComplete summary of exam results with rankings and statistics.')
				break
			case 'performance-analysis':
				alert('Performance Analysis Report generated successfully!\n\nDetailed analysis of student performance across subjects.')
				break
			case 'marks-distribution':
				alert('Marks Distribution Report generated successfully!\n\nStatistical breakdown of marks distribution across exams.')
				break
			case 'grade-report':
				alert('Grade Report generated successfully!\n\nComplete grade report for selected classes and subjects.')
				break
			case 'top-students':
				alert('Top Students Report generated successfully!\n\nRanking of top-performing students by grade and subject.')
				break
			default:
				alert('Report generated successfully!')
		}
	}

	// Filter invigilators based on search
	const filteredInvigilators = useMemo(() => {
		return invigilatorList.filter(invigilator => 
			invigilator.name.toLowerCase().includes(invigilatorSearchQuery.toLowerCase()) ||
			invigilator.examName.toLowerCase().includes(invigilatorSearchQuery.toLowerCase()) ||
			invigilator.subject.toLowerCase().includes(invigilatorSearchQuery.toLowerCase()) ||
			invigilator.room.toLowerCase().includes(invigilatorSearchQuery.toLowerCase())
		)
	}, [invigilatorList, invigilatorSearchQuery])

	// Handle view invigilator
	const handleViewInvigilator = (invigilator: any) => {
		alert(`Viewing Invigilator Assignment\n\nName: ${invigilator.name}\nExam: ${invigilator.examName}\nSubject: ${invigilator.subject}\nGrade: ${invigilator.grade}\nDate: ${invigilator.date}\nTime: ${invigilator.time}\nRoom: ${invigilator.room}\nStatus: ${invigilator.status}`)
	}

	// Handle edit invigilator
	const handleEditInvigilator = (invigilator: any) => {
		alert(`Editing Invigilator Assignment\n\nThis would open a form to edit the assignment for:\n${invigilator.name}\n${invigilator.examName}`)
	}

	// Handle assign invigilator
	const handleAssignInvigilator = () => {
		setShowAssignInvigilatorForm(true)
	}

	// Handle submit assigned invigilator
	const handleSubmitInvigilatorAssignment = () => {
		setShowAssignInvigilatorForm(false)
		setSuccessMessage('✓ Invigilator assignment created successfully!')
		setTimeout(() => setSuccessMessage(''), 3000)
	}

	return (
		<div className="space-y-6">
			{/* Success Message */}
			<AnimatePresence>
				{successMessage && (
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50 }}
						className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
					>
						<CheckCircle size={20} />
						<span className="font-medium">{successMessage}</span>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">Examinations & Marks</h2>
					<p className="text-gray-600 dark:text-gray-400">Manage exams, marks entry, and results</p>
				</div>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setShowCreateForm(true)}
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					<Plus size={16} />
					Create Exam
				</motion.button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">Total Exams</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
							<FileText className="text-blue-600 dark:text-blue-400" size={24} />
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
							<p className="text-2xl font-bold text-green-600 dark:text-green-400">18</p>
						</div>
						<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
							<Award className="text-green-600 dark:text-green-400" size={24} />
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
							<p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">6</p>
						</div>
						<div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
							<Calendar className="text-yellow-600 dark:text-yellow-400" size={24} />
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">Avg Pass Rate</p>
							<p className="text-2xl font-bold text-purple-600 dark:text-purple-400">87%</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
							<TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
						</div>
					</div>
				</motion.div>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav className="flex gap-6">
					{[
						{ id: 'exams', label: 'Examinations', icon: FileText },
						{ id: 'marks', label: 'Marks Entry', icon: Edit },
						{ id: 'results', label: 'Results & Ranking', icon: Award },
						{ id: 'reports', label: 'Reports', icon: BarChart3 },
						{ id: 'invigilation', label: 'Invigilation', icon: UserCheck }
					].map((tab) => {
						const Icon = tab.icon
						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as any)}
								className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
									activeTab === tab.id
										? 'border-primary text-primary'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
								}`}
							>
								<Icon size={18} />
								{tab.label}
							</button>
						)
					})}
				</nav>
			</div>

			{/* Exams List Tab */}
			{activeTab === 'exams' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-4"
				>
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search exams..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
							/>
						</div>
						<div className="relative" ref={filterMenuRef}>
							<button 
								onClick={() => setShowFilterMenu(!showFilterMenu)}
								className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
							>
								<Filter size={16} />
								Filter
								{filterStatus !== 'all' && (
									<span className="ml-1 flex h-2 w-2 rounded-full bg-primary"></span>
								)}
							</button>
							
							{/* Filter Dropdown */}
							<AnimatePresence>
								{showFilterMenu && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 z-10"
									>
										<div className="p-2">
											<button
												onClick={() => {
													setFilterStatus('all')
													setShowFilterMenu(false)
												}}
												className={`w-full text-left px-3 py-2 text-sm rounded-md ${
													filterStatus === 'all'
														? 'bg-primary text-white'
														: 'hover:bg-gray-100 dark:hover:bg-gray-800'
												}`}
											>
												All Exams
											</button>
											{statuses.map((status) => (
												<button
													key={status}
													onClick={() => {
														setFilterStatus(status)
														setShowFilterMenu(false)
													}}
													className={`w-full text-left px-3 py-2 text-sm rounded-md ${
														filterStatus === status
															? 'bg-primary text-white'
															: 'hover:bg-gray-100 dark:hover:bg-gray-800'
													}`}
												>
													{status}
												</button>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden"
					>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exam Name</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Marks</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{filteredExams.length === 0 ? (
										<tr>
											<td colSpan={7} className="px-6 py-12 text-center">
												<div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
													<FileText size={48} className="mb-4 opacity-20" />
													<p className="text-lg font-medium">No exams found</p>
													<p className="text-sm">Try adjusting your search or filter criteria</p>
												</div>
											</td>
										</tr>
									) : (
										filteredExams.map((exam, index) => (
											<motion.tr
												key={exam.id}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.3, delay: index * 0.1 }}
												className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
											>
												<td className="px-6 py-4">
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{exam.name}</div>
												</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
														{exam.grade}
													</span>
												</td>
												<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{exam.subject}</td>
												<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
													<div className="flex items-center gap-2">
														<Calendar size={14} />
														{exam.date}
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{exam.totalMarks}</td>
												<td className="px-6 py-4">
													<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
														exam.status === 'Completed'
															? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
															: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
													}`}>
														{exam.status}
													</span>
												</td>
												<td className="px-6 py-4 text-right">
													<div className="flex items-center justify-end gap-2">
														<motion.button 
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															onClick={() => handleViewExam(exam)}
															className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
														>
															<Eye size={16} className="text-blue-500" />
														</motion.button>
														<motion.button 
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															onClick={() => handleEditExam(exam)}
															className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
														>
															<Edit size={16} className="text-green-500" />
														</motion.button>
														<motion.button 
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															onClick={() => handleDeleteExam(exam.id)}
															className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
														>
															<Trash2 size={16} className="text-red-500" />
														</motion.button>
													</div>
												</td>
											</motion.tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Marks Entry Tab */}
			{activeTab === 'marks' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-4"
				>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
							<option>Select Grade</option>
							<option>10A</option>
							<option>9B</option>
							<option>11C</option>
						</select>
						<select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
							<option>Select Subject</option>
							<option>Mathematics</option>
							<option>Physics</option>
							<option>Chemistry</option>
						</select>
						<select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
							<option>Select Exam</option>
							<option>Mid Term - Term 1</option>
							<option>Final Exam - Term 1</option>
						</select>
					</div>

					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-600 dark:text-gray-400">Enter marks for selected exam</p>
						<div className="flex gap-2">
							<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
								<Download size={16} />
								Download Template
							</button>
							<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
								Upload Marks
							</button>
						</div>
					</div>

					<motion.div
						className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
					>
						<p className="text-center text-gray-500 dark:text-gray-400 py-12">
							Select grade, subject, and exam to enter marks
						</p>
					</motion.div>
				</motion.div>
			)}

			{/* Results & Ranking Tab */}
			{activeTab === 'results' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-4"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
								<option>All Grades</option>
								<option>10A</option>
								<option>9B</option>
								<option>11C</option>
							</select>
						</div>
						<div className="flex gap-2">
							<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
								<Printer size={16} />
								Print All
							</button>
							<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
								<Download size={16} />
								Export Results
							</button>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden"
					>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roll No</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Math</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Physics</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Chem</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bio</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">%</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{studentMarks.map((student, index) => (
										<motion.tr
											key={student.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4">
												<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
													{student.rank}
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{student.rollNumber}</td>
											<td className="px-6 py-4">
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">{student.grade}</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{student.mathematics}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{student.physics}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{student.chemistry}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{student.biology}</td>
											<td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">{student.total}</td>
											<td className="px-6 py-4">
												<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
													student.percentage >= 90
														? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
														: student.percentage >= 75
														? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
														: student.percentage >= 60
														? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
														: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
												}`}>
													{student.percentage.toFixed(2)}%
												</span>
											</td>
											<td className="px-6 py-4 text-right">
												<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1 text-xs hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
													<Printer size={14} />
													Marksheet
												</button>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Reports Tab */}
			{activeTab === 'reports' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="space-y-6"
				>
					{/* Report Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-blue-100 dark:bg-blue-900/30">
									<Calendar size={20} className="text-blue-600 dark:text-blue-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Exam Schedule Report</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Generate exam schedules with dates, times, and subjects</p>
							<button onClick={() => handleGenerateReport('exam-schedule')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.1 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-green-100 dark:bg-green-900/30">
									<FileText size={20} className="text-green-600 dark:text-green-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Results Summary</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Complete summary of exam results with rankings</p>
							<button onClick={() => handleGenerateReport('results-summary')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.2 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-purple-100 dark:bg-purple-900/30">
									<TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Performance Analysis</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Detailed analysis of student performance across subjects</p>
							<button onClick={() => handleGenerateReport('performance-analysis')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.3 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-orange-100 dark:bg-orange-900/30">
									<BarChart3 size={20} className="text-orange-600 dark:text-orange-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Marks Distribution</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Statistical breakdown of marks distribution across exams</p>
							<button onClick={() => handleGenerateReport('marks-distribution')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.4 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-yellow-100 dark:bg-yellow-900/30">
									<Award size={20} className="text-yellow-600 dark:text-yellow-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Grade Report</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Complete grade report for selected classes and subjects</p>
							<button onClick={() => handleGenerateReport('grade-report')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.5 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-red-100 dark:bg-red-900/30">
									<CheckCircle size={20} className="text-red-600 dark:text-red-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Top Students Report</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Ranking of top-performing students by grade and subject</p>
							<button onClick={() => handleGenerateReport('top-students')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>
					</div>
				</motion.div>
			)}

			{/* Invigilation Tab */}
			{activeTab === 'invigilation' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-4"
				>
					<div className="flex items-center gap-4">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleAssignInvigilator}
							className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
						>
							<Plus size={16} />
							Assign Invigilator
						</motion.button>
						<div className="flex-1"></div>
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search invigilators..."
								value={invigilatorSearchQuery}
								onChange={(e) => setInvigilatorSearchQuery(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
							/>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden"
					>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invigilator Name</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exam</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Room</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{filteredInvigilators.length === 0 ? (
										<tr>
											<td colSpan={9} className="px-6 py-12 text-center">
												<div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
													<UserCheck size={48} className="mb-4 opacity-20" />
													<p className="text-lg font-medium">No invigilation assignments found</p>
													<p className="text-sm">Assign invigilators to exams to get started</p>
												</div>
											</td>
										</tr>
									) : (
										filteredInvigilators.map((invigilator, index) => (
											<motion.tr
												key={invigilator.id}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.3, delay: index * 0.1 }}
												className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
											>
												<td className="px-6 py-4">
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{invigilator.name}</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm text-gray-900 dark:text-gray-100">{invigilator.examName}</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{invigilator.subject}</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
														{invigilator.grade}
													</span>
												</td>
												<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
													<div className="flex items-center gap-2">
														<Calendar size={14} />
														{invigilator.date}
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
													<div className="flex items-center gap-2">
														<Clock size={14} />
														{invigilator.time}
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{invigilator.room}</td>
												<td className="px-6 py-4">
													<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
														invigilator.status === 'Completed'
															? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
															: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
													}`}>
														{invigilator.status}
													</span>
												</td>
												<td className="px-6 py-4 text-right">
													<div className="flex items-center justify-end gap-2">
														<motion.button 
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															onClick={() => handleViewInvigilator(invigilator)}
															className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
															title="View Details"
														>
															<Eye size={16} className="text-blue-500" />
														</motion.button>
														<motion.button 
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															onClick={() => handleEditInvigilator(invigilator)}
															className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
															title="Edit Assignment"
														>
															<Edit size={16} className="text-green-500" />
														</motion.button>
													</div>
												</td>
											</motion.tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{deletingExam && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={cancelDelete}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md mx-4 rounded-2xl border border-red-200/60 dark:border-red-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 flex flex-col items-center">
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl mb-4"
								>
									<AlertTriangle className="text-white" size={40} />
								</motion.div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">
									Delete Exam?
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
									This action cannot be undone
								</p>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6">
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
											<FileText size={20} className="text-red-600 dark:text-red-400" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">
												{deletingExam.name}
											</p>
											<div className="space-y-1">
												<p className="text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
													<span className="font-medium">Subject:</span> {deletingExam.subject}
												</p>
												<p className="text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
													<span className="font-medium">Grade:</span> {deletingExam.grade}
												</p>
												<p className="text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
													<span className="font-medium">Date:</span> {deletingExam.date}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-6 flex items-start gap-2">
									<AlertTriangle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
									<p className="text-xs text-yellow-800 dark:text-yellow-200">
										Deleting this exam will remove all associated data including student marks and results.
									</p>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={cancelDelete}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Cancel
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={confirmDelete}
										className="flex-1 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
									>
										<Trash2 size={18} />
										Delete
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Edit Exam Modal */}
			<AnimatePresence>
				{editingExam && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setEditingExam(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md mx-4 rounded-2xl border border-green-200/60 dark:border-green-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 flex flex-col items-center">
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-xl mb-4"
								>
									<FileText size={40} />
								</motion.div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
									{editingExam.name}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									{editingExam.subject} • {editingExam.grade}
								</p>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
											<Edit size={20} className="text-green-600 dark:text-green-400" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium text-green-900 dark:text-green-200 mb-2">
												Edit Exam Information
											</p>
											<p className="text-xs text-green-700 dark:text-green-300">
												A comprehensive exam form will be available here to edit all exam details including:
											</p>
											<ul className="mt-2 space-y-1">
												<li className="text-xs text-green-700 dark:text-green-300 flex items-center gap-2">
													<span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
													Exam name and type
												</li>
												<li className="text-xs text-green-700 dark:text-green-300 flex items-center gap-2">
													<span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
													Grade and subject
												</li>
												<li className="text-xs text-green-700 dark:text-green-300 flex items-center gap-2">
													<span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
													Date, time, and duration
												</li>
												<li className="text-xs text-green-700 dark:text-green-300 flex items-center gap-2">
													<span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
													Total marks and instructions
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Current Details Preview */}
								<div className="space-y-3 mb-6">
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Date</span>
										<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingExam.date}</span>
									</div>
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Marks</span>
										<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingExam.totalMarks}</span>
									</div>
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Duration</span>
										<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingExam.duration || 'N/A'}</span>
									</div>
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</span>
										<span className={`text-sm font-semibold ${
											editingExam.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
										}`}>
											{editingExam.status}
										</span>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setEditingExam(null)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Close
									</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={openEditForm}
									className="flex-1 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
								>
									<Edit size={18} />
									Edit Form
								</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* View Exam Modal */}
			<AnimatePresence>
				{viewingExam && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setViewingExam(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-2xl mx-4 rounded-2xl border border-blue-200/60 dark:border-blue-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8">
								<button
									onClick={() => setViewingExam(null)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								
								<div className="flex items-start gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl flex-shrink-0"
									>
										<FileText className="text-white" size={48} />
									</motion.div>
									
									<div className="flex-1">
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											{viewingExam.name}
										</h3>
										<div className="flex items-center gap-3 flex-wrap">
											<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
												{viewingExam.grade}
											</span>
											<span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
												{viewingExam.subject}
											</span>
											<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
												viewingExam.status === 'Completed'
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
													: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
											}`}>
												{viewingExam.status}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Content */}
							<div className="p-8 space-y-6">
								{/* Main Details Grid */}
								<div className="grid grid-cols-2 gap-4">
									<div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<div className="flex items-center gap-3 mb-2">
											<div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
												<Calendar size={20} className="text-blue-600 dark:text-blue-400" />
											</div>
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Exam Date</p>
												<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingExam.date}</p>
											</div>
										</div>
									</div>

									<div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<div className="flex items-center gap-3 mb-2">
											<div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
												<Clock size={20} className="text-purple-600 dark:text-purple-400" />
											</div>
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
												<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingExam.duration || 'N/A'}</p>
											</div>
										</div>
									</div>

									<div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<div className="flex items-center gap-3 mb-2">
											<div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
												<Award size={20} className="text-green-600 dark:text-green-400" />
											</div>
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Total Marks</p>
												<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingExam.totalMarks}</p>
											</div>
										</div>
									</div>

									<div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<div className="flex items-center gap-3 mb-2">
											<div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
												<BookOpen size={20} className="text-orange-600 dark:text-orange-400" />
											</div>
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Subject</p>
												<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingExam.subject}</p>
											</div>
										</div>
									</div>
								</div>

								{/* Instructions Section */}
								{viewingExam.instructions && (
									<div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-800/60">
										<div className="flex items-start gap-3">
											<div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
												<FileText size={20} className="text-blue-600 dark:text-blue-400" />
											</div>
											<div className="flex-1">
												<h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
													Exam Instructions
												</h4>
												<p className="text-sm text-blue-700 dark:text-blue-300">
													{viewingExam.instructions}
												</p>
											</div>
										</div>
									</div>
								)}

								{/* Action Buttons */}
								<div className="flex items-center gap-3 pt-4">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setViewingExam(null)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Close
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											setViewingExam(null)
											setEditingExam(viewingExam)
										}}
										className="flex-1 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
									>
										<Edit size={18} />
										Edit Exam
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
									>
										<Printer size={18} />
										Print
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Create Exam Form Modal */}
			<AnimatePresence>
				{showCreateForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setShowCreateForm(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-3xl rounded-2xl border border-primary/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 p-8">
								<button
									onClick={() => setShowCreateForm(false)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								
								<div className="flex items-center gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl flex-shrink-0"
									>
										<Plus className="text-white" size={40} />
									</motion.div>
									
									<div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
											Create New Exam
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Fill in the details to create a new examination
										</p>
									</div>
								</div>
							</div>

							{/* Form */}
							<form 
								onSubmit={(e) => {
									e.preventDefault()
									const formData = new FormData(e.currentTarget)
									handleCreateExam({
										name: formData.get('name'),
										grade: formData.get('grade'),
										subject: formData.get('subject'),
										date: formData.get('date'),
										totalMarks: Number(formData.get('totalMarks')),
										status: formData.get('status'),
										duration: formData.get('duration'),
										instructions: formData.get('instructions')
									})
								}}
								className="p-8 space-y-6"
							>
								{/* Grid Layout for Form Fields */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Exam Name */}
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Exam Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="name"
											required
											placeholder="e.g., Mid Term Exam - Term 1"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Grade */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Grade <span className="text-red-500">*</span>
										</label>
										<select
											name="grade"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Grade</option>
											<option value="10A">10A</option>
											<option value="10B">10B</option>
											<option value="9A">9A</option>
											<option value="9B">9B</option>
											<option value="11A">11A</option>
											<option value="11B">11B</option>
											<option value="11C">11C</option>
											<option value="12A">12A</option>
											<option value="12B">12B</option>
										</select>
									</div>

									{/* Subject */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Subject <span className="text-red-500">*</span>
										</label>
										<select
											name="subject"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Subject</option>
											<option value="Mathematics">Mathematics</option>
											<option value="Physics">Physics</option>
											<option value="Chemistry">Chemistry</option>
											<option value="Biology">Biology</option>
											<option value="English">English</option>
											<option value="Arabic">Arabic</option>
											<option value="History">History</option>
											<option value="Geography">Geography</option>
											<option value="Computer Science">Computer Science</option>
										</select>
									</div>

									{/* Exam Date */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Exam Date <span className="text-red-500">*</span>
										</label>
										<input
											type="date"
											name="date"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Duration */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Duration <span className="text-red-500">*</span>
										</label>
										<select
											name="duration"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Duration</option>
											<option value="30 minutes">30 minutes</option>
											<option value="1 hour">1 hour</option>
											<option value="1.5 hours">1.5 hours</option>
											<option value="2 hours">2 hours</option>
											<option value="2.5 hours">2.5 hours</option>
											<option value="3 hours">3 hours</option>
										</select>
									</div>

									{/* Total Marks */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Total Marks <span className="text-red-500">*</span>
										</label>
										<input
											type="number"
											name="totalMarks"
											required
											min="1"
											placeholder="e.g., 100"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Status */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status <span className="text-red-500">*</span>
										</label>
										<select
											name="status"
											required
											defaultValue="Upcoming"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="Upcoming">Upcoming</option>
											<option value="In Progress">In Progress</option>
											<option value="Completed">Completed</option>
										</select>
									</div>

									{/* Instructions */}
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Instructions
										</label>
										<textarea
											name="instructions"
											rows={4}
											placeholder="Enter exam instructions, rules, or special notes..."
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
										/>
									</div>
								</div>

								{/* Info Box */}
								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
									<FileText size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
											Quick Tip
										</p>
										<p className="text-xs text-blue-700 dark:text-blue-300">
											Make sure to set the exam date appropriately and provide clear instructions for students. You can always edit these details later.
										</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3 pt-4">
									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setShowCreateForm(false)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Cancel
									</motion.button>
									<motion.button
										type="submit"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex-1 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
									>
										<Plus size={18} />
										Create Exam
									</motion.button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Edit Exam Form Modal */}
			<AnimatePresence>
				{showEditForm && editingExam && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => {
							setShowEditForm(false)
							setEditingExam(null)
						}}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-3xl rounded-2xl border border-green-200/60 dark:border-green-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8">
								<button
									onClick={() => {
										setShowEditForm(false)
										setEditingExam(null)
									}}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								
								<div className="flex items-center gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl flex-shrink-0"
									>
										<Edit className="text-white" size={40} />
									</motion.div>
									
									<div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
											Edit Exam
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Update details for {editingExam.name}
										</p>
									</div>
								</div>
							</div>

							{/* Form */}
							<form 
								onSubmit={(e) => {
									e.preventDefault()
									const formData = new FormData(e.currentTarget)
									handleUpdateExam({
										name: formData.get('name'),
										grade: formData.get('grade'),
										subject: formData.get('subject'),
										date: formData.get('date'),
										totalMarks: Number(formData.get('totalMarks')),
										status: formData.get('status'),
										duration: formData.get('duration'),
										instructions: formData.get('instructions')
									})
								}}
								className="p-8 space-y-6"
							>
								{/* Grid Layout for Form Fields */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Exam Name */}
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Exam Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="name"
											required
											defaultValue={editingExam.name}
											placeholder="e.g., Mid Term Exam - Term 1"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Grade */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Grade <span className="text-red-500">*</span>
										</label>
										<select
											name="grade"
											required
											defaultValue={editingExam.grade}
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Grade</option>
											<option value="10A">10A</option>
											<option value="10B">10B</option>
											<option value="9A">9A</option>
											<option value="9B">9B</option>
											<option value="11A">11A</option>
											<option value="11B">11B</option>
											<option value="11C">11C</option>
											<option value="12A">12A</option>
											<option value="12B">12B</option>
										</select>
									</div>

									{/* Subject */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Subject <span className="text-red-500">*</span>
										</label>
										<select
											name="subject"
											required
											defaultValue={editingExam.subject}
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Subject</option>
											<option value="Mathematics">Mathematics</option>
											<option value="Physics">Physics</option>
											<option value="Chemistry">Chemistry</option>
											<option value="Biology">Biology</option>
											<option value="English">English</option>
											<option value="Arabic">Arabic</option>
											<option value="History">History</option>
											<option value="Geography">Geography</option>
											<option value="Computer Science">Computer Science</option>
										</select>
									</div>

									{/* Exam Date */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Exam Date <span className="text-red-500">*</span>
										</label>
										<input
											type="date"
											name="date"
											required
											defaultValue={editingExam.date}
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Duration */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Duration <span className="text-red-500">*</span>
										</label>
										<select
											name="duration"
											required
											defaultValue={editingExam.duration}
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Duration</option>
											<option value="30 minutes">30 minutes</option>
											<option value="1 hour">1 hour</option>
											<option value="1.5 hours">1.5 hours</option>
											<option value="2 hours">2 hours</option>
											<option value="2.5 hours">2.5 hours</option>
											<option value="3 hours">3 hours</option>
										</select>
									</div>

									{/* Total Marks */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Total Marks <span className="text-red-500">*</span>
										</label>
										<input
											type="number"
											name="totalMarks"
											required
											min="1"
											defaultValue={editingExam.totalMarks}
											placeholder="e.g., 100"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Status */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status <span className="text-red-500">*</span>
										</label>
										<select
											name="status"
											required
											defaultValue={editingExam.status}
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="Upcoming">Upcoming</option>
											<option value="In Progress">In Progress</option>
											<option value="Completed">Completed</option>
										</select>
									</div>

									{/* Instructions */}
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Instructions
										</label>
										<textarea
											name="instructions"
											rows={4}
											defaultValue={editingExam.instructions}
											placeholder="Enter exam instructions, rules, or special notes..."
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
										/>
									</div>
								</div>

								{/* Info Box */}
								<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start gap-3">
									<CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-green-900 dark:text-green-200 mb-1">
											Update Exam Information
										</p>
										<p className="text-xs text-green-700 dark:text-green-300">
											All changes will be saved immediately. Make sure all exam details are accurate before updating.
										</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3 pt-4">
									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											setShowEditForm(false)
											setEditingExam(null)
										}}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Cancel
									</motion.button>
									<motion.button
										type="submit"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex-1 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
									>
										<CheckCircle size={18} />
										Update Exam
									</motion.button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Assign Invigilator Modal */}
			<AnimatePresence>
				{showAssignInvigilatorForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setShowAssignInvigilatorForm(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-2xl rounded-2xl border border-primary/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 p-8">
								<button
									onClick={() => setShowAssignInvigilatorForm(false)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								
								<div className="flex items-center gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl flex-shrink-0"
									>
										<UserCheck className="text-white" size={40} />
									</motion.div>
									
									<div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
											Assign Invigilator
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Assign an invigilator to oversee an exam
										</p>
									</div>
								</div>
							</div>

							{/* Form */}
							<form 
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmitInvigilatorAssignment()
								}}
								className="p-8 space-y-6"
							>
								{/* Grid Layout for Form Fields */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Select Exam */}
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Select Exam <span className="text-red-500">*</span>
										</label>
										<select
											name="exam"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Choose an exam...</option>
											{exams.map(exam => (
												<option key={exam.id} value={exam.name}>{exam.name} - {exam.subject} ({exam.grade})</option>
											))}
										</select>
									</div>

									{/* Select Invigilator */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Select Invigilator <span className="text-red-500">*</span>
										</label>
										<select
											name="invigilator"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Choose an invigilator...</option>
											<option value="Dr. Mohamed Abdi">Dr. Mohamed Abdi</option>
											<option value="Ms. Khadija Hassan">Ms. Khadija Hassan</option>
											<option value="Mr. Abdirahman Ali">Mr. Abdirahman Ali</option>
											<option value="Ms. Amina Yusuf">Ms. Amina Yusuf</option>
											<option value="Dr. Ahmed Hassan">Dr. Ahmed Hassan</option>
										</select>
									</div>

									{/* Select Date */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Exam Date <span className="text-red-500">*</span>
										</label>
										<input
											type="date"
											name="date"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Select Time */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Start Time <span className="text-red-500">*</span>
										</label>
										<input
											type="time"
											name="startTime"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* End Time */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											End Time <span className="text-red-500">*</span>
										</label>
										<input
											type="time"
											name="endTime"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									{/* Select Room */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Exam Room <span className="text-red-500">*</span>
										</label>
										<select
											name="room"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Choose a room...</option>
											<option value="Room 101">Room 101</option>
											<option value="Room 102">Room 102</option>
											<option value="Room 103">Room 103</option>
											<option value="Room 201">Room 201</option>
											<option value="Room 202">Room 202</option>
											<option value="Room 105">Room 105</option>
											<option value="Hall A">Hall A</option>
											<option value="Hall B">Hall B</option>
										</select>
									</div>

									{/* Status */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status <span className="text-red-500">*</span>
										</label>
										<select
											name="status"
											required
											defaultValue="Assigned"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="Assigned">Assigned</option>
											<option value="Pending">Pending</option>
										</select>
									</div>
								</div>

								{/* Info Box */}
								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
									<UserCheck size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
											Quick Tip
										</p>
										<p className="text-xs text-blue-700 dark:text-blue-300">
											Make sure to select the correct exam and assign a qualified invigilator. The invigilator will be notified of their assignment.
										</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3 pt-4">
									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setShowAssignInvigilatorForm(false)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Cancel
									</motion.button>
									<motion.button
										type="submit"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex-1 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
									>
										<CheckCircle size={18} />
										Assign Invigilator
									</motion.button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

