import './App.css';
import { Titulo } from './Components/styles/Textos';
import { Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './Components/navbar/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import VerticalTabs from './Components/navbar/Tabs';
import CadastroUser from './Components/cadastro/cadastroUser';
import Login from './Components/cadastro/login';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <ResponsiveAppBar/>
    <div className="App-header">
    <Routes>
        <Route path='/' element={<VerticalTabs/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastroUser' element={<CadastroUser/>}/>        
    </Routes> 
    </div>
    </ThemeProvider>
  );
}

export default App;
