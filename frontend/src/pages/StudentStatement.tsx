import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Printer, Download, DollarSign, Calendar, Hash } from 'lucide-react'

export default function StudentStatement() {
	const { id } = useParams()
	const navigate = useNavigate()
	const printRef = useRef<HTMLDivElement>(null)

	// Sample data - Replace with API call
	const student = {
		name: 'Ahmed Hassan Mohamed',
		rollNumber: 'ST001',
		grade: '10A',
		parentName: 'Hassan Mohamed Ali',
		admissionDate: '2020-09-01'
	}

	const transactions = [
		{ id: 1, date: '2024-09-01', description: 'Tuition Fee - Term 1', debit: 2000, credit: 0, balance: 2000 },
		{ id: 2, date: '2024-09-15', description: 'Payment Received', debit: 0, credit: 1000, balance: 1000 },
		{ id: 3, date: '2024-10-01', description: 'Library Fee', debit: 100, credit: 0, balance: 1100 },
		{ id: 4, date: '2024-10-20', description: 'Payment Received', debit: 0, credit: 500, balance: 600 },
		{ id: 5, date: '2024-11-01', description: 'Lab Fee', debit: 200, credit: 0, balance: 800 },
		{ id: 6, date: '2024-12-01', description: 'Tuition Fee - Term 2', debit: 2000, credit: 0, balance: 2800 },
		{ id: 7, date: '2024-12-15', description: 'Payment Received', debit: 0, credit: 1000, balance: 1800 },
		{ id: 8, date: '2025-01-15', description: 'Payment Received', debit: 0, credit: 500, balance: 1300 },
		{ id: 9, date: '2025-01-20', description: 'Sports Fee', debit: 150, credit: 0, balance: 1450 },
		{ id: 10, date: '2025-01-25', description: 'Discount Applied (10%)', debit: 0, credit: 200, balance: 1250 }
	]

	const totals = {
		totalDebit: transactions.reduce((sum, t) => sum + t.debit, 0),
		totalCredit: transactions.reduce((sum, t) => sum + t.credit, 0),
		balance: transactions[transactions.length - 1]?.balance || 0
	}

	const handlePrint = () => {
		window.print()
	}

	const handleDownload = () => {
		// Implement PDF download logic
		alert('PDF download will be implemented')
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
						<h2 className="text-2xl font-semibold tracking-tight">Student Statement</h2>
						<p className="text-gray-600 dark:text-gray-400">Financial transaction history</p>
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

			{/* Statement Document */}
			<motion.div
				ref={printRef}
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
							<h2 className="text-xl font-semibold text-primary">STUDENT FINANCIAL STATEMENT</h2>
						</div>
					</div>
				</div>

				{/* Student Information */}
				<div className="grid grid-cols-2 gap-6 mb-8">
					<div className="space-y-3">
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
							<p className="font-semibold text-gray-900 dark:text-gray-100">{student.grade}</p>
						</div>
					</div>
					<div className="space-y-3">
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Parent/Guardian</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{student.parentName}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Admission Date</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{student.admissionDate}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Statement Date</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">{new Date().toLocaleDateString()}</p>
						</div>
					</div>
				</div>

				{/* Transactions Table */}
				<div className="overflow-x-auto mb-6">
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b-2 border-gray-300 dark:border-gray-700">
								<th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Date</th>
								<th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Description</th>
								<th className="text-right py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Debit ($)</th>
								<th className="text-right py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Credit ($)</th>
								<th className="text-right py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Balance ($)</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction, index) => (
								<tr 
									key={transaction.id}
									className={`border-b border-gray-200 dark:border-gray-800 ${
										index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''
									}`}
								>
									<td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400">{transaction.date}</td>
									<td className="py-3 px-2 text-sm text-gray-900 dark:text-gray-100">{transaction.description}</td>
									<td className="py-3 px-2 text-sm text-right text-red-600 dark:text-red-400 font-medium">
										{transaction.debit > 0 ? transaction.debit.toFixed(2) : '-'}
									</td>
									<td className="py-3 px-2 text-sm text-right text-green-600 dark:text-green-400 font-medium">
										{transaction.credit > 0 ? transaction.credit.toFixed(2) : '-'}
									</td>
									<td className="py-3 px-2 text-sm text-right text-gray-900 dark:text-gray-100 font-semibold">
										{transaction.balance.toFixed(2)}
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="border-t-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
								<td colSpan={2} className="py-4 px-2 text-sm font-bold text-gray-900 dark:text-gray-100">TOTAL</td>
								<td className="py-4 px-2 text-sm text-right text-red-600 dark:text-red-400 font-bold">
									{totals.totalDebit.toFixed(2)}
								</td>
								<td className="py-4 px-2 text-sm text-right text-green-600 dark:text-green-400 font-bold">
									{totals.totalCredit.toFixed(2)}
								</td>
								<td className="py-4 px-2 text-sm text-right text-gray-900 dark:text-gray-100 font-bold">
									{totals.balance.toFixed(2)}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>

				{/* Summary */}
				<div className="grid grid-cols-3 gap-4 mb-6">
					<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Charges</p>
						<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${totals.totalDebit.toFixed(2)}</p>
					</div>
					<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Payments</p>
						<p className="text-2xl font-bold text-green-600 dark:text-green-400">${totals.totalCredit.toFixed(2)}</p>
					</div>
					<div className={`p-4 rounded-lg text-center ${
						totals.balance > 0 
							? 'bg-red-50 dark:bg-red-900/20' 
							: 'bg-green-50 dark:bg-green-900/20'
					}`}>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Outstanding Balance</p>
						<p className={`text-2xl font-bold ${
							totals.balance > 0 
								? 'text-red-600 dark:text-red-400' 
								: 'text-green-600 dark:text-green-400'
						}`}>
							${totals.balance.toFixed(2)}
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="border-t-2 border-gray-300 dark:border-gray-700 pt-6 mt-8">
					<div className="flex justify-between items-end">
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">Generated on: {new Date().toLocaleString()}</p>
							<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This is a computer-generated document</p>
						</div>
						<div className="text-center">
							<div className="border-t-2 border-gray-400 w-48 mb-2"></div>
							<p className="text-sm font-medium text-gray-900 dark:text-gray-100">Authorized Signature</p>
						</div>
					</div>
				</div>

				{/* Note */}
				<div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
					<p className="text-sm text-gray-700 dark:text-gray-300">
						<strong>Note:</strong> Please clear all outstanding fees before the end of the term. 
						For any queries or discrepancies, please contact the finance office.
					</p>
				</div>
			</motion.div>
		</div>
	)
}

