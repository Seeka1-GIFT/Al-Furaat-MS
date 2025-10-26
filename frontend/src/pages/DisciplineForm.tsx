import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, X, CheckCircle2, AlertCircle, Gavel, User, Calendar, BookOpen, UserCircle } from 'lucide-react'

interface Student {
	id: number
	name: string
	rollNumber: string
	class: string
}

interface Staff {
	id: number
	name: string
	role: string
}

interface DisciplineRecord {
	id: number
	studentName: string
	rollNumber: string
	class: string
	incidentDate: string
	incidentType: string
	reportedBy: string
	description: string
}

export default function DisciplineForm() {
	const [studentSearch, setStudentSearch] = useState('')
	const [showStudentDropdown, setShowStudentDropdown] = useState(false)
	const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
	const [incidentDate, setIncidentDate] = useState('')
	const [incidentType, setIncidentType] = useState('')
	
	const [staffSearch, setStaffSearch] = useState('')
	const [showStaffDropdown, setShowStaffDropdown] = useState(false)
	const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
	
	const [description, setDescription] = useState('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	
	const studentSearchRef = useRef<HTMLDivElement>(null)
	const staffSearchRef = useRef<HTMLDivElement>(null)

	const [students] = useState<Student[]>([
		{ id: 1, name: 'Ahmed Hassan', rollNumber: 'ST001', class: 'Grade 10A' },
		{ id: 2, name: 'Fatima Ali', rollNumber: 'ST002', class: 'Grade 9B' },
		{ id: 3, name: 'Omar Mohamed', rollNumber: 'ST003', class: 'Grade 11C' },
		{ id: 4, name: 'Aisha Ibrahim', rollNumber: 'ST004', class: 'Grade 8A' },
	])

	const [staffMembers] = useState<Staff[]>([
		{ id: 1, name: 'Dr. Mohamed Abdi', role: 'Principal' },
		{ id: 2, name: 'Ms. Khadija Hassan', role: 'Vice Principal' },
		{ id: 3, name: 'Mr. Abdullah Omar', role: 'Senior Teacher' },
		{ id: 4, name: 'Ms. Amina Ali', role: 'Head Teacher' },
		{ id: 5, name: 'Mr. Hassan Yusuf', role: 'Teacher' },
	])

	const filteredStudents = useMemo(() => {
		if (!studentSearch) return []
		return students.filter(student =>
			student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
			student.rollNumber.toLowerCase().includes(studentSearch.toLowerCase())
		)
	}, [studentSearch, students])

	const filteredStaff = useMemo(() => {
		if (!staffSearch) return []
		return staffMembers.filter(staff =>
			staff.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
			staff.role.toLowerCase().includes(staffSearch.toLowerCase())
		)
	}, [staffSearch, staffMembers])

	const handleSubmitDiscipline = (e: React.FormEvent) => {
		e.preventDefault()
		
		setSuccessMessage('✓ Discipline record submitted successfully!')
		setTimeout(() => setSuccessMessage(''), 3000)
		
		// Reset form
		setStudentSearch('')
		setSelectedStudent(null)
		setIncidentDate('')
		setIncidentType('')
		setStaffSearch('')
		setSelectedStaff(null)
		setDescription('')
	}

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (studentSearchRef.current && !studentSearchRef.current.contains(event.target as Node)) {
				setShowStudentDropdown(false)
			}
			if (staffSearchRef.current && !staffSearchRef.current.contains(event.target as Node)) {
				setShowStaffDropdown(false)
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
					<h2 className="text-2xl font-semibold tracking-tight">Student Discipline Form</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Register disciplinary incidents and maintain records
					</p>
				</div>
			</div>

			{/* Form Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden"
			>
				{/* Gradient Header */}
				<div className="h-2 bg-gradient-to-r from-primary via-blue-600 to-purple-600"></div>

				<form onSubmit={handleSubmitDiscipline} className="p-8 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Student Name - Searchable */}
						<div className="md:col-span-2 relative" ref={studentSearchRef}>
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
								value={selectedStudent?.rollNumber || ''}
								readOnly
								className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
							/>
						</div>

						{/* Class - Auto-filled */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Class
							</label>
							<input
								type="text"
								value={selectedStudent?.class || ''}
								readOnly
								className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
							/>
						</div>

						{/* Incident Date */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Incident Date <span className="text-red-500">*</span>
							</label>
							<input
								type="date"
								value={incidentDate}
								onChange={(e) => setIncidentDate(e.target.value)}
								required
								className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
							/>
						</div>

						{/* Incident Type */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Incident Type <span className="text-red-500">*</span>
							</label>
							<select
								value={incidentType}
								onChange={(e) => setIncidentType(e.target.value)}
								required
								className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
							>
								<option value="">Select Type</option>
								<option value="Disruptive Behavior">Disruptive Behavior</option>
								<option value="Bullying">Bullying</option>
								<option value="Disrespectful Conduct">Disrespectful Conduct</option>
								<option value="Academic Dishonesty">Academic Dishonesty</option>
								<option value="Tardiness">Tardiness</option>
								<option value="Inappropriate Language">Inappropriate Language</option>
							</select>
						</div>

						{/* Reported By - Searchable */}
						<div className="md:col-span-2 relative" ref={staffSearchRef}>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Reported By <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								value={staffSearch}
								onChange={(e) => {
									setStaffSearch(e.target.value)
									setShowStaffDropdown(true)
								}}
								onFocus={() => setShowStaffDropdown(true)}
								placeholder="Search by name or role..."
								required
								className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
							/>
							
							{/* Dropdown Results */}
							{showStaffDropdown && staffSearch && (
								<div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
									{filteredStaff.length > 0 ? (
										filteredStaff.map(staff => (
											<button
												key={staff.id}
												type="button"
												onClick={() => {
													setSelectedStaff(staff)
													setStaffSearch(staff.name)
													setShowStaffDropdown(false)
												}}
												className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
											>
												<div className="font-medium text-gray-900 dark:text-gray-100">{staff.name}</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">{staff.role}</div>
											</button>
										))
									) : (
										<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
											No staff member found
										</div>
									)}
								</div>
							)}
						</div>

						{/* Description */}
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Description <span className="text-red-500">*</span>
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
								rows={5}
								placeholder="Describe the incident in detail..."
								className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex items-center justify-end gap-3 pt-4">
						<motion.button
							type="submit"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30"
						>
							<CheckCircle2 size={18} />
							Submit Discipline Record
						</motion.button>
					</div>
				</form>
			</motion.div>
		</div>
	)
}
