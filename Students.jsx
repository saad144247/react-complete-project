import { useState, useEffect } from 'react';

const Students = () => {
    
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('student_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("Error parsing localStorage:", e);
        return [];
      }
    }
    return [];
  });

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    course: '',
    email: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('student_data', JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rollNo.trim()) {
      return alert("Please fill name and roll number");
    }

    if (editingId) {
      setStudents(students.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
      setEditingId(null);
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    
    setFormData({ name: '', rollNo: '', course: '', email: '' });
  };

  const editStudent = (student) => {
    setEditingId(student.id);
    setFormData({ ...student });
  };

  const deleteStudent = (id) => {
    if (window.confirm("are you sure you want to delete this student??")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNo.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Student management system</h2>
      </div>

      <div className="">
        <div className="bg-white p-6">
          <h3 className="text-xl font-bold mb-4 ">
            {editingId ? 'Edit student details' : 'register New student'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              name="rollNo"
              placeholder="Roll number"
              value={formData.rollNo}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              name="course"
              placeholder="Course name"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full p-2 border"
            />
            <input
              name="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border"
            />
            <button className={`w-full py-2 font-bold text-white ${editingId ? 'bg-green-500' : 'bg-blue-600'}`}>
              {editingId ? 'Update record' : 'Add student'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {setEditingId(null); setFormData({name:'', rollNo:'', course:'', email:''})}}
                className="w-full text-gray-500 text-sm underline mt-2"
              >
                Cancel editing
              </button>
            )}
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Search by name or roll number"
              className="w-full p-3  border"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">Roll no</th>
                  <th className="p-4">name</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? filteredStudents.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-4">{s.rollNo}</td>
                    <td className="p-4">{s.name}</td>
                    <td className="p-4">{s.course || '— —'}</td>
                    <td className="p-4 flex justify-center gap-4">
                      <button 
                        onClick={() => editStudent(s)} 
                        className="text-green-600"
                      >
                        edit
                      </button>
                      <button 
                        onClick={() => deleteStudent(s.id)} 
                        className="text-red-600"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center">
                      No matching student records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;