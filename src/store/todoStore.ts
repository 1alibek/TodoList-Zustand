import { create } from 'zustand';
import { Todo } from '../types/todo';

// localStorage dan ma'lumotlarni o'qish uchun yordamchi funksiya
const getInitialState = (): Pick<TodoState, 'todos' | 'searchQuery'> => {
  const savedTodos = localStorage.getItem('todos');
  const savedSearchQuery = localStorage.getItem('searchQuery');
  return {
    todos: savedTodos ? JSON.parse(savedTodos) : [],
    searchQuery: savedSearchQuery || '',
  };
};

interface TodoState {
  todos: Todo[];
  searchQuery: string;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useTodoStore = create<TodoState>((set) => {
  // Dastlabki holatni localStorage dan olish
  const initialState = getInitialState();

  return {
    todos: initialState.todos,
    searchQuery: initialState.searchQuery,

    addTodo: (title) =>
      set((state) => {
        const maxId = state.todos.length > 0 ? Math.max(...state.todos.map(todo => parseInt(todo.id))) : 0;
        const newId = (maxId + 1).toString(); // Yangi ID ni ketma-ket raqam sifatida yaratamiz
        const newTodos = [
          ...state.todos,
          { id: newId, title, completed: false },
        ];
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return { todos: newTodos };
      }),

    deleteTodo: (id) =>
      set((state) => {
        const newTodos = state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return { todos: newTodos };
      }),

    toggleTodo: (id) =>
      set((state) => {
        const newTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return { todos: newTodos };
      }),

    editTodo: (id, newTitle) =>
      set((state) => {
        const newTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle.trim() } : todo
        );
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return { todos: newTodos };
      }),

    setSearchQuery: (query) =>
      set(() => {
        localStorage.setItem('searchQuery', query);
        return { searchQuery: query };
      }),
  };
});