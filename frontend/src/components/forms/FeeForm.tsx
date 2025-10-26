import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { X, Save, Search } from 'lucide-react'
import { z } from 'zod'
import { Input, Label, Button } from '../ui/form'

const feeSchema = z.object({
	studentId: z.string().min(1, 'Student ID is required'),
	feeType: z.string().min(1, 'Fee type is required'),
	amount: z.number().positive('Amount must be positive'),
	dueDate: z.string().min(1, 'Due date is required'),
	description: z.string().optional(),
	monthlyFee: z.number().optional(),
	cardFee: z.number().optional(),
	registrationFee: z.number().optional(),
})

export type FeeFormData = z.infer<typeof feeSchema>

interface FeeFormProps {
	onSubmit: (data: FeeFormData) => void
	onCancel: () => void
	initialData?: Partial<FeeFormData>
	isLoading?: boolean
}

// Mock students data (would come from API)
const studentsData = [
	{ id: 'ST001', name: 'Ahmed Hassan', grade: '10A' },
	{ id: 'ST002', name: 'Fatima Ali', grade: '9B' },
	{ id: 'ST003', name: 'Omar Mohamed', grade: '11C' },
	{ id: 'ST004', name: 'Aisha Ibrahim', grade: '8A' },
	{ id: 'ST005', name: 'Khadija Abdi', grade: '10A' },
	{ id: 'ST006', name: 'Hassan Omar', grade: '9B' },
]

export function FeeForm({ onSubmit, onCancel, initialData, isLoading = false }: FeeFormProps) {
	const [totalAmount, setTotalAmount] = useState(0)
	const [searchQuery, setSearchQuery] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)
	const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string; grade: string } | null>(null)
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FeeFormData>({
		resolver: zodResolver(feeSchema),
		defaultValues: initialData,
	})

	// Watch fee fields and calculate total
	const monthlyFee = watch('monthlyFee') || 0
	const cardFee = watch('cardFee') || 0
	const registrationFee = watch('registrationFee') || 0

	useEffect(() => {
		setTotalAmount(
			Number(monthlyFee || 0) +
			Number(cardFee || 0) +
			Number(registrationFee || 0)
		)
	}, [monthlyFee, cardFee, registrationFee])

	// Filter students based on search query
	const filteredStudents = studentsData.filter(student =>
		student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		student.id.toLowerCase().includes(searchQuery.toLowerCase())
	)

	// Handle student selection
	const handleStudentSelect = (student: { id: string; name: string; grade: string }) => {
		setSelectedStudent(student)
		setValue('studentId', student.id)
		setSearchQuery(`${student.name} (${student.id})`)
		setShowDropdown(false)
	}

	// Handle clear selection
	const handleClearSelection = () => {
		setSelectedStudent(null)
		setSearchQuery('')
		setValue('studentId', '')
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (!target.closest('.student-search-container')) {
				setShowDropdown(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
		>
			<motion.div
				initial={{ scale: 0.95 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.95 }}
				className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur p-6"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold tracking-tight">Add New Fee</h2>
					<Button variant="ghost" size="icon" onClick={onCancel}>
						<X size={20} />
					</Button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						{/* Student Search */}
						<div className="space-y-2 student-search-container">
							<Label htmlFor="studentSearch">Search Student *</Label>
							<div className="relative">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
									<Input
										id="studentSearch"
										placeholder="Type student name or ID..."
										value={searchQuery}
										onChange={(e) => {
											setSearchQuery(e.target.value)
											setShowDropdown(true)
										}}
										onFocus={() => setShowDropdown(true)}
										className={`${errors.studentId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} pl-10`}
									/>
								</div>
								<input
									type="hidden"
									{...register('studentId')}
								/>
								{errors.studentId && <p className="text-sm text-red-500 mt-1">{errors.studentId.message}</p>}
								
								{/* Dropdown */}
								{showDropdown && searchQuery.length > 0 && (
									<div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
										{filteredStudents.length > 0 ? (
											filteredStudents.map((student) => (
												<div
													key={student.id}
													onClick={() => handleStudentSelect(student)}
													className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
												>
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{student.id} • Grade {student.grade}</div>
												</div>
											))
										) : (
											<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">No students found</div>
										)}
									</div>
								)}
							</div>
							{selectedStudent && (
								<div className="rounded-lg bg-primary/10 border border-primary/30 p-3 flex items-center justify-between">
									<div>
										<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{selectedStudent.name}</div>
										<div className="text-xs text-gray-600 dark:text-gray-400">ID: {selectedStudent.id} • Grade: {selectedStudent.grade}</div>
									</div>
									<button
										type="button"
										onClick={handleClearSelection}
										className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
									>
										Clear
									</button>
								</div>
							)}
						</div>

						{/* Three Fee Types */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{/* Monthly Fee - Required */}
							<div className="space-y-2">
								<Label htmlFor="monthlyFee">Monthly Fee ($) * <span className="text-xs text-gray-500">(Required)</span></Label>
								<Input
									id="monthlyFee"
									type="number"
									placeholder="0.00"
									step="0.01"
									{...register('monthlyFee', { valueAsNumber: true })}
									className="border-primary"
								/>
								<p className="text-xs text-gray-500">Monthly tuition fee</p>
							</div>

							{/* Card Fee - Optional */}
							<div className="space-y-2">
								<Label htmlFor="cardFee">Card Fee ($) <span className="text-xs text-gray-500">(Yearly)</span> <span className="text-xs text-green-600">(Optional)</span></Label>
								<Input
									id="cardFee"
									type="number"
									placeholder="0.00"
									step="0.01"
									{...register('cardFee', { valueAsNumber: true })}
								/>
								<p className="text-xs text-gray-500">Yearly ID card fee</p>
							</div>

							{/* Registration Fee - Optional */}
							<div className="space-y-2">
								<Label htmlFor="registrationFee">Registration Fee ($) <span className="text-xs text-green-600">(Optional)</span></Label>
								<Input
									id="registrationFee"
									type="number"
									placeholder="0.00"
									step="0.01"
									{...register('registrationFee', { valueAsNumber: true })}
								/>
								<p className="text-xs text-gray-500">One-time registration</p>
							</div>
						</div>

						{/* Due Date */}
						<div className="space-y-2">
							<Label htmlFor="dueDate">Due Date *</Label>
							<Input
								id="dueDate"
								type="date"
								{...register('dueDate')}
								className={errors.dueDate ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
						</div>
					</div>

					{/* Summary */}
					<div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Total Amount:</span>
							<span className="text-lg font-bold text-primary">
								${totalAmount.toFixed(2)}
							</span>
						</div>
						<div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
							<div>Monthly Fee: ${Number(monthlyFee || 0).toFixed(2)}</div>
							<div>Card Fee (Yearly): ${Number(cardFee || 0).toFixed(2)}</div>
							{registrationFee && registrationFee > 0 && (
								<div>Registration Fee: ${Number(registrationFee).toFixed(2)}</div>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
						<Button
							type="button"
							variant="outline"
							onClick={onCancel}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isLoading}
						>
							<Save size={16} />
							{isLoading ? 'Saving...' : 'Add Fee'}
						</Button>
					</div>
				</form>
			</motion.div>
		</motion.div>
	)
}

