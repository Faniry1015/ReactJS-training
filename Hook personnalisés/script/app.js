function useIncrement(initial = 0, step = 1) {
   const [count, setCount] = React.useState(initial);
   const increment = function () {
      setCount((c) => c + step);
   };

   return [count, increment];
}

function Compteur() {
   const [count, increment] = useIncrement(10);

   return <button onClick={increment}>Incrémenter : {count}</button>;
}

function useToggle(initialValue = true) {
   const [value, setValue] = React.useState(initialValue);

   const toggle = function () {
      setValue(v => !v);
   };

   return [value, toggle];
}

function App() {
   const [compteurVisible, toggleCompteur] = useToggle(true);

   return (
      <div>
         Afficher le compteur
         <input
            type="checkbox"
            onChange={toggleCompteur}
            checked={compteurVisible}
         />
         <br />
         {compteurVisible && <Compteur />}
         
      </div>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
