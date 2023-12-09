const THEMES = {
    dark: {
        background: '#000',
        color: '#fff'
    },
    light: {
        background: '#fff',
        color: '#000'
    }
}

const ThemeContext = React.createContext({
    theme: THEMES,
    toggleTheme: () => {}
})

function App() {
    const [theme, setTheme] = React.useState('dark')

    const toggleTheme = React.useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }, [theme]) 

    const currentTheme = theme === 'dark' ? THEMES.dark : THEMES.light

    return <div>
        <ThemeContext.Provider value={currentTheme}>
            <input type="text" name="nom" id="nom" />
            <ThemedButton>Rechercher</ThemedButton> <br />
            <ThemedButton type="submit">Submit</ThemedButton>
            <button onClick={toggleTheme}>Changer theme</button>
        </ThemeContext.Provider>
    </div>
}


function ThemedButton({ children }) {
    const value = React.useContext(ThemeContext)
    return <button style={value}>{children}</button>
}


ReactDOM.createRoot(document.querySelector('#app')).render(<App />)