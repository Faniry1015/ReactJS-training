function toFahrenheit(celsius) {
    return (celsius * 5/9) +32 
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9
}

function tryConvert(temperature, convertFunc) {
    const value = parseFloat(temperature)
    if (Number.isNaN(value)) {
        return ""
    }

    return Math.round(convertFunc(value * 100) / 100).toString()
}

const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
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
        const scaleName = scaleNames[this.props.scale]
        const name = "scale-"+ scaleName
        const {temperature} = this.props
        return <div className="form-group">
            <label className="form-text" htmlFor={name}>Température en degré {scaleName} :</label>
            <input className="form-control" type="text" id={name} value={temperature} onChange={this.handleChange} />
        </div>
    }
}

function BoilingVerdict({ celsius }) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau est bouillante</div>
    }
    return <div className="alert alert-info">L'eau ne boue pas</div>

}

class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            scale: "c",
            temperature: 10 
        }
        this.handleCelciusChange = this.handleCelciusChange.bind(this)
        this.handleFahreneitChange = this.handleFahreneitChange.bind(this)
    }

    handleCelciusChange(temperature) {
        this.setState({
            scale: "c",
            temperature
        })
    }

    handleFahreneitChange(temperature) {
        this.setState({
            scale: "f",
            temperature
        })
    }

    render() {
        const { temperature, scale } = this.state
        const celsius = scale === "c" ? temperature : tryConvert(temperature, toCelsius) 
        const fahrenheit = scale === "f" ? temperature : tryConvert(temperature, toFahrenheit)
        return <div className="container mt-4">
            <TemperatureInput scale="c" temperature={celsius}  onTemperatureChange={this.handleCelciusChange} />
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahreneitChange} />
            <hr />
            <BoilingVerdict celsius={celsius} />
            {JSON.stringify(this.state)}
        </div>
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Calculator />)