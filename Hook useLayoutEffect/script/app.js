function Incrementer() {
   const [count, setCount] = React.useState(0);
   const button = React.useRef(null);

   const increment = React.useCallback(
      function () {
         setCount((c) => c + 1);
      },
      []
   );

   React.useLayoutEffect(function () {
      if (count % 2) {
         button.current.style.color = "red";
      } else {
         button.current.style.color = "green";
      }
   },[count]);

   return (
      <button onClick={increment} ref={button}>
         Incrémenter {count}
      </button>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Incrementer />);
