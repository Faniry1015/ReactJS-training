const THEMES = {
   dark: {
      backgroundColor: "black",
      color: "white",
   },
   light: {
      backgroundColor: "white",
      color: "black",
   },
};

// Si on envoie la fonction toggle également en plus du CSS du thème
const ThemeContext = React.createContext({
   theme: THEMES.black,
   ToggleTheme: () => {},
});

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
function BtnThem({ children }) {
   const { theme } = React.useContext(ThemeContext);
   return <button style={theme}>{children}</button>;
}

/*class BtnThemClass extends React.Component {

   render() {
      const {children} = this.props
      return <ThemeContext.Consumer >
         {value => {
            return <button style={value}>{children}</button>s
         }}
      </ThemeContext.Consumer>
   }
}*/

//Synthaxe plus simple
class BtnThemClass extends React.Component {
   render() {
      const { children } = this.props;
      const { theme } = this.context;
      return <button style={theme}>{children}</button>;
   }
}
BtnThemClass.contextType = ThemeContext;

function SearchBar() {
   return (
      <div>
         <input type="text" />
         <BtnThem>Rechercher</BtnThem>
      </div>
   );
}

function ToolBar() {
   return (
      <div>
         <SearchBar />
         <BtnThemClass>Envoyer</BtnThemClass>
      </div>
   );
}

function ThemeSwitcher() {
   const { toggleTheme } = React.useContext(ThemeContext);
   return <button onClick={toggleTheme}>Alterner thème</button>;
}

function Form() {
   const [theme, setTheme] = React.useState("dark");

   const toggleTheme = React.useCallback(function (e) {
      e.preventDefault();
      setTheme((t) => (t === "light" ? "dark" : "light"));
   }, []);
   const value = React.useMemo(
      function () {
         return {
            theme: theme === "light" ? THEMES.light : THEMES.dark,
            toggleTheme,
         };
      },
      [theme, toggleTheme]
   );

   return (
      <form>
         <ThemeContext.Provider value={value}>
            <ToolBar />
            <ThemeSwitcher />
         </ThemeContext.Provider>
      </form>
   );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Form />);
