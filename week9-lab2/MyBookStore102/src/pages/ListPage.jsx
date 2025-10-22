import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const ListPage = () => {
  // กำหนด State สำหรับจัดการข้อมูล
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
      useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        // เรียก API เพื่อดึงข้อมูลหนังสือ
        const response = await fetch('http://localhost:8080/api/v1/books');

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();

        setFeaturedBooks(data);
        setError(null);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching books:', err);
        
      } finally {
        setLoading(false);
      }
    };

    // เรียกใช้ฟังก์ชันดึงข้อมูล
    fetchBooks();
  }, []); // [] = dependency array ว่าง = รันครั้งเดียว

  // กรณีกำลังโหลดข้อมูล
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center py-8 col-span-full">
          Loading...
        </div>
      </div>
    );
  }

  // กรณีเกิดข้อผิดพลาด
  if (error) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center py-8 col-span-full text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  // กรณีแสดงผลข้อมูลปกติ
  return (
    <div>
    <div className='px-6 py-4 whitespqce-nowrap'>
        <buttom type="add" className="px-4 py-0 bg-green-400 text-viridian-900 
              font-semibold rounded-lg hover:bg-yellow-300 transition-colors"><NavLink to = "/store-manager/add-book">เพิ่ม</NavLink></buttom>
    </div>

      <div className="bg-white text-black rounded-xl shadow-2xl overflow-hidden">

        <table className="w-full border-collapse mb-4 divide-y divide-gray-400">
          <thead className="bg-green-300 text-gray-900">
            <tr>
              <th>ID</th>
              <th>ชื่อ</th>
              <th>ผู้แต่ง</th>
              <th>ปี</th>
              <th>ราคา</th>
              <th>ประเภท</th>
              <th>คะแนน</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {featuredBooks.map(book => (
            <tr className='divide-y divide-gray-400'>
                <td className='px-6 py-4 whitespqce-nowrap'>{book.id}</td>
                <td className='px-6 py-4 whitespqce-nowrap'>{book.title}</td>
                <td className='px-6 py-4 whitespqce-nowrap'>{book.author}</td>
                <td className='px-6 py-4 whitespqce-nowrap'>{book.year}</td>
                <td className='px-6 py-4 whitespqce-nowrap'>{book.price}</td>
                <td className='px-6 py-4 whitespqce-nowrap'>{book.category}</td>
                <td className='px-6 py-4 whitespqce-nowrap'>{book.rating}</td>
                <td className='px-6 py-4 whitespqce-nowrap'><buttom><NavLink to = "/boks/edit">แก้ไข</NavLink></buttom></td>
                <td className='px-6 py-4 whitespqce-nowrap'><buttom><NavLink to = "/boks/delete">ลบ</NavLink></buttom></td>
            </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default ListPage;