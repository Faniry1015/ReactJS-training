
function Field({ value, onChange, name,children }) {
    return <React.Fragment>
        <label className="form form-label" htmlFor="nom">{children}</label>
        <input type="text" className="form form-control" name={name} id={name} value={value} onChange={onChange} />
    </React.Fragment>
}

function Textarea({ value, onChange, name,children }) {
    return <React.Fragment>
        <label className="form form-label" htmlFor="nom">{children}</label>
        <textarea  className="form form-control" name={name} id={name} value={value} onChange={onChange} />
    </React.Fragment>
}

function Checkbox({ value, onChange, name,children }) {
    return <React.Fragment>
        <input type="checkbox"  className="form form-input-checkbox" name={name} id={name} checked={value} onChange={onChange} />
        <label className="form form-label" htmlFor="nom">{children}</label>
    </React.Fragment>
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: "jean",
            prenom : "ROBERT",
            mail: "exemple@gmail.com",
            body: "",
            checked: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const stateKey = e.target.name
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        this.setState({ [stateKey]: value })
    }

    render() {
        return <form type="onSubmit" className="container">
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prenom</Field>
            <Field name="mail" value={this.state.mail} onChange={this.handleChange}>mail</Field>
            <Textarea name="body" value={this.state.message} onChange={this.handleChange}>Votre message</Textarea>
            <Checkbox name="checked" checked={this.state.checked} onChange={this.handleChange}>Cochez pour s'abonner à la Newsletter</Checkbox>
            {JSON.stringify(this.state)}
        </form>
    }
}


const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Home />)