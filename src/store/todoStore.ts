import { create } from 'zustand';
import { Todo } from '../types/todo';

interface TodoState {
  todos: Todo[];
  searchQuery: string;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  searchQuery: '',

  addTodo: (title) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: crypto.randomUUID(), title, completed: false },
      ],
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  editTodo: (id, newTitle) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      ),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));