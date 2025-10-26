import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'react-qr-code'
import { 
	Plus, Search, Filter, Printer, Download, 
	User, Mail, Phone, Calendar, Building, CreditCard, AlertCircle, Eye, CheckCircle
} from 'lucide-react'

interface IDCardData {
	id: number
	name: string
	rollNumber?: string
	employeeId?: string
	grade?: string
	position?: string
	department?: string
	bloodGroup: string
	dateOfBirth: string
	validUntil: string
	address: string
	phone: string
	emergencyContact: string
	photo?: string
}

export default function IDCards() {
	const [activeTab, setActiveTab] = useState<'students' | 'employees'>('students')
	const [selectedCards, setSelectedCards] = useState<number[]>([])
	const [showPreview, setShowPreview] = useState(false)
	const [previewCard, setPreviewCard] = useState<IDCardData | null>(null)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const downloadRef = useRef<HTMLDivElement>(null)

	const [studentCards, setStudentCards] = useState([
		{ 
			id: 1, 
			name: 'Ahmed Hassan Mohamed', 
			rollNumber: 'ST001', 
			grade: '10A',
			bloodGroup: 'O+',
			dateOfBirth: '2008-05-15',
			validUntil: '2026-06-30',
			address: 'Mogadishu, Hodan District',
			phone: '+252 61 123 4567',
			emergencyContact: '+252 61 111 1111',
			hasCard: true
		},
		{ 
			id: 2, 
			name: 'Fatima Ali Hassan', 
			rollNumber: 'ST002', 
			grade: '9B',
			bloodGroup: 'A+',
			dateOfBirth: '2009-08-20',
			validUntil: '2026-06-30',
			address: 'Mogadishu, Wadajir District',
			phone: '+252 61 234 5678',
			emergencyContact: '+252 61 222 2222',
			hasCard: true
		},
		{ 
			id: 3, 
			name: 'Omar Mohamed Ali', 
			rollNumber: 'ST003', 
			grade: '11C',
			bloodGroup: 'B+',
			dateOfBirth: '2007-03-10',
			validUntil: '2026-06-30',
			address: 'Mogadishu, Karan District',
			phone: '+252 61 345 6789',
			emergencyContact: '+252 61 333 3333',
			hasCard: false
		},
	])

	const [employeeCards, setEmployeeCards] = useState([
		{ 
			id: 1, 
			name: 'Dr. Mohamed Abdi', 
			employeeId: 'EMP001', 
			position: 'Senior Teacher',
			department: 'Mathematics',
			bloodGroup: 'O+',
			dateOfBirth: '1985-06-15',
			validUntil: '2026-12-31',
			address: 'Mogadishu, Hodan District',
			phone: '+252 61 111 1111',
			emergencyContact: '+252 61 555 5555',
			hasCard: true
		},
		{ 
			id: 2, 
			name: 'Ms. Khadija Hassan', 
			employeeId: 'EMP002', 
			position: 'Teacher',
			department: 'English',
			bloodGroup: 'A+',
			dateOfBirth: '1990-03-22',
			validUntil: '2026-12-31',
			address: 'Mogadishu, Wadajir District',
			phone: '+252 61 222 2222',
			emergencyContact: '+252 61 666 6666',
			hasCard: true
		},
	])

	const handlePreview = (card: any) => {
		setPreviewCard(card)
		setShowPreview(true)
	}

	const handlePrint = (card?: any) => {
		if (card) {
			setPreviewCard(card)
			// Small delay to ensure state is updated before printing
			setTimeout(() => window.print(), 200)
		} else {
			window.print()
		}
	}

	const handleBulkPrint = () => {
		if (selectedCards.length > 0) {
			setPreviewCard(null) // Clear single card preview
			setTimeout(() => window.print(), 100)
		}
	}

	const handleDownload = async (card: any) => {
		try {
			// Create a temporary container
			const tempContainer = document.createElement('div')
			tempContainer.style.position = 'absolute'
			tempContainer.style.left = '-9999px'
			tempContainer.style.top = '-9999px'
			document.body.appendChild(tempContainer)

			// Render the ID card
			const cardElement = document.createElement('div')
			cardElement.innerHTML = `
				<div style="width: 420px; height: 270px; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, rgb(124, 58, 237) 0%, rgb(147, 51, 234) 100%); color: white; position: relative; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
					<div style="text-align: center; margin-bottom: 8px;">
						<h3 style="font-size: 14px; font-weight: bold; margin: 0;">AL-FURAAT SCHOOL</h3>
						<p style="font-size: 11px; opacity: 0.9; margin: 2px 0;">${activeTab === 'students' ? 'Student ID Card' : 'Employee ID Card'}</p>
					</div>
					<div style="display: flex; gap: 12px; flex: 1;">
						<div style="flex-shrink: 0;">
							<div style="width: 80px; height: 96px; border-radius: 8px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); display: flex; align-items: center; justify-center; font-size: 28px; font-weight: bold; border: 2px solid rgba(255,255,255,0.3);">
								${card.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
							</div>
						</div>
						<div style="flex: 1; font-size: 11px;">
							<p style="font-weight: bold; font-size: 13px; line-height: 1.2; margin: 0;">${card.name}</p>
							<p style="opacity: 0.9; font-size: 11px; margin: 2px 0;">${activeTab === 'students' ? `Roll: ${card.rollNumber}` : `ID: ${card.employeeId}`}</p>
							<div style="margin-top: 4px;">
								<p style="opacity: 0.9; font-size: 11px; line-height: 1.2; margin: 2px 0;">${activeTab === 'students' ? `Grade: ${card.grade}` : card.position}</p>
								${activeTab === 'employees' && card.department ? `<p style="opacity: 0.9; font-size: 11px; line-height: 1.2; margin: 2px 0;">Dept: ${card.department}</p>` : ''}
								<p style="opacity: 0.9; font-size: 11px; line-height: 1.2; margin: 2px 0;">Blood: ${card.bloodGroup}</p>
								<p style="opacity: 0.9; font-size: 11px; line-height: 1.2; margin: 2px 0;">DOB: ${card.dateOfBirth}</p>
							</div>
						</div>
					</div>
					<div style="display: flex; align-items: flex-end; justify-content: space-between; font-size: 11px; padding-top: 8px; margin-top: 4px; border-top: 1px solid rgba(255,255,255,0.3);">
						<div>
							<p style="opacity: 0.75; font-size: 9px; margin: 0; line-height: 1;">Valid Until:</p>
							<p style="font-weight: bold; font-size: 11px; line-height: 1.2; margin: 2px 0;">${card.validUntil}</p>
						</div>
					</div>
				</div>
			`
			tempContainer.appendChild(cardElement)

			// Use modern approach: convert to canvas, then download
			try {
				// Try using html2canvas if available
				const html2canvas = (window as any).html2canvas
				if (html2canvas) {
					const canvas = await html2canvas(cardElement, {
						scale: 2,
						backgroundColor: null,
						logging: false
					})
					
					// Convert to blob and download
					canvas.toBlob((blob: Blob | null) => {
						if (blob) {
							const url = URL.createObjectURL(blob)
							const link = document.createElement('a')
							link.href = url
							link.download = `${card.name.replace(/\s+/g, '_')}_ID_Card.png`
							link.click()
							URL.revokeObjectURL(url)
							setSuccessMessage(`✓ ID Card for ${card.name} downloaded successfully!`)
							setTimeout(() => setSuccessMessage(''), 3000)
						}
					})
				} else {
					// Fallback: Open print dialog
					setPreviewCard(card)
					setTimeout(() => {
						window.print()
						setSuccessMessage(`✓ Please save as PDF to download ${card.name}'s ID Card`)
						setTimeout(() => setSuccessMessage(''), 3000)
					}, 200)
				}
			} catch (error) {
				console.error('Download error:', error)
				// Fallback to print
				setPreviewCard(card)
				setTimeout(() => {
					window.print()
					setSuccessMessage(`✓ Please save as PDF to download ${card.name}'s ID Card`)
					setTimeout(() => setSuccessMessage(''), 3000)
				}, 200)
			}

			// Clean up
			document.body.removeChild(tempContainer)
		} catch (error) {
			console.error('Error downloading ID card:', error)
			setSuccessMessage('⚠️ Download failed. Please try printing instead.')
			setTimeout(() => setSuccessMessage(''), 3000)
		}
	}

	const handleGenerate = (cardId: number) => {
		// Update the card status to Active (hasCard = true)
		if (activeTab === 'students') {
			const updatedCards = studentCards.map(c => 
				c.id === cardId ? { ...c, hasCard: true } : c
			)
			setStudentCards(updatedCards)
			const card = updatedCards.find(c => c.id === cardId)
			if (card) {
				setSuccessMessage(`✓ ID Card generated for ${card.name}!`)
				setTimeout(() => setSuccessMessage(''), 3000)
			}
		} else {
			const updatedCards = employeeCards.map(c => 
				c.id === cardId ? { ...c, hasCard: true } : c
			)
			setEmployeeCards(updatedCards)
			const card = updatedCards.find(c => c.id === cardId)
			if (card) {
				setSuccessMessage(`✓ ID Card generated for ${card.name}!`)
				setTimeout(() => setSuccessMessage(''), 3000)
			}
		}
	}

	const handleGenerateAllPending = () => {
		// Generate cards for ALL pending cards in current tab
		if (activeTab === 'students') {
			const pendingCards = studentCards.filter(c => !c.hasCard)
			if (pendingCards.length === 0) {
				setSuccessMessage('⚠️ No pending student cards to generate')
				setTimeout(() => setSuccessMessage(''), 3000)
				return
			}
			const updatedCards = studentCards.map(c => ({ ...c, hasCard: true }))
			setStudentCards(updatedCards)
			setSuccessMessage(`✓ ${pendingCards.length} Student ID Card${pendingCards.length > 1 ? 's' : ''} generated successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
		} else {
			const pendingCards = employeeCards.filter(c => !c.hasCard)
			if (pendingCards.length === 0) {
				setSuccessMessage('⚠️ No pending employee cards to generate')
				setTimeout(() => setSuccessMessage(''), 3000)
				return
			}
			const updatedCards = employeeCards.map(c => ({ ...c, hasCard: true }))
			setEmployeeCards(updatedCards)
			setSuccessMessage(`✓ ${pendingCards.length} Employee ID Card${pendingCards.length > 1 ? 's' : ''} generated successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
		}
	}

	const IDCardComponent = ({ data, type, showBothSides = false }: { data: IDCardData, type: 'student' | 'employee', showBothSides?: boolean }) => {
		const qrData = JSON.stringify({
			id: type === 'student' ? data.rollNumber : data.employeeId,
			name: data.name,
			type: type,
			school: 'Al-Furaat School',
			validUntil: data.validUntil
		})

		return (
			<div className="space-y-4">
				{/* Front Side */}
				<div className="print-card w-[420px] h-[270px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary to-purple-600 text-white relative print:shadow-none print:border print:border-gray-300">
					<div className="relative h-full p-4 flex flex-col justify-between">
						{/* Header */}
						<div className="text-center mb-2">
							<h3 className="text-sm font-bold">AL-FURAAT SCHOOL</h3>
							<p className="text-xs opacity-90">{type === 'student' ? 'Student ID Card' : 'Employee ID Card'}</p>
						</div>

						{/* Main Content */}
						<div className="flex gap-3 flex-1">
							{/* Photo */}
							<div className="flex-shrink-0">
								{data.photo ? (
									<img 
										src={data.photo} 
										alt={data.name}
										className="w-20 h-24 rounded-lg object-cover border-2 border-white/30"
									/>
								) : (
									<div className="w-20 h-24 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold border-2 border-white/30">
										{data.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
									</div>
								)}
							</div>

							{/* Details */}
							<div className="flex-1 text-xs space-y-0.5">
								<div>
									<p className="font-bold text-sm leading-tight">{data.name}</p>
									<p className="opacity-90 text-xs">
										{type === 'student' ? `Roll: ${data.rollNumber}` : `ID: ${data.employeeId}`}
									</p>
								</div>
								<div className="space-y-1 mt-1">
									<p className="opacity-90 text-xs leading-tight">
										{type === 'student' ? `Grade: ${data.grade}` : data.position}
									</p>
									{type === 'employee' && data.department && (
										<p className="opacity-90 text-xs leading-tight">Dept: {data.department}</p>
									)}
									<p className="opacity-90 text-xs leading-tight">Blood: {data.bloodGroup}</p>
									<p className="opacity-90 text-xs leading-tight">DOB: {data.dateOfBirth}</p>
								</div>
							</div>
						</div>

						{/* Footer */}
						<div className="flex items-end justify-between text-xs pt-2 mt-1 border-t border-white/30">
							<div className="flex flex-col justify-end">
								<p className="opacity-75 text-[10px] leading-none mb-0.5">Valid Until:</p>
								<p className="font-bold text-xs leading-tight">{data.validUntil}</p>
							</div>
							<div className="w-12 h-12 bg-white rounded p-0.5 flex items-center justify-center flex-shrink-0">
								<QRCode value={qrData} size={46} />
							</div>
						</div>
					</div>
				</div>

				{/* Back Side */}
				{showBothSides && (
					<div className="print-card w-[420px] h-[270px] rounded-xl overflow-hidden shadow-lg bg-white text-gray-900 relative print:shadow-none print:border print:border-gray-300">
						<div className="relative h-full p-4 flex flex-col justify-between">
							{/* Header with Logo */}
							<div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-primary">
								<div className="flex-1">
									<h3 className="text-sm font-bold text-primary">AL-FURAAT SCHOOL</h3>
									<p className="text-xs text-gray-600">Primary & Secondary</p>
								</div>
								{/* School Logo */}
								<div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white flex-shrink-0 border-2 border-primary/20">
									<svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
									</svg>
								</div>
							</div>

							{/* Contact Information */}
							<div className="flex-1 space-y-2 text-xs">
								<div className="space-y-1">
									<p className="font-semibold text-gray-700">Emergency Contact:</p>
									<p className="text-gray-600">{data.emergencyContact}</p>
								</div>
								
								<div className="space-y-1">
									<p className="font-semibold text-gray-700">Address:</p>
									<p className="text-gray-600">{data.address}</p>
								</div>
								
								<div className="space-y-1">
									<p className="font-semibold text-gray-700">Phone:</p>
									<p className="text-gray-600">{data.phone}</p>
								</div>
							</div>

							{/* Important Notice */}
							<div className="mt-2 pt-2 border-t border-gray-200">
								<div className="flex items-start gap-2 text-xs">
									<AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
									<div className="text-gray-600">
										<p className="font-semibold mb-1">Important:</p>
										<p className="text-[10px] leading-tight">
											If found, please return to Al-Furaat School or contact the emergency number above. 
											This card is property of the school and must be carried at all times.
										</p>
									</div>
								</div>
							</div>

							{/* Footer */}
							<div className="text-center text-xs text-gray-500 mt-2">
								<p>www.alfuraat-school.so</p>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}

	const cards = activeTab === 'students' ? studentCards : employeeCards

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
						{successMessage}
					</motion.div>
				)}
			</AnimatePresence>

			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">ID Card Management</h2>
					<p className="text-gray-600 dark:text-gray-400">Create and manage ID cards for students and employees</p>
				</div>
				<div className="flex items-center gap-2">
					{selectedCards.length > 0 && (
						<motion.button
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleBulkPrint}
							className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
						>
							<Printer size={16} />
							Print Selected ({selectedCards.length})
						</motion.button>
					)}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={handleGenerateAllPending}
					title={`Generate all pending ${activeTab === 'students' ? 'student' : 'employee'} ID cards`}
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30"
				>
					<Plus size={16} />
					Generate New Cards
				</motion.button>
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">Total Cards</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,240</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
							<CreditCard className="text-blue-600 dark:text-blue-400" size={24} />
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
							<p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
							<p className="text-2xl font-bold text-green-600 dark:text-green-400">1,178</p>
						</div>
						<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
							<User className="text-green-600 dark:text-green-400" size={24} />
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
							<p className="text-sm text-gray-600 dark:text-gray-400">Employees</p>
							<p className="text-2xl font-bold text-purple-600 dark:text-purple-400">62</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
							<Building className="text-purple-600 dark:text-purple-400" size={24} />
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
							<p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
							<p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">15</p>
						</div>
						<div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
							<Calendar className="text-yellow-600 dark:text-yellow-400" size={24} />
						</div>
					</div>
				</motion.div>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav className="flex gap-6">
					{[
						{ id: 'students', label: 'Student ID Cards', icon: User },
						{ id: 'employees', label: 'Employee ID Cards', icon: Building }
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

			{/* Search and Filter */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search by name or ID..."
						className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
					/>
				</div>
				<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
					<Filter size={16} />
					Filter
				</button>
			</div>

		{/* ID Cards Table */}
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
							<th className="px-4 py-3 text-left">
								<input
									type="checkbox"
									onChange={(e) => {
										if (e.target.checked) {
											setSelectedCards(cards.map(c => c.id))
										} else {
											setSelectedCards([])
										}
									}}
									checked={selectedCards.length === cards.length && cards.length > 0}
									className="rounded border-gray-300 text-primary focus:ring-primary"
								/>
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								{activeTab === 'students' ? 'Student' : 'Employee'}
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								{activeTab === 'students' ? 'Roll / Grade' : 'ID / Position'}
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Blood Group</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date of Birth</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Valid Until</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
						{cards.map((card, index) => (
							<motion.tr
								key={card.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
								className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
							>
								<td className="px-4 py-4">
									<input
										type="checkbox"
										checked={selectedCards.includes(card.id)}
										onChange={(e) => {
											if (e.target.checked) {
												setSelectedCards([...selectedCards, card.id])
											} else {
												setSelectedCards(selectedCards.filter(id => id !== card.id))
											}
										}}
										className="rounded border-gray-300 text-primary focus:ring-primary"
									/>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										{card.photo ? (
											<img 
												src={card.photo} 
												alt={card.name}
												className="w-10 h-10 rounded-full object-cover border-2 border-primary"
											/>
										) : (
											<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
												{card.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
											</div>
										)}
										<div>
											<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{card.name}</div>
											<div className="text-xs text-gray-500 dark:text-gray-400">{card.phone}</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<div className="space-y-1">
										<div className="text-sm font-medium text-gray-900 dark:text-gray-100">
											{activeTab === 'students' ? card.rollNumber : card.employeeId}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{activeTab === 'students' ? `Grade ${card.grade}` : card.position}
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
										{card.bloodGroup}
									</span>
								</td>
								<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{card.dateOfBirth}</td>
								<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{card.validUntil}</td>
								<td className="px-6 py-4">
									{card.hasCard ? (
										<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
											Active
										</span>
									) : (
										<span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
											Pending
										</span>
									)}
								</td>
								<td className="px-6 py-4 text-right">
									<div className="flex items-center justify-end gap-2">
										<button 
											onClick={() => handlePreview(card)}
											className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
											title="Preview Card"
										>
											<Eye size={16} className="text-gray-400" />
										</button>
										<button 
											onClick={() => handlePrint(card)}
											className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
											title="Print Card"
										>
											<Printer size={16} className="text-gray-400" />
										</button>
									{card.hasCard ? (
										<motion.button 
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleDownload(card)}
											className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
											title="Download Card"
										>
											<Download size={16} className="text-green-500" />
										</motion.button>
									) : (
										<motion.button 
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleGenerate(card.id)}
											className="rounded-md px-2 py-1 bg-primary text-white hover:bg-primary/90 text-xs font-medium" 
											title="Generate Card"
										>
											Generate
										</motion.button>
									)}
									</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>

			{/* Preview Modal */}
			{showPreview && previewCard && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={() => setShowPreview(false)}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-4xl w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xl font-semibold">ID Card Preview - Front & Back</h3>
							<button
								onClick={() => setShowPreview(false)}
								className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
							>
								✕
							</button>
						</div>
						
						<div className="flex justify-center gap-8 mb-6 flex-wrap">
							{/* Front Side */}
							<div className="space-y-2">
								<p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">Front Side</p>
								<div className="transform scale-110">
									<div className="print-card w-[420px] h-[270px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary to-purple-600 text-white relative">
										<div className="relative h-full p-4 flex flex-col justify-between">
											<div className="text-center mb-3">
												<h3 className="text-sm font-bold">AL-FURAAT SCHOOL</h3>
												<p className="text-xs opacity-90">{activeTab === 'students' ? 'Student ID Card' : 'Employee ID Card'}</p>
											</div>
											<div className="flex gap-3 flex-1">
												<div className="flex-shrink-0">
													{previewCard.photo ? (
														<img 
															src={previewCard.photo} 
															alt={previewCard.name}
															className="w-20 h-24 rounded-lg object-cover border-2 border-white/30"
														/>
													) : (
														<div className="w-20 h-24 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold border-2 border-white/30">
															{previewCard.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
														</div>
													)}
												</div>
												<div className="flex-1 text-xs space-y-0.5">
													<div>
														<p className="font-bold text-sm leading-tight">{previewCard.name}</p>
														<p className="opacity-90 text-xs">
															{activeTab === 'students' ? `Roll: ${previewCard.rollNumber}` : `ID: ${previewCard.employeeId}`}
														</p>
													</div>
													<div className="space-y-1 mt-1">
														<p className="opacity-90 text-xs leading-tight">
															{activeTab === 'students' ? `Grade: ${previewCard.grade}` : previewCard.position}
														</p>
														{activeTab === 'employees' && previewCard.department && (
															<p className="opacity-90 text-xs leading-tight">Dept: {previewCard.department}</p>
														)}
														<p className="opacity-90 text-xs leading-tight">Blood: {previewCard.bloodGroup}</p>
														<p className="opacity-90 text-xs leading-tight">DOB: {previewCard.dateOfBirth}</p>
													</div>
												</div>
											</div>
											<div className="flex items-end justify-between text-xs pt-2 mt-1 border-t border-white/30">
												<div className="flex flex-col justify-end">
													<p className="opacity-75 text-[10px] leading-none mb-0.5">Valid Until:</p>
													<p className="font-bold text-xs leading-tight">{previewCard.validUntil}</p>
												</div>
												<div className="w-12 h-12 bg-white rounded p-0.5 flex items-center justify-center flex-shrink-0">
													<QRCode 
														value={JSON.stringify({
															id: activeTab === 'students' ? previewCard.rollNumber : previewCard.employeeId,
															name: previewCard.name,
															type: activeTab,
															school: 'Al-Furaat School',
															validUntil: previewCard.validUntil
														})} 
														size={46}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Back Side */}
							<div className="space-y-2">
								<p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">Back Side</p>
								<div className="transform scale-110">
									<div className="print-card w-[420px] h-[270px] rounded-xl overflow-hidden shadow-lg bg-white text-gray-900 relative">
										<div className="relative h-full p-4 flex flex-col justify-between">
											<div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-primary">
												<div className="flex-1">
													<h3 className="text-sm font-bold text-primary">AL-FURAAT SCHOOL</h3>
													<p className="text-xs text-gray-600">Primary & Secondary</p>
												</div>
												{/* School Logo */}
												<div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white flex-shrink-0 border-2 border-primary/20">
													<svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
														<path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
													</svg>
												</div>
											</div>
											<div className="flex-1 space-y-2 text-xs">
												<div className="space-y-1">
													<p className="font-semibold text-gray-700">Emergency Contact:</p>
													<p className="text-gray-600">{previewCard.emergencyContact}</p>
												</div>
												<div className="space-y-1">
													<p className="font-semibold text-gray-700">Address:</p>
													<p className="text-gray-600">{previewCard.address}</p>
												</div>
												<div className="space-y-1">
													<p className="font-semibold text-gray-700">Phone:</p>
													<p className="text-gray-600">{previewCard.phone}</p>
												</div>
											</div>
											<div className="mt-2 pt-2 border-t border-gray-200">
												<div className="flex items-start gap-2 text-xs">
													<AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
													<div className="text-gray-600">
														<p className="font-semibold mb-1">Important:</p>
														<p className="text-[10px] leading-tight">
															If found, please return to Al-Furaat School or contact the emergency number above. 
															This card is property of the school and must be carried at all times.
														</p>
													</div>
												</div>
											</div>
											<div className="text-center text-xs text-gray-500 mt-2">
												<p>www.alfuraat-school.so</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex gap-3">
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => handleDownload(previewCard)}
								className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white hover:bg-green-600"
							>
								<Download size={18} />
								Download
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => handlePrint(previewCard)}
								className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90"
							>
								<Printer size={18} />
								Print
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setShowPreview(false)}
								className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
							>
								Close
							</motion.button>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Hidden Print Container */}
			<div className="hidden print:block">
				{previewCard && (
					<IDCardComponent 
						data={previewCard as IDCardData} 
						type={activeTab === 'students' ? 'student' : 'employee'}
						showBothSides={true}
					/>
				)}
				{selectedCards.length > 0 && !previewCard && (
					<>
						{cards
							.filter(card => selectedCards.includes(card.id))
							.map(card => (
								<div key={card.id} className="mb-8">
									<IDCardComponent 
										data={card as IDCardData} 
										type={activeTab === 'students' ? 'student' : 'employee'}
										showBothSides={true}
									/>
								</div>
							))
						}
					</>
				)}
			</div>

			{/* Print Styles */}
			<style>{`
				@media print {
					@page {
						size: A4 portrait;
						margin: 0.5in;
					}
					
					/* Hide everything */
					body * {
						visibility: hidden !important;
					}
					
					/* Show only print container and its contents */
					.hidden.print\\:block,
					.hidden.print\\:block * {
						visibility: visible !important;
					}
					
					.hidden.print\\:block {
						display: flex !important;
						flex-direction: column !important;
						align-items: center !important;
						position: absolute !important;
						left: 50% !important;
						top: 0.5in !important;
						transform: translateX(-50%) !important;
					}
					
					.print-card {
						width: 5.5in !important;
						height: 3.5in !important;
						page-break-after: always !important;
						display: block !important;
						position: relative !important;
						margin-bottom: 0.5in !important;
						overflow: visible !important;
						transform: scale(1) !important;
					}
					
					/* Ensure gradient is visible in print */
					.print-card {
						-webkit-print-color-adjust: exact !important;
						print-color-adjust: exact !important;
						color-adjust: exact !important;
					}
				}
			`}</style>
		</div>
	)
}

