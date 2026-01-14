import { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('my_task_list');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('my_task_list', JSON.stringify(todos));
  }, [todos]);

  const showSuccess = (msg) => alert(`${msg}`);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setTask('');
    showSuccess("task added successfully");
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;

    if (window.confirm("do you want save change to his task??")) {
      const updatedTodos = todos.map(todo => 
        todo.id === id ? { ...todo, text: editText } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
      setEditText('');
      showSuccess("task updated successfully");
    }
  };

  const toggleComplete = (todo) => {
    const status = todo.completed ? "incomplete" : "completed";
    if (window.confirm(`mark this task as ${status}?`)) {
      setTodos(todos.map(t => 
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      ));
      showSuccess(`task marked as ${status}!`);
    }
  };

  const deleteTodo = (id) => {
    if (window.confirm("are you sure you want to deleted this task??")) {
      setTodos(todos.filter(todo => todo.id !== id));
      showSuccess("task delete successfull");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4">
      <div className="max-w-md mx-auto bg-[#1e293b] rounded-2xl  overflow-hidden border border-slate-700">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h2 className="text-2xl font-extrabold text-white text-center tracking-tight">
             Todo App task add
          </h2>
          <p className="text-center text-large mt-1">manage your daily works</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={addTask} className="flex gap-6 mb-10">
            <input 
              type="text"
              className="flex-8 p-3 text-white"
              placeholder="What Is Your task?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-green-900 text-white px-6 py-5"
            >
              Add
            </button>
          </form>

          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-400 mt-2">Your task is empty</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className="flex items-center justify-between p-4 bg-white"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input 
                      type="checkbox" 
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                    />
                    
                    {editingId === todo.id ? (
                      <input 
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                      />
                    ) : (
                      <span className={`text-md font-bold ${todo.completed ? 'line-through text-gray-800' : 'text-slate-800'}`}>
                        {todo.text}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {editingId === todo.id ? (
                      <button 
                        onClick={() => saveEdit(todo.id)} 
                        className="p-1"
                      >
                        save
                      </button>
                    ) : (
                      <button 
                        onClick={() => startEdit(todo)} 
                        className="p-1"
                      >
                        Edit
                      </button>
                    )}
                    <button 
                      onClick={() => deleteTodo(todo.id)} 
                      className="p-1"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-8 pt-4 text-center">
              <p className="text-xs text-slate-200 uppercase tracking-widest font-bold">
                Total tasks. {todos.length} / Complete, {todos.filter(t => t.completed).length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;