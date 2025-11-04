import './App.css'
import {useState} from "react";
import {ThemeContext, Themes} from "app/themeContext";
import {PortalShowcase} from "pages/portal-showcase/index";


function App() {
    const [theme, setTheme] = useState<Themes>('light');

    return (
        <ThemeContext value={theme}>
            <PortalShowcase setTheme={setTheme}/>
        </ThemeContext>
    )
}

export default App
