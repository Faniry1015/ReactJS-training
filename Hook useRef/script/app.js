function Form() {
    const data = React.useRef(null)
    const increment = React.useRef({count: 0})

    const handleClick = function(e) {
        e.preventDefault()
        console.log(data.current)
        console.log(data.current.value) 
    }

    const handleClick2 = function(e) {
        e.preventDefault()
        console.log(increment.current)
        increment.current.count++
        console.log(increment.current.count)
    }

    return <form>
        <input type="text" name="mon-text" ref={data}></input>
        <button onClick={handleClick}>Récupérer le texte saisie</button>
        <hr/>
        <button onClick={handleClick2}>Incrémenter</button>
    </form>
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Form />)