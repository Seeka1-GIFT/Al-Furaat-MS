import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import StudentDetails from './pages/StudentDetails'
import StudentStatement from './pages/StudentStatement'
import ClearanceCard from './pages/ClearanceCard'
import Teachers from './pages/Teachers'
import Classes from './pages/Classes'
import Attendance from './pages/Attendance'
import Examinations from './pages/Examinations'
import Employees from './pages/Employees'
import IDCards from './pages/IDCards'
import CharityStudents from './pages/CharityStudents'
import Transfers from './pages/Transfers'
import Reports from './pages/Reports'
import DisciplineForm from './pages/DisciplineForm'
import ViewDiscipline from './pages/ViewDiscipline'
import FinancialManagement from './pages/FinancialManagement'

export default function App() {
	return (
		<ThemeProvider>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/students" element={<Students />} />
					<Route path="/students/:id" element={<StudentDetails />} />
					<Route path="/students/:id/statement" element={<StudentStatement />} />
					<Route path="/students/:id/clearance" element={<ClearanceCard />} />
					<Route path="/teachers" element={<Teachers />} />
					<Route path="/classes" element={<Classes />} />
					<Route path="/attendance" element={<Attendance />} />
					<Route path="/examinations" element={<Examinations />} />
					<Route path="/employees" element={<Employees />} />
					<Route path="/id-cards" element={<IDCards />} />
					<Route path="/charity-students" element={<CharityStudents />} />
					<Route path="/transfers" element={<Transfers />} />
					<Route path="/discipline-form" element={<DisciplineForm />} />
					<Route path="/view-discipline" element={<ViewDiscipline />} />
					<Route path="/reports" element={<Reports />} />
					<Route path="/financial-management" element={<FinancialManagement />} />
				</Routes>
			</Layout>
		</ThemeProvider>
	)
}


