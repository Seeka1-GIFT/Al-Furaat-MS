import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, X, Gavel, Calendar, User, FileText, AlertCircle } from 'lucide-react'

interface DisciplineRecord {
	id: number
	studentName: string
	rollNumber: string
	class: string
	incidentDate: string
	incidentType: string
	reportedBy: string
	description: string
	status: 'Active' | 'Resolved'
}

export default function ViewDiscipline() {
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState<string>('all')
	const [viewingRecord, setViewingRecord] = useState<DisciplineRecord | null>(null)

	const [records] = useState<DisciplineRecord[]>([
		{
			id: 1,
			studentName: 'Ahmed Hassan',
			rollNumber: 'ST001',
			class: 'Grade 10A',
			incidentDate: '2024-02-15',
			incidentType: 'Disruptive Behavior',
			reportedBy: 'Dr. Mohamed Abdi',
			description: 'Student was disruptive during class and refused to follow instructions.',
			status: 'Active'
		},
		{
			id: 2,
			studentName: 'Fatima Ali',
			rollNumber: 'ST002',
			class: 'Grade 9B',
			incidentDate: '2024-02-12',
			incidentType: 'Tardiness',
			reportedBy: 'Ms. Khadija Hassan',
			description: 'Repeated late arrivals to class without valid excuse.',
			status: 'Resolved'
		},
	])

	const filteredRecords = useMemo(() => {
		return records.filter(record => {
			const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				record.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
				record.incidentType.toLowerCase().includes(searchQuery.toLowerCase())
			
			const matchesFilter = filterStatus === 'all' || record.status === filterStatus
			
			return matchesSearch && matchesFilter
		})
	}, [records, searchQuery, filterStatus])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">View Discipline Records</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Monitor and manage student disciplinary records
						{filteredRecords.length > 0 && (
							<span className="ml-2 text-primary font-medium">
								({filteredRecords.length} {filteredRecords.length === 1 ? 'record' : 'records'})
							</span>
						)}
					</p>
				</div>
			</div>

			{/* Search and Filter Bar */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search records..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
					/>
				</div>
				<div className="relative">
					<select
						value={filterStatus}
						onChange={(e) => setFilterStatus(e.target.value)}
						className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 bg-white dark:bg-gray-900"
					>
						<option value="all">All Status</option>
						<option value="Active">Active</option>
						<option value="Resolved">Resolved</option>
					</select>
				</div>
			</div>

			{/* Records Table */}
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
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Incident Type</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reported By</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
							{filteredRecords.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center">
										<div className="text-gray-500 dark:text-gray-400">
											<p className="text-lg font-medium mb-2">No records found</p>
											<p className="text-sm">Try adjusting your search or filter criteria</p>
										</div>
									</td>
								</tr>
							) : (
								filteredRecords.map((record, index) => (
									<motion.tr
										key={record.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
										className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
													{record.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
												</div>
												<div>
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{record.studentName}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{record.rollNumber} - {record.class}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
												{record.incidentType}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{record.incidentDate}</td>
										<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{record.reportedBy}</td>
										<td className="px-6 py-4">
											<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
												record.status === 'Active' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
												'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
											}`}>
												{record.status}
											</span>
										</td>
										<td className="px-6 py-4 text-right">
											<button
												onClick={() => setViewingRecord(record)}
												className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
												title="View Details"
											>
												<Eye size={16} className="text-gray-400 hover:text-primary" />
											</button>
										</td>
									</motion.tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</motion.div>

			{/* View Record Details Modal */}
			<AnimatePresence>
				{viewingRecord && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setViewingRecord(null)}
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
							<div className="relative h-32 bg-gradient-to-br from-red-500 via-orange-600 to-red-600 overflow-hidden">
								<div className="absolute inset-0 bg-black/10"></div>
								<button
									onClick={() => setViewingRecord(null)}
									className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
								>
									<X size={20} className="text-white" />
								</button>
								
								{/* Student Icon */}
								<div className="absolute -bottom-16 left-8">
									<div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
										{viewingRecord.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
									</div>
								</div>
							</div>

							{/* Content */}
							<div className="px-8 pt-20 pb-8">
								<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
									{viewingRecord.studentName}
								</h2>
								<p className="text-gray-600 dark:text-gray-400 mb-6">{viewingRecord.rollNumber} - {viewingRecord.class}</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Incident Type</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingRecord.incidentType}</p>
										</div>
									</div>
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<Calendar className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Incident Date</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingRecord.incidentDate}</p>
										</div>
									</div>
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<User className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Reported By</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">{viewingRecord.reportedBy}</p>
										</div>
									</div>
									<div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
										<FileText className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" size={20} />
										<div>
											<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Status</p>
											<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
												viewingRecord.status === 'Active' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
												'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
											}`}>
												{viewingRecord.status}
											</span>
										</div>
									</div>
								</div>

								<div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
									<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</p>
									<p className="text-sm text-gray-900 dark:text-white">{viewingRecord.description}</p>
								</div>

								<div className="mt-8 flex items-center justify-end">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setViewingRecord(null)}
										className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
									>
										Close
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
