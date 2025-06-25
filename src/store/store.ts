import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TaskStatus = "Todo" | "In-Progress" | "Test" | "Completed";

export interface Todo {
  id: string;
  name: string;
  priority: "P0" | "P1" | "P2";
  storyPoints: number;
  assignee: string;
  status: TaskStatus;
}

export interface DeletedTodo extends Todo {
  deletedAt: number;
}

interface TodoState {
  todos: Todo[];
  deletedTodos: DeletedTodo[];

  filterTaskName: string;
  filterAssignee: string;

  setFilterTaskName: (taskName: string) => void;
  setFilterAssignee: (assignee: string) => void;

  filteredTodos: () => Todo[];

  addTask: (task: Todo) => void;
  deleteTask: (id: string) => void;
  addDeletedTask: (task: Todo) => void;
  updateTask: (updatedTask: Todo) => void;

  darkMode:boolean;
  toggleDarkMode:()=>void;
}

const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        deletedTodos: [],

        filterTaskName: "",
        filterAssignee: "",

        setFilterTaskName: (taskName: string) =>
          set({ filterTaskName: taskName }),
        setFilterAssignee: (assignee: string) =>
          set({ filterAssignee: assignee }),

        filteredTodos: () => {
          const { todos, filterTaskName, filterAssignee } = get();
          return todos.filter((task) => {
            const matchesName = filterTaskName
              ? task.name.toLowerCase().includes(filterTaskName.toLowerCase())
              : true;
            const matchesAssignee = filterAssignee
              ? task.assignee
                  .toLowerCase()
                  .includes(filterAssignee.toLowerCase())
              : true;
            return matchesName && matchesAssignee;
          });
        },

        addTask: (task) =>
          set((state) => ({
            todos: [...state.todos, task],
          })),

        deleteTask: (id: string) =>
          set((state) => {
            const taskToDelete = state.todos.find((t) => t.id === id);
            if (!taskToDelete) return state;

            const deletedTask: DeletedTodo = {
              ...taskToDelete,
              deletedAt: Date.now(),
            };

            return {
              todos: state.todos.filter((t) => t.id !== id),
              deletedTodos: [...state.deletedTodos, deletedTask],
            };
          }),

        addDeletedTask: (task) =>
          set((state) => {
            const deletedTask: DeletedTodo = {
              ...task,
              deletedAt: Date.now(),
            };
            return {
              deletedTodos: [...state.deletedTodos, deletedTask],
            };
          }),

        updateTask: (updatedTask: Todo) =>
          set((state) => ({
            todos: state.todos.map((t) =>
              t.id === updatedTask.id ? updatedTask : t
            ),
          })),
          darkMode: false,
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      }),
      {
        name: "todo-storage",
      }
    )
  )
);

export default useTodoStore;
