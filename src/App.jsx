import './App.css'
import HomePage from './pages/HomePage'
import { Route } from 'react-router-dom'
import { BrowserRouter, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import AddExpensePage from './pages/AddExpensePage'
import Layout from './components/Layout'
import AccountPage from './pages/AccountPage'
import ProtectedRoute from './components/ProtectedRoute'
import AddIncomePage from './pages/AddIncomePage'


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/add-expense/:uid" element={
            <ProtectedRoute>
              <AddExpensePage />
            </ProtectedRoute>
            } />
          <Route path="/add-income/:uid" element={
            <ProtectedRoute>
              <AddIncomePage />
            </ProtectedRoute>
            } />
          <Route path="/dashboard/:uid" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
            } />
          <Route path="/account/:uid" element={
            <ProtectedRoute>
              <AccountPage/>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
