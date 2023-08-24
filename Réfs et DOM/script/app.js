const Field = React.forwardRef(function (props, ref) {

  return <input className="form-control" type="text" ref={ref} />
}) 

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.input = React.createRef()
  }

  handleClick() {
    console.log(this.input.current.value)
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="form-group">
          <Field ref={this.input} />
          <button className="btn btn-primary" onClick={this.handleClick}>Envoyer</button>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Home />);

