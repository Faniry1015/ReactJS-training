// Envoi informations vers parent en utilisant function
// const Field = React.forwardRef(function (props, ref) {

//   return <input className="form-control" type="text" ref={ref} />
// })

//Envoi informations vers parent en utilisant class sur l'enfant
class FieldToForward extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="">{this.props.label}</label>
        <input
          className="form-control"
          type="text"
          ref={this.props.forwardRef}
        />
      </div>
    );
  }
}

const Field = React.forwardRef((props, ref) => (
  <FieldToForward forwardRef={ref} {...props} />
));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.input = React.createRef();
  }

  handleClick() {
    console.log(this.input.current.value);
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="form-group">
          <Field ref={this.input} label="Mon label" />
          <button className="btn btn-primary" onClick={this.handleClick}>
            Envoyer
          </button>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Home />);
