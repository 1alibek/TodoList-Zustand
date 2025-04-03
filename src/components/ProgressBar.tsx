import React from 'react';
import { useTodoStore } from '../store/todoStore';

const ProgressBar: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progress = totalTodos ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>
        Progress: {completedTodos} / {totalTodos} completed
      </div>
      <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: '#4CAF50',
            height: '20px',
            borderRadius: '10px',
            transition: 'width 0.3s ease-in-out',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;