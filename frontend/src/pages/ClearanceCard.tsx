import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { 
	ArrowLeft, Printer, Download, CheckCircle, XCircle, Clock,
	DollarSign, BookOpen, Home, User, FileText, AlertCircle
} from 'lucide-react'

interface ClearanceItem {
	department: string
	icon: any
	status: 'cleared' | 'pending' | 'issue'
	clearedBy?: string
	clearedDate?: string
	remarks?: string
}

export default function ClearanceCard() {
	const { id } = useParams()
	const navigate = useNavigate()

	// Sample data - Replace with API call
	const student = {
		name: 'Ahmed Hassan Mohamed',
		rollNumber: 'ST001',
		grade: '10A',
		section: 'Science',
		admissionDate: '2020-09-01',
		photo: null
	}

	const [clearanceItems, setClearanceItems] = useState<ClearanceItem[]>([
		{
			department: 'Finance Office',
			icon: DollarSign,
			status: 'pending',
			remarks: 'Outstanding balance: $1,250'
		},
		{
			department: 'Library',
			icon: BookOpen,
			status: 'cleared',
			clearedBy: 'Librarian',
			clearedDate: '2025-01-20',
			remarks: 'All books returned'
		},
		{
			department: 'Hostel',
			icon: Home,
			status: 'cleared',
			clearedBy: 'Hostel Warden',
			clearedDate: '2025-01-18',
			remarks: 'Room vacated and inspected'
		},
		{
			department: 'Academic Office',
			icon: FileText,
			status: 'cleared',
			clearedBy: 'Academic Dean',
			clearedDate: '2025-01-22',
			remarks: 'All academic requirements met'
		},
		{
			department: 'Discipline Office',
			icon: User,
			status: 'cleared',
			clearedBy: 'Discipline Officer',
			clearedDate: '2025-01-19',
			remarks: 'No pending disciplinary cases'
		},
		{
			department: 'Lab & Equipment',
			icon: BookOpen,
			status: 'issue',
			remarks: 'Lab equipment not returned - Chemistry set'
		}
	])

	const clearanceStatus = clearanceItems.every(item => item.status === 'cleared') 
		? 'fully-cleared' 
		: clearanceItems.some(item => item.status === 'issue')
		? 'has-issues'
		: 'pending'

	const clearedCount = clearanceItems.filter(item => item.status === 'cleared').length
	const totalCount = clearanceItems.length
	const progressPercentage = (clearedCount / totalCount) * 100

	const handlePrint = () => {
		window.print()
	}

	const handleDownload = () => {
		alert('PDF download will be implemented')
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'cleared':
				return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
			case 'pending':
				return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
			case 'issue':
				return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
			default:
				return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
		}
	}

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'cleared':
				return <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
			case 'pending':
				return <Clock className="text-yellow-600 dark:text-yellow-400" size={20} />
			case 'issue':
				return <XCircle className="text-red-600 dark:text-red-400" size={20} />
			default:
				return null
		}
	}

	return (
		<div className="space-y-6">
			{/* Header - Hide on print */}
			<div className="flex items-center justify-between print:hidden">
				<div className="flex items-center gap-4">
					<button
						onClick={() => navigate(`/students/${id}`)}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					>
						<ArrowLeft size={20} />
						Back
					</button>
					<div>
						<h2 className="text-2xl font-semibold tracking-tight">Clearance Card</h2>
						<p className="text-gray-600 dark:text-gray-400">Student clearance status</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleDownload}
						className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
					>
						<Download size={16} />
						Download PDF
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handlePrint}
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						<Printer size={16} />
						Print
					</motion.button>
				</div>
			</div>

			{/* Clearance Document */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900 p-8 print:border-0 print:shadow-none"
			>
				{/* Header */}
				<div className="border-b-2 border-gray-300 dark:border-gray-700 pb-6 mb-6">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Al-Furaat Primary & Secondary</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-1">School Management System</p>
						<div className="mt-4 inline-block bg-primary/10 px-4 py-2 rounded-lg">
							<h2 className="text-xl font-semibold text-primary">STUDENT CLEARANCE CARD</h2>
						</div>
					</div>
				</div>

				{/* Student Information with Photo */}
				<div className="flex gap-6 mb-8">
					<div className="flex-shrink-0">
						<div className="w-32 h-40 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
							{student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
						</div>
					</div>
					<div className="flex-1 grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Student Name</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{student.name}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{student.rollNumber}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Grade/Class</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{student.grade} - {student.section}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Admission Date</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{student.admissionDate}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Clearance Date</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{new Date().toLocaleDateString()}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Overall Status</p>
							<span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
								clearanceStatus === 'fully-cleared'
									? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
									: clearanceStatus === 'has-issues'
									? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
									: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
							}`}>
								{clearanceStatus === 'fully-cleared' ? 'Fully Cleared' : clearanceStatus === 'has-issues' ? 'Has Issues' : 'Pending'}
							</span>
						</div>
					</div>
				</div>

				{/* Progress Bar */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-2">
						<p className="text-sm font-medium text-gray-700 dark:text-gray-300">Clearance Progress</p>
						<p className="text-sm font-medium text-gray-700 dark:text-gray-300">{clearedCount} / {totalCount} Cleared</p>
					</div>
					<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
						<motion.div 
							initial={{ width: 0 }}
							animate={{ width: `${progressPercentage}%` }}
							transition={{ duration: 1, ease: "easeOut" }}
							className={`h-full rounded-full ${
								progressPercentage === 100 
									? 'bg-green-600' 
									: progressPercentage >= 50 
									? 'bg-yellow-600' 
									: 'bg-red-600'
							}`}
						/>
					</div>
				</div>

				{/* Clearance Items */}
				<div className="space-y-4 mb-8">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Clearance Status by Department</h3>
					{clearanceItems.map((item, index) => {
						const Icon = item.icon
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className={`border rounded-lg p-4 ${getStatusColor(item.status)} border-current`}
							>
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 mt-1">
										<Icon size={24} className="text-current" />
									</div>
									<div className="flex-1">
										<div className="flex items-center justify-between mb-2">
											<h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.department}</h4>
											<div className="flex items-center gap-2">
												{getStatusIcon(item.status)}
												<span className="text-sm font-medium capitalize">{item.status}</span>
											</div>
										</div>
										{item.remarks && (
											<p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{item.remarks}</p>
										)}
										{item.status === 'cleared' && (
											<div className="text-xs text-gray-600 dark:text-gray-400">
												Cleared by: {item.clearedBy} on {item.clearedDate}
											</div>
										)}
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>

				{/* Alert if not fully cleared */}
				{clearanceStatus !== 'fully-cleared' && (
					<div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-start gap-3">
						<AlertCircle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" size={20} />
						<div>
							<p className="font-medium text-yellow-900 dark:text-yellow-200 mb-1">Clearance Incomplete</p>
							<p className="text-sm text-yellow-800 dark:text-yellow-300">
								Please complete all pending clearances before proceeding with withdrawal or graduation. 
								Contact the respective departments for any issues.
							</p>
						</div>
					</div>
				)}

				{/* Success message if fully cleared */}
				{clearanceStatus === 'fully-cleared' && (
					<div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-3">
						<CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={20} />
						<div>
							<p className="font-medium text-green-900 dark:text-green-200 mb-1">Clearance Complete</p>
							<p className="text-sm text-green-800 dark:text-green-300">
								All departments have cleared the student. This clearance card is valid for official use.
							</p>
						</div>
					</div>
				)}

				{/* Signatures */}
				<div className="border-t-2 border-gray-300 dark:border-gray-700 pt-6 mt-8">
					<div className="grid grid-cols-2 gap-8">
						<div className="text-center">
							<div className="border-t-2 border-gray-400 w-48 mx-auto mb-2 mt-12"></div>
							<p className="text-sm font-medium text-gray-900 dark:text-gray-100">Student Signature</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">Date: {new Date().toLocaleDateString()}</p>
						</div>
						<div className="text-center">
							<div className="border-t-2 border-gray-400 w-48 mx-auto mb-2 mt-12"></div>
							<p className="text-sm font-medium text-gray-900 dark:text-gray-100">Authorized Officer</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">Date: {new Date().toLocaleDateString()}</p>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
					<p className="text-xs text-center text-gray-500 dark:text-gray-400">
						This is an official document of Al-Furaat Primary & Secondary School. Generated on {new Date().toLocaleString()}
					</p>
				</div>
			</motion.div>
		</div>
	)
}

