import React from 'react';
import { useTodoStore } from '../store/todoStore';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const [isEditing, setIsEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(todo.title);

  const handleEdit = () => {
    if (newTitle.trim()) {
      editTodo(todo.id, newTitle);
      setIsEditing(false);
    } else {
      alert("Todo title cannot be empty!");
    }
  };

  return (
    <div className="todo-item" style={{
      margin: '10px 0',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      transition: 'all 0.3s ease',
    }}>
      {isEditing ? (
        <div style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              flex: 1,
              fontSize: '14px',
            }}
          />
          <button 
            onClick={handleEdit} 
            style={{
              padding: '8px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          >
            Save
          </button>
          <button 
            onClick={() => setIsEditing(false)} 
            style={{
              padding: '8px 15px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#da190b')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            style={{ transform: 'scale(1.2)', cursor: 'pointer' }}
          />
          <span style={{
            flex: 1,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#888' : '#333',
            fontSize: '16px',
            padding: '5px 0',
            transition: 'color 0.3s',
          }}>
            {todo.title}
          </span>
          <div>
            <button 
              onClick={() => setIsEditing(true)} 
              style={{
                marginRight: '10px',
                padding: '8px 15px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1976D2')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
            >
              Edit
            </button>
            <button 
              onClick={() => deleteTodo(todo.id)} 
              style={{
                padding: '8px 15px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#da190b')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;