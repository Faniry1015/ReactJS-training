const MyFormContext = React.createContext({ })

function FormContext({ children, defaultValue, onSubmit }) {
   const { name, firstname } = React.useContext(MyFormContext)
   return <form onSubmit={onSubmit}>{children}</form>
}

function FormField({ name, children }) {
   // const {name} = React.useContext(MyContext)
   return <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">{children}</label>
      <input name={name} type="text" className="form-control"></input>
   </div>
}

function PrimaryButton({ children }) {
   return <button className="btn btn-primary">{children}</button>
}

function App() {

   const handleSubmit = React.useCallback(function (value) {
      console.log(value)
   }, [])

   return <div className="container">
      <MyContext.Provider value={ }>
         <FormContext defaultValue={{ name: "Doe", firstname: "John" }} onSubmit={handleSubmit}>
            <FormField name="name">Nom</FormField>
            <FormField name="firstname">Prénom</FormField>
            <PrimaryButton>Envoyer</PrimaryButton>
         </FormContext>
      </MyContext.Provider>

   </div>

}
console.log(MyContext)

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
