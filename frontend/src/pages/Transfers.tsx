import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, Edit, Trash2, Eye, X, ArrowRightLeft, User, Calendar, MapPin, BookOpen, CheckCircle2, Clock } from 'lucide-react'

interface Transfer {
	id: number
	studentName: string
	studentRollNumber: string
	currentClass: string
	newClass: string
	transferType: 'Internal' | 'To Branch' | 'From Branch' | 'Hostel Transfer'
	transferDate: string
	reason: string
	status: 'Pending' | 'Approved' | 'Rejected' | 'Completed'
	approvedBy?: string
	remarks?: string
}

interface Student {
	id: number
	name: string
	rollNumber: string
	class: string
}

export default function Transfers() {
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState<string>('all')
	const [filterType, setFilterType] = useState<string>('all')
	const [showFilterMenu, setShowFilterMenu] = useState(false)
	const [showAddForm, setShowAddForm] = useState(false)
	const [viewingTransfer, setViewingTransfer] = useState<Transfer | null>(null)
	const [deletingTransfer, setDeletingTransfer] = useState<Transfer | null>(null)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const filterMenuRef = useRef<HTMLDivElement>(null)
	
	// Student search states
	const [studentSearch, setStudentSearch] = useState('')
	const [showStudentDropdown, setShowStudentDropdown] = useState(false)
	const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
	const studentSearchRef = useRef<HTMLDivElement>(null)
	
	// Mock students data
	const [students] = useState<Student[]>([
		{ id: 1, name: 'Ahmed Hassan', rollNumber: 'ST001', class: 'Grade 10A' },
		{ id: 2, name: 'Fatima Ali', rollNumber: 'ST002', class: 'Grade 9B' },
		{ id: 3, name: 'Omar Mohamed', rollNumber: 'ST003', class: 'Grade 11C' },
		{ id: 4, name: 'Aisha Ibrahim', rollNumber: 'ST004', class: 'Grade 8A' },
		{ id: 5, name: 'Khadija Ahmed', rollNumber: 'ST005', class: 'Grade 12A' },
	])
	
	// Filter students based on search
	const filteredStudents = useMemo(() => {
		if (!studentSearch) return []
		return students.filter(student =>
			student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
			student.rollNumber.toLowerCase().includes(studentSearch.toLowerCase())
		)
	}, [studentSearch, students])

	const [transfers, setTransfers] = useState<Transfer[]>([
		{
			id: 1,
			studentName: 'Ahmed Hassan',
			studentRollNumber: 'ST001',
			currentClass: 'Grade 10A',
			newClass: 'Grade 10B',
			transferType: 'Internal',
			transferDate: '2024-01-15',
			reason: 'Academic performance improvement',
			status: 'Approved',
			approvedBy: 'Dr. Mohamed Abdi',
		},
		{
			id: 2,
			studentName: 'Fatima Ali',
			studentRollNumber: 'ST002',
			currentClass: 'Grade 9B',
			newClass: 'Grade 9C',
			transferType: 'Internal',
			transferDate: '2024-02-01',
			reason: 'Schedule conflict',
			status: 'Pending',
		},
		{
			id: 3,
			studentName: 'Omar Mohamed',
			studentRollNumber: 'ST003',
			currentClass: 'Grade 11C',
			newClass: 'Branch B - Grade 11C',
			transferType: 'To Branch',
			transferDate: '2024-02-10',
			reason: 'Relocation',
			status: 'Completed',
			approvedBy: 'Ms. Khadija Hassan',
		},
	])

	// Filter and search transfers
	const filteredTransfers = useMemo(() => {
		return transfers.filter(transfer => {
			const matchesSearch = transfer.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				transfer.studentRollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
				transfer.currentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
				transfer.newClass.toLowerCase().includes(searchQuery.toLowerCase())

			const matchesStatusFilter = filterStatus === 'all' || transfer.status === filterStatus
			const matchesTypeFilter = filterType === 'all' || transfer.transferType === filterType

			return matchesSearch && matchesStatusFilter && matchesTypeFilter
		})
	}, [transfers, searchQuery, filterStatus, filterType])

	const handleAddTransfer = (formData: FormData) => {
		const newTransfer: Transfer = {
			id: transfers.length + 1,
			studentName: formData.get('studentName') as string,
			studentRollNumber: formData.get('studentRollNumber') as string,
			currentClass: formData.get('currentClass') as string,
			newClass: formData.get('newClass') as string,
			transferType: formData.get('transferType') as Transfer['transferType'],
			transferDate: formData.get('transferDate') as string,
			reason: formData.get('reason') as string,
			status: 'Pending',
		}
		setTransfers([...transfers, newTransfer])
		setSuccessMessage(`✓ Transfer request for ${newTransfer.studentName} has been submitted!`)
		setTimeout(() => setSuccessMessage(''), 3000)
		setShowAddForm(false)
		
		// Reset student search states
		setStudentSearch('')
		setSelectedStudent(null)
	}

	const handleDeleteTransfer = (id: number) => {
		const transfer = transfers.find(t => t.id === id)
		if (transfer) {
			setDeletingTransfer(transfer)
		}
	}

	const confirmDelete = () => {
		if (deletingTransfer) {
			setTransfers(prev => prev.filter(t => t.id !== deletingTransfer.id))
			setSuccessMessage(`✓ Transfer request deleted successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
			setDeletingTransfer(null)
		}
	}

	// Close filter menu and student dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
				setShowFilterMenu(false)
			}
			if (studentSearchRef.current && !studentSearchRef.current.contains(event.target as Node)) {
				setShowStudentDropdown(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className="space-y-6">
			{/* Success Message */}
			<AnimatePresence>
				{successMessage && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="fixed top-4 right-4 z-50 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg"
					>
						{successMessage}
					</motion.div>
				)}
			</AnimatePresence>

			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">Transfers</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Manage student transfers and class movements
						{filteredTransfers.length > 0 && (
							<span className="ml-2 text-primary font-medium">
								({filteredTransfers.length} {filteredTransfers.length === 1 ? 'transfer' : 'transfers'})
							</span>
						)}
					</p>
				</div>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setShowAddForm(true)}
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					<Plus size={16} />
					New Transfer Request
				</motion.button>
			</div>

			{/* Search and Filter Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search transfers..."
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
						{(filterStatus !== 'all' || filterType !== 'all') && (
							<span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
								2
							</span>
						)}
					</button>

					{/* Filter Dropdown Menu */}
					<AnimatePresence>
						{showFilterMenu && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 z-50"
							>
								<div className="p-2">
									<div className="mb-2 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
										FILTER BY STATUS
									</div>
									{['all', 'Pending', 'Approved', 'Completed', 'Rejected'].map(status => (
										<button
											key={status}
											onClick={() => {
												setFilterStatus(status)
												setShowFilterMenu(false)
											}}
											className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
												filterStatus === status ? 'bg-primary/10 text-primary font-medium' : ''
											}`}
										>
											{status === 'all' ? 'All Statuses' : status}
										</button>
									))}

									<div className="my-2 border-t border-gray-200 dark:border-gray-800" />

									<div className="mb-2 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
										FILTER BY TYPE
									</div>
									{['all', 'Internal', 'To Branch', 'From Branch', 'Hostel Transfer'].map(type => (
										<button
											key={type}
											onClick={() => {
												setFilterType(type)
												setShowFilterMenu(false)
											}}
											className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
												filterType === type ? 'bg-primary/10 text-primary font-medium' : ''
											}`}
										>
											{type === 'all' ? 'All Types' : type}
										</button>
									))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Transfers Table */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden"
			>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transfer</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
							{filteredTransfers.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center">
										<div className="text-gray-500 dark:text-gray-400">
											<p className="text-lg font-medium mb-2">No transfers found</p>
											<p className="text-sm">Try adjusting your search or filter criteria</p>
										</div>
									</td>
								</tr>
							) : (
								filteredTransfers.map((transfer, index) => (
									<motion.tr
										key={transfer.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
										className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
													{transfer.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
												</div>
												<div>
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{transfer.studentName}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{transfer.studentRollNumber}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2 text-sm">
												<span className="text-gray-600 dark:text-gray-400">{transfer.currentClass}</span>
												<ArrowRightLeft size={14} className="text-gray-400" />
												<span className="font-medium text-gray-900 dark:text-gray-100">{transfer.newClass}</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
												{transfer.transferType}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{transfer.transferDate}</td>
										<td className="px-6 py-4">
											<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
												transfer.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
												transfer.status === 'Approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
												transfer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
												'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
											}`}>
												{transfer.status}
											</span>
										</td>
										<td className="px-6 py-4 text-right">
											<div className="flex items-center justify-end gap-2">
												<button
													onClick={() => setViewingTransfer(transfer)}
													className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
													title="View Details"
												>
													<Eye size={16} className="text-gray-400 hover:text-primary" />
												</button>
												<button
													onClick={() => handleDeleteTransfer(transfer.id)}
													className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
													title="Delete"
												>
													<Trash2 size={16} className="text-red-400 hover:text-red-600" />
												</button>
											</div>
										</td>
									</motion.tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</motion.div>

			{/* View Transfer Details Modal */}
			<AnimatePresence>
				{viewingTransfer && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setViewingTransfer(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-2xl mx-4 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900 backdrop-blur shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative h-32 bg-gradient-to-br from-primary via-blue-600 to-purple-600 overflow-hidden">
								<div className="absolute inset-0 bg-black/10"></div>
								<button
									onClick={() => setViewingTransfer(null)}
									className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
								>
									<X size={20} className="text-white" />
								</button>

								<div className="absolute -bottom-16 left-8">
									<div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
										{viewingTransfer.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
									</div>
								</div>
							</div>

							{/* Content */}
							<div className="px-8 pt-20 pb-8">
								<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
									{viewingTransfer.studentName}
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mb-6">{viewingTransfer.studentRollNumber}</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<BookOpen className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Current Class</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingTransfer.currentClass}</p>
										</div>
									</div>
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<ArrowRightLeft className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">New Class</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingTransfer.newClass}</p>
										</div>
									</div>
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<User className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Transfer Type</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingTransfer.transferType}</p>
										</div>
									</div>
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<Calendar className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Transfer Date</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingTransfer.transferDate}</p>
										</div>
									</div>
								</div>

								<div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
									<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Reason</p>
									<p className="text-sm text-gray-900 dark:text-white">{viewingTransfer.reason}</p>
								</div>

								<div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
									<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Status</p>
									<span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
										viewingTransfer.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
										viewingTransfer.status === 'Approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
										viewingTransfer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
										'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
									}`}>
										{viewingTransfer.status}
									</span>
									{viewingTransfer.approvedBy && (
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Approved by: {viewingTransfer.approvedBy}</p>
									)}
								</div>

								<div className="mt-8 flex items-center justify-end">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setViewingTransfer(null)}
										className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
									>
										Close
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Add Transfer Form Modal */}
			<AnimatePresence>
				{showAddForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setShowAddForm(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-3xl rounded-2xl border border-primary/60 dark:border-primary/40 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-primary to-purple-600 p-8">
								<button
									onClick={() => setShowAddForm(false)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
								>
									<X size={18} className="text-white" />
								</button>

								<div className="flex items-center gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-xl flex-shrink-0"
									>
										<Plus className="text-white" size={40} />
									</motion.div>

									<div>
										<h3 className="text-2xl font-bold text-white mb-1">New Transfer Request</h3>
										<p className="text-sm text-white/80">Submit a student transfer request</p>
									</div>
								</div>
							</div>

							{/* Form */}
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleAddTransfer(new FormData(e.currentTarget))
								}}
								className="p-8 space-y-6"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Student Name - Searchable */}
									<div className="relative" ref={studentSearchRef}>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Student Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={studentSearch}
											onChange={(e) => {
												setStudentSearch(e.target.value)
												setShowStudentDropdown(true)
											}}
											onFocus={() => setShowStudentDropdown(true)}
											placeholder="Search by name or roll number..."
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
										<input
											type="hidden"
											name="studentName"
											value={selectedStudent?.name || ''}
										/>
										
										{/* Dropdown Results */}
										{showStudentDropdown && studentSearch && (
											<div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
												{filteredStudents.length > 0 ? (
													filteredStudents.map(student => (
														<button
															key={student.id}
															type="button"
															onClick={() => {
																setSelectedStudent(student)
																setStudentSearch(student.name)
																setShowStudentDropdown(false)
															}}
															className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
														>
															<div className="font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
															<div className="text-sm text-gray-500 dark:text-gray-400">{student.rollNumber} - {student.class}</div>
														</button>
													))
												) : (
													<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
														No student found
													</div>
												)}
											</div>
										)}
									</div>
									{/* Roll Number - Auto-filled */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Roll Number
										</label>
										<input
											type="text"
											name="studentRollNumber"
											value={selectedStudent?.rollNumber || ''}
											readOnly
											required
											placeholder="ST001"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
										/>
									</div>
									{/* Current Class - Auto-filled */}
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Current Class
										</label>
										<input
											type="text"
											name="currentClass"
											value={selectedStudent?.class || ''}
											readOnly
											required
											placeholder="Grade 10A"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											New Class <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="newClass"
											required
											placeholder="Grade 10B"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Transfer Type <span className="text-red-500">*</span>
										</label>
										<select
											name="transferType"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Type</option>
											<option value="Internal">Internal</option>
											<option value="To Branch">To Branch</option>
											<option value="From Branch">From Branch</option>
											<option value="Hostel Transfer">Hostel Transfer</option>
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Transfer Date <span className="text-red-500">*</span>
										</label>
										<input
											type="date"
											name="transferDate"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>
									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Reason <span className="text-red-500">*</span>
										</label>
										<textarea
											name="reason"
											required
											rows={3}
											placeholder="Enter the reason for transfer..."
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
										/>
									</div>
								</div>

								<div className="flex items-center gap-3 pt-4">
									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setShowAddForm(false)}
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
										<CheckCircle2 size={18} />
										Submit Request
									</motion.button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{deletingTransfer && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setDeletingTransfer(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md mx-4 rounded-2xl border border-red-200/60 dark:border-red-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 flex justify-center">
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center"
								>
									<div className="w-16 h-16 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center">
										<Trash2 className="w-10 h-10 text-white" />
									</div>
								</motion.div>
							</div>

							<div className="p-6 text-center">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Delete Transfer?</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-2">Are you sure you want to delete this transfer request?</p>
								<p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
									{deletingTransfer.studentName}
								</p>

								<div className="flex items-center gap-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setDeletingTransfer(null)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Cancel
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={confirmDelete}
										className="flex-1 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
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
		</div>
	)
}
