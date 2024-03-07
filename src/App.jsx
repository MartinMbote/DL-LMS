import React from 'react'
import { HomePage, CoursePage } from './pages'
import { NavBar, Footer } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/dl-lms/' element={<HomePage />} />
          <Route path='/dl-lms/LearnCoursePage' element={<CoursePage />} />
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default App
