import React from 'react'
import { HomePage, CoursePage, UserHomePage, SignUpPage, SignUpBusiness, TempPage } from './pages'
import { NavBar, Footer } from './components'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/dl-lms/' element={<HomePage />} />
          <Route path='/dl-lms/LearnCoursePage' element={<CoursePage />} />
          <Route path='/dl-lms/UserHomePage' element={<UserHomePage />} />
          <Route path='/dl-lms/SignUpPage' element={<SignUpPage />} />
          <Route path='/dl-lms/SignUpBusiness' element={<SignUpBusiness />} />
          <Route path='/dl-lms/TempPage' element={<TempPage />} />
        </Routes>

        <ConditionalFooter />
      </Router>

      {/* <Footer /> */}
    </>
  )
}

// const ConditionalFooter = () => {
//   let location = useLocation();
//   if (location.pathname !== '/dl-lms/SignUpPage') {
//     return <Footer />;
//   }
//   return null;
// };

const ConditionalFooter = () => {
  let location = useLocation();
  const prohibitedPaths = ['/dl-lms/SignUpPage', '/dl-lms/SignUpBusiness'];

  if (!prohibitedPaths.includes(location.pathname)) {
    return <Footer />;
  }
  return null;
}

export default App
