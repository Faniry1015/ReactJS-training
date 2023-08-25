function useIncrement(initial, step) {
    const [count, setCount] = React.useState(initial)
    const increment = function() {
        setCount(c => c + step)
    }

    return [count, increment]
}

function Compteur () {

    const [count, increment] = useIncrement(5, 4)

    return <div>
    <button onClick={increment}>nombre : {count} </button>
    </div>

}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Compteur />)