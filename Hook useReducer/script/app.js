function reducer(state, action) {
   switch(action.type) {
      case "increment" : 
         return state + 1
      case "decrement" : 
         if (state <= 0) {
            return state = 0
         }
         return state - 1
      default : 
      throw new Error("L'action" + action.type + "contient une erreur")
   } 
}


function Incrementer() {
   const [count, dispatch] = React.useReducer(reducer, 0)

   return <div>
      <h1>Chiffre à modifier : {count}</h1>
      <button onClick={() => dispatch({type: "decrement"})}>Décrementer</button>
      <button onClick={() => dispatch({type: "increment"})}>Incrémenter</button>
   </div>
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Incrementer />);
