import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
	Plus, Search, Filter, Printer, Download, DollarSign, TrendingUp, TrendingDown,
	ArrowRight, Users, CreditCard, Receipt, AlertCircle, CheckCircle, XCircle, X,
	Calendar, Edit, Trash2, Eye, FileText
} from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { FeeForm, type FeeFormData } from '../components/forms/FeeForm'

interface FinancialTransaction {
	id: number
	date: string
	studentId: string
	studentName: string
	description: string
	type: 'debit' | 'credit'
	amount: number
	balance: number
	status: 'paid' | 'pending' | 'overdue'
}

export default function FinancialManagement() {
	const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'payments' | 'reports'>('overview')
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState<string>('all')
	const [showFeeForm, setShowFeeForm] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [viewingReceipt, setViewingReceipt] = useState<any>(null)
	const [printingReceipt, setPrintingReceipt] = useState<any>(null)
	const [downloadingReceipt, setDownloadingReceipt] = useState<any>(null)
	const [fees, setFees] = useState([
		{ id: 1, studentId: 'ST001', studentName: 'Ahmed Hassan', feeType: 'Tuition Fee', amount: 2000, dueDate: '2025-02-01', status: 'pending', description: 'Term 1 Tuition' },
		{ id: 2, studentId: 'ST002', studentName: 'Fatima Ali', feeType: 'Library Fee', amount: 150, dueDate: '2025-02-15', status: 'paid', description: 'Library membership' },
	])
	const [payments, setPayments] = useState([
		{ id: 1, studentId: 'ST001', studentName: 'Ahmed Hassan', amount: 1000, paymentDate: '2025-01-15', method: 'Cash', receipt: 'RCP-001', feeType: 'Tuition Fee' },
		{ id: 2, studentId: 'ST003', studentName: 'Omar Mohamed', amount: 2500, paymentDate: '2025-01-20', method: 'Bank Transfer', receipt: 'RCP-002', feeType: 'Term 2 Tuition' },
	])
	
	// Mock Financial Data
	const transactions: FinancialTransaction[] = [
		{ id: 1, date: '2025-01-15', studentId: 'ST001', studentName: 'Ahmed Hassan', description: 'Tuition Fee - Term 1', type: 'debit', amount: 2000, balance: 2000, status: 'paid' },
		{ id: 2, date: '2025-01-15', studentId: 'ST002', studentName: 'Fatima Ali', description: 'Payment Received', type: 'credit', amount: 1500, balance: -500, status: 'paid' },
		{ id: 3, date: '2025-01-20', studentId: 'ST001', studentName: 'Ahmed Hassan', description: 'Library Fee', type: 'debit', amount: 100, balance: 2100, status: 'pending' },
		{ id: 4, date: '2025-01-20', studentId: 'ST003', studentName: 'Omar Mohamed', description: 'Tuition Fee - Term 2', type: 'debit', amount: 2500, balance: 2500, status: 'overdue' },
		{ id: 5, date: '2025-01-25', studentId: 'ST004', studentName: 'Aisha Ibrahim', description: 'Payment Received', type: 'credit', amount: 800, balance: -200, status: 'paid' },
	]

	// Statistics
	const stats = {
		totalRevenue: 125000,
		totalOutstanding: 8500,
		totalPaid: 116500,
		paymentRate: 93.2,
		overdueAmount: 3200,
		totalStudents: 1240,
	}

	const filteredTransactions = transactions.filter(transaction => {
		const matchesSearch = transaction.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			transaction.studentId.toLowerCase().includes(searchQuery.toLowerCase())
		
		const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus
		
		return matchesSearch && matchesFilter
	})

	const totalDebit = filteredTransactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0)
	const totalCredit = filteredTransactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0)
	const netBalance = totalDebit - totalCredit

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'paid':
				return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">Paid</span>
			case 'pending':
				return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</span>
			case 'overdue':
				return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">Overdue</span>
			default:
				return null
		}
	}

	const getTypeIcon = (type: string) => {
		if (type === 'credit') {
			return <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
		}
		return <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
	}

	const handleAddFee = async (data: FeeFormData) => {
		setIsLoading(true)
		try {
			await new Promise(resolve => setTimeout(resolve, 1000))
			alert(`Fee added successfully for student ${data.studentId}!`)
			setShowFeeForm(false)
		} catch (error) {
			console.error('Error adding fee:', error)
		} finally {
			setIsLoading(false)
		}
	}

	// Report generation handlers
	const handleGenerateReport = (reportType: string) => {
		switch (reportType) {
			case 'revenue':
				// In a real app, this would download a PDF or open a new page
				alert('Revenue Report generated successfully!\n\nThe report includes:\n- Monthly revenue breakdown\n- Charts and statistics\n- Payment trends\n\nThe PDF will be downloaded or a new page will open with the full report.')
				break
			case 'outstanding':
				alert('Outstanding Fees Report generated successfully!\n\nThis report lists all students with pending fee payments and will be available for download.')
				break
			case 'payment-history':
				alert('Payment History Report generated successfully!\n\nComplete payment history with date ranges is now available.')
				break
			case 'fee-collection':
				alert('Fee Collection Report generated successfully!\n\nFee collection rates and trends are now available.')
				break
			case 'overdue':
				alert('Overdue Report generated successfully!\n\nList of students with overdue fee payments is now available.')
				break
			case 'financial-summary':
				alert('Financial Summary Report generated successfully!\n\nComplete financial overview and analytics are now available.')
				break
			default:
				alert('Report generated successfully!')
		}
	}

	// Handle payment actions
	const handleViewReceipt = (payment: any) => {
		setViewingReceipt(payment)
	}

	const handlePrintReceipt = (payment: any) => {
		setPrintingReceipt(payment)
	}

	const handleDownloadReceipt = (payment: any) => {
		setDownloadingReceipt(payment)
	}

	const confirmPrint = () => {
		if (printingReceipt) {
			// Close print modal first
			setPrintingReceipt(null)
			// Then trigger the actual print action
			setTimeout(() => {
				window.print()
			}, 100)
		}
	}

	const confirmDownload = () => {
		if (downloadingReceipt) {
			// Close download modal first
			setDownloadingReceipt(null)
			// Then trigger the actual download as PDF
			setTimeout(() => {
				const receipt = downloadingReceipt
				
				// Create a printable HTML content for the receipt
				const htmlContent = `
					<!DOCTYPE html>
					<html>
					<head>
						<title>Receipt ${receipt.receipt}</title>
						<style>
							body {
								font-family: 'Segoe UI', sans-serif;
								max-width: 600px;
								margin: 50px auto;
								padding: 20px;
							}
							.header {
								text-align: center;
								border-bottom: 3px solid #3b82f6;
								padding-bottom: 20px;
								margin-bottom: 30px;
							}
							.header h1 {
								color: #3b82f6;
								margin: 0;
							}
							.details {
								display: grid;
								grid-template-columns: 1fr 1fr;
								gap: 15px;
								margin-bottom: 30px;
							}
							.detail-item {
								padding: 10px;
								background: #f3f4f6;
								border-radius: 8px;
							}
							.detail-item label {
								display: block;
								font-size: 12px;
								color: #6b7280;
								margin-bottom: 5px;
							}
							.detail-item .value {
								font-size: 16px;
								font-weight: bold;
								color: #111827;
							}
							.amount {
								background: linear-gradient(135deg, #10b981 0%, #059669 100%);
								color: white;
								padding: 20px;
								border-radius: 12px;
								text-align: center;
								margin: 30px 0;
							}
							.amount-label {
								font-size: 14px;
								opacity: 0.9;
							}
							.amount-value {
								font-size: 36px;
								font-weight: bold;
							}
							.footer {
								text-align: center;
								border-top: 2px solid #e5e7eb;
								padding-top: 20px;
								margin-top: 40px;
								color: #6b7280;
								font-size: 12px;
							}
						</style>
					</head>
					<body>
						<div class="header">
							<h1>Payment Receipt</h1>
						</div>
						
						<div class="details">
							<div class="detail-item">
								<label>Receipt Number</label>
								<div class="value">${receipt.receipt}</div>
							</div>
							<div class="detail-item">
								<label>Payment Date</label>
								<div class="value">${receipt.paymentDate}</div>
							</div>
							<div class="detail-item">
								<label>Student Name</label>
								<div class="value">${receipt.studentName}</div>
							</div>
							<div class="detail-item">
								<label>Student ID</label>
								<div class="value">${receipt.studentId}</div>
							</div>
						</div>
						
						<div class="detail-item">
							<label>Fee Type</label>
							<div class="value">${receipt.feeType}</div>
						</div>
						
						<div class="detail-item">
							<label>Payment Method</label>
							<div class="value">${receipt.method}</div>
						</div>
						
						<div class="amount">
							<div class="amount-label">Total Amount</div>
							<div class="amount-value">$${receipt.amount.toLocaleString()}</div>
						</div>
						
						<div class="footer">
							<p>Thank you for your payment!</p>
							<p>This is an official receipt from Al-Furaat SMS</p>
						</div>
					</body>
					</html>
				`
				
				// Create a new window with the HTML content
				const printWindow = window.open('', '_blank')
				if (printWindow) {
					printWindow.document.write(htmlContent)
					printWindow.document.close()
					
					// Wait for the content to load, then trigger print
					printWindow.onload = () => {
						setTimeout(() => {
							printWindow.print()
						}, 250)
					}
				}
			}, 100)
		}
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Financial Management</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">Manage student fees, payments, and financial records</p>
				</div>
				<div className="flex items-center gap-2">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => setShowFeeForm(true)}
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						<Plus size={16} />
						Add Fee
					</motion.button>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<div className="flex items-center justify-between mb-4">
						<div className="rounded-lg p-2 bg-green-100 dark:bg-green-900/30">
							<DollarSign size={20} className="text-green-600 dark:text-green-400" />
						</div>
						<span className="text-xs text-green-600 dark:text-green-400 font-medium">+5.2%</span>
					</div>
					<div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
						<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stats.totalRevenue.toLocaleString()}</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.1 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<div className="flex items-center justify-between mb-4">
						<div className="rounded-lg p-2 bg-yellow-100 dark:bg-yellow-900/30">
							<AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
						</div>
						<span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">{stats.paymentRate}%</span>
					</div>
					<div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Outstanding</p>
						<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stats.totalOutstanding.toLocaleString()}</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<div className="flex items-center justify-between mb-4">
						<div className="rounded-lg p-2 bg-blue-100 dark:bg-blue-900/30">
							<CheckCircle size={20} className="text-blue-600 dark:text-blue-400" />
						</div>
						<span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Paid</span>
					</div>
					<div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
						<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stats.totalPaid.toLocaleString()}</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.3 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur"
				>
					<div className="flex items-center justify-between mb-4">
						<div className="rounded-lg p-2 bg-red-100 dark:bg-red-900/30">
							<XCircle size={20} className="text-red-600 dark:text-red-400" />
						</div>
						<span className="text-xs text-red-600 dark:text-red-400 font-medium">Alert</span>
					</div>
					<div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
						<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stats.overdueAmount.toLocaleString()}</p>
					</div>
				</motion.div>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav className="flex gap-6">
					{[
						{ id: 'overview', label: 'Overview', icon: DollarSign },
						{ id: 'fees', label: 'Fee Management', icon: Receipt },
						{ id: 'payments', label: 'Payments', icon: CreditCard },
						{ id: 'reports', label: 'Reports', icon: Download },
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

			{/* Tab Content */}
			{activeTab === 'overview' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="space-y-6"
				>
					{/* Search and Filter */}
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search transactions..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
							/>
						</div>
						<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
							<Filter size={16} />
							Filter
						</button>
					</div>

					{/* Transactions Table */}
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
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Balance</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{filteredTransactions.map((transaction, index) => (
										<motion.tr
											key={transaction.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{transaction.date}</td>
											<td className="px-6 py-4">
												<div>
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{transaction.studentName}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{transaction.studentId}</div>
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{transaction.description}</td>
											<td className="px-6 py-4">
												<div className="flex items-center gap-2">
													{getTypeIcon(transaction.type)}
													<span className="text-sm capitalize">{transaction.type}</span>
												</div>
											</td>
											<td className="px-6 py-4">
												<span className={`text-sm font-semibold ${
													transaction.type === 'credit' 
														? 'text-green-600 dark:text-green-400' 
														: 'text-red-600 dark:text-red-400'
												}`}>
													{transaction.type === 'credit' ? '+' : '-'} ${transaction.amount.toLocaleString()}
												</span>
											</td>
											<td className="px-6 py-4">
												<span className={`text-sm font-medium ${
													transaction.balance > 0 
														? 'text-red-600 dark:text-red-400' 
														: 'text-green-600 dark:text-green-400'
												}`}>
													{transaction.balance > 0 ? '+' : ''} ${transaction.balance.toLocaleString()}
												</span>
											</td>
											<td className="px-6 py-4">
												{getStatusBadge(transaction.status)}
											</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													<button className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" title="View Details">
														<Receipt size={16} className="text-gray-400" />
													</button>
													<button className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" title="Print">
														<Printer size={16} className="text-gray-400" />
													</button>
												</div>
											</td>
										</motion.tr>
									))}
								</tbody>
								<tfoot className="border-t-2 border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<td colSpan={4} className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">Totals</td>
										<td className="px-6 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
											Debit: ${totalDebit.toLocaleString()}
											<br />
											Credit: ${totalCredit.toLocaleString()}
										</td>
										<td className="px-6 py-3">
											<span className={`text-sm font-bold ${
												netBalance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
											}`}>
												Net: ${netBalance.toLocaleString()}
											</span>
										</td>
										<td colSpan={2}></td>
									</tr>
								</tfoot>
							</table>
						</div>
					</motion.div>
				</motion.div>
			)}

			{activeTab === 'fees' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="space-y-4"
				>
					{/* Fees Table */}
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fee Type</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{fees.map((fee, index) => (
										<motion.tr
											key={fee.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4">
												<div>
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{fee.studentName}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{fee.studentId}</div>
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{fee.feeType}</td>
											<td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">${fee.amount.toLocaleString()}</td>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{fee.dueDate}</td>
											<td className="px-6 py-4">
												{getStatusBadge(fee.status)}
											</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
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

			{activeTab === 'payments' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="space-y-4"
				>
					{/* Payments Table */}
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fee Type</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receipt</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{payments.map((payment, index) => (
										<motion.tr
											key={payment.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4">
												<div>
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{payment.studentName}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{payment.studentId}</div>
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{payment.paymentDate}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{payment.feeType}</td>
											<td className="px-6 py-4 text-sm font-semibold text-green-600 dark:text-green-400">${payment.amount.toLocaleString()}</td>
											<td className="px-6 py-4">
												<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
													{payment.method}
												</span>
											</td>
											<td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{payment.receipt}</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													<button 
														onClick={() => handleViewReceipt(payment)}
														className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
														title="View Receipt"
													>
														<Eye size={16} className="text-gray-400" />
													</button>
													<button 
														onClick={() => handlePrintReceipt(payment)}
														className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
														title="Print"
													>
														<Printer size={16} className="text-gray-400" />
													</button>
													<button 
														onClick={() => handleDownloadReceipt(payment)}
														className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
														title="Download"
													>
														<Download size={16} className="text-gray-400" />
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
									<DollarSign size={20} className="text-blue-600 dark:text-blue-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Revenue Report</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Generate monthly revenue reports with charts and statistics</p>
							<button onClick={() => handleGenerateReport('revenue')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.1 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-orange-100 dark:bg-orange-900/30">
									<AlertCircle size={20} className="text-orange-600 dark:text-orange-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Outstanding Fees</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">List of all students with pending fee payments</p>
							<button onClick={() => handleGenerateReport('outstanding')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.2 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-green-100 dark:bg-green-900/30">
									<CheckCircle size={20} className="text-green-600 dark:text-green-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Payment History</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Complete payment history with date ranges</p>
							<button onClick={() => handleGenerateReport('payment-history')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.3 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-purple-100 dark:bg-purple-900/30">
									<Receipt size={20} className="text-purple-600 dark:text-purple-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Fee Collection</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Track fee collection rates and trends</p>
							<button onClick={() => handleGenerateReport('fee-collection')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.4 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-yellow-100 dark:bg-yellow-900/30">
									<XCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Overdue Report</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Students with overdue fee payments</p>
							<button onClick={() => handleGenerateReport('overdue')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.5 }}
							className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="rounded-lg p-2 bg-red-100 dark:bg-red-900/30">
									<FileText size={20} className="text-red-600 dark:text-red-400" />
								</div>
								<Download size={16} className="text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Financial Summary</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Complete financial overview and analytics</p>
							<button onClick={() => handleGenerateReport('financial-summary')} className="text-sm text-primary hover:underline">Generate Report →</button>
						</motion.div>
					</div>
				</motion.div>
			)}

			{/* Fee Form Modal */}
			<AnimatePresence>
				{showFeeForm && (
					<FeeForm
						onSubmit={handleAddFee}
						onCancel={() => setShowFeeForm(false)}
						isLoading={isLoading}
					/>
				)}
			</AnimatePresence>

			{/* View Receipt Modal */}
			<AnimatePresence>
				{viewingReceipt && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setViewingReceipt(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md rounded-2xl border border-blue-200/60 dark:border-blue-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 flex flex-col items-center">
								<button
									onClick={() => setViewingReceipt(null)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl mb-4"
								>
									<Receipt className="text-white" size={40} />
								</motion.div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">Receipt Details</h3>
							</div>

							{/* Content */}
							<div className="p-6 space-y-4">
								<div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Receipt Number</span>
										<span className="text-lg font-bold text-gray-900 dark:text-white">{viewingReceipt.receipt}</span>
									</div>
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Student Name</span>
										<span className="text-sm font-semibold text-gray-900 dark:text-white">{viewingReceipt.studentName}</span>
									</div>
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Student ID</span>
										<span className="text-sm text-gray-900 dark:text-gray-100">{viewingReceipt.studentId}</span>
									</div>
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Date</span>
										<span className="text-sm text-gray-900 dark:text-gray-100">{viewingReceipt.paymentDate}</span>
									</div>
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Fee Type</span>
										<span className="text-sm text-gray-900 dark:text-gray-100">{viewingReceipt.feeType}</span>
									</div>
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</span>
										<span className="text-xl font-bold text-green-600 dark:text-green-400">${viewingReceipt.amount.toLocaleString()}</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Method</span>
										<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
											{viewingReceipt.method}
										</span>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setViewingReceipt(null)}
									className="w-full px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
								>
									Close
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Print Receipt Modal */}
			<AnimatePresence>
				{printingReceipt && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setPrintingReceipt(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md rounded-2xl border border-orange-200/60 dark:border-orange-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 flex flex-col items-center">
								<button
									onClick={() => setPrintingReceipt(null)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl mb-4"
								>
									<Printer className="text-white" size={40} />
								</motion.div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">Print Receipt</h3>
							</div>

							{/* Content */}
							<div className="p-6 space-y-4">
								<p className="text-center text-gray-600 dark:text-gray-400">
									Are you sure you want to print the receipt for <span className="font-semibold">{printingReceipt.studentName}</span>?
								</p>
								<div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Receipt Number</p>
										<p className="text-lg font-bold text-gray-900 dark:text-white">{printingReceipt.receipt}</p>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
										<p className="text-lg font-bold text-green-600 dark:text-green-400">${printingReceipt.amount.toLocaleString()}</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setPrintingReceipt(null)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Cancel
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={confirmPrint}
										className="flex-1 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
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

			{/* Download Receipt Modal */}
			<AnimatePresence>
				{downloadingReceipt && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setDownloadingReceipt(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md rounded-2xl border border-green-200/60 dark:border-green-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 flex flex-col items-center">
								<button
									onClick={() => setDownloadingReceipt(null)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl mb-4"
								>
									<Download className="text-white" size={40} />
								</motion.div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">Download Receipt</h3>
							</div>

							{/* Content */}
							<div className="p-6 space-y-4">
								<p className="text-center text-gray-600 dark:text-gray-400">
									Download receipt PDF for <span className="font-semibold">{downloadingReceipt.studentName}</span>?
								</p>
								<div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Receipt Number</p>
										<p className="text-lg font-bold text-gray-900 dark:text-white">{downloadingReceipt.receipt}</p>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
										<p className="text-lg font-bold text-green-600 dark:text-green-400">${downloadingReceipt.amount.toLocaleString()}</p>
									</div>
								</div>
								<p className="text-sm text-gray-500 dark:text-gray-400 text-center">
									The PDF will be downloaded to your Downloads folder.
								</p>
								<div className="flex items-center gap-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setDownloadingReceipt(null)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Cancel
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={confirmDownload}
										className="flex-1 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
									>
										<Download size={18} />
										Download
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
