import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import { Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem('UserID');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://cheapgames-i2xd74yl7a-uc.a.run.app/api/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, token]);


  if (loading) {
    return <div className='message'>Carregando...</div>;
  }

  if (error) {
    return <div className='message'>Erro: {error.message}</div>;
  }

  return (
    <div>
        
        <div className='container-profile'>
            <div className='nome-perfil'>
                <Avatar sx={{ bgcolor: deepPurple[500] }} className='avatar-profile'/>
                <h1>Nome: {user.Username}</h1>
                </div>
            <p className='email'>Email: {user.Email}</p>
            <p className='pontuacao'>Pontuação total: {user.Credit}</p>
        
        </div>
    </div>
  );
};

export default Perfil;
