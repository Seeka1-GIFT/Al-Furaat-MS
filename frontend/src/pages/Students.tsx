import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Mail, Phone, X, BookOpen, User, Calendar, MapPin, Users } from 'lucide-react'
import { StudentForm } from '../components/forms/StudentForm'
import { studentSchema, type StudentFormData } from '../lib/schemas'

interface Student {
	id: number
	name: string
	grade: string
	rollNumber: string
	email: string
	phone: string
	dateOfBirth?: string
	address?: string
	parentName?: string
	parentPhone?: string
	photo?: string
}

export default function Students() {
	const [showForm, setShowForm] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterGrade, setFilterGrade] = useState<string>('all')
	const [showFilterMenu, setShowFilterMenu] = useState(false)
	const [editingStudent, setEditingStudent] = useState<Student | null>(null)
	const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
	const [deletingStudent, setDeletingStudent] = useState<Student | null>(null)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const filterMenuRef = useRef<HTMLDivElement>(null)
	const [students, setStudents] = useState<Student[]>([
		{ id: 1, name: 'Ahmed Hassan', grade: '10A', rollNumber: 'ST001', email: 'ahmed@example.com', phone: '+252 61 123 4567' },
		{ id: 2, name: 'Fatima Ali', grade: '9B', rollNumber: 'ST002', email: 'fatima@example.com', phone: '+252 61 234 5678' },
		{ id: 3, name: 'Omar Mohamed', grade: '11C', rollNumber: 'ST003', email: 'omar@example.com', phone: '+252 61 345 6789' },
		{ id: 4, name: 'Aisha Ibrahim', grade: '8A', rollNumber: 'ST004', email: 'aisha@example.com', phone: '+252 61 456 7890' },
	])

	// Filter and search students
	const filteredStudents = useMemo(() => {
		return students.filter(student => {
			const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
				student.grade.toLowerCase().includes(searchQuery.toLowerCase())
			
			const matchesFilter = filterGrade === 'all' || student.grade === filterGrade
			
			return matchesSearch && matchesFilter
		})
	}, [students, searchQuery, filterGrade])

	// Get unique grades for filter
	const grades = useMemo(() => {
		const gradeSet = new Set(students.map(s => s.grade))
		return Array.from(gradeSet).sort()
	}, [students])

	const handleAddStudent = async (data: StudentFormData) => {
		setIsLoading(true)
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))
			
			if (editingStudent) {
				// Update existing student
				setStudents(prev => prev.map(s => 
					s.id === editingStudent.id 
						? { ...s, ...data } 
						: s
				))
				setSuccessMessage(`✓ Student "${data.name}" updated successfully!`)
			} else {
				// Add new student
				const newStudent: Student = {
					id: students.length + 1,
					...data,
				}
				setStudents(prev => [...prev, newStudent])
				setSuccessMessage(`✓ Student "${data.name}" added successfully!`)
			}
			
			setShowForm(false)
			setEditingStudent(null)
			
			// Auto-hide success message after 3 seconds
			setTimeout(() => setSuccessMessage(''), 3000)
		} catch (error) {
			console.error('Error saving student:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleEditStudent = (student: Student) => {
		setEditingStudent(student)
		setShowForm(true)
	}

	const handleDeleteStudent = (id: number) => {
		const student = students.find(s => s.id === id)
		if (student) {
			setDeletingStudent(student)
		}
	}

	const confirmDelete = () => {
		if (deletingStudent) {
			setStudents(prev => prev.filter(s => s.id !== deletingStudent.id))
			setSuccessMessage(`✓ Student "${deletingStudent.name}" deleted successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
			setDeletingStudent(null)
		}
	}

	const cancelDelete = () => {
		setDeletingStudent(null)
	}

	const handleViewStudent = (student: Student) => {
		setViewingStudent(student)
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
					<h2 className="text-2xl font-semibold tracking-tight">Students</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Manage student information and records
						{filteredStudents.length > 0 && (
							<span className="ml-2 text-primary font-medium">
								({filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'})
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
					Add Student
				</motion.button>
			</div>

			{/* Search and Filter Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search students..."
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
						{filterGrade !== 'all' && (
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
										FILTER BY GRADE
									</div>
									<button
										onClick={() => {
											setFilterGrade('all')
											setShowFilterMenu(false)
										}}
										className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
											filterGrade === 'all' ? 'bg-primary/10 text-primary font-medium' : ''
										}`}
									>
										All Grades
									</button>
									{grades.map(grade => (
										<button
											key={grade}
											onClick={() => {
												setFilterGrade(grade)
												setShowFilterMenu(false)
											}}
											className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
												filterGrade === grade ? 'bg-primary/10 text-primary font-medium' : ''
											}`}
										>
											{grade}
										</button>
									))}
									{filterGrade !== 'all' && (
										<>
											<div className="my-2 border-t border-gray-200 dark:border-gray-800" />
											<button
												onClick={() => {
													setFilterGrade('all')
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

			{/* Students Table */}
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
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roll Number</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
							{filteredStudents.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center">
										<div className="text-gray-500 dark:text-gray-400">
											<p className="text-lg font-medium mb-2">No students found</p>
											<p className="text-sm">Try adjusting your search or filter criteria</p>
										</div>
									</td>
								</tr>
							) : (
								filteredStudents.map((student, index) => (
								<motion.tr
									key={student.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
									className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
								>
									<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
													{student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
												</div>
										<div>
											<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{student.email}</div>
												</div>
										</div>
									</td>
									<td className="px-6 py-4">
										<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
											{student.grade}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{student.rollNumber}</td>
									<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{student.phone}</td>
									<td className="px-6 py-4 text-right">
										<div className="flex items-center justify-end gap-2">
											<button 
													onClick={() => handleViewStudent(student)}
													className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
												title="View Details"
											>
													<Eye size={16} className="text-gray-400 hover:text-primary" />
											</button>
												<button 
													onClick={() => handleEditStudent(student)}
													className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
													title="Edit"
												>
													<Edit size={16} className="text-gray-400 hover:text-primary" />
											</button>
												<button 
													onClick={() => handleDeleteStudent(student.id)}
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

			{/* Student Form Modal */}
			{showForm && (
				<StudentForm
					onSubmit={handleAddStudent}
					onCancel={() => {
						setShowForm(false)
						setEditingStudent(null)
					}}
					isLoading={isLoading}
					initialData={editingStudent ? {
						name: editingStudent.name,
						email: editingStudent.email,
						phone: editingStudent.phone,
						grade: editingStudent.grade,
						rollNumber: editingStudent.rollNumber,
						dateOfBirth: editingStudent.dateOfBirth,
						address: editingStudent.address,
						parentName: editingStudent.parentName,
						parentPhone: editingStudent.parentPhone,
						photo: editingStudent.photo,
					} : undefined}
				/>
			)}

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{deletingStudent && (
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
									Delete Student?
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-2">
									Are you sure you want to delete
								</p>
								<p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
									"{deletingStudent.name}"?
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
												All student information, including their grade ({deletingStudent.grade}), roll number ({deletingStudent.rollNumber}), and records will be permanently removed.
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

			{/* Student Details View Modal */}
			<AnimatePresence>
				{viewingStudent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setViewingStudent(null)}
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
									onClick={() => setViewingStudent(null)}
									className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
								>
									<X size={20} className="text-white" />
								</button>
								
								{/* Student Avatar */}
								<div className="absolute -bottom-16 left-8">
									{viewingStudent.photo ? (
										<img
											src={viewingStudent.photo}
											alt={viewingStudent.name}
											className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-xl"
										/>
									) : (
										<div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
											{viewingStudent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
										</div>
									)}
								</div>
							</div>

							{/* Content */}
							<div className="px-8 pt-20 pb-8">
								{/* Name and Grade */}
								<div className="flex items-start justify-between mb-6">
									<div>
										<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
											{viewingStudent.name}
										</h2>
										<div className="flex items-center gap-3">
											<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
												Grade {viewingStudent.grade}
											</span>
											<span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
												{viewingStudent.rollNumber}
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
												{viewingStudent.email}
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
												{viewingStudent.phone}
											</p>
										</div>
									</div>

									{/* Parent Name */}
									{viewingStudent.parentName && (
										<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
											<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
												<User size={20} className="text-purple-600 dark:text-purple-400" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
													Parent Name
												</p>
												<p className="text-sm font-medium text-gray-900 dark:text-white">
													{viewingStudent.parentName}
												</p>
											</div>
										</div>
									)}

									{/* Parent Phone */}
									{viewingStudent.parentPhone && (
										<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
											<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
												<Phone size={20} className="text-orange-600 dark:text-orange-400" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
													Parent Contact
												</p>
												<p className="text-sm font-medium text-gray-900 dark:text-white">
													{viewingStudent.parentPhone}
												</p>
											</div>
										</div>
									)}

									{/* Date of Birth */}
									{viewingStudent.dateOfBirth && (
										<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
											<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
												<Calendar size={20} className="text-pink-600 dark:text-pink-400" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
													Date of Birth
												</p>
												<p className="text-sm font-medium text-gray-900 dark:text-white">
													{viewingStudent.dateOfBirth}
												</p>
											</div>
										</div>
									)}
								</div>

								{/* Address */}
								{viewingStudent.address && (
									<div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<div className="flex items-start gap-3">
											<MapPin size={20} className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
											<div className="flex-1">
												<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
													Address
												</p>
												<p className="text-sm text-gray-900 dark:text-white">
													{viewingStudent.address}
												</p>
											</div>
										</div>
									</div>
								)}

								{/* Action Buttons */}
								<div className="mt-8 flex items-center justify-end gap-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setViewingStudent(null)}
										className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
									>
										Close
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											setViewingStudent(null)
											handleEditStudent(viewingStudent)
										}}
										className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors inline-flex items-center gap-2"
									>
										<Edit size={16} />
										Edit Student
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