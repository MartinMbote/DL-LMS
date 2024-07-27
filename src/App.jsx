import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Courses } from './components';
import { HomePage, PasswordReset, CoursePage, CoursesPage, CategoriesPage,CreateContent, QuizPage,ActivationPage ,ChapterListPage,PasswordResetConfirm, SubChapterListPage, ReviewPrompt, Activate, CreateCategoryPage, PendingTeacherList, TeacherDetails, MessageBox, ProfilePage, ChaptersPage, MyCoursePage, CreateCoursePage, Update, UserHomePage, SignUpTutor, SignUpPage, InstructorPage, AdminPage, SignUpBusiness, TempPage } from './pages';
import LogInPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify'; // Ensure correct imports
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/dl-lms/" element={<HomePage />} />
          <Route path="/dl-lms/courses" element={<Courses />} />
          <Route path="/dl-lms/activate/:uidb64/:token" element={<ActivationPage />} />
          <Route path="/dl-lms/course/:id" element={<CoursePage />} />
          <Route path="/dl-lms/Update/:id" element={<PrivateRoute><Update /></PrivateRoute>} />
          <Route path="/dl-lms/ReviewPrompt/:id" element={<PrivateRoute><ReviewPrompt /></PrivateRoute>} />
          <Route path="/dl-lms/activate/:uidb64/:token" element={<Activate />} />
          <Route path="/dl-lms/CategoriesPage" element={<CategoriesPage />} />
          <Route path="/dl-lms/CoursesPage" element={<CoursesPage />} />
          <Route path="/dl-lms/password/reset" element={<PasswordReset />} />
          <Route path="/dl-lms/api/reset/:uid/:token/" element={<PasswordResetConfirm />} />
          <Route path="/dl-lms/course/:id/chapters/" element={<PrivateRoute><ChapterListPage /></PrivateRoute>} />
          <Route path="/dl-lms/ChaptersPage" element={<PrivateRoute><ChaptersPage /></PrivateRoute>} />
          <Route path="/dl-lms/course/:courseId/chapter/:chapterId/subchapter/:subchapterId/create-content" element={<PrivateRoute><CreateContent /></PrivateRoute>} />
          <Route path="/dl-lms/course/:courseId/chapter/:chapterId/subchapters" element={<PrivateRoute><SubChapterListPage /></PrivateRoute>} />
          <Route path="/dl-lms/MessageBox/:username" element={<MessageBox />} />
          <Route path="/dl-lms/quizpage/:courseId/:chapterId/:subchapterId" element={<QuizPage />} />
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
