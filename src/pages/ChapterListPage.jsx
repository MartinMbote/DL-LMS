import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar, SidePanel } from '../components';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChapterListPage() {
    const [chapters, setChapters] = useState([]);
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const { user, authTokens } = useAuth();
    const { id } = useParams();

    useEffect(() => {
        const fetchCourseAndChapters = async () => {
            try {
                const courseResponse = await axios.get(`http://127.0.0.1:8000/api/course/${id}/`);
                setCourse(courseResponse.data);

                const chaptersResponse = await axios.get(`http://127.0.0.1:8000/api/course/${id}/chapters/`);
                setChapters(chaptersResponse.data);
            } catch (error) {
                console.error("Error fetching course and chapters:", error);
            }
        };

        fetchCourseAndChapters();
    }, [id]);

    const handleDeleteChapter = async (chapterId) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/chapters/${chapterId}/delete/`,
                {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 204) {
                // Remove the deleted chapter from the local state
                setChapters(chapters.filter(chapter => chapter.id !== chapterId));

                // Show success toast
                toast.success('Chapter deleted successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Chapter not found');
            } else {
                console.error('Error deleting chapter:', error);
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
                        <h2 className="text-xl font-semibold mb-4">Chapters of the course {course.title}</h2>
                    )}
                    <ul>
                        {chapters.map(chapter => (
                            <li key={chapter.id} className="flex justify-between items-center mb-2">
                                <button
                                    onClick={() => navigate(`/dl-lms/course/${id}/chapter/${chapter.id}/subchapters`)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    {chapter.title}
                                </button>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => navigate(`/course/${id}/chapter/${chapter.id}/update`)}
                                        className="text-orange-500 hover:text-orange-700"
                                    >
                                        <FaPen />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteChapter(chapter.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ChapterListPage;
