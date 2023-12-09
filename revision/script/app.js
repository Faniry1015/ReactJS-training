const FormContext = React.createContext({})

function Form({ defaultValue, onSubmit, children }) {

    return <FormContext.Provider value={defaultValue}>
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </FormContext.Provider>
}

function FormField({ name, children }) {
    const data = React.useContext(FormContext)

    return <React.Fragment>
        <label htmlFor={name}>{children}</label>
        <input type="text" name={name} id={name} defaultValue={data[name]}/>
    </React.Fragment>
}

function PrimaryButton({ children }) {
    return <button type="submit">{children}</button>
}

function App() {

    const handleSubmit = React.useCallback(
        (value) => {
            value.preventDefault()
            console.log(value.target)
        },
        [],
    )

    return <Form defaultValue={{ name: 'Doe', firstname: 'John' }} onSubmit={handleSubmit} >
        <FormField name='name'>Nom</FormField>
        <FormField name='firstname'>Prénom</FormField>
        <PrimaryButton>Envoyer</PrimaryButton>
    </Form>
}

ReactDOM.createRoot(document.querySelector('#app')).render(<App />)