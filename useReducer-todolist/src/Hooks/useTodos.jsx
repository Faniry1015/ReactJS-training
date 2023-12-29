import { useReducer } from "react"

function todosReducer(state, action) {
    switch (action.type) {
      case 'REMOVE':
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) }
      case 'TOGGLE_COMPLETED':
        return {
          ...state, todos: state.todos.map(todo => {
            if (todo.id === action.payload.id) {
              return { ...todo, completed: !todo.completed }
            } else {
              return todo
            }
          })
        }
      case 'ADD':
        return { ...state, todos: [...state.todos, action.payload] }
      case 'UPDATE':
        return {
          ...state, todos: state.todos.map(todo => {
            if (todo.id === action.payload.id) {
              return action.payload
            } else {
              return todo
            }
          })
        }
      case 'TOGGLE_SHOW_COMPLETED':
        return {...state, showCompleted : !state.showCompleted}
    }
  }

export function useTodos() {

  const [state, dispatch] = useReducer(todosReducer, {
    showCompleted: true,
    todos: [
      {
        id: 0,
        task: 'Tâche 1',
        completed: false
      }
    ]
  })

  const visibleTodos =  state.showCompleted ? state.todos : state.todos.filter(todo => !todo.completed)

  return {
    visibleTodos: visibleTodos,
    showCompleted: state.showCompleted,
    addTodo: (todo) => dispatch({ type: 'ADD', payload: todo}),
    removeTodo: (todo) => dispatch({type: 'REMOVE', payload: todo}),
    toggleCompleted: (todo) => dispatch({type: 'TOGGLE_COMPLETED', payload: todo}),
    UpdateTodo: (todo) => dispatch({type: 'UPDATE', payload: todo}), 
    toggleShowCompleted:() => dispatch({type: 'TOGGLE_SHOW_COMPLETED'})
  }
}