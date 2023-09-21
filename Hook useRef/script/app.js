function Form() {
   const nom = React.useRef(null);
   const prenom = React.useRef(null);
   const increment = React.useRef({ count: 0 });

   //Utilisation pratique
   const handleClick = function (e) {
      e.preventDefault();
      const data = {nom : nom.current.value, prénom: prenom.current.value}
      console.log(data)

   };

   // Peut aussi faire
   const handleClick2 = function (e) {
      e.preventDefault();
      increment.current.count++
      console.log(increment.current)
   };

   return (
      <form>
         <div className="form form-group">
            <label htmlFor="nom">Nom :</label>
            <input type="text" name="nom" ref={nom}></input>
         </div>
         <div className="form form-group">
            <label htmlFor="prenom">Prénom :</label>
            <input type="text" name="prenom" ref={prenom}></input>
         </div>
         <button onClick={handleClick}>Récupérer le texte saisie</button>
         <hr />
         <button onClick={handleClick2}>Incrémenter</button>
      </form>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Form />);
