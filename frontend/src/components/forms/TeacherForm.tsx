import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { X, GraduationCap, Upload, Image as ImageIcon } from 'lucide-react'
import { teacherSchema, type TeacherFormData } from '../../lib/schemas'
import { Button } from '../ui/form'
import { Input, Label, Select, Textarea } from '../ui/form'

interface TeacherFormProps {
	onSubmit: (data: TeacherFormData) => void
	onCancel: () => void
	initialData?: Partial<TeacherFormData>
	isLoading?: boolean
}

export function TeacherForm({ onSubmit, onCancel, initialData, isLoading = false }: TeacherFormProps) {
	const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.photo || null)
	
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<TeacherFormData>({
		resolver: zodResolver(teacherSchema),
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
					{initialData ? 'Edit Teacher' : 'Add New Teacher'}
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
									alt="Teacher preview" 
									className="w-24 h-24 rounded-full object-cover border-2 border-primary"
								/>
							) : (
								<div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
									<ImageIcon size={32} className="text-gray-400" />
								</div>
							)}
						</div>
						<div className="flex-1">
							<Label htmlFor="photo" className="text-base font-medium">Teacher/Employee Photo</Label>
							<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Upload a photo for the employee ID card</p>
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
								placeholder="Enter teacher name"
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
								placeholder="teacher@school.com"
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

						{/* Subject */}
						<div className="space-y-2">
							<Label htmlFor="subject">Subject *</Label>
							<Select
								id="subject"
								{...register('subject')}
								className={errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							>
								<option value="">Select Subject</option>
								<option value="Mathematics">Mathematics</option>
								<option value="English">English</option>
								<option value="Science">Science</option>
								<option value="Arabic">Arabic</option>
								<option value="History">History</option>
								<option value="Geography">Geography</option>
								<option value="Physics">Physics</option>
								<option value="Chemistry">Chemistry</option>
								<option value="Biology">Biology</option>
								<option value="Computer Science">Computer Science</option>
							</Select>
							{errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
						</div>

						{/* Qualification */}
						<div className="space-y-2">
							<Label htmlFor="qualification">Qualification *</Label>
							<Input
								id="qualification"
								placeholder="e.g., Bachelor's Degree"
								{...register('qualification')}
								className={errors.qualification ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.qualification && <p className="text-sm text-red-500">{errors.qualification.message}</p>}
						</div>

						{/* Experience */}
						<div className="space-y-2">
							<Label htmlFor="experience">Experience *</Label>
							<Select
								id="experience"
								{...register('experience')}
								className={errors.experience ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							>
								<option value="">Select Experience</option>
								<option value="0-1 years">0-1 years</option>
								<option value="2-3 years">2-3 years</option>
								<option value="4-5 years">4-5 years</option>
								<option value="6-10 years">6-10 years</option>
								<option value="10+ years">10+ years</option>
							</Select>
							{errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
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

						{/* Salary */}
						<div className="space-y-2">
							<Label htmlFor="salary">Salary *</Label>
							<Input
								id="salary"
								type="number"
								placeholder="Enter salary amount"
								{...register('salary')}
								className={errors.salary ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
							/>
							{errors.salary && <p className="text-sm text-red-500">{errors.salary.message}</p>}
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
								<GraduationCap size={16} className="mr-2" />
								{initialData ? 'Update Teacher' : 'Add Teacher'}
							</>
						)}
					</Button>
					</div>
				</form>
			</motion.div>
		</motion.div>
	)
}
