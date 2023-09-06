//Première utilisation
function wait(duration) {
    const date = Date.now()
    while(Date.now() - date < duration) {

    }
}

function encode(number) {
    wait(1000)
    return Math.exp(number) 
}

function NameCode() {
    const [name, setName] = React.useState("John")
    const [number, setNumber] = React.useState(0)

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
        } else {
            setNumber(n => n = e.target.value)
        }
    }

    //Sans le useMemo, tout est rerendue donc attend 1s à chaque changement (MEME si on ne change que le nom)
      const encoded = React.useMemo(function() {
        return encode(number) //Une fonction qui met du temps à s'exécuter (1s)
      }, [number]) // ne fait appel à la fonction que si number change


    return <div className="container form-group">
        <input type="text" name="name" id="name" placeholder="Votre nom et prénom" className="form-control" value={name} onChange={handleChange}/>
        <input type="text" name="number" id="number" placeholder="Le chiffre à encoder" className="form-control" value={number} onChange={handleChange}/>
        <h2>{name}</h2>
        <h2>Encoder</h2>
        <div>{encoded}</div>
        <hr />
    </div>
}


//Deuxième utilisation

const Button = React.memo(function ({onClick}) {
    console.log("render")
    return <button onClick={onClick}>Ma bouton</button>
})

function BtnCont() {
    const [count, setCount] = React.useState(0)

    const handleClick = React.useCallback(
        function () {
            alert("Bonjour " + count)
    }, [count]) 

    /* Equivalent au useCallback : const handleClick = React.useMemo(function () {
        return (function () {
            alert("Bonjour")
        })
    }, []) vide si n'est appellé qu'une fois */

    //

    return <div>
        <Button onClick={handleClick}/> 
        <button onClick={function() {setCount(c => c + 1)}}>Incrementer</button>
    </div>
    //Button est rerendu à chaque fois sans le useMemo car handleClick est réapeller
}

function App() {
    return <div>
        <NameCode />
        <BtnCont />
    </div>
}



const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<App />)