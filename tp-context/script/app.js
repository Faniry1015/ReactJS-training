const FormContext = React.createContext({})

function FormWithContext({ children, defaultValue, onSubmit }) {
   const [data, setData] = React.useState(defaultValue)
   const change = React.useCallback(function(name,value) {
         setData(d => ({...d, [name]: value}))
   }) 
   const value = React.useMemo(function () {
      return {...data, change}
   }, [data, change])

   const handleSubmit = React.useCallback(function(e) {
      e.preventDefault()
      onSubmit(value)
   }, [onSubmit, value])

   return <FormContext.Provider value={value}>
      <form onSubmit={handleSubmit}>
         {children}
      </form>
      {JSON.stringify(value)}
   </FormContext.Provider>

}

function FormField({ name, children }) {
   const data = React.useContext(FormContext)
   const handleChange = React.useCallback(function(e) {
      data.change(e.target.name, e.target.value)
   }, [data.change])
   return <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">{children}</label>
      <input name={name} type="text" className="form-control" value={data[name] || ""} onChange={handleChange}></input>
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
      <FormWithContext defaultValue={{ name: "Doe", firstname: "John" }} onSubmit={handleSubmit}>
         <FormField name="name">Nom</FormField>
         <FormField name="firstname">Prénom</FormField>
         <PrimaryButton>Envoyer</PrimaryButton>
      </FormWithContext>

   </div>

}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
