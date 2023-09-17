const scales = {
  c: "Celsius",
  f: "Fahrenheit",
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) / (5 / 9);
}

function toFahrenheit(celsius) {
  return (celsius * 9/5)  + 32;
}

function BoilingVerdict({ temperature }) {
  if (temperature >= 100) {
    return (
      <div className="alert alert-success">
        Temperature : {temperature}°C ; The water is boiling
      </div>
    );
  } else {
    return (
      <div className="alert alert-info">
        Temperature : {temperature}°C; The water is NOT boiling
      </div>
    );
  }
}

class Thermo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: "",
            scale: "c"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({temperature: e.target.value})
        this.props.onTemperatureChange(e.target.value)
    }

  render() {
    const {temperature, scale} = this.props
    const scaleName = scales[this.props.scale]

    return (
      <div className="form-group">
        <label className="form-label" htmlFor={scaleName}>Température en {scaleName}</label>
        <input
          className="form-control"
          type="text"
          name={scaleName}
          id={scaleName}
          value={temperature}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class ImputConverter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            temperature: "",
            scale: "c"
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleCelsiusChange(e) {
        this.setState({
            temperature: e,
            scale: "c"
        })
    }

    handleFahrenheitChange(e) {
        this.setState({
            temperature: e,
            scale: "f"
        })
    }

    render() {
        const {temperature, scale} = this.state
        const celsius = scale === "c" ? temperature : toCelsius(temperature)
        const fahrenheit = scale === "f" ? temperature : toFahrenheit(temperature)
        return <div className="container">
            <Thermo scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
            <Thermo scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
            <hr />
            <BoilingVerdict temperature={celsius} />
            {JSON.stringify(this.state)}
        </div>
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<ImputConverter />);
