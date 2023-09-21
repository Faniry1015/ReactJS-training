function Form() {


    return <form>
        <input type="text" name="mon-text" ref={""}></input>
        <button>Récupérer le texte saisie</button>
    </form>
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Form />)