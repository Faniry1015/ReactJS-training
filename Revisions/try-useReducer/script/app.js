function init(initialValue) {
   return {count: initialValue}
}

function reducer(state, action) {
   switch(action.type) {
      case "increment" :
         return {count: state.count + action.step || 1}
      case "decrement" : 
         if (state.count <= 0) {
            return state
         }
         return {count: state.count - 1}
      case "reinit" : 
         return init(0)
      default : 
         throw new Error("Erreur reducer")
   }
}

function Incrementer() {
   const [count, dispatch] = React.useReducer(reducer, 0, init)

   return <div>
      Compteur : <strong>{count.count}</strong>
      <button onClick={()=> dispatch({type: "increment", step: 10})}>Incrémenter + 10</button>
      <button onClick={()=> dispatch({type: "decrement"})}>Décrémenter</button>
      <button onClick={()=> dispatch({type: "reinit"})}>Réinitialiser</button>
   </div>
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Incrementer />);
