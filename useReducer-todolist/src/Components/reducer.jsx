export function reducer(state, action) {
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