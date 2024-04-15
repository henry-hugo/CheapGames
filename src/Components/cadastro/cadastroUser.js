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

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

function CadastroUser() {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [value, setValue] = React.useState(dayjs('2010-05-17'));

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
           <Titulo color='white' size='32px' >Cadastre-se</Titulo>
            <Box component="form"
                sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}
                noValidate
                autoComplete="off">     
            
                
                    <TextField
                    label="Nome"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    variant="filled"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                        label="Data de nascimento"
                        onChange={(newValue) => setValue(newValue)}
                        variant="filled"
                        format="DD-MM-YYYY"
                        sx={{ m: 1, width: '25ch' }}
                        />
                    </LocalizationProvider>
              
                    <TextField
                        label="CPF"
                        id="filled-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        variant="filled"
                        />
                    <TextField
                        label="Email"
                        id="filled-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        variant="filled"
                    />
               
                   
              
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Digite sua senha</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Confirme sua senha</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
            <Button variant="contained" endIcon={<SendIcon />} color='success' style={{marginTop: 10 + 'px'}}>
                Cadastrar
            </Button>

            <Texto color='white'> Já tem cadastro? <Link
                component="button"
                variant="body2"
                onClick={() => {
                    console.info("I'm a button.");
                }}
                >
                Entre aqui! 
                </Link>
                
            </Texto>

    </div>
    );
};

export default CadastroUser;