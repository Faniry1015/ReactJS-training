
function Field({ value, onChange, name, children }) {
    return <div className="form form-group mb-2">
        <label className="form form-label" htmlFor={name}>{children}</label>
        <input type="text" className="form form-control" name={name} id={name} value={value} onChange={onChange} />
    </div>
}

function Textarea({ value, onChange, name, children }) {
    return <div className="form form-group mb-2">
        <label className="form form-label" htmlFor={name}>{children}</label>
        <textarea className="form form-control" name={name} id={name} value={value} onChange={onChange} />
    </div>
}

function Checkbox({ value, onChange, name, children }) {
    return <div className="form form-group">
        <input type="checkbox" className="form form-checkbox" name={name} id={name} checked={value} onChange={onChange} />
        <label className="form form-label" htmlFor={name}>{children}</label>
    </div>
}

const NewsSubjects = [
    {
        id: 1,
        body: "Film"
    },
    {
        id: 2,
        body: "Manga"
    },
    {
        id: 3,
        body: "Novelas"
    },
    {
        id: 4,
        body: "Série"
    },
]

function SelectMulti({ value, onChange, name, subjects, children }) {
    return <React.Fragment>
        <label className="form form-label" htmlFor={name}>{children}</label>
        <select multiple className="form form-select" name={name} id={name} value={value} onChange={onChange} >
            {subjects.map(item => <option key={item.id} value={item.body}>{item.body}</option>)}
        </select>
    </React.Fragment>
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: "",
            prenom: "",
            mail: "exemple@gmail.com",
            body: "",
            checked: false,
            selectM: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
    }

    handleChange(e) {
        const stateKey = e.target.name
        if (e.target.multiple) {
            this.setState({ selectM: Array.from(e.target.selectedOptions).map(options => options.value) })
        } else {
            const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
            this.setState({ [stateKey]: value })
        }

    }

    render() {
        return <form onSubmit={this.handleSubmit} className="container">
            <h1 className="form form-title">Faniry form</h1>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prenom</Field>
            <Field name="mail" value={this.state.mail} onChange={this.handleChange}>mail</Field>
            <Textarea name="body" value={this.state.message} onChange={this.handleChange}>Votre message</Textarea>
            <hr />
            <Checkbox name="checked" checked={this.state.checked} onChange={this.handleChange}>Cochez pour s'abonner à la Newsletter</Checkbox>
            <br></br>
            {this.state.checked ? <SelectMulti name="selectM" subjects={NewsSubjects} value={this.state.selectM} onChange={this.handleChange} >Informations qui vous intéresses :</SelectMulti> : null}
            <button type="submit" className="btn btn-primary">Envoyer</button>
            <hr />
            <strong>Vérification du changement d'état:</strong>
            {JSON.stringify(this.state)}
        </form>
    }
}


const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Home />)