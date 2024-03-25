import './App.css';
import { Titulo } from './Components/styles/Textos';
import { Menu, Container } from './Components/styles/Containers';
import MenuBar from './Components/navbar/Menu';
import Pesquisa from './Components/pesquisa/Pesquisa';
import CardOfertas from './Components/maisBuscados/Ofertas';
import ResponsiveAppBar from './Components/navbar/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CardOfertas2 from './Components/maisBuscados/CardPlaceHolder';
import VerticalTabs from './Components/navbar/Tabs';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
     <ResponsiveAppBar/>
     
    <header className="App-header"> 
        <VerticalTabs/>
    </header>      
    </div>
    </ThemeProvider>
  );
}

export default App;
