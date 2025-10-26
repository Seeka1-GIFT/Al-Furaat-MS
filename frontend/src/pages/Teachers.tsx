import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Mail, Phone, X, GraduationCap } from 'lucide-react'
import { TeacherForm } from '../components/forms/TeacherForm'
import { teacherSchema, type TeacherFormData } from '../lib/schemas'

interface Teacher {
	id: number
	name: string
	subject: string
	email: string
	phone: string
	experience: string
	status: string
	qualification: string
	dateOfBirth?: string
	address?: string
	salary?: string
	photo?: string
}

export default function Teachers() {
	const [showForm, setShowForm] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterSubject, setFilterSubject] = useState<string>('all')
	const [showFilterMenu, setShowFilterMenu] = useState(false)
	const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
	const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null)
	const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const filterMenuRef = useRef<HTMLDivElement>(null)
	const [teachers, setTeachers] = useState<Teacher[]>([
		{ id: 1, name: 'Dr. Mohamed Abdi', subject: 'Mathematics', email: 'mohamed@school.com', phone: '+252 61 111 1111', experience: '8 years', status: 'Active', qualification: 'PhD Mathematics' },
		{ id: 2, name: 'Ms. Khadija Hassan', subject: 'English', email: 'khadija@school.com', phone: '+252 61 222 2222', experience: '5 years', status: 'Active', qualification: 'MA English Literature' },
		{ id: 3, name: 'Mr. Abdullah Omar', subject: 'Science', email: 'abdullah@school.com', phone: '+252 61 333 3333', experience: '12 years', status: 'Active', qualification: 'MSc Physics' },
		{ id: 4, name: 'Ms. Amina Ali', subject: 'Arabic', email: 'amina@school.com', phone: '+252 61 444 4444', experience: '6 years', status: 'Active', qualification: 'BA Arabic Language' },
	])

	// Filter and search teachers
	const filteredTeachers = useMemo(() => {
		return teachers.filter(teacher => {
			const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
				teacher.qualification.toLowerCase().includes(searchQuery.toLowerCase())
			
			const matchesFilter = filterSubject === 'all' || teacher.subject === filterSubject
			
			return matchesSearch && matchesFilter
		})
	}, [teachers, searchQuery, filterSubject])

	// Get unique subjects for filter
	const subjects = useMemo(() => {
		const subjectSet = new Set(teachers.map(t => t.subject))
		return Array.from(subjectSet)
	}, [teachers])

	const handleAddTeacher = async (data: TeacherFormData) => {
		setIsLoading(true)
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))
			
			if (editingTeacher) {
				// Update existing teacher
				setTeachers(prev => prev.map(t => 
					t.id === editingTeacher.id 
						? { ...t, ...data } 
						: t
				))
				setSuccessMessage(`✓ Teacher "${data.name}" updated successfully!`)
			} else {
				// Add new teacher
				const newTeacher: Teacher = {
					id: teachers.length + 1,
					...data,
					status: 'Active'
				}
				setTeachers(prev => [...prev, newTeacher])
				setSuccessMessage(`✓ Teacher "${data.name}" added successfully!`)
			}
			
			setShowForm(false)
			setEditingTeacher(null)
			
			// Auto-hide success message after 3 seconds
			setTimeout(() => setSuccessMessage(''), 3000)
		} catch (error) {
			console.error('Error saving teacher:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleEditTeacher = (teacher: Teacher) => {
		setEditingTeacher(teacher)
		setShowForm(true)
	}

	const handleDeleteTeacher = (id: number) => {
		const teacher = teachers.find(t => t.id === id)
		if (teacher) {
			setDeletingTeacher(teacher)
		}
	}

	const confirmDelete = () => {
		if (deletingTeacher) {
			setTeachers(prev => prev.filter(t => t.id !== deletingTeacher.id))
			setSuccessMessage(`✓ Teacher "${deletingTeacher.name}" deleted successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
			setDeletingTeacher(null)
		}
	}

	const cancelDelete = () => {
		setDeletingTeacher(null)
	}

	const handleViewTeacher = (teacher: Teacher) => {
		setViewingTeacher(teacher)
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
					<h2 className="text-2xl font-semibold tracking-tight">Teachers</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Manage teacher information and assignments
						{filteredTeachers.length > 0 && (
							<span className="ml-2 text-primary font-medium">
								({filteredTeachers.length} {filteredTeachers.length === 1 ? 'teacher' : 'teachers'})
							</span>
						)}
					</p>
				</div>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setShowForm(true)}
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					<Plus size={16} />
					Add Teacher
				</motion.button>
			</div>

		{/* Search and Filter Bar */}
		<div className="flex items-center gap-4">
			<div className="relative flex-1 max-w-sm">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<input
					type="text"
					placeholder="Search teachers..."
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

		{/* Teachers Table */}
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
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qualification</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Experience</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
						{filteredTeachers.length === 0 ? (
						<tr>
							<td colSpan={7} className="px-6 py-12 text-center">
								<div className="text-gray-500 dark:text-gray-400">
									<p className="text-lg font-medium mb-2">No teachers found</p>
									<p className="text-sm">Try adjusting your search or filter criteria</p>
								</div>
							</td>
						</tr>
					) : (
						filteredTeachers.map((teacher, index) => (
							<motion.tr
								key={teacher.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
								className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
							>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
											{teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
										</div>
										<div>
											<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{teacher.name}</div>
											<div className="text-xs text-gray-500 dark:text-gray-400">{teacher.email}</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
										{teacher.subject}
									</span>
								</td>
								<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{teacher.qualification}</td>
								<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{teacher.phone}</td>
								<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{teacher.experience}</td>
								<td className="px-6 py-4">
									<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
										{teacher.status}
									</span>
								</td>
								<td className="px-6 py-4 text-right">
									<div className="flex items-center justify-end gap-2">
										<button 
											onClick={() => handleViewTeacher(teacher)}
											className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
											title="View Details"
										>
											<Eye size={16} className="text-gray-400 hover:text-primary" />
										</button>
										<button 
											onClick={() => handleEditTeacher(teacher)}
											className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
											title="Edit"
										>
											<Edit size={16} className="text-gray-400 hover:text-primary" />
										</button>
										<button 
											onClick={() => handleDeleteTeacher(teacher.id)}
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

		{/* Teacher Form Modal */}
		{showForm && (
			<TeacherForm
				onSubmit={handleAddTeacher}
				onCancel={() => {
					setShowForm(false)
					setEditingTeacher(null)
				}}
				isLoading={isLoading}
				initialData={editingTeacher ? {
					name: editingTeacher.name,
					email: editingTeacher.email,
					phone: editingTeacher.phone,
					subject: editingTeacher.subject,
					qualification: editingTeacher.qualification,
					experience: editingTeacher.experience,
					dateOfBirth: editingTeacher.dateOfBirth,
					address: editingTeacher.address,
					salary: editingTeacher.salary,
					photo: editingTeacher.photo,
				} : undefined}
			/>
		)}

		{/* Delete Confirmation Modal */}
		<AnimatePresence>
			{deletingTeacher && (
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
								Delete Teacher?
							</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-2">
								Are you sure you want to delete
							</p>
							<p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
								"{deletingTeacher.name}"?
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
											All teacher information, including their subject ({deletingTeacher.subject}), qualifications, and records will be permanently removed.
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

		{/* Teacher Details View Modal */}
		<AnimatePresence>
			{viewingTeacher && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
					onClick={() => setViewingTeacher(null)}
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
								onClick={() => setViewingTeacher(null)}
								className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
							>
								<X size={20} className="text-white" />
							</button>
							
							{/* Teacher Avatar */}
							<div className="absolute -bottom-16 left-8">
								{viewingTeacher.photo ? (
									<img
										src={viewingTeacher.photo}
										alt={viewingTeacher.name}
										className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-xl"
									/>
								) : (
									<div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
										{viewingTeacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
									</div>
								)}
							</div>
						</div>

						{/* Content */}
						<div className="px-8 pt-20 pb-8">
							{/* Name and Status */}
							<div className="flex items-start justify-between mb-6">
								<div>
									<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
										{viewingTeacher.name}
									</h2>
									<div className="flex items-center gap-3">
										<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
											{viewingTeacher.subject}
										</span>
										<span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
											{viewingTeacher.status}
										</span>
									</div>
								</div>
							</div>

							{/* Information Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Email */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
										<Mail size={20} className="text-blue-600 dark:text-blue-400" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Email Address
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
											{viewingTeacher.email}
										</p>
									</div>
								</div>

								{/* Phone */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
										<Phone size={20} className="text-green-600 dark:text-green-400" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Phone Number
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{viewingTeacher.phone}
										</p>
									</div>
								</div>

								{/* Qualification */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
										<GraduationCap size={20} className="text-purple-600 dark:text-purple-400" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Qualification
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{viewingTeacher.qualification}
										</p>
									</div>
								</div>

								{/* Experience */}
								<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
									<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
										<svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
										</svg>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
											Experience
										</p>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{viewingTeacher.experience}
										</p>
									</div>
								</div>

								{/* Date of Birth */}
								{viewingTeacher.dateOfBirth && (
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
										<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
											<svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
												Date of Birth
											</p>
											<p className="text-sm font-medium text-gray-900 dark:text-white">
												{viewingTeacher.dateOfBirth}
											</p>
										</div>
									</div>
								)}

								{/* Salary */}
								{viewingTeacher.salary && (
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
										<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
											<svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
												Salary
											</p>
											<p className="text-sm font-medium text-gray-900 dark:text-white">
												${viewingTeacher.salary}
											</p>
										</div>
									</div>
								)}
							</div>

							{/* Address */}
							{viewingTeacher.address && (
								<div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
									<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
										Address
									</p>
									<p className="text-sm text-gray-900 dark:text-white">
										{viewingTeacher.address}
									</p>
								</div>
							)}

							{/* Action Buttons */}
							<div className="mt-8 flex items-center justify-end gap-3">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setViewingTeacher(null)}
									className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
								>
									Close
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => {
										setViewingTeacher(null)
										handleEditTeacher(viewingTeacher)
									}}
									className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors inline-flex items-center gap-2"
								>
									<Edit size={16} />
									Edit Teacher
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