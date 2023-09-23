const theme = {
   dark: {
      backgroundColor: "black",
      color: "white",
   },
   light: {
      backgroundColor: "white",
      color: "black",
   },
};

const ThemeContext = React.createContext(theme.dark);

/*
Syntaxe de base
function BtnThem({ children }) {
   return (
      <ThemeContext.Consumer>
         {(value) => {
            return <button style={value}>{children}</button>;
         }}
      </ThemeContext.Consumer>
   );
}*/

// Meilleure synthaxe
function BtnThem({children}) {
   const value = React.useContext(ThemeContext)
   return <button style={value}>{children}</button>
}

class BtnThemClass extends React.Component {

   render() {
      const {children} = this.props
      return <ThemeContext.Consumer >
         {value => {
            return <button style={value}>{children}</button>
         }}
      </ThemeContext.Consumer>
   }
}

function SearchBar() {
   return (
      <div>
         <input type="text" />
         <BtnThem>Rechercher</BtnThem>
      </div>
   );
}

function Form() {
   return (
      <form>
         <ThemeContext.Provider value={theme.light}>
            <SearchBar />
            <BtnThemClass>Envoyer</BtnThemClass>
         </ThemeContext.Provider>
      </form>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Form />);
