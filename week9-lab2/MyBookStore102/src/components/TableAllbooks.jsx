import React, { useState, useEffect } from 'react';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/solid';
import { Link , NavLink} from 'react-router-dom';

const TableAllbooks = () => {
     const [allBook, setAllbooks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    setLoading(true);

                    const [allbooks] = await Promise.all([
                         fetch("/api/v1/books"),
                    ]);

                    if (!allbooks.ok) {
                         throw new Error("Failed to fetch data");
                    }

                    const allbooksData = await allbooks.json();

                    setAllbooks(allbooksData);
                    setError(null);
               } catch (err) {
                    setError(err.message);
                    console.error("Fetch error:", err);
               } finally {
                    setLoading(false);
               }
          };

          fetchData();
     }, []);

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

     return (
          <div className="mt-12 bg-white text-black rounded-xl shadow-2xl overflow-hidden">
               <h2 className="text-2xl font-bold text-blue-800 text-center mt-4 mb-2">หนังสือทั้งหมด</h2>
               <table className="w-full text-center border-collapse mb-4">
                    <thead className="bg-blue-300 text-gray-900">
                         <tr>
                              <th className="py-3 border">ID</th>
                              <th className="py-3 border">ชื่อหนังสือ</th>
                              <th className="py-3 border">ชื่อผู้แต่ง</th>
                              <th className="py-3 border">ISBN</th>
                              <th className="py-3 border">year</th>
                              <th className="py-3 border">ราคา</th>
                              <th className="py-3 border">Edit</th>
                         </tr>
                    </thead>
                    <tbody>
                         {allBook.map((u) => (
                              <tr key={u.id}>
                                   <td>{u.id}</td>
                                   <td>{u.title}</td>
                                   <td>{u.author}</td>
                                   <td>{u.isbn}</td>
                                   <td>{u.year}</td>
                                   <td>{u.price}</td>
                                   <td>
                                        <NavLink
                                             to="/edit" >
                                             Edit
                                        </NavLink>
                                        " "
                                        <NavLink
                                             to="/edit"
                                        >
                                             Delete
                                        </NavLink>
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>

          </div>
     );
};

export default TableAllbooks;