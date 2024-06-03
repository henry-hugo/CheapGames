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

function CadastroUser() {
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [value, setValue] = useState(dayjs(''));
  
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
        Credit:0,
        Date: dayjs(value.toString()).format('YYYY-MM-DD'),
        CPF: ''
      });
      const [date, setDate] = useState('');
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        // setFormData({ ...formData, [name]: value });
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
      const handleDateChange = (newDate) => {
        // console.log(newDate)
        setValue(newDate);
        const aaa = value.toString();
        const bbb = dayjs(aaa).format('YYYY-MM-DD');
        setFormData((prevFormData) => ({
            ...prevFormData,
            Date: dayjs(value.toString()).format('YYYY-MM-DD'),
        }));
        // console.log(formData.Date, ' data')
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        // console.log(bbb);
        
        // console.log(formData.Date)
        try {
          // const response = await fetch('http://127.0.0.1:8000/api/usuario');
          // const response = await fetch('https://cheapgames-i2xd74yl7a-uc.a.run.app/api/usuario');
          const response = await fetch('https://cheapgames-i2xd74yl7a-uc.a.run.app/api/usuario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          
          if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
          }
          console.log(JSON.stringify(formData))
          setValue(dayjs(''));
          // Limpar o formulário após o envio bem-sucedido
          setFormData({
            Username: '',
            Email: '',
            Password: '',
            Credit:0,
            Date: dayjs(value.toString()).format('YYYY-MM-DD'),
            CPF: ''
          });
          navigate('/login');
          
        } catch (error) {
          console.error('Erro:', error);
          
        }
        
    };

    return(
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onSubmit={handleSubmit}>
           <Titulo color='white' size='32px' >Cadastre-se</Titulo>
            <Box component="form"
            sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}
            noValidate
            autoComplete="off"
            >
                
              <TextField
              label="Nome"
              id="filled-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              variant="filled"
              name='Username'
              value={formData.Username}
              onChange={handleChange}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                  label="Data de nascimento"
                  variant="filled"
                  format="DD-MM-YYYY"
                  name='Date'
                  value={formData.Date}
                  onChange={handleChange}
                  sx={{ m: 1, width: '25ch' }}
                  
                  />
              </LocalizationProvider> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        label="Data de nascimento"
                        variant="filled"
                        format="DD-MM-YYYY"
                        value={value}
                        onChange={handleDateChange} // Usa a função específica para alterar a data
                        sx={{ m: 1, width: '25ch' }}
                        name='Date'
                    />
              </LocalizationProvider>
        
              <TextField
                  label="CPF"
                  id="filled-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  variant="filled"
                  name='CPF'
                  value={formData.CPF}
                  onChange={handleChange}
                  />
              <TextField
                  label="Email"
                  id="filled-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  name='Email'
                  value={formData.Email}
                  onChange={handleChange}
                  variant="filled"
              /> 
        
              <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Digite sua senha</InputLabel>
                  <FilledInput
                      id="filled-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      name='Password'
                      value={formData.Password}
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
              {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Confirme sua senha</InputLabel>
                  <FilledInput
                      id="filled-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      name='PasswordConfirm'
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
              </FormControl> */}
          
            </Box>
            <Button variant="contained" endIcon={<SendIcon />} color='success' style={{marginTop: 10 + 'px'}} type="submit">
                Cadastrar
            </Button>

            <Texto color='white'> Já tem cadastro? <Link
                component="button"
                to="/"
                variant="body2"
                onClick={() => {
                    window.location.href = '/login';
                }}
                >
                Entre aqui! 
                </Link>
                
            </Texto>

    </form>
    );
};

export default CadastroUser;