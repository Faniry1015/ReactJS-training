
function init(initialValue) {
   return {count: initialValue}
}

function reducer(state, action) {
   switch (action.type) {
      case "increment" :
         return {count: state.count + 1}
      case "decrement" :
         if (state.count <= 0) {
            return state
         }
         return {count: state.count - 1}
      default :
         throw new Error("Erreur reducer")
   }
}

function Incrementer() {
   const [count, dispatch] = React.useReducer(reducer, 0, init)

   return (
      <div>
         Chiffre à changer <h1>{count.count}</h1>
         <button onClick={() => dispatch({type: "decrement"})}>Décrementer</button>
         <button onClick={() => dispatch({type: "increment"})}>Incrémenter</button>
      </div>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Incrementer />);
