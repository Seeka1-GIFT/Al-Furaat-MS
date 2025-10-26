import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { X, Save, UserPlus, Upload, Image as ImageIcon } from 'lucide-react'
import { studentSchema, type StudentFormData } from '../../lib/schemas'
import { Button } from '../ui/form'
import { Input, Label, Select, Textarea } from '../ui/form'

interface StudentFormProps {
	onSubmit: (data: StudentFormData) => void
	onCancel: () => void
	initialData?: Partial<StudentFormData>
	isLoading?: boolean
}

export function StudentForm({ onSubmit, onCancel, initialData, isLoading = false }: StudentFormProps) {
	const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.photo || null)
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<StudentFormData>({
		resolver: zodResolver(studentSchema),
		defaultValues: initialData,
	})
	
	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const base64String = reader.result as string
				setPhotoPreview(base64String)
				setValue('photo', base64String)
			}
			reader.readAsDataURL(file)
		}
	}

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
				<h2 className="text-2xl font-semibold tracking-tight">
					{initialData ? 'Edit Student' : 'Add New Student'}
				</h2>
				<Button variant="ghost" size="icon" onClick={onCancel}>
					<X size={20} />
				</Button>
			</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Photo Upload Section */}
					<div className="flex items-center gap-6 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
						<div className="flex-shrink-0">
							{photoPreview ? (
								<img 
									src={photoPreview} 
									alt="Student preview" 
									className="w-24 h-24 rounded-full object-cover border-2 border-primary"
								/>
							) : (
								<div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
									<ImageIcon size={32} className="text-gray-400" />
								</div>
							)}
						</div>
						<div className="flex-1">
							<Label htmlFor="photo" className="text-base font-medium">Student Photo</Label>
							<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Upload a photo for the student ID card</p>
							<div className="flex gap-2">
								<label htmlFor="photo-input" className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
									<Upload size={16} />
									Choose Photo
								</label>
								<input
									id="photo-input"
									type="file"
									accept="image/*"
									onChange={handlePhotoChange}
									className="hidden"
								/>
								{photoPreview && (
									<button
										type="button"
										onClick={() => {
											setPhotoPreview(null)
											setValue('photo', '')
										}}
										className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
									>
										Remove
									</button>
								)}
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Name */}
						<div className="space-y-2">
							<Label htmlFor="name">Full Name *</Label>
							<Input
								id="name"
								placeholder="Enter student name"
								{...register('name')}
								className={errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
						</div>

						{/* Email */}
						<div className="space-y-2">
							<Label htmlFor="email">Email *</Label>
							<Input
								id="email"
								type="email"
								placeholder="student@example.com"
								{...register('email')}
								className={errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
						</div>

						{/* Phone */}
						<div className="space-y-2">
							<Label htmlFor="phone">Phone Number *</Label>
							<Input
								id="phone"
								placeholder="+252 61 123 4567"
								{...register('phone')}
								className={errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
						</div>

						{/* Grade */}
						<div className="space-y-2">
							<Label htmlFor="grade">Grade *</Label>
							<Select
								id="grade"
								{...register('grade')}
								className={errors.grade ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							>
								<option value="">Select Grade</option>
								<option value="8A">Grade 8A</option>
								<option value="8B">Grade 8B</option>
								<option value="9A">Grade 9A</option>
								<option value="9B">Grade 9B</option>
								<option value="10A">Grade 10A</option>
								<option value="10B">Grade 10B</option>
								<option value="11A">Grade 11A</option>
								<option value="11B">Grade 11B</option>
								<option value="12A">Grade 12A</option>
								<option value="12B">Grade 12B</option>
							</Select>
							{errors.grade && <p className="text-sm text-red-500">{errors.grade.message}</p>}
						</div>

						{/* Roll Number */}
						<div className="space-y-2">
							<Label htmlFor="rollNumber">Roll Number *</Label>
							<Input
								id="rollNumber"
								placeholder="ST001"
								{...register('rollNumber')}
								className={errors.rollNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.rollNumber && <p className="text-sm text-red-500">{errors.rollNumber.message}</p>}
						</div>

						{/* Date of Birth */}
						<div className="space-y-2">
							<Label htmlFor="dateOfBirth">Date of Birth *</Label>
							<Input
								id="dateOfBirth"
								type="date"
								{...register('dateOfBirth')}
								className={errors.dateOfBirth ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
						</div>

						{/* Parent Name */}
						<div className="space-y-2">
							<Label htmlFor="parentName">Parent/Guardian Name *</Label>
							<Input
								id="parentName"
								placeholder="Parent name"
								{...register('parentName')}
								className={errors.parentName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.parentName && <p className="text-sm text-red-500">{errors.parentName.message}</p>}
						</div>

						{/* Parent Phone */}
						<div className="space-y-2">
							<Label htmlFor="parentPhone">Parent/Guardian Phone *</Label>
							<Input
								id="parentPhone"
								placeholder="+252 61 123 4567"
								{...register('parentPhone')}
								className={errors.parentPhone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.parentPhone && <p className="text-sm text-red-500">{errors.parentPhone.message}</p>}
						</div>
					</div>

					{/* Address */}
					<div className="space-y-2">
						<Label htmlFor="address">Address *</Label>
						<Textarea
							id="address"
							placeholder="Enter full address"
							rows={3}
							{...register('address')}
							className={errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
						/>
						{errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
					</div>

					{/* Form Actions */}
					<div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200/60 dark:border-gray-800/60">
						<Button type="button" variant="outline" onClick={onCancel}>
							Cancel
						</Button>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? (
							<>
								<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
								Saving...
							</>
						) : (
							<>
								<UserPlus size={16} className="mr-2" />
								{initialData ? 'Update Student' : 'Add Student'}
							</>
						)}
					</Button>
					</div>
				</form>
			</motion.div>
		</motion.div>
	)
}
