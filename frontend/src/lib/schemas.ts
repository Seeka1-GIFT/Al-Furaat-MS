import { z } from 'zod'

// Student form schema
export const studentSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Phone number must be at least 10 digits'),
	grade: z.string().min(1, 'Please select a grade'),
	rollNumber: z.string().min(1, 'Roll number is required'),
	dateOfBirth: z.string().min(1, 'Date of birth is required'),
	address: z.string().min(5, 'Address must be at least 5 characters'),
	parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
	parentPhone: z.string().min(10, 'Parent phone must be at least 10 digits'),
	photo: z.string().optional(), // Base64 encoded photo
})

export type StudentFormData = z.infer<typeof studentSchema>

// Teacher form schema
export const teacherSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Phone number must be at least 10 digits'),
	subject: z.string().min(1, 'Please select a subject'),
	qualification: z.string().min(2, 'Qualification must be at least 2 characters'),
	experience: z.string().min(1, 'Experience is required'),
	dateOfBirth: z.string().min(1, 'Date of birth is required'),
	address: z.string().min(5, 'Address must be at least 5 characters'),
	salary: z.string().min(1, 'Salary is required'),
	photo: z.string().optional(), // Base64 encoded photo
})

export type TeacherFormData = z.infer<typeof teacherSchema>

// Class form schema
export const classSchema = z.object({
	name: z.string().min(2, 'Class name must be at least 2 characters'),
	subject: z.string().min(1, 'Please select a subject'),
	teacherId: z.string().min(1, 'Please select a teacher'),
	schedule: z.string().min(1, 'Schedule is required'),
	room: z.string().min(1, 'Room is required'),
	maxStudents: z.string().min(1, 'Max students is required'),
	description: z.string().optional(),
})

export type ClassFormData = z.infer<typeof classSchema>

// Attendance form schema
export const attendanceSchema = z.object({
	studentId: z.string().min(1, 'Please select a student'),
	classId: z.string().min(1, 'Please select a class'),
	date: z.string().min(1, 'Date is required'),
	status: z.enum(['Present', 'Absent', 'Late'], {
		required_error: 'Please select attendance status',
	}),
	time: z.string().min(1, 'Time is required'),
	notes: z.string().optional(),
})

export type AttendanceFormData = z.infer<typeof attendanceSchema>

// Login form schema
export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	role: z.enum(['admin', 'teacher', 'accountant', 'parent'], {
		required_error: 'Please select a role',
	}),
})

export type LoginFormData = z.infer<typeof loginSchema>
