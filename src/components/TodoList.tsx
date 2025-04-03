import React from 'react';
import { useTodoStore } from '../store/todoStore';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const searchQuery = useTodoStore((state) => state.searchQuery);

  const filteredTodos = React.useMemo(() => {
    if (!searchQuery) return todos;
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todos, searchQuery]);

  return (
    <div style={{ marginTop: '20px' }}>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;