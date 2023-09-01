function useIncrement(initial = 0, step = 1) {
   const [count, setCount] = React.useState(initial);
   const increment = function () {
      setCount((c) => c + step);
   };

   return [count, increment];
}

function useAutoIncrement(initial = 0, step = 1) {
   const [count1, increment] = useIncrement(initial, step);

   React.useEffect(() => {
      const timer = window.setInterval(() => increment(), 1000);
      return () => window.clearInterval(timer);
   }, []);

   return count1;
}

function Compteur() {
   const [count, increment] = useIncrement(0, 1);
   const count1 = useAutoIncrement(10);

   return (
      <div>
         <button onClick={increment}>Incrémenter : {count}</button>;
         <div>Auto incrémenteur : {count1}</div>
      </div>
   );
}

function useToggle(initialValue = true) {
   const [value, setValue] = React.useState(initialValue);

   const toggle = function () {
      setValue((v) => !v);
   };

   return [value, toggle];
}

function TodoList() {   
    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(function () {
        (async function() {
            const response = await fetch("http://jsonplaceholder.typicode.com/todos?_limit=20")
            const responseData = await response.json()
            if (response.ok) {
                setTodos(responseData)
            } else {
                alert(JSON.stringify(responseData))
            }
            setLoading(false)
        })() //Ne pas oublier ()
    }, [])

    if (loading) {
        return "Chargement..."
    }

   return (
      <ul>
         {todos.map(t => <li key={todos.indexOf(t)}>{t.title}</li>)} 
      </ul>
   );
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
         <TodoList />
      </div>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
