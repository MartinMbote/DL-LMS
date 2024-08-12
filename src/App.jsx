import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { API_URL, REACT_APP_STRIPE_KEY } from './config/config.jsx';
import { Courses } from './components';
import { HomePage, PasswordReset, ExamReview, AssignmentCreatePage,ExamPage,Success, AddQuestionPage,CoursePage, Exams, CreateExamQuestion , CreateExamPage,TimedExamPage,NotePage, CheckoutPage, CoursesPage, CategoriesPage, CreateContent, IncomeReportPage, QuizPage, ActivationPage, ChapterListPage, PasswordResetConfirm, SubChapterListPage, ReviewPrompt, Activate, CreateCategoryPage, PendingTeacherList, TeacherDetails, MessageBox, ProfilePage, ChaptersPage, MyCoursePage, CreateCoursePage, Update, UserHomePage, SignUpTutor, SignUpPage, InstructorPage, AdminPage, SignUpBusiness, TempPage } from './pages';
import LogInPage from './pages/LoginPage';
import StripeProvider from './context/StripeContext';
import PrivateRoute from './utils/PrivateRoute';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify'; // Ensure correct imports
import 'react-toastify/dist/ReactToastify.css';
import AssignmentList from './pages/AssignmentList';


// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/dl-lms/" element={<HomePage />} />
          <Route path="/dl-lms/courses" element={<Courses />} />
          <Route path="/dl-lms/activate/:uidb64/:token" element={<ActivationPage />} />
          <Route path="/dl-lms/course/:id" element={<CoursePage />} />
          <Route path="/dl-lms/course/:id/notes/:chapterId/:subInfoId" element={<NotePage />} />
          <Route path="/dl-lms/course/:courseId/exam/:examId/add/question" element={<AddQuestionPage />} />
          <Route path="/dl-lms/Update/:id" element={<PrivateRoute><Update /></PrivateRoute>} />
          <Route path="/dl-lms/ReviewPrompt/:id" element={<PrivateRoute><ReviewPrompt /></PrivateRoute>} />
          <Route path="/dl-lms/activate/:uidb64/:token" element={<Activate />} />
          <Route path="/dl-lms/CategoriesPage" element={<CategoriesPage />} />
          <Route path="/dl-lms/course/:courseId/exam/:examId/page" element={<ExamPage />} />
          <Route path="/dl-lms/course/:courseId/exam/:examId/Review" element={<ExamReview />} />
      
          <Route path="/dl-lms/checkout/:id/:amount" element={
            <Elements stripe={stripePromise}>
              <CheckoutPage />
            </Elements>
          } />
         
           <Route path="/dl-lms/success" element={<Success />} />
          <Route path="/dl-lms/IncomeReport" element={<IncomeReportPage />} />
          <Route path="/dl-lms/course/:courseId/exams/" element={<Exams/>}/>
          <Route path="/dl-lms/course/:courseId/assignment/create" element={<AssignmentCreatePage/>}/>
          <Route path="/dl-lms/CoursesPage" element={<CoursesPage />} />
          <Route path="/dl-lms/password/reset" element={<PasswordReset />} />
          <Route path="/dl-lms/api/reset/:uid/:token/" element={<PasswordResetConfirm />} />
          <Route path="/dl-lms/course/:id/chapters/" element={<PrivateRoute><ChapterListPage /></PrivateRoute>} />
          <Route path="/dl-lms/ChaptersPage" element={<PrivateRoute><ChaptersPage /></PrivateRoute>} />
          <Route path="/dl-lms/course/:courseId/chapter/:chapterId/subchapter/:subchapterId/create-content" element={<PrivateRoute><CreateContent /></PrivateRoute>} />
          <Route path="/dl-lms/course/:courseId/chapter/:chapterId/subchapters" element={<PrivateRoute><SubChapterListPage /></PrivateRoute>} />
          <Route path="/dl-lms/MessageBox/:username" element={<MessageBox />} />
          <Route path="/dl-lms/course/:courseId/assignments/" element={<AssignmentList/>} />
        
          <Route path="/dl-lms/quizpage/:courseId/:chapterId/:subchapterId" element={<QuizPage />} />
          <Route path="/dl-lms/course/:courseId/examcreate" element={<CreateExamPage />} />
          <Route path="/dl-lms/course/:courseId/create/:examId/questions" element={<CreateExamQuestion />} />
          <Route path="/dl-lms/user/:userId/messages" element={<MessageBox />} />
          <Route path="/dl-lms/user/:userId/messages/:conversationId" element={<MessageBox />} />
          <Route path="/dl-lms/PendingTeacherList" element={<PrivateRoute><PendingTeacherList /></PrivateRoute>} />
          <Route path="/dl-lms/Applicant/Details/:teacherId" element={<PrivateRoute><TeacherDetails /></PrivateRoute>} />
          <Route path="/dl-lms/Category/Create" element={<PrivateRoute><CreateCategoryPage /></PrivateRoute>} />
          <Route path="/dl-lms/profilePage/:username" element={<ProfilePage />} />
          <Route path="/dl-lms/CreateCoursePage" element={<PrivateRoute><CreateCoursePage /></PrivateRoute>} />
          <Route path="/dl-lms/AdminPage" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
          <Route path="/dl-lms/SignUpPage" element={<SignUpPage />} />
          <Route path="/dl-lms/SignUpTutor" element={<SignUpTutor />} />
          <Route path="/dl-lms/LogInPage" element={<LogInPage />} />
          <Route path="/dl-lms/SignUpBusiness" element={<SignUpBusiness />} />
          <Route path="/dl-lms/MyCoursePage" element={<PrivateRoute><MyCoursePage /></PrivateRoute>} />
          <Route path="/dl-lms/InstructorPage" element={<PrivateRoute><InstructorPage /></PrivateRoute>} />
          <Route path="/dl-lms/TempPage" element={<PrivateRoute><TempPage /></PrivateRoute>} />
          <Route
            path="/dl-lms/UserHomePage"
            element={
              <PrivateRoute>
                <UserHomePage />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
