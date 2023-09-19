
function Field({ value, onChange, name,children }) {
    return <React.Fragment>
        <label className="form form-label" htmlFor="nom">{children}</label>
        <input type="text" className="form form-control" name={name} id={name} value={value} onChange={onChange} />
    </React.Fragment>
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: "jean",
            prenom : "ROBERT"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const stateKey = e.target.name
        this.setState({ [stateKey]: e.target.value })
    }

    render() {
        return <form type="onSubmit" className="container">
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prenom</Field>
            {JSON.stringify(this.state)}
        </form>
    }
}


const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Home />)