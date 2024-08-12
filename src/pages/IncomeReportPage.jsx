import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavBar, SidePanelAdmin } from '../components';
import axios from 'axios';

const IncomeReportPage = () => {
  const { user, authTokens } = useAuth();
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/income/', {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });
        setIncomeData(response.data);
      } catch (error) {
        console.error('Failed to fetch income data', error);
      }
    };

    fetchIncomeData();
  }, [authTokens]);

  const navbarProps = {
    isLoggedIn: !!user,
    username: user?.username,
    profilePicture: user?.profile_picture,
  };

  return (
    <div>
      <NavBar {...navbarProps} />
      <div className="flex">
        <SidePanelAdmin />
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Income Report</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {incomeData.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/4 py-2">Course</th>
                    <th className="w-1/4 py-2">Category</th>
                    <th className="w-1/4 py-2">Creator</th>
                    <th className="w-1/4 py-2">Total Income</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {incomeData.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border">{course.title}</td>
                      <td className="py-2 px-4 border">{course.category}</td>
                      <td className="py-2 px-4 border">{course.created_by}</td>
                      <td className="py-2 px-4 border">${course.total_income}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No income data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeReportPage;
