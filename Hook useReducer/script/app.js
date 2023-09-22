function init(initialValue) {
   return {count: initialValue}
}

function reducer(state, action) {
   switch(action.type) {
      case "increment" : 
         return {count: state.count + 1}
      case "decrement" : 
         if (state <= 0) {
            return state
         }
         return {count: state.count - 1}
      case "reinit" : 
         return init(0)
      default : 
      throw new Error("L'action" + action.type + "contient une erreur")
   } 
}


function Incrementer() {
   const [count, dispatch] = React.useReducer(reducer, 0, init)

   return <div>
   {JSON.stringify(count)}
      <h1>Chiffre à modifier : {count.count}</h1>
      <button onClick={() => dispatch({type: "decrement"})}>Décrementer</button>
      <button onClick={() => dispatch({type: "increment"})}>Incrémenter</button>
      <button onClick={() => dispatch({type: "reinit"})}>Réinitialiser</button>
   </div>
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Incrementer />);
