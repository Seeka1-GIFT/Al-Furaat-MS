import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { 
	User, Mail, Phone, MapPin, Calendar, BookOpen, 
	CreditCard, FileText, Award, Download, Printer,
	ArrowLeft, Edit, Trash2, DollarSign, CheckCircle
} from 'lucide-react'

export default function StudentDetails() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'financial'>('personal')

	// Sample student data - Replace with API call
	const student = {
		id: id || '1',
		name: 'Ahmed Hassan Mohamed',
		rollNumber: 'ST001',
		grade: '10A',
		section: 'Science',
		dateOfBirth: '2008-05-15',
		gender: 'Male',
		email: 'ahmed@example.com',
		phone: '+252 61 123 4567',
		address: 'Mogadishu, Hodan District',
		admissionDate: '2020-09-01',
		bloodGroup: 'O+',
		religion: 'Islam',
		nationality: 'Somali',
		
		// Parent/Guardian Info
		parentName: 'Hassan Mohamed Ali',
		parentPhone: '+252 61 111 1111',
		parentEmail: 'hassan@example.com',
		relationship: 'Father',
		
		// Academic Info
		currentGPA: '3.85',
		attendance: '95%',
		totalCredits: 120,
		subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Arabic'],
		
		// Financial Info
		totalFees: 5000,
		paidAmount: 3500,
		balanceAmount: 1500,
		lastPaymentDate: '2025-01-15',
		paymentStatus: 'Partial',
		discount: 10,
		
		// Additional Info
		status: 'Active',
		studentType: 'Regular',
		hasCharity: false,
		clearanceStatus: 'Pending'
	}

	const tabs = [
		{ id: 'personal', label: 'Personal Info', icon: User },
		{ id: 'academic', label: 'Academic Info', icon: BookOpen },
		{ id: 'financial', label: 'Financial Info', icon: DollarSign }
	]

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<button
						onClick={() => navigate('/students')}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					>
						<ArrowLeft size={20} />
						Back
					</button>
					<div>
						<h2 className="text-2xl font-semibold tracking-tight">Student Details</h2>
						<p className="text-gray-600 dark:text-gray-400">Complete student information</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
					>
						<Edit size={16} />
						Edit
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
					>
						<Printer size={16} />
						Print
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
					>
						<Trash2 size={16} />
						Delete
					</motion.button>
				</div>
			</div>

			{/* Student Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
			>
				<div className="flex items-start gap-6">
					<div className="flex-shrink-0">
						<div className="w-32 h-32 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
							{student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
						</div>
					</div>
					<div className="flex-1">
						<div className="flex items-start justify-between">
							<div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{student.name}</h3>
								<p className="text-gray-600 dark:text-gray-400">Roll No: {student.rollNumber}</p>
							</div>
							<div className="text-right">
								<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
									student.status === 'Active' 
										? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
										: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
								}`}>
									{student.status}
								</span>
							</div>
						</div>
						<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
							<div>
								<p className="text-sm text-gray-500 dark:text-gray-400">Grade</p>
								<p className="font-medium text-gray-900 dark:text-gray-100">{student.grade}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500 dark:text-gray-400">Section</p>
								<p className="font-medium text-gray-900 dark:text-gray-100">{student.section}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500 dark:text-gray-400">GPA</p>
								<p className="font-medium text-gray-900 dark:text-gray-100">{student.currentGPA}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500 dark:text-gray-400">Attendance</p>
								<p className="font-medium text-gray-900 dark:text-gray-100">{student.attendance}</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Tabs */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav className="flex gap-6">
					{tabs.map((tab) => {
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

			{/* Tab Content */}
			{activeTab === 'personal' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h4 className="text-lg font-semibold mb-4">Personal Information</h4>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<Calendar className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.dateOfBirth}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<User className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.gender}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.email}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.phone}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<MapPin className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.address}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h4 className="text-lg font-semibold mb-4">Parent/Guardian Information</h4>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<User className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Parent Name</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.parentName}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Parent Phone</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.parentPhone}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Parent Email</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.parentEmail}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<User className="text-gray-400" size={18} />
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">Relationship</p>
									<p className="font-medium text-gray-900 dark:text-gray-100">{student.relationship}</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{activeTab === 'academic' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-6"
				>
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h4 className="text-lg font-semibold mb-4">Academic Performance</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
								<p className="text-sm text-gray-600 dark:text-gray-400">Current GPA</p>
								<p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{student.currentGPA}</p>
							</div>
							<div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
								<p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
								<p className="text-3xl font-bold text-green-600 dark:text-green-400">{student.attendance}</p>
							</div>
							<div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Credits</p>
								<p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{student.totalCredits}</p>
							</div>
						</div>
					</div>

					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h4 className="text-lg font-semibold mb-4">Enrolled Subjects</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{student.subjects.map((subject, index) => (
								<div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
									<BookOpen size={18} className="text-gray-400" />
									<span className="font-medium text-gray-900 dark:text-gray-100">{subject}</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex gap-4">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => navigate(`/students/${id}/transcript`)}
							className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
						>
							<FileText size={18} />
							View Transcript
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => navigate(`/students/${id}/certificate`)}
							className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
						>
							<Award size={18} />
							Generate Certificate
						</motion.button>
					</div>
				</motion.div>
			)}

			{activeTab === 'financial' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-6"
				>
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h4 className="text-lg font-semibold mb-4">Fee Summary</h4>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
								<p className="text-sm text-gray-600 dark:text-gray-400">Total Fees</p>
								<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${student.totalFees}</p>
							</div>
							<div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
								<p className="text-sm text-gray-600 dark:text-gray-400">Paid Amount</p>
								<p className="text-2xl font-bold text-green-600 dark:text-green-400">${student.paidAmount}</p>
							</div>
							<div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
								<p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
								<p className="text-2xl font-bold text-red-600 dark:text-red-400">${student.balanceAmount}</p>
							</div>
							<div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
								<p className="text-sm text-gray-600 dark:text-gray-400">Discount</p>
								<p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{student.discount}%</p>
							</div>
						</div>
					</div>

					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h4 className="text-lg font-semibold mb-4">Payment Status</h4>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-gray-600 dark:text-gray-400">Last Payment Date</span>
								<span className="font-medium text-gray-900 dark:text-gray-100">{student.lastPaymentDate}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 dark:text-gray-400">Payment Status</span>
								<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
									student.paymentStatus === 'Paid' 
										? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
										: student.paymentStatus === 'Partial'
										? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
										: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
								}`}>
									{student.paymentStatus}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 dark:text-gray-400">Clearance Status</span>
								<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
									student.clearanceStatus === 'Cleared' 
										? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
										: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
								}`}>
									{student.clearanceStatus}
								</span>
							</div>
						</div>
					</div>

					<div className="flex gap-4">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => navigate(`/students/${id}/statement`)}
							className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
						>
							<FileText size={18} />
							View Statement
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => navigate(`/students/${id}/clearance`)}
							className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
						>
							<CheckCircle size={18} />
							Clearance Card
						</motion.button>
					</div>
				</motion.div>
			)}
		</div>
	)
}

