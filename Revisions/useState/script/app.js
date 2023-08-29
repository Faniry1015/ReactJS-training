function Incrementer(initial, step) {
   const [count, setCount] = React.useState(initial);
   const increment = (e) => {
      e.preventDefault();
      setCount((c) => c + step);
   };

   return [count, increment];
}

function Counter() {
   const [count, increment] = Incrementer(2, 5);

   return (
      <div className="container mt-2">
         <div className="form-group">
            <button onClick={increment}>Cliquer pour incrementer</button>
            <div>Le compteur indique : {count}</div>
         </div>
      </div>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Counter />);
