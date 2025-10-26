import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Users, Clock, X, BookOpen, MapPin, Calendar } from 'lucide-react'

interface Class {
	id: number
	name: string
	subject: string
	teacher: string
	students: number
	schedule: string
	room: string
	status: string
	maxStudents?: number
	description?: string
}

export default function Classes() {
	const [searchQuery, setSearchQuery] = useState('')
	const [filterSubject, setFilterSubject] = useState<string>('all')
	const [showFilterMenu, setShowFilterMenu] = useState(false)
	const [viewingClass, setViewingClass] = useState<Class | null>(null)
	const [deletingClass, setDeletingClass] = useState<Class | null>(null)
	const [editingClass, setEditingClass] = useState<Class | null>(null)
	const [showEditForm, setShowEditForm] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const filterMenuRef = useRef<HTMLDivElement>(null)
	
	const [classes, setClasses] = useState<Class[]>([
		{ id: 1, name: 'Grade 10A', subject: 'Mathematics', teacher: 'Dr. Mohamed Abdi', students: 28, schedule: 'Mon-Fri 8:00-9:00', room: 'Room 101', status: 'Active', maxStudents: 30 },
		{ id: 2, name: 'Grade 9B', subject: 'English', teacher: 'Ms. Khadija Hassan', students: 25, schedule: 'Mon-Fri 9:00-10:00', room: 'Room 205', status: 'Active', maxStudents: 30 },
		{ id: 3, name: 'Grade 11C', subject: 'Science', teacher: 'Mr. Abdullah Omar', students: 30, schedule: 'Mon-Fri 10:00-11:00', room: 'Lab 1', status: 'Active', maxStudents: 30 },
		{ id: 4, name: 'Grade 8A', subject: 'Arabic', teacher: 'Ms. Amina Ali', students: 22, schedule: 'Mon-Fri 11:00-12:00', room: 'Room 103', status: 'Active', maxStudents: 25 },
	])

	// Filter and search classes
	const filteredClasses = useMemo(() => {
		return classes.filter(classItem => {
			const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				classItem.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
				classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
				classItem.room.toLowerCase().includes(searchQuery.toLowerCase())
			
			const matchesFilter = filterSubject === 'all' || classItem.subject === filterSubject
			
			return matchesSearch && matchesFilter
		})
	}, [classes, searchQuery, filterSubject])

	// Get unique subjects for filter
	const subjects = useMemo(() => {
		const subjectSet = new Set(classes.map(c => c.subject))
		return Array.from(subjectSet).sort()
	}, [classes])

	const handleViewClass = (classItem: Class) => {
		setViewingClass(classItem)
	}

	const handleEditClass = (classItem: Class) => {
		setEditingClass(classItem)
	}

	// Open edit form
	const openEditForm = () => {
		setShowEditForm(true)
		// Don't close editingClass yet, we need its data for the form
	}

	// Handle update class
	const handleUpdateClass = (classData: any) => {
		if (editingClass) {
			const updatedClasses = classes.map(c => 
				c.id === editingClass.id ? { ...c, ...classData } : c
			)
			setClasses(updatedClasses)
			setShowEditForm(false)
			setEditingClass(null)
			setSuccessMessage(`✓ ${classData.name} has been updated successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
		}
	}

	const handleDeleteClass = (id: number) => {
		const classItem = classes.find(c => c.id === id)
		if (classItem) {
			setDeletingClass(classItem)
		}
	}

	const confirmDelete = () => {
		if (deletingClass) {
			setClasses(prev => prev.filter(c => c.id !== deletingClass.id))
			setSuccessMessage(`✓ Class "${deletingClass.name}" deleted successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
			setDeletingClass(null)
		}
	}

	const cancelDelete = () => {
		setDeletingClass(null)
	}

	// Close filter menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
				setShowFilterMenu(false)
			}
		}

		if (showFilterMenu) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showFilterMenu])

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
					<h2 className="text-2xl font-semibold tracking-tight">Classes</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Manage class schedules and assignments
						{filteredClasses.length > 0 && (
							<span className="ml-2 text-primary font-medium">
								({filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'})
							</span>
						)}
					</p>
				</div>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					<Plus size={16} />
					Add Class
				</motion.button>
			</div>

			{/* Search and Filter Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search classes..."
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
						{filterSubject !== 'all' && (
							<span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
								1
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
								className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 z-50"
							>
								<div className="p-2">
									<div className="mb-2 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
										FILTER BY SUBJECT
									</div>
									<button
										onClick={() => {
											setFilterSubject('all')
									setShowFilterMenu(false)
									}}
									className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
										filterSubject === 'all' ? 'bg-primary/10 text-primary font-medium' : ''
									}`}
								>
									All Subjects
								</button>
								{subjects.map(subject => (
									<button
										key={subject}
										onClick={() => {
											setFilterSubject(subject)
											setShowFilterMenu(false)
										}}
										className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
											filterSubject === subject ? 'bg-primary/10 text-primary font-medium' : ''
										}`}
									>
										{subject}
									</button>
								))}
								{filterSubject !== 'all' && (
									<>
										<div className="my-2 border-t border-gray-200 dark:border-gray-800" />
										<button
											onClick={() => {
												setFilterSubject('all')
												setShowFilterMenu(false)
											}}
											className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
										>
											Clear Filter
										</button>
									</>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>

		{/* Classes Table */}
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
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Schedule</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Room</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
						{filteredClasses.length === 0 ? (
							<tr>
								<td colSpan={8} className="px-6 py-12 text-center">
									<div className="text-gray-500 dark:text-gray-400">
										<p className="text-lg font-medium mb-2">No classes found</p>
										<p className="text-sm">Try adjusting your search or filter criteria</p>
									</div>
								</td>
							</tr>
						) : (
							filteredClasses.map((classItem, index) => (
								<motion.tr
									key={classItem.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
									className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
								>
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
												{classItem.name.replace('Grade ', '')}
											</div>
											<div>
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{classItem.name}</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">{classItem.students} students</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
											{classItem.subject}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{classItem.teacher}</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
											<Users size={16} className="text-gray-400" />
											<span>{classItem.students}</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
											<Clock size={16} className="text-gray-400" />
											<span>{classItem.schedule}</span>
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{classItem.room}</td>
									<td className="px-6 py-4">
										<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
											{classItem.status}
										</span>
									</td>
									<td className="px-6 py-4 text-right">
										<div className="flex items-center justify-end gap-2">
											<button 
												onClick={() => handleViewClass(classItem)}
												className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
												title="View Details"
											>
												<Eye size={16} className="text-gray-400 hover:text-primary" />
											</button>
											<button 
												onClick={() => handleEditClass(classItem)}
												className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
												title="Edit"
											>
												<Edit size={16} className="text-gray-400 hover:text-primary" />
											</button>
											<button 
												onClick={() => handleDeleteClass(classItem.id)}
												className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
												title="Delete"
											>
												<Trash2 size={16} className="text-red-400 hover:text-red-600" />
											</button>
											<button className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="More Options">
												<MoreHorizontal size={16} className="text-gray-400 hover:text-primary" />
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

		{/* Delete Confirmation Modal */}
		<AnimatePresence>
			{deletingClass && (
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
						{/* Warning Icon Header */}
						<div className="relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 flex justify-center">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
								className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center"
							>
								<div className="w-16 h-16 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center">
									<svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
									</svg>
								</div>
							</motion.div>
						</div>

						{/* Content */}
						<div className="p-6 text-center">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
								Delete Class?
							</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-2">
								Are you sure you want to delete
							</p>
							<p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
								"{deletingClass.name}"?
							</p>
							<div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6">
								<div className="flex items-start gap-3 text-left">
									<svg className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<div className="flex-1">
										<p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
											This action cannot be undone
										</p>
										<p className="text-xs text-red-600 dark:text-red-400">
											All class information for {deletingClass.name} ({deletingClass.subject}), including schedules and {deletingClass.students} enrolled students, will be removed.
										</p>
									</div>
								</div>
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

		{/* Edit Class Modal */}
		<AnimatePresence>
			{editingClass && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
					onClick={() => setEditingClass(null)}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						transition={{ type: 'spring', duration: 0.5 }}
						className="w-full max-w-md mx-4 rounded-2xl border border-blue-200/60 dark:border-blue-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 flex flex-col items-center">
							<motion.div
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
								className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl mb-4"
							>
								{editingClass.name.replace('Grade ', '')}
							</motion.div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								{editingClass.name}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								{editingClass.subject}
							</p>
						</div>

						{/* Content */}
						<div className="p-6">
							<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
										<Edit size={20} className="text-blue-600 dark:text-blue-400" />
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
											Edit Class Information
										</p>
										<p className="text-xs text-blue-700 dark:text-blue-300">
											A comprehensive class form will be available here to edit all class details including:
										</p>
										<ul className="mt-2 space-y-1">
											<li className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
												<span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
												Class name and subject
											</li>
											<li className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
												<span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
												Teacher assignment
											</li>
											<li className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
												<span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
												Schedule and room
											</li>
											<li className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
												<span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
												Maximum students capacity
											</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Current Details Preview */}
							<div className="space-y-3 mb-6">
								<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Teacher</span>
									<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingClass.teacher}</span>
								</div>
								<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Students</span>
									<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingClass.students} / {editingClass.maxStudents || 30}</span>
								</div>
								<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Schedule</span>
									<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingClass.schedule}</span>
								</div>
								<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Room</span>
									<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingClass.room}</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex items-center gap-3">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setEditingClass(null)}
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

		{/* Class Details View Modal */}
		<AnimatePresence>
			{viewingClass && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
					onClick={() => setViewingClass(null)}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', duration: 0.5 }}
						className="w-full max-w-2xl mx-4 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900 backdrop-blur shadow-2xl overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header with gradient background */}
						<div className="relative h-32 bg-gradient-to-br from-primary via-blue-600 to-purple-600 overflow-hidden">
							<div className="absolute inset-0 bg-black/10"></div>
							<button
								onClick={() => setViewingClass(null)}
								className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
							>
								<X size={20} className="text-white" />
							</button>
							
							{/* Class Icon */}
							<div className="absolute -bottom-16 left-8">
								<div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-900 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-5xl shadow-xl">
									{viewingClass.name.replace('Grade ', '')}
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="px-8 pt-20 pb-8">
							{/* Name and Status */}
							<div className="flex items-start justify-between mb-6">
								<div>
									<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
										{viewingClass.name}
									</h2>
									<div className="flex items-center gap-3">
										<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
											{viewingClass.subject}
										</span>
										<span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
											{viewingClass.status}
										</span>
									</div>
								</div>
							</div>

							{/* Information Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Teacher */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
										<BookOpen size={20} className="text-purple-600 dark:text-purple-400" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Teacher
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{viewingClass.teacher}
										</p>
									</div>
								</div>

								{/* Students */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
										<Users size={20} className="text-blue-600 dark:text-blue-400" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Students Enrolled
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{viewingClass.students} / {viewingClass.maxStudents || 30} students
										</p>
									</div>
								</div>

								{/* Schedule */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
										<Clock size={20} className="text-green-600 dark:text-green-400" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Schedule
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{viewingClass.schedule}
										</p>
									</div>
								</div>

								{/* Room */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
										<MapPin size={20} className="text-orange-600 dark:text-orange-400" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Room Location
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{viewingClass.room}
										</p>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="mt-8 flex items-center justify-end gap-3">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setViewingClass(null)}
									className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
								>
									Close
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => {
										setViewingClass(null)
										handleEditClass(viewingClass)
									}}
									className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors inline-flex items-center gap-2"
								>
									<Edit size={16} />
									Edit Class
								</motion.button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>

		{/* Edit Class Form Modal */}
		<AnimatePresence>
			{showEditForm && editingClass && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
					onClick={() => {
						setShowEditForm(false)
						setEditingClass(null)
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
									setEditingClass(null)
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
										Edit Class
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Update details for {editingClass.name}
									</p>
								</div>
							</div>
						</div>

						{/* Form */}
						<form 
							onSubmit={(e) => {
								e.preventDefault()
								const formData = new FormData(e.currentTarget)
								handleUpdateClass({
									name: formData.get('name'),
									subject: formData.get('subject'),
									teacher: formData.get('teacher'),
									students: Number(formData.get('students')),
									maxStudents: Number(formData.get('maxStudents')),
									schedule: formData.get('schedule'),
									room: formData.get('room'),
									status: formData.get('status'),
									description: formData.get('description') || undefined
								})
							}}
							className="p-8 space-y-6"
						>
							{/* Grid Layout for Form Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Class Name */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Class Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="name"
										required
										defaultValue={editingClass.name}
										placeholder="e.g., Grade 10A"
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									/>
								</div>

								{/* Subject */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Subject <span className="text-red-500">*</span>
									</label>
									<select
										name="subject"
										required
										defaultValue={editingClass.subject}
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									>
										<option value="">Select Subject</option>
										<option value="Mathematics">Mathematics</option>
										<option value="Physics">Physics</option>
										<option value="Chemistry">Chemistry</option>
										<option value="Biology">Biology</option>
										<option value="English">English</option>
										<option value="Arabic">Arabic</option>
										<option value="Science">Science</option>
										<option value="History">History</option>
										<option value="Geography">Geography</option>
										<option value="Computer Science">Computer Science</option>
									</select>
								</div>

								{/* Teacher */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Teacher <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="teacher"
										required
										defaultValue={editingClass.teacher}
										placeholder="e.g., Dr. Mohamed Abdi"
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									/>
								</div>

								{/* Room */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Room <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="room"
										required
										defaultValue={editingClass.room}
										placeholder="e.g., Room 101"
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									/>
								</div>

								{/* Schedule */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Schedule <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="schedule"
										required
										defaultValue={editingClass.schedule}
										placeholder="e.g., Mon-Fri 8:00-9:00"
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
										defaultValue={editingClass.status}
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
									</select>
								</div>

								{/* Current Students */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Current Students <span className="text-red-500">*</span>
									</label>
									<input
										type="number"
										name="students"
										required
										min="0"
										defaultValue={editingClass.students}
										placeholder="e.g., 28"
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									/>
								</div>

								{/* Max Students */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Max Students <span className="text-red-500">*</span>
									</label>
									<input
										type="number"
										name="maxStudents"
										required
										min="1"
										defaultValue={editingClass.maxStudents}
										placeholder="e.g., 30"
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
									/>
								</div>

								{/* Description */}
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Description <span className="text-gray-400 text-xs">(Optional)</span>
									</label>
									<textarea
										name="description"
										rows={3}
										defaultValue={editingClass.description}
										placeholder="Enter class description or notes..."
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
									/>
								</div>
							</div>

							{/* Info Box */}
							<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start gap-3">
								<BookOpen size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-green-900 dark:text-green-200 mb-1">
										Update Class Information
									</p>
									<p className="text-xs text-green-700 dark:text-green-300">
										All changes will be saved immediately. Make sure all class details are accurate before updating.
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
										setEditingClass(null)
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
									<Edit size={18} />
									Update Class
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
