import './App.css';
import { Titulo } from './Components/styles/Textos';
import { Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './Components/navbar/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import VerticalTabs from './Components/navbar/Tabs';
import CadastroUser from './Components/cadastro/cadastroUser';
import Login from './Components/cadastro/login';
import CadastroOferta from './Components/cadastro/cadastroOferta';
import Ranks from './Components/produtos/Ranks';
import Logout from './Components/logout/logout';
import './Components/styles/main.css';
import Perfil from './Components/perfil/perfil';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  
});


function App() {
  return (
    <ThemeProvider theme={darkTheme} className='theme-provider'>
    <ResponsiveAppBar/>
      <div className="App-header">
      <Routes>
          <Route path='/' element={<VerticalTabs/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cadastroUser' element={<CadastroUser/>}/>
          <Route path='/cadastroOferta' element={<CadastroOferta/>}/>
          <Route path='/Ranks' element={<Ranks/>}/> 
          <Route path='/logout' element={<Logout/>}/> 
          <Route path='/perfil' element={<Perfil/>}/> 
      </Routes> 
      </div>
    </ThemeProvider>
  );
}

export default App;
