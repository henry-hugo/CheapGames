import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Texto, Titulo } from '../styles/Textos';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Link from '@mui/material/Link';
import { useState } from "react"

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');
    if(token){
      navigate('/');
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [value, setValue] = useState(dayjs('2010-05-17'));

    

    const [formData, setFormData] = useState({        
        Email: '',
        Password: ''
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await fetch('https://cheapgames-i2xd74yl7a-uc.a.run.app/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
          }
          const data = await response.json();
          // console.log(data);
          sessionStorage.setItem('token', data.token);
          

          
          sessionStorage.setItem('UserID', data.UserID);
          
          // Limpar o formulário após o envio bem-sucedido
          setFormData({           
            Email: '',
            Password: ''
          });
          navigate('/')
          
          
        } catch (error) {
          console.error('Erro:', error);
          
        }
    };

    return(
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onSubmit={handleSubmit}>
           <Titulo color='white' size='32px' >Login</Titulo>
            <Box component="form"
                sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}>    
                    
                <TextField
                    label="Email"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    name='Email'
                    onChange={handleChange}
                    variant="filled"
                />
            
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Digite sua senha</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name='Password'
                        onChange={handleChange}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>                    
                
            </Box>
            <Button variant="contained" endIcon={<SendIcon />} color='success' style={{marginTop: 10 + 'px'}} type="submit">
                Entrar
            </Button>

            <Texto color='white'> Ainda não tem conta? <Link
                component="button"
                to="/"
                variant="body2"
                onClick={() => {
                    window.location.href = '/cadastroUser';
                }}
                >
                Cadastre-se aqui! 
                </Link>
                
            </Texto>

    </form>
    );
};

export default Login;