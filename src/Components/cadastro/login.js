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

function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [value, setValue] = React.useState(dayjs('2010-05-17'));

    const [formData, setFormData] = useState({        
        email: '',
        senha: '',
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await fetch('sua-url-da-api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
          }
    
          // Limpar o formulário após o envio bem-sucedido
          setFormData({           
            email: '',
            senha: ''
          });
    
          alert('Usuário cadastrado com sucesso!');
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
        }
    };

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
                    name='email'
                    onChange={handleChange}
                    variant="filled"
                />
            
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Digite sua senha</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name='senha'
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

    </div>
    );
};

export default Login;