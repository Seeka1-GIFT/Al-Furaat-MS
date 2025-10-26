import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
	Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye,
	Mail, Phone, Calendar, DollarSign, Clock, FileText, User,
	Building, Award, TrendingUp, X, CheckCircle, Briefcase, MapPin
} from 'lucide-react'

interface Employee {
	id: number
	name: string
	position: string
	department: string
	email: string
	phone: string
	joinDate: string
	salary: number
	status: string
	address?: string
	dateOfBirth?: string
	emergencyContact?: string
	qualification?: string
	experience?: string
}

export default function Employees() {
	const [activeTab, setActiveTab] = useState<'employees' | 'payroll' | 'attendance'>('employees')
	const [searchQuery, setSearchQuery] = useState('')
	const [filterDepartment, setFilterDepartment] = useState<string>('all')
	const [showFilterMenu, setShowFilterMenu] = useState(false)
	const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null)
	const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
	const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null)
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [showEditForm, setShowEditForm] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const filterMenuRef = useRef<HTMLDivElement>(null)

	const [employees, setEmployees] = useState<Employee[]>([
	{ 
		id: 1, 
		name: 'Dr. Mohamed Abdi', 
		position: 'Senior Teacher', 
		department: 'Mathematics', 
		email: 'mohamed@school.com', 
		phone: '+252 61 111 1111',
		joinDate: '2018-09-01',
		salary: 2500,
		status: 'Active',
		address: 'Mogadishu, Hodan District',
		dateOfBirth: '1980-05-15',
		emergencyContact: '+252 61 999 9999',
		qualification: 'PhD in Mathematics',
		experience: '7 years'
	},
	{ 
		id: 2, 
		name: 'Ms. Khadija Hassan', 
		position: 'Teacher', 
		department: 'English', 
		email: 'khadija@school.com', 
		phone: '+252 61 222 2222',
		joinDate: '2020-01-15',
		salary: 2000,
		status: 'Active',
		address: 'Mogadishu, Wadajir District',
		dateOfBirth: '1992-08-22',
		emergencyContact: '+252 61 888 8888',
		qualification: "Master's in English Literature",
		experience: '5 years'
	},
	{ 
		id: 3, 
		name: 'Mr. Abdullah Omar', 
		position: 'Head Teacher', 
		department: 'Science', 
		email: 'abdullah@school.com', 
		phone: '+252 61 333 3333',
		joinDate: '2015-08-01',
		salary: 3000,
		status: 'Active',
		address: 'Mogadishu, Dharkenley District',
		dateOfBirth: '1975-12-10',
		emergencyContact: '+252 61 777 7777',
		qualification: 'PhD in Physics',
		experience: '10 years'
	},
	{ 
		id: 4, 
		name: 'Ms. Amina Ali', 
		position: 'Teacher', 
		department: 'Arabic', 
		email: 'amina@school.com', 
		phone: '+252 61 444 4444',
		joinDate: '2019-09-01',
		salary: 2200,
		status: 'On Leave',
		address: 'Mogadishu, Hamar Weyne District',
		dateOfBirth: '1988-03-25',
		emergencyContact: '+252 61 666 6666',
		qualification: "Bachelor's in Arabic Language",
		experience: '6 years'
	},
])

// Filter and search employees
const filteredEmployees = useMemo(() => {
	return employees.filter(employee => {
		const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
			employee.department.toLowerCase().includes(searchQuery.toLowerCase())
		
		const matchesFilter = filterDepartment === 'all' || employee.department === filterDepartment
		
		return matchesSearch && matchesFilter
	})
}, [employees, searchQuery, filterDepartment])

// Get unique departments for filter
const departments = useMemo(() => {
	const deptSet = new Set(employees.map(e => e.department))
	return Array.from(deptSet).sort()
}, [employees])

// Handle view employee
const handleViewEmployee = (employee: Employee) => {
	setViewingEmployee(employee)
}

// Handle edit employee
const handleEditEmployee = (employee: Employee) => {
	setEditingEmployee(employee)
}

// Open edit form
const openEditForm = () => {
	setShowEditForm(true)
}

// Handle update employee
const handleUpdateEmployee = (employeeData: any) => {
	if (editingEmployee) {
		const updatedEmployees = employees.map(e => 
			e.id === editingEmployee.id ? { ...e, ...employeeData } : e
		)
		setEmployees(updatedEmployees)
		setShowEditForm(false)
		setEditingEmployee(null)
		setSuccessMessage(`✓ ${employeeData.name} has been updated successfully!`)
		setTimeout(() => setSuccessMessage(''), 3000)
	}
}

// Handle delete employee
const handleDeleteEmployee = (id: number) => {
	const employee = employees.find(e => e.id === id)
	if (employee) {
		setDeletingEmployee(employee)
	}
}

// Confirm delete
const confirmDelete = () => {
	if (deletingEmployee) {
		setEmployees(prev => prev.filter(e => e.id !== deletingEmployee.id))
		setSuccessMessage(`✓ ${deletingEmployee.name} has been removed successfully!`)
		setTimeout(() => setSuccessMessage(''), 3000)
		setDeletingEmployee(null)
	}
}

// Cancel delete
const cancelDelete = () => {
	setDeletingEmployee(null)
}

// Handle create employee
const handleCreateEmployee = (employeeData: any) => {
	const newEmployee: Employee = {
		id: employees.length + 1,
		...employeeData,
		status: 'Active'
	}
	setEmployees(prev => [...prev, newEmployee])
	setShowCreateForm(false)
	setSuccessMessage(`✓ ${employeeData.name} has been added successfully!`)
	setTimeout(() => setSuccessMessage(''), 3000)
}

// Close filter menu when clicking outside
useEffect(() => {
	const handleClickOutside = (event: MouseEvent) => {
		if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
			setShowFilterMenu(false)
		}
	}

	if (showFilterMenu) {
		document.addEventListener('mousedown', handleClickOutside)
	}

	return () => {
		document.removeEventListener('mousedown', handleClickOutside)
	}
}, [showFilterMenu])

const payrollData = [
		{ id: 1, employee: 'Dr. Mohamed Abdi', month: 'January 2025', basicSalary: 2500, allowances: 300, deductions: 100, netSalary: 2700, status: 'Paid' },
		{ id: 2, employee: 'Ms. Khadija Hassan', month: 'January 2025', basicSalary: 2000, allowances: 200, deductions: 50, netSalary: 2150, status: 'Paid' },
		{ id: 3, employee: 'Mr. Abdullah Omar', month: 'January 2025', basicSalary: 3000, allowances: 500, deductions: 150, netSalary: 3350, status: 'Paid' },
		{ id: 4, employee: 'Ms. Amina Ali', month: 'January 2025', basicSalary: 2200, allowances: 250, deductions: 75, netSalary: 2375, status: 'Pending' },
	]

	const attendanceData = [
		{ id: 1, employee: 'Dr. Mohamed Abdi', date: '2025-01-25', checkIn: '08:00 AM', checkOut: '04:00 PM', status: 'Present', hours: 8 },
		{ id: 2, employee: 'Ms. Khadija Hassan', date: '2025-01-25', checkIn: '08:15 AM', checkOut: '04:05 PM', status: 'Present', hours: 8 },
		{ id: 3, employee: 'Mr. Abdullah Omar', date: '2025-01-25', checkIn: '07:45 AM', checkOut: '04:30 PM', status: 'Present', hours: 8.75 },
		{ id: 4, employee: 'Ms. Amina Ali', date: '2025-01-25', checkIn: '-', checkOut: '-', status: 'On Leave', hours: 0 },
	]

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
					<h2 className="text-2xl font-semibold tracking-tight">Human Resource</h2>
					<p className="text-gray-600 dark:text-gray-400">Manage employees, payroll, and attendance</p>
				</div>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setShowCreateForm(true)}
				className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
			>
				<Plus size={16} />
				Add Employee
			</motion.button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-6"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-gray-100">62</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
							<User className="text-blue-600 dark:text-blue-400" size={24} />
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
							<p className="text-sm text-gray-600 dark:text-gray-400">On Leave</p>
							<p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5</p>
						</div>
						<div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
							<Calendar className="text-yellow-600 dark:text-yellow-400" size={24} />
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
							<p className="text-sm text-gray-600 dark:text-gray-400">Total Payroll</p>
							<p className="text-2xl font-bold text-green-600 dark:text-green-400">$142K</p>
						</div>
						<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
							<DollarSign className="text-green-600 dark:text-green-400" size={24} />
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
							<p className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</p>
							<p className="text-2xl font-bold text-purple-600 dark:text-purple-400">96%</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
							<TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
						</div>
					</div>
				</motion.div>
			</div>

			{/* Tabs */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<nav className="flex gap-6">
					{[
						{ id: 'employees', label: 'Employees', icon: User },
						{ id: 'payroll', label: 'Payroll', icon: DollarSign },
						{ id: 'attendance', label: 'Attendance', icon: Clock }
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

			{/* Employees Tab */}
			{activeTab === 'employees' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-4"
				>
				<div className="flex items-center gap-4">
					<div className="relative flex-1 max-w-sm">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Search employees..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
						/>
					</div>
					<div className="relative" ref={filterMenuRef}>
						<button 
							onClick={() => setShowFilterMenu(!showFilterMenu)}
							className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
						>
							<Filter size={16} />
							Filter
							{filterDepartment !== 'all' && (
								<span className="ml-1 rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs">1</span>
							)}
						</button>
						
						{/* Filter Dropdown */}
						<AnimatePresence>
							{showFilterMenu && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg z-10"
								>
									<div className="p-3">
										<p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">Filter by Department</p>
										<div className="space-y-1">
											<button
												onClick={() => {
													setFilterDepartment('all')
													setShowFilterMenu(false)
												}}
												className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
													filterDepartment === 'all'
														? 'bg-primary text-primary-foreground'
														: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
												}`}
											>
												All Departments
											</button>
											{departments.map(dept => (
												<button
													key={dept}
													onClick={() => {
														setFilterDepartment(dept)
														setShowFilterMenu(false)
													}}
													className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
														filterDepartment === dept
															? 'bg-primary text-primary-foreground'
															: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
													}`}
												>
													{dept}
												</button>
											))}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Employees Table */}
				<div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Join Date</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Salary</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
								</tr>
							</thead>
						<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
							{filteredEmployees.length === 0 ? (
								<tr>
									<td colSpan={8} className="px-6 py-12 text-center">
										<p className="text-gray-500 dark:text-gray-400">No employees found</p>
									</td>
								</tr>
							) : (
								filteredEmployees.map((employee, index) => (
									<motion.tr
										key={employee.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
										className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
													{employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
												</div>
												<div>
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{employee.name}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{employee.email}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
												{employee.position}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{employee.department}</td>
										<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{employee.phone}</td>
										<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{employee.joinDate}</td>
										<td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">${employee.salary}/mo</td>
										<td className="px-6 py-4">
											<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
												employee.status === 'Active'
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
													: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
											}`}>
												{employee.status}
											</span>
										</td>
									<td className="px-6 py-4 text-right">
										<div className="flex items-center justify-end gap-2">
											<motion.button 
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => handleViewEmployee(employee)}
												className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
												title="View Details"
											>
												<Eye size={16} className="text-blue-500" />
											</motion.button>
											<motion.button 
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => handleEditEmployee(employee)}
												className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800" 
												title="Edit"
											>
												<Edit size={16} className="text-green-500" />
											</motion.button>
											<motion.button 
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => handleDeleteEmployee(employee.id)}
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

			{/* Payroll Tab */}
			{activeTab === 'payroll' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-4"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900">
								<option>January 2025</option>
								<option>December 2024</option>
								<option>November 2024</option>
							</select>
						</div>
						<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
							Generate Payroll
						</button>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden"
					>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Month</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Basic Salary</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Allowances</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deductions</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Net Salary</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{payrollData.map((payroll, index) => (
										<motion.tr
											key={payroll.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4">
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{payroll.employee}</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{payroll.month}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">${payroll.basicSalary}</td>
											<td className="px-6 py-4 text-sm text-green-600 dark:text-green-400">+${payroll.allowances}</td>
											<td className="px-6 py-4 text-sm text-red-600 dark:text-red-400">-${payroll.deductions}</td>
											<td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">${payroll.netSalary}</td>
											<td className="px-6 py-4">
												<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
													payroll.status === 'Paid'
														? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
														: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
												}`}>
													{payroll.status}
												</span>
											</td>
											<td className="px-6 py-4 text-right">
												<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1 text-xs hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
													<FileText size={14} />
													Payslip
												</button>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Attendance Tab */}
			{activeTab === 'attendance' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="space-y-4"
				>
					<div className="flex items-center gap-4">
						<input 
							type="date" 
							defaultValue="2025-01-25"
							className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-900"
						/>
						<button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
							View Report
						</button>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur overflow-hidden"
					>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-800/50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check In</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check Out</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hours</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
									{attendanceData.map((attendance, index) => (
										<motion.tr
											key={attendance.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
											className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
										>
											<td className="px-6 py-4">
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100">{attendance.employee}</div>
											</td>
											<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{attendance.date}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{attendance.checkIn}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{attendance.checkOut}</td>
											<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{attendance.hours}h</td>
											<td className="px-6 py-4">
												<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
													attendance.status === 'Present'
														? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
														: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
												}`}>
													{attendance.status}
												</span>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{deletingEmployee && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={cancelDelete}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-md rounded-2xl border border-red-200/60 dark:border-red-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-8">
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
									className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto shadow-xl"
								>
									<Trash2 className="text-white" size={40} />
								</motion.div>
							</div>

							<div className="p-8 text-center">
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									Delete Employee?
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-2">
									Are you sure you want to remove <span className="font-semibold text-gray-900 dark:text-white">{deletingEmployee.name}</span>?
								</p>
								<p className="text-sm text-red-600 dark:text-red-400 mb-6">
									This action cannot be undone.
								</p>

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
										Delete
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* View Employee Modal */}
			<AnimatePresence>
				{viewingEmployee && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setViewingEmployee(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-3xl rounded-2xl border border-blue-200/60 dark:border-blue-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8">
								<button
									onClick={() => setViewingEmployee(null)}
									className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
								>
									<X size={18} className="text-gray-600 dark:text-gray-300" />
								</button>
								
								<div className="flex items-center gap-6">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
										className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl flex-shrink-0"
									>
										{viewingEmployee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
									</motion.div>
									
									<div className="flex-1">
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
											{viewingEmployee.name}
										</h3>
										<p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
											{viewingEmployee.position}
										</p>
										<div className="flex items-center gap-2">
											<span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
												viewingEmployee.status === 'Active'
													? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
													: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
											}`}>
												{viewingEmployee.status}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Content */}
							<div className="p-8 space-y-6">
								{/* Contact Information */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<User size={20} className="text-blue-500" />
										Contact Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
											<Mail size={18} className="text-gray-400" />
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
												<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.email}</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
											<Phone size={18} className="text-gray-400" />
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
												<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.phone}</p>
											</div>
										</div>
										{viewingEmployee.emergencyContact && (
											<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
												<Phone size={18} className="text-gray-400" />
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400">Emergency Contact</p>
													<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.emergencyContact}</p>
												</div>
											</div>
										)}
										{viewingEmployee.address && (
											<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
												<MapPin size={18} className="text-gray-400" />
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
													<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.address}</p>
												</div>
											</div>
										)}
									</div>
								</div>

								{/* Employment Details */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<Briefcase size={20} className="text-blue-500" />
										Employment Details
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
											<Building size={18} className="text-gray-400" />
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
												<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.department}</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
											<Calendar size={18} className="text-gray-400" />
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Join Date</p>
												<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.joinDate}</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
											<DollarSign size={18} className="text-gray-400" />
											<div>
												<p className="text-xs text-gray-500 dark:text-gray-400">Salary</p>
												<p className="text-sm font-medium text-gray-900 dark:text-gray-100">${viewingEmployee.salary}/mo</p>
											</div>
										</div>
										{viewingEmployee.experience && (
											<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
												<Award size={18} className="text-gray-400" />
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
													<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.experience}</p>
												</div>
											</div>
										)}
										{viewingEmployee.qualification && (
											<div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 md:col-span-2">
												<Award size={18} className="text-gray-400" />
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400">Qualification</p>
													<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{viewingEmployee.qualification}</p>
												</div>
											</div>
										)}
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center gap-3 pt-4">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setViewingEmployee(null)}
										className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
									>
										Close
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											setViewingEmployee(null)
											handleEditEmployee(viewingEmployee)
										}}
										className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors inline-flex items-center gap-2"
									>
										<Edit size={16} />
										Edit Employee
									</motion.button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Edit Employee Info Modal */}
			<AnimatePresence>
				{editingEmployee && !showEditForm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => setEditingEmployee(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', duration: 0.5 }}
							className="w-full max-w-2xl rounded-2xl border border-green-200/60 dark:border-green-800/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8">
								<button
									onClick={() => setEditingEmployee(null)}
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
											Edit Employee
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Update details for {editingEmployee.name}
										</p>
									</div>
								</div>
							</div>

							<div className="p-6">
								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 flex items-start gap-3">
									<User size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
											Editing Employee Information
										</p>
										<p className="text-xs text-blue-700 dark:text-blue-300">
											You can update personal details, employment information, and contact details.
										</p>
									</div>
								</div>

								<div className="space-y-4">
									<div>
										<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Details:</p>
										<div className="grid grid-cols-2 gap-3 text-sm">
											<div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
												<p className="text-gray-500 dark:text-gray-400 text-xs">Position</p>
												<p className="font-medium text-gray-900 dark:text-gray-100">{editingEmployee.position}</p>
											</div>
											<div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
												<p className="text-gray-500 dark:text-gray-400 text-xs">Department</p>
												<p className="font-medium text-gray-900 dark:text-gray-100">{editingEmployee.department}</p>
											</div>
											<div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
												<p className="text-gray-500 dark:text-gray-400 text-xs">Salary</p>
												<p className="font-medium text-gray-900 dark:text-gray-100">${editingEmployee.salary}/mo</p>
											</div>
											<div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
												<p className="text-gray-500 dark:text-gray-400 text-xs">Status</p>
												<p className="font-medium text-gray-900 dark:text-gray-100">{editingEmployee.status}</p>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-3 mt-6">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setEditingEmployee(null)}
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

			{/* Edit Employee Form Modal */}
			<AnimatePresence>
				{showEditForm && editingEmployee && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
						onClick={() => {
							setShowEditForm(false)
							setEditingEmployee(null)
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
							<div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8">
								<button
									onClick={() => {
										setShowEditForm(false)
										setEditingEmployee(null)
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
											Edit Employee
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Update details for {editingEmployee.name}
										</p>
									</div>
								</div>
							</div>

							<form 
								onSubmit={(e) => {
									e.preventDefault()
									const formData = new FormData(e.currentTarget)
									handleUpdateEmployee({
										name: formData.get('name'),
										position: formData.get('position'),
										department: formData.get('department'),
										email: formData.get('email'),
										phone: formData.get('phone'),
										salary: Number(formData.get('salary')),
										status: formData.get('status'),
										address: formData.get('address') || undefined,
										dateOfBirth: formData.get('dateOfBirth') || undefined,
										emergencyContact: formData.get('emergencyContact') || undefined,
										qualification: formData.get('qualification') || undefined,
										experience: formData.get('experience') || undefined,
										joinDate: formData.get('joinDate')
									})
								}}
								className="p-8 space-y-6"
							>
								{/* Personal Information */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<User size={20} className="text-primary" />
										Personal Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Full Name <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												name="name"
												required
												defaultValue={editingEmployee.name}
												placeholder="e.g., Dr. Mohamed Abdi"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Date of Birth
											</label>
											<input
												type="date"
												name="dateOfBirth"
												defaultValue={editingEmployee.dateOfBirth}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Email <span className="text-red-500">*</span>
											</label>
											<input
												type="email"
												name="email"
												required
												defaultValue={editingEmployee.email}
												placeholder="e.g., mohamed@school.com"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Phone <span className="text-red-500">*</span>
											</label>
											<input
												type="tel"
												name="phone"
												required
												defaultValue={editingEmployee.phone}
												placeholder="e.g., +252 61 111 1111"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Emergency Contact
											</label>
											<input
												type="tel"
												name="emergencyContact"
												defaultValue={editingEmployee.emergencyContact}
												placeholder="e.g., +252 61 999 9999"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Address
											</label>
											<input
												type="text"
												name="address"
												defaultValue={editingEmployee.address}
												placeholder="e.g., Mogadishu, Hodan District"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>
									</div>
								</div>

								{/* Employment Information */}
								<div>
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
										<Briefcase size={20} className="text-primary" />
										Employment Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Position <span className="text-red-500">*</span>
											</label>
											<select
												name="position"
												required
												defaultValue={editingEmployee.position}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="">Select Position</option>
												<option value="Teacher">Teacher</option>
												<option value="Senior Teacher">Senior Teacher</option>
												<option value="Head Teacher">Head Teacher</option>
												<option value="Principal">Principal</option>
												<option value="Vice Principal">Vice Principal</option>
												<option value="Administrator">Administrator</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Department <span className="text-red-500">*</span>
											</label>
											<select
												name="department"
												required
												defaultValue={editingEmployee.department}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="">Select Department</option>
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
												<option value="Administration">Administration</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Join Date <span className="text-red-500">*</span>
											</label>
											<input
												type="date"
												name="joinDate"
												required
												defaultValue={editingEmployee.joinDate}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Monthly Salary ($) <span className="text-red-500">*</span>
											</label>
											<input
												type="number"
												name="salary"
												required
												min="0"
												defaultValue={editingEmployee.salary}
												placeholder="e.g., 2500"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Status <span className="text-red-500">*</span>
											</label>
											<select
												name="status"
												required
												defaultValue={editingEmployee.status}
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											>
												<option value="Active">Active</option>
												<option value="On Leave">On Leave</option>
												<option value="Inactive">Inactive</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Experience
											</label>
											<input
												type="text"
												name="experience"
												defaultValue={editingEmployee.experience}
												placeholder="e.g., 7 years"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>

										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
												Qualification
											</label>
											<input
												type="text"
												name="qualification"
												defaultValue={editingEmployee.qualification}
												placeholder="e.g., PhD in Mathematics"
												className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
											/>
										</div>
									</div>
								</div>

								<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start gap-3">
									<CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-medium text-green-900 dark:text-green-200 mb-1">
											Update Employee Information
										</p>
										<p className="text-xs text-green-700 dark:text-green-300">
											All changes will be saved immediately. Make sure all information is accurate before updating.
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3 pt-4">
									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => {
											setShowEditForm(false)
											setEditingEmployee(null)
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
										Update Employee
									</motion.button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

		{/* Create Employee Form Modal */}
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
						<div className="relative bg-gradient-to-br from-primary/10 to-purple-100 dark:from-primary/10 dark:to-purple-900/20 p-8">
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
									<Plus className="text-white" size={40} />
								</motion.div>
								
								<div>
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
										Add New Employee
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Enter employee information to add them to the system
									</p>
								</div>
							</div>
						</div>

						<form 
							onSubmit={(e) => {
								e.preventDefault()
								const formData = new FormData(e.currentTarget)
								handleCreateEmployee({
									name: formData.get('name'),
									position: formData.get('position'),
									department: formData.get('department'),
									email: formData.get('email'),
									phone: formData.get('phone'),
									salary: Number(formData.get('salary')),
									joinDate: formData.get('joinDate'),
									address: formData.get('address') || undefined,
									dateOfBirth: formData.get('dateOfBirth') || undefined,
									emergencyContact: formData.get('emergencyContact') || undefined,
									qualification: formData.get('qualification') || undefined,
									experience: formData.get('experience') || undefined
								})
							}}
							className="p-8 space-y-6"
						>
							{/* Personal Information */}
							<div>
								<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
									<User size={20} className="text-primary" />
									Personal Information
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Full Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="name"
											required
											placeholder="e.g., Dr. Mohamed Abdi"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Date of Birth
										</label>
										<input
											type="date"
											name="dateOfBirth"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Email <span className="text-red-500">*</span>
										</label>
										<input
											type="email"
											name="email"
											required
											placeholder="e.g., mohamed@school.com"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Phone <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											name="phone"
											required
											placeholder="e.g., +252 61 111 1111"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Emergency Contact
										</label>
										<input
											type="tel"
											name="emergencyContact"
											placeholder="e.g., +252 61 999 9999"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Address
										</label>
										<input
											type="text"
											name="address"
											placeholder="e.g., Mogadishu, Hodan District"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>
								</div>
							</div>

							{/* Employment Information */}
							<div>
								<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
									<Briefcase size={20} className="text-primary" />
									Employment Information
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Position <span className="text-red-500">*</span>
										</label>
										<select
											name="position"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Position</option>
											<option value="Teacher">Teacher</option>
											<option value="Senior Teacher">Senior Teacher</option>
											<option value="Head Teacher">Head Teacher</option>
											<option value="Principal">Principal</option>
											<option value="Vice Principal">Vice Principal</option>
											<option value="Administrator">Administrator</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Department <span className="text-red-500">*</span>
										</label>
										<select
											name="department"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										>
											<option value="">Select Department</option>
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
											<option value="Administration">Administration</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Join Date <span className="text-red-500">*</span>
										</label>
										<input
											type="date"
											name="joinDate"
											required
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Monthly Salary ($) <span className="text-red-500">*</span>
										</label>
										<input
											type="number"
											name="salary"
											required
											min="0"
											placeholder="e.g., 2500"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Experience
										</label>
										<input
											type="text"
											name="experience"
											placeholder="e.g., 7 years"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>

									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Qualification
										</label>
										<input
											type="text"
											name="qualification"
											placeholder="e.g., PhD in Mathematics"
											className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
										/>
									</div>
								</div>
							</div>

							<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
								<Plus size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
										Add New Employee
									</p>
									<p className="text-xs text-blue-700 dark:text-blue-300">
										Fill in all required fields marked with (*) to add a new employee to the system.
									</p>
								</div>
							</div>

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
									Add Employee
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

