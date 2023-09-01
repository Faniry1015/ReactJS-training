function useIncrementer(initial, step) {
    const [count, setCount] = React.useState(initial)
    const increment = function() {
        setCount(c => c + step)
    }

    return [count, increment]
}

function Home () {
    const [count, increment] = useIncrementer(0, 1)

    React.useEffect(() => {
        const timer = window.setInterval(() => {
            increment()
        }, 1000)

        return function () {
            clearInterval(timer) // Equivalent de componentWillUnmount (si non le timer s'éxécute même si le composant est démonté (erreur))
        }
    }, [])  //si [] (vide) : équivalent à componentDidMount (c'est à dire ne s'éxécute qu'une fois (ex : parfait pour les setIntervals) mais si on met count dedans, change à chaque fois que count change

    React.useEffect(() =>  {
        document.title = "titre du document + " + count
    }, [count]) // change le titre du doucment à chaque fois que count change

    return <div>
        <button>cliquer pour incrémeter : {count}</button>
    </div>

}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Home />)