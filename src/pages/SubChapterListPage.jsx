import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { NavBar, SidePanel } from '../components';
import { useAuth } from '../context/AuthContext';

function SubChapterListPage() {
    const [subchapters, setSubchapters] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { courseId, chapterId } = useParams();

    useEffect(() => {
        const fetchSubchapters = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/course/${courseId}/chapters/${chapterId}/subchapters/`);
                setSubchapters(response.data);
            } catch (error) {
                console.error("Error fetching subchapters:", error);
            }
        };

        fetchSubchapters();
    }, [courseId, chapterId]);

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
                    <h2 className="text-xl font-semibold mb-4">Subchapters</h2>
                    <ul>
                        {subchapters.map(subchapter => (
                            <li key={subchapter.id} className="mb-2">
                                <button
                                    onClick={() => navigate(`/dl-lms/course/${courseId}/chapter/${chapterId}/subchapter/${subchapter.id}/create-content`)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    {subchapter.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SubChapterListPage;
