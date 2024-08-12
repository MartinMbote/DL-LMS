import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar, SidePanel } from '../components';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssignmentList() {
    const [assignments, setAssignments] = useState([]);
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { courseId } = useParams();

    useEffect(() => {
        const fetchCourseAndAssignments = async () => {
            try {
                const courseResponse = await axios.get(`http://127.0.0.1:8000/api/course/${courseId}/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                });
                setCourse(courseResponse.data);

                const assignmentsResponse = await axios.get(`http://127.0.0.1:8000/api/course/${courseId}/assignments/view`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${authTokens.access}`
                    }
                });
                setAssignments(assignmentsResponse.data);
            } catch (error) {
                console.error("Error fetching course and assignments:", error);
            }
        };

        fetchCourseAndAssignments();
    }, [courseId, authTokens.access]);

    const handleDeleteAssignment = async (assignmentId) => {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/course/${courseId}/assignments/${assignmentId}/`,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authTokens.access}`
              }
            }
          );
      
          if (response.status === 204) {
            // Remove the deleted assignment from the local state
            setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
      
            // Show success toast
            toast.success('Assignment deleted successfully', {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.error('Assignment not found');
          } else {
            console.error('Error deleting assignment:', error);
          }
        }
      };
  
    const navbarProps = {
        isLoggedIn: !!user,
        username: user?.username,
    };

    return (
        <div>
            <NavBar {...navbarProps} />
            <div className="flex">
                <SidePanel />
                <div className="container mx-auto p-4">
                    {course && (
                        <h2 className="text-xl font-semibold mb-4">Assignments for the course {course.title}</h2>
                    )}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Maximum Points
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment, index) => (
                                    <tr key={assignment.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <button
                                                onClick={() => navigate(`/course/${id}/assignment/${assignment.id}/`)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                {assignment.title}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(assignment.due_date).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {assignment.max_points}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex space-x-4">
                                            <button
                                                onClick={() => navigate(`/course/${id}/assignment/${assignment.id}/update`)}
                                                className="text-orange-500 hover:text-orange-700"
                                            >
                                                <FaPen />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAssignment(assignment.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AssignmentList;
