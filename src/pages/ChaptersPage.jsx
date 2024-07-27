import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ChaptersPage() {
  const [chapters, setChapters] = useState([]);
  const history = useNavigate();

  useEffect(() => {

    const fetchUserData = async () => {
      if (!authTokens) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    // Simulating fetching chapters and subchapters from API
    // Replace with actual API fetch logic
    const fetchData = async () => {
      try {
        // Example API fetch
        const response = await fetch("http://127.0.0.1:8000/api/course/${course_id}/chapters/");
        if (!response.ok) {
          throw new Error("Failed to fetch chapters");
        }
        const data = await response.json();
        setChapters(data); // Assuming data structure is an array of chapters with subchapters
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchData();
  }, []);

  function setID(id, name, age) {
    localStorage.setItem("id", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("Age", age);
  }

  function deleted(id) {
    // Implement deletion logic here, possibly using an API call
    console.log("Delete chapter with id:", id);
    // For example, perform an API delete request
    // then update state or handle UI changes accordingly
  }

  return (
   <div> 
   <NavBar isLoggedIn={!!user} username={user?.username} profilePicture={userData.profile_picture} />
    <div className="m-10">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Chapter Name</th>
            <th className="border border-gray-300 px-4 py-2">Subchapters</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter.id} className="bg-white">
              <td className="border border-gray-300 px-4 py-2">{chapter.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <ul>
                  {chapter.subchapters.map((subchapter) => (
                    <li key={subchapter.id}>{subchapter.name}</li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <Link to={`/edit/${chapter.id}`}>
                  <button
                    onClick={() => setID(chapter.id, chapter.name, chapter.age)}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => deleted(chapter.id)}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/create" className="inline-block mt-4">
        <button className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
          Create
        </button>
      </Link>
    </div>
   </div> 
  );
}

export default ChaptersPage;
