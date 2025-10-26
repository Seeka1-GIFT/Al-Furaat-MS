import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, Heart, Users, DollarSign, TrendingUp, Edit, Trash2, Eye, Download, FileText, User, Phone, MapPin, Calendar, X, AlertTriangle, CheckCircle, Mail } from 'lucide-react'

interface CharityStudent {
	id: number
	name: string
	rollNumber: string
	class: string
	photo?: string
	category: 'Orphan' | 'Charity' | 'Sponsored'
	sponsorName?: string
	sponsorContact?: string
	monthlySupport: number
	joiningDate: string
	guardianName: string
	guardianContact: string
	address: string
	status: 'Active' | 'Inactive'
	remarks?: string
}

export default function CharityStudents() {
	const [activeTab, setActiveTab] = useState<'list' | 'sponsors' | 'reports'>('list')
	const [searchQuery, setSearchQuery] = useState('')
	const [filterCategory, setFilterCategory] = useState('all')
	const [viewingStudent, setViewingStudent] = useState<CharityStudent | null>(null)
	const [editingStudent, setEditingStudent] = useState<CharityStudent | null>(null)
	const [deletingStudent, setDeletingStudent] = useState<CharityStudent | null>(null)
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [showEditForm, setShowEditForm] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string>('')
	
	const [charityStudents, setCharityStudents] = useState<CharityStudent[]>([
		{
			id: 1,
			name: 'Ahmed Hassan',
			rollNumber: 'STU001',
			class: '10A',
			category: 'Orphan',
			sponsorName: 'Mohamed Ali Foundation',
			sponsorContact: '+252 61 123 4567',
			monthlySupport: 100,
			joiningDate: '2023-01-15',
			guardianName: 'Fatima Hassan',
			guardianContact: '+252 61 234 5678',
			address: 'Mogadishu, Hodan District',
			status: 'Active',
			remarks: 'Excellent student, needs continued support'
		},
		{
			id: 2,
			name: 'Fatima Omar',
			rollNumber: 'STU002',
			class: '9B',
			category: 'Charity',
			sponsorName: 'Al-Khair Organization',
			sponsorContact: '+252 61 345 6789',
			monthlySupport: 80,
			joiningDate: '2023-03-20',
			guardianName: 'Aisha Omar',
			guardianContact: '+252 61 456 7890',
			address: 'Mogadishu, Wadajir District',
			status: 'Active'
		},
		{
			id: 3,
			name: 'Omar Mohamed',
			rollNumber: 'STU003',
			class: '11C',
			category: 'Sponsored',
			sponsorName: 'Individual Sponsor - Dr. Hassan',
			sponsorContact: '+252 61 567 8901',
			monthlySupport: 150,
			joiningDate: '2022-09-01',
			guardianName: 'Mariam Mohamed',
			guardianContact: '+252 61 678 9012',
			address: 'Mogadishu, Kaaraan District',
			status: 'Active',
			remarks: 'Full scholarship including books and uniform'
		},
		{
			id: 4,
			name: 'Aisha Ibrahim',
			rollNumber: 'STU004',
			class: '8A',
			category: 'Orphan',
			monthlySupport: 90,
			joiningDate: '2023-06-10',
			guardianName: 'Hawa Ibrahim',
			guardianContact: '+252 61 789 0123',
			address: 'Mogadishu, Shangani District',
			status: 'Active',
			remarks: 'Seeking sponsor'
		},
	])

	// Filter students based on search and category
	const filteredStudents = useMemo(() => {
		return charityStudents.filter(student => {
			const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			                     student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
			                     student.guardianName.toLowerCase().includes(searchQuery.toLowerCase())
			const matchesCategory = filterCategory === 'all' || student.category === filterCategory
			return matchesSearch && matchesCategory
		})
	}, [charityStudents, searchQuery, filterCategory])

	// Handle view student
	const handleViewStudent = (student: CharityStudent) => {
		setViewingStudent(student)
	}

	// Handle edit student (show info modal first)
	const handleEditStudent = (student: CharityStudent) => {
		setEditingStudent(student)
	}

	// Open edit form
	const openEditForm = () => {
		setShowEditForm(true)
		// Don't close editingStudent yet, we need its data for the form
	}

	// Handle update student
	const handleUpdateStudent = (studentData: any) => {
		if (editingStudent) {
			const updatedStudents = charityStudents.map(s => 
				s.id === editingStudent.id ? { ...s, ...studentData } : s
			)
			setCharityStudents(updatedStudents)
			setShowEditForm(false)
			setEditingStudent(null)
			setSuccessMessage(`✓ ${studentData.name} has been updated successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
		}
	}

	// Handle delete student
	const handleDeleteStudent = (id: number) => {
		const student = charityStudents.find(s => s.id === id)
		if (student) {
			setDeletingStudent(student)
		}
	}

	// Confirm delete
	const confirmDelete = () => {
		if (deletingStudent) {
			setCharityStudents(charityStudents.filter(s => s.id !== deletingStudent.id))
			setSuccessMessage(`✓ ${deletingStudent.name} has been removed successfully!`)
			setTimeout(() => setSuccessMessage(''), 3000)
			setDeletingStudent(null)
		}
	}

	// Cancel delete
	const cancelDelete = () => {
		setDeletingStudent(null)
	}

	// Handle create student
	const handleCreateStudent = (studentData: any) => {
		const newStudent: CharityStudent = {
			id: charityStudents.length + 1,
			...studentData
		}
		setCharityStudents([...charityStudents, newStudent])
		setShowCreateForm(false)
		setSuccessMessage(`✓ ${studentData.name} has been added successfully!`)
		setTimeout(() => setSuccessMessage(''), 3000)
	}
	
	const getCategoryColor = (category: string) => {
		switch (category) {
			case 'Orphan':
				return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
			case 'Charity':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
			case 'Sponsored':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
		}
	}
	
	const getStatusColor = (status: string) => {
		return status === 'Active'
			? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
	}

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
						<span className="font-medium">{successMessage}</span>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">Charity & Orphan Students</h2>
					<p className="text-gray-600 dark:text-gray-400">Manage charity students and sponsor programs</p>
				</div>
				<div className="flex items-center gap-3">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
					>
						<Download size={16} />
						Export Report
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => setShowCreateForm(true)}
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						<Plus size={16} />
						Add Charity Student
					</motion.button>
				</div>
			</div>
			
			{/* Tabs */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav className="-mb-px flex space-x-8">
					{[
						{ id: 'list', label: 'Students List', icon: Users },
						{ id: 'sponsors', label: 'Sponsors', icon: Heart },
						{ id: 'reports', label: 'Reports & Stats', icon: FileText },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as any)}
							className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
								activeTab === tab.id
									? 'border-primary text-primary'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
							}`}
						>
							<tab.icon size={16} />
							{tab.label}
						</button>
					))}
				</nav>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-purple-100 dark:bg-purple-900">
							<Users size={20} className="text-purple-600 dark:text-purple-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Total Charity Students</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">156</p>
							<p className="text-xs text-purple-600 dark:text-purple-400">Orphans: 89 • Charity: 67</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.1 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-green-100 dark:bg-green-900">
							<Heart size={20} className="text-green-600 dark:text-green-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Active Sponsors</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">42</p>
							<p className="text-xs text-green-600 dark:text-green-400">Supporting 98 students</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-blue-100 dark:bg-blue-900">
							<DollarSign size={20} className="text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Monthly Support</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">$15,420</p>
							<p className="text-xs text-blue-600 dark:text-blue-400">This month collected</p>
						</div>
					</div>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.3 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4"
				>
					<div className="flex items-center gap-3">
						<div className="rounded-lg p-2 bg-orange-100 dark:bg-orange-900">
							<TrendingUp size={20} className="text-orange-600 dark:text-orange-400" />
						</div>
						<div>
							<p className="text-xs text-gray-500 dark:text-gray-400">Seeking Sponsors</p>
							<p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">58</p>
							<p className="text-xs text-orange-600 dark:text-orange-400">Need urgent support</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Tab Content */}
			{activeTab === 'list' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-4"
				>
					{/* Search and Filter Bar */}
					<div className="flex items-center gap-4 flex-wrap">
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
						<select
							value={filterCategory}
							onChange={(e) => setFilterCategory(e.target.value)}
							className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
						>
							<option value="all">All Categories</option>
							<option value="Orphan">Orphan</option>
							<option value="Charity">Charity</option>
							<option value="Sponsored">Sponsored</option>
						</select>
						<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
							<Filter size={16} />
							More Filters
						</button>
					</div>

					{/* Students Table */}
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roll No</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sponsor</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Monthly Support</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{filteredStudents.length === 0 ? (
										<tr>
											<td colSpan={8} className="px-6 py-12 text-center">
												<div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
													<Users size={48} className="mb-4 opacity-20" />
													<p className="text-lg font-medium">No students found</p>
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
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{student.rollNumber}</td>
											<td className="px-6 py-4">
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
												<div className="text-xs text-gray-500">{student.guardianName}</div>
											</td>
											<td className="px-6 py-4">
												<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
													{student.class}
												</span>
											</td>
											<td className="px-6 py-4">
												<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(student.category)}`}>
													{student.category}
												</span>
											</td>
											<td className="px-6 py-4">
												<div className="text-sm text-gray-900 dark:text-gray-100">{student.sponsorName || '-'}</div>
												{student.sponsorContact && <div className="text-xs text-gray-500">{student.sponsorContact}</div>}
											</td>
											<td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">${student.monthlySupport}</td>
											<td className="px-6 py-4">
												<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(student.status)}`}>
													{student.status}
												</span>
											</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													<motion.button 
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => handleViewStudent(student)}
														className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
														title="View"
													>
														<Eye size={16} className="text-blue-500" />
													</motion.button>
													<motion.button 
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => handleEditStudent(student)}
														className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
														title="Edit"
													>
														<Edit size={16} className="text-green-500" />
													</motion.button>
													<motion.button 
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => handleDeleteStudent(student.id)}
														className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
														title="Delete"
													>
														<Trash2 size={16} className="text-red-500" />
													</motion.button>
												</div>
											</td>
										</motion.tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</motion.div>
			)}

			{activeTab === 'sponsors' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Active Sponsors */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold flex items-center gap-2">
									<Heart size={20} className="text-pink-600" />
									Active Sponsors
								</h3>
								<button className="text-sm text-primary hover:underline">View All</button>
							</div>
							<div className="space-y-3">
								{[
									{ name: 'Mohamed Ali Foundation', students: 12, monthly: 1200, since: '2021' },
									{ name: 'Al-Khair Organization', students: 8, monthly: 640, since: '2022' },
									{ name: 'Dr. Hassan (Individual)', students: 3, monthly: 450, since: '2023' },
									{ name: 'Barakat Charity Group', students: 15, monthly: 1350, since: '2020' },
									{ name: 'Ummah Relief Fund', students: 7, monthly: 700, since: '2022' },
								].map((sponsor, idx) => (
									<div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
										<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
											{sponsor.name.charAt(0)}
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium">{sponsor.name}</p>
											<p className="text-xs text-gray-500">{sponsor.students} students • ${sponsor.monthly}/month • Since {sponsor.since}</p>
										</div>
										<button className="text-sm text-primary hover:underline">Details</button>
									</div>
								))}
							</div>
						</div>

						{/* Sponsorship Categories */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<TrendingUp size={20} className="text-primary" />
								Sponsorship Distribution
							</h3>
							<div className="space-y-4">
								{[
									{ category: 'Full Sponsorship', count: 42, amount: 6300, color: 'bg-green-500' },
									{ category: 'Partial Support', count: 28, amount: 2240, color: 'bg-blue-500' },
									{ category: 'School Fees Only', count: 28, amount: 2800, color: 'bg-purple-500' },
									{ category: 'Books & Supplies', count: 58, amount: 4080, color: 'bg-yellow-500' },
								].map((item) => (
									<div key={item.category}>
										<div className="flex justify-between text-sm mb-2">
											<span className="font-medium">{item.category}</span>
											<span className="text-gray-600 dark:text-gray-400">{item.count} students • ${item.amount}</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
											<div
												className={`${item.color} h-2 rounded-full transition-all`}
												style={{ width: `${(item.count / 156) * 100}%` }}
											/>
										</div>
									</div>
								))}
							</div>
							
							<div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20">
								<h4 className="font-semibold mb-2 text-sm">Become a Sponsor</h4>
								<p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
									Help change a child's life through education. Start sponsoring today!
								</p>
								<button className="w-full py-2 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90">
									Register as Sponsor
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{activeTab === 'reports' && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Monthly Summary */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<Calendar size={20} className="text-primary" />
								Monthly Financial Summary
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
									<span className="text-sm font-medium">Total Received</span>
									<span className="text-lg font-bold text-green-600">$15,420</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
									<span className="text-sm font-medium">Total Distributed</span>
									<span className="text-lg font-bold text-blue-600">$14,890</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
									<span className="text-sm font-medium">Balance</span>
									<span className="text-lg font-bold text-purple-600">$530</span>
								</div>
							</div>

							<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
								<h4 className="font-semibold mb-3 text-sm">Distribution Breakdown</h4>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600">School Fees</span>
										<span className="font-medium">$8,500</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Books & Supplies</span>
										<span className="font-medium">$3,200</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Uniforms</span>
										<span className="font-medium">$2,100</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Other Expenses</span>
										<span className="font-medium">$1,090</span>
									</div>
								</div>
							</div>
						</div>

						{/* Category Statistics */}
						<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<Users size={20} className="text-primary" />
								Student Categories
							</h3>
							<div className="space-y-4">
								{[
									{ label: 'Orphan Students', count: 89, percentage: 57, color: 'bg-purple-500', support: '$8,010' },
									{ label: 'Charity Students', count: 67, percentage: 43, color: 'bg-blue-500', support: '$5,360' },
								].map((item) => (
									<div key={item.label} className="space-y-2">
										<div className="flex justify-between text-sm">
											<span className="font-medium">{item.label}</span>
											<span className="text-gray-600 dark:text-gray-400">{item.count} ({item.percentage}%)</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
											<div
												className={`${item.color} h-3 rounded-full transition-all`}
												style={{ width: `${item.percentage}%` }}
											/>
										</div>
										<div className="text-xs text-gray-500">Monthly Support: {item.support}</div>
									</div>
								))}
							</div>

							<div className="mt-6 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
								<div className="flex items-start gap-3">
									<div className="rounded-full p-2 bg-orange-100 dark:bg-orange-900">
										<TrendingUp size={16} className="text-orange-600" />
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-sm mb-1">Urgent: Need More Sponsors</h4>
										<p className="text-xs text-gray-600 dark:text-gray-400">
											58 students are still seeking sponsors. Total monthly support needed: $5,220
										</p>
										<button className="mt-2 text-xs text-primary hover:underline font-medium">
											View List →
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Generate Report */}
					<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<FileText size={20} className="text-primary" />
							Generate Custom Report
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Report Type
								</label>
								<select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
									<option>Financial Summary</option>
									<option>Student List</option>
									<option>Sponsor Report</option>
									<option>Distribution Report</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									From Date
								</label>
								<input
									type="date"
									className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									To Date
								</label>
								<input
									type="date"
									className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
								/>
							</div>
						</div>
						<div className="flex gap-3">
							<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
								<FileText size={16} />
								Generate Report
							</button>
							<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
								<Download size={16} />
								Export Excel
							</button>
							<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
								<Download size={16} />
								Export PDF
							</button>
						</div>
					</div>
				</motion.div>
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
							{/* Header */}
							<div className="relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 flex flex-col items-center">
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl mb-4"
								>
									<AlertTriangle className="text-white" size={40} />
								</motion.div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white">
									Remove Student?
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
									This action cannot be undone
								</p>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6">
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
											<User size={20} className="text-red-600 dark:text-red-400" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">
												{deletingStudent.name}
											</p>
											<div className="space-y-1">
												<p className="text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
													<span className="font-medium">Roll Number:</span> {deletingStudent.rollNumber}
												</p>
												<p className="text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
													<span className="font-medium">Class:</span> {deletingStudent.class}
												</p>
												<p className="text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
													<span className="font-medium">Category:</span> {deletingStudent.category}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-6 flex items-start gap-2">
									<AlertTriangle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
									<p className="text-xs text-yellow-800 dark:text-yellow-200">
										Removing this student will delete all their records and sponsorship data from the system.
									</p>
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
										className="flex-1 px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
									>
										<Trash2 size={18} />
										Remove
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Edit Student Modal */}
			<AnimatePresence>
				{editingStudent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setEditingStudent(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md mx-4 rounded-2xl border border-green-200/60 dark:border-green-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 flex flex-col items-center">
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-xl mb-4"
								>
									<User size={40} />
								</motion.div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
									{editingStudent.name}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									{editingStudent.rollNumber} • {editingStudent.class}
								</p>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
											<Edit size={20} className="text-green-600 dark:text-green-400" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium text-green-900 dark:text-green-200 mb-2">
												Edit Student Information
											</p>
											<p className="text-xs text-green-700 dark:text-green-300">
												A comprehensive form will be available here to edit all student details.
											</p>
										</div>
									</div>
								</div>

								{/* Current Details Preview */}
								<div className="space-y-3 mb-6">
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Category</span>
										<span className={`text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(editingStudent.category)}`}>
											{editingStudent.category}
										</span>
									</div>
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Guardian</span>
										<span className="text-sm font-semibold text-gray-900 dark:text-white">{editingStudent.guardianName}</span>
									</div>
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Support</span>
										<span className="text-sm font-semibold text-gray-900 dark:text-white">${editingStudent.monthlySupport}/month</span>
									</div>
									<div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</span>
										<span className={`text-sm font-semibold ${
											editingStudent.status === 'Active' ? 'text-green-600' : 'text-red-600'
										}`}>
											{editingStudent.status}
										</span>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setEditingStudent(null)}
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

			{/* View Student Modal */}
			<AnimatePresence>
				{viewingStudent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setViewingStudent(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-2xl rounded-2xl border border-blue-200/60 dark:border-blue-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8">
								<button
									onClick={() => setViewingStudent(null)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								
								<div className="flex items-start gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl flex-shrink-0"
									>
										<User className="text-white" size={48} />
									</motion.div>
									
									<div className="flex-1">
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											{viewingStudent.name}
										</h3>
										<div className="flex items-center gap-3 flex-wrap">
											<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
												{viewingStudent.rollNumber}
											</span>
											<span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
												Class {viewingStudent.class}
											</span>
											<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getCategoryColor(viewingStudent.category)}`}>
												{viewingStudent.category}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Content */}
							<div className="p-8 space-y-6">
								{/* Guardian & Contact Info */}
								<div>
									<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Guardian Information</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
													<User size={20} className="text-blue-600 dark:text-blue-400" />
												</div>
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400">Guardian Name</p>
													<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingStudent.guardianName}</p>
												</div>
											</div>
										</div>

										<div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
													<Phone size={20} className="text-purple-600 dark:text-purple-400" />
												</div>
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400">Contact</p>
													<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingStudent.guardianContact}</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Address */}
								<div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
									<div className="flex items-start gap-3">
										<div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
											<MapPin size={20} className="text-green-600 dark:text-green-400" />
										</div>
										<div>
											<p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingStudent.address}</p>
										</div>
									</div>
								</div>

								{/* Sponsorship Info */}
								{viewingStudent.sponsorName && (
									<div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-800/60">
										<h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
											<Heart size={16} />
											Sponsorship Details
										</h4>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Sponsor</p>
												<p className="text-sm font-medium text-blue-900 dark:text-blue-100">{viewingStudent.sponsorName}</p>
											</div>
											<div>
												<p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Contact</p>
												<p className="text-sm font-medium text-blue-900 dark:text-blue-100">{viewingStudent.sponsorContact}</p>
											</div>
											<div>
												<p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Monthly Support</p>
												<p className="text-lg font-bold text-blue-600">${viewingStudent.monthlySupport}</p>
											</div>
											<div>
												<p className="text-xs text-blue-700 dark:text-blue-300 mb-1">Joining Date</p>
												<p className="text-sm font-medium text-blue-900 dark:text-blue-100">{viewingStudent.joiningDate}</p>
											</div>
										</div>
									</div>
								)}

								{/* Remarks */}
								{viewingStudent.remarks && (
									<div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200/60 dark:border-orange-800/60">
										<h4 className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-2">Remarks</h4>
										<p className="text-sm text-orange-700 dark:text-orange-300">{viewingStudent.remarks}</p>
									</div>
								)}

								{/* Action Buttons */}
								<div className="flex items-center gap-3 pt-4">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setViewingStudent(null)}
										className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
									>
										Close
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											setViewingStudent(null)
											setEditingStudent(viewingStudent)
										}}
										className="flex-1 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
									>
										<Edit size={18} />
										Edit Student
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Add Charity Student Form Modal */}
			<AnimatePresence>
				{showCreateForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setShowCreateForm(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-4xl rounded-2xl border border-primary/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 p-8">
								<button
									onClick={() => setShowCreateForm(false)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								
								<div className="flex items-center gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl flex-shrink-0"
									>
										<Heart className="text-white" size={40} />
									</motion.div>
									
									<div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
											Add Charity Student
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Fill in the details to register a new charity or orphan student
										</p>
									</div>
								</div>
							</div>

							{/* Form */}
							<form 
								onSubmit={(e) => {
									e.preventDefault()
									const formData = new FormData(e.currentTarget)
									handleCreateStudent({
										name: formData.get('name'),
										rollNumber: formData.get('rollNumber'),
										class: formData.get('class'),
										category: formData.get('category'),
										sponsorName: formData.get('sponsorName') || undefined,
										sponsorContact: formData.get('sponsorContact') || undefined,
										monthlySupport: Number(formData.get('monthlySupport')),
										joiningDate: formData.get('joiningDate'),
										guardianName: formData.get('guardianName'),
										guardianContact: formData.get('guardianContact'),
										address: formData.get('address'),
										status: formData.get('status'),
										remarks: formData.get('remarks') || undefined
									})
								}}
								className="p-8 space-y-6"
							>
								{/* Student Information Section */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<User size={20} className="text-primary" />
										Student Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Student Name */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Student Name <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="name"
												required
												placeholder="e.g., Ahmed Hassan"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Roll Number */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Roll Number <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="rollNumber"
												required
												placeholder="e.g., STU001"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Class */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Class <span className="text-red-500">*</span>
											</label>
											<select
												name="class"
												required
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="">Select Class</option>
												<option value="8A">8A</option>
												<option value="8B">8B</option>
												<option value="9A">9A</option>
												<option value="9B">9B</option>
												<option value="10A">10A</option>
												<option value="10B">10B</option>
												<option value="11A">11A</option>
												<option value="11B">11B</option>
												<option value="11C">11C</option>
												<option value="12A">12A</option>
												<option value="12B">12B</option>
											</select>
										</div>

										{/* Category */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Category <span className="text-red-500">*</span>
											</label>
											<select
												name="category"
												required
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="">Select Category</option>
												<option value="Orphan">Orphan</option>
												<option value="Charity">Charity</option>
												<option value="Sponsored">Sponsored</option>
											</select>
										</div>

										{/* Joining Date */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Joining Date <span className="text-red-500">*</span>
											</label>
											<input
												type="date"
												name="joiningDate"
												required
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
												defaultValue="Active"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="Active">Active</option>
												<option value="Inactive">Inactive</option>
											</select>
										</div>
									</div>
								</div>

								{/* Guardian Information Section */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<Users size={20} className="text-primary" />
										Guardian Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Guardian Name */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Guardian Name <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="guardianName"
												required
												placeholder="e.g., Fatima Hassan"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Guardian Contact */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Guardian Contact <span className="text-red-500">*</span>
											</label>
											<input
												type="tel"
												name="guardianContact"
												required
												placeholder="e.g., +252 61 234 5678"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Address */}
										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Address <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="address"
												required
												placeholder="e.g., Mogadishu, Hodan District"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>
									</div>
								</div>

								{/* Sponsorship Information Section */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<Heart size={20} className="text-primary" />
										Sponsorship Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Sponsor Name */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Sponsor Name <span className="text-gray-400 text-xs">(Optional)</span>
											</label>
											<input
												type="text"
												name="sponsorName"
												placeholder="e.g., Mohamed Ali Foundation"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Sponsor Contact */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Sponsor Contact <span className="text-gray-400 text-xs">(Optional)</span>
											</label>
											<input
												type="tel"
												name="sponsorContact"
												placeholder="e.g., +252 61 123 4567"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Monthly Support */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Monthly Support ($) <span className="text-red-500">*</span>
											</label>
											<input
												type="number"
												name="monthlySupport"
												required
												min="0"
												placeholder="e.g., 100"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>
									</div>
								</div>

								{/* Remarks */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Remarks <span className="text-gray-400 text-xs">(Optional)</span>
									</label>
									<textarea
										name="remarks"
										rows={3}
										placeholder="Enter any special notes or requirements..."
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
									/>
								</div>

								{/* Info Box */}
								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
									<Heart size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
											Sponsorship Support
										</p>
										<p className="text-xs text-blue-700 dark:text-blue-300">
											If this student doesn't have a sponsor yet, leave the sponsor fields empty. You can add sponsorship details later when a sponsor is found.
										</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3 pt-4">
									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setShowCreateForm(false)}
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
										<Plus size={18} />
										Add Student
									</motion.button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Edit Charity Student Form Modal */}
			<AnimatePresence>
				{showEditForm && editingStudent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => {
							setShowEditForm(false)
							setEditingStudent(null)
						}}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-4xl rounded-2xl border border-green-200/60 dark:border-green-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8">
								<button
									onClick={() => {
										setShowEditForm(false)
										setEditingStudent(null)
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
											Edit Student Information
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Update details for {editingStudent.name}
										</p>
									</div>
								</div>
							</div>

							{/* Form */}
							<form 
								onSubmit={(e) => {
									e.preventDefault()
									const formData = new FormData(e.currentTarget)
									handleUpdateStudent({
										name: formData.get('name'),
										rollNumber: formData.get('rollNumber'),
										class: formData.get('class'),
										category: formData.get('category'),
										sponsorName: formData.get('sponsorName') || undefined,
										sponsorContact: formData.get('sponsorContact') || undefined,
										monthlySupport: Number(formData.get('monthlySupport')),
										joiningDate: formData.get('joiningDate'),
										guardianName: formData.get('guardianName'),
										guardianContact: formData.get('guardianContact'),
										address: formData.get('address'),
										status: formData.get('status'),
										remarks: formData.get('remarks') || undefined
									})
								}}
								className="p-8 space-y-6"
							>
								{/* Student Information Section */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<User size={20} className="text-primary" />
										Student Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Student Name */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Student Name <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="name"
												required
												defaultValue={editingStudent.name}
												placeholder="e.g., Ahmed Hassan"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Roll Number */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Roll Number <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="rollNumber"
												required
												defaultValue={editingStudent.rollNumber}
												placeholder="e.g., STU001"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Class */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Class <span className="text-red-500">*</span>
											</label>
											<select
												name="class"
												required
												defaultValue={editingStudent.class}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="">Select Class</option>
												<option value="8A">8A</option>
												<option value="8B">8B</option>
												<option value="9A">9A</option>
												<option value="9B">9B</option>
												<option value="10A">10A</option>
												<option value="10B">10B</option>
												<option value="11A">11A</option>
												<option value="11B">11B</option>
												<option value="11C">11C</option>
												<option value="12A">12A</option>
												<option value="12B">12B</option>
											</select>
										</div>

										{/* Category */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Category <span className="text-red-500">*</span>
											</label>
											<select
												name="category"
												required
												defaultValue={editingStudent.category}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="">Select Category</option>
												<option value="Orphan">Orphan</option>
												<option value="Charity">Charity</option>
												<option value="Sponsored">Sponsored</option>
											</select>
										</div>

										{/* Joining Date */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Joining Date <span className="text-red-500">*</span>
											</label>
											<input
												type="date"
												name="joiningDate"
												required
												defaultValue={editingStudent.joiningDate}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
												defaultValue={editingStudent.status}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="Active">Active</option>
												<option value="Inactive">Inactive</option>
											</select>
										</div>
									</div>
								</div>

								{/* Guardian Information Section */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<Users size={20} className="text-primary" />
										Guardian Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Guardian Name */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Guardian Name <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="guardianName"
												required
												defaultValue={editingStudent.guardianName}
												placeholder="e.g., Fatima Hassan"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Guardian Contact */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Guardian Contact <span className="text-red-500">*</span>
											</label>
											<input
												type="tel"
												name="guardianContact"
												required
												defaultValue={editingStudent.guardianContact}
												placeholder="e.g., +252 61 234 5678"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Address */}
										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Address <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="address"
												required
												defaultValue={editingStudent.address}
												placeholder="e.g., Mogadishu, Hodan District"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>
									</div>
								</div>

								{/* Sponsorship Information Section */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<Heart size={20} className="text-primary" />
										Sponsorship Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Sponsor Name */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Sponsor Name <span className="text-gray-400 text-xs">(Optional)</span>
											</label>
											<input
												type="text"
												name="sponsorName"
												defaultValue={editingStudent.sponsorName}
												placeholder="e.g., Mohamed Ali Foundation"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Sponsor Contact */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Sponsor Contact <span className="text-gray-400 text-xs">(Optional)</span>
											</label>
											<input
												type="tel"
												name="sponsorContact"
												defaultValue={editingStudent.sponsorContact}
												placeholder="e.g., +252 61 123 4567"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										{/* Monthly Support */}
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Monthly Support ($) <span className="text-red-500">*</span>
											</label>
											<input
												type="number"
												name="monthlySupport"
												required
												min="0"
												defaultValue={editingStudent.monthlySupport}
												placeholder="e.g., 100"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>
									</div>
								</div>

								{/* Remarks */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Remarks <span className="text-gray-400 text-xs">(Optional)</span>
									</label>
									<textarea
										name="remarks"
										rows={3}
										defaultValue={editingStudent.remarks}
										placeholder="Enter any special notes or requirements..."
										className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
									/>
								</div>

								{/* Info Box */}
								<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start gap-3">
									<CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-green-900 dark:text-green-200 mb-1">
											Update Student Information
										</p>
										<p className="text-xs text-green-700 dark:text-green-300">
											All changes will be saved immediately. Make sure all information is accurate before updating.
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
											setEditingStudent(null)
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
										<CheckCircle size={18} />
										Update Student
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

