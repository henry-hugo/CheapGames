import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Texto, Titulo } from '../styles/Textos';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Link from '@mui/material/Link';
import { useState, useEffect } from "react"

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function CadastroOferta() {
  // UserID' => 'required|integer',
  // 'Title' => 'required|string|max:255',
  // 'Description' => 'required|string',
  // 'Active' => 'required|boolean',
  // 'Date' => 'required|date',
  // 'CategoryID' => 'required|integer',
  // 'PlatformID' => 'required|integer',
  // 'NewPrice' => 'required|numeric',
  // 'OldPrice' => 'required|numeric',
  // 'Link' => 'nullable|url',

    const url = 'http://127.0.0.1:8000/api';
    
    const[plataformas, setPlataformas] = useState([]);
    const[categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
      Title: '',
      NewPrice: 0,
      OldPrice: 0,
      Description: '',
      CategoryID: 0,
      PlatformID: 0,
      Date: '',
      Link: '',
      Active: true,
      UserID: 0
    });

    const token = sessionStorage.getItem('token');
    
  
    const navigate = useNavigate();

    //Checagem do login
    useEffect(() => {
      if (!token) {
          navigate('/login');
      }
    }, [token, navigate]);
    
    //Busca das options
    useEffect(() => {
      const fetchCategorias = async () => {
        try {
          const response = await fetch(`${url}/categoria`);
          
          const data = await response.json();
          const categoriasArray = Object.values(data.category);
         
          if (data.ok) {
            throw new Error('Erro ao buscar os dados');
          }
         
          setCategorias(categoriasArray);

        } catch (error) {
          console.error('erro ao retornar os dados');
          
        }
      };
      const fetchPlataformas = async () => {
        try {
          const response = await fetch(`${url}/plataforma`);
          
          const data = await response.json();
         
          if (data.ok) {
            throw new Error('Erro ao buscar os dados');
          }
         
          setPlataformas(data.platform);
          
        } catch (error) {
          console.error('erro ao retornar os dados');
          
        }
      };
  
      fetchCategorias();
      fetchPlataformas();
    }, []);

    // const [formData, setFormData] = useState({
    //     Title: '',
    //     NewPrice: 0,
    //     OldPrice: 0,
    //     Description: '',
    //     CategoryID: 0,
    //     PlatformID: 0,
    //     Date: dayjs(),
    //     Link: '',
    //     Active: true,
    //     UserID: 0
    //   });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        let formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
       
        try {
          const response = await fetch(`${url}/post`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: formDataToSend
          });
    
          if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
          }
    
          // Limpar o formulário após o envio bem-sucedido
          setFormData({
            nome: '',
            precoAtual: 0,
            precoAntigo: 0,
            descricao: '',
            categoria: '',
            plataforma: '',
            link: '',
          });
    
          alert('Oferta postada com sucesso, obrigado por ajudar nossa comunidade!');
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
        }
    };

    return(
      <>
        {token?(
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Titulo color='white' size='32px' >Poste uma oferta!</Titulo>
                <Box component="form"
                  sx={{
                      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}>  
                  <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}>     
                  
                    <div>
                      <TextField
                      label="Jogo"
                      id="filled-start-adornment"
                      variant="filled"
                      name='Title'
                      onChange={handleChange}
                      />

                      <TextField
                      label="Link"
                      id="filled-start-adornment"
                      variant="filled"
                      name='Link'
                      onChange={handleChange}
                      />
                    </div>

                    <div>
                      <FormControl variant="filled" sx={{ m: 1, width: '25ch' }}>
                        <InputLabel htmlFor="filled-adornment-amount">Preço antigo</InputLabel>
                        <FilledInput
                          id="filled-adornment-amount"
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          type='number'
                          name='OldPrice'
                          onChange={handleChange}
                        />
                      </FormControl>

                      <FormControl  variant="filled" sx={{ m: 1, width: '25ch' }}>
                      <InputLabel htmlFor="filled-adornment-amount">Preço em promoção</InputLabel>
                      <FilledInput
                        id="filled-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        type='number'
                        name='NewPrice'
                        onChange={handleChange}
                      />
                    </FormControl>

                    </div>
                    
                    <div>
                      <TextField
                      id="filled-select-currency"
                      select
                      label="Categoria"
                      helperText=""
                      variant="filled"
                      >
                      {categorias.map((option) => (
                        <MenuItem key={option.CategoriaID} value={option.CategoriaID} onChange={handleChange} name='CategoryID'>
                          {option.Name}
                        </MenuItem>
                      ))}
                      </TextField>
                      <TextField
                      id="filled-select-currency"
                      select
                      label="Plataforma"
                      helperText=""
                      variant="filled"
                      >
                      {plataformas.map((option) => (
                        <MenuItem key={option.PlataformaID} value={option.PlataformaID} onChange={handleChange} name='PlatformID'>
                          {option.Name}
                        </MenuItem>
                      ))}
                      </TextField>
                    </div>
                  </Box>
                  <TextField
                    id="filled-multiline"
                    label="Descrição"
                    multiline
                    rows={4}        
                    sx={{ m: 1, width: '51ch'}}
                    placeholder='Descreva aqui como os gamers podem aproveitar sua oferta!'
                    variant="filled"
                    name='Description'
                    onChange={handleChange}
                  />            
                </Box>

                <div style={{ display: 'flex',justifyContent: 'space-around', alignItems: 'center', marginTop: 10 + 'px' }}> 

                  <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ marginRight: 10 + 'px'}}
                  >
                    Capa do jogo
                    <VisuallyHiddenInput 
                          type="file"
                          name='ImageURL'
                          onChange={handleChange}/>
                  </Button>       
                  
                  <Button variant="contained" endIcon={<SendIcon />} color='success' type="submit">
                      Postar
                  </Button>

                </div>

          </div>) : (<div>Entre no login: </div>)}
        </>  
    );
};

export default CadastroOferta;