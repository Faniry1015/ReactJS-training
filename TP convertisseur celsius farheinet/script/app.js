const scale = {
    c: "Celsius",
    f: "Fahrenheit"
}

function tryConvert(temperature, convert) {
    const value = parseFloat(temperature)
    if (Number.isNaN(value)) {
        return ""
    }
    return Math.round(convert((value *100) / 100))
}

function BoilingVerdict({ celsius }) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau est bouillante</div>
    }
    return <div className="alert alert-info">L'eau ne boue PAS</div>
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9
}

function toFahrenheit(celsius) {
    return (celsius * 9/5) + 32
}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const {temperature} = this.props
        const scaleName = scale[this.props.scale]
        const name = "scale-" + scaleName
        return <div className="form-group">
            <label className="form-text" htmlFor={name}>Température en degré {scaleName} : </label>
            <input className="form-control" type="text" id={name} value={temperature} onChange={this.handleChange} />
        </div>
    }
}

class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            scale: "c",
            temperature: "" }
        this.handleChange = this.handleChange.bind(this)
        this.handleCelsiusChange =  this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange =  this.handleFahrenheitChange.bind(this)
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value })
    }

    handleCelsiusChange(temperature) {
        this.setState({
            scale: "c",
            temperature})
    }

    handleFahrenheitChange(temperature) {
        this.setState({
            scale: "f",
            temperature})
    }

    render() {
        const { temperature, scale } = this.state
        const celsius = scale === "c" ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === "f" ? temperature : tryConvert(temperature, toFahrenheit)
        return <div className="container mt-4">
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
            <hr />
            <BoilingVerdict celsius={celsius} />
            {JSON.stringify(this.state)}
        </div>
    }

}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Calculator />)