import React from 'react';
import { useTodoStore } from './store/todoStore';
import TodoList from './components/TodoList';
import SearchBar from './components/SearchBar';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const [inputValue, setInputValue] = React.useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    } else {
      alert("Please enter a todo title!");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontSize: '24px' }}>Todo List Zustand</h1>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new todo..."
            style={{
              padding: '12px',
              flex: 1,
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#2196F3')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ddd')}
          />
          <button 
            onClick={handleAddTodo} 
            style={{
              padding: '12px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1976D2')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
          >
            Add
          </button>
        </div>
        <SearchBar /> 
      </div>
      <ProgressBar />
      <TodoList />
    </div>
  );
};

export default App;