import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Titulo } from '../styles/Textos';
import { yellow } from '@mui/material/colors';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Ranks() {
  const [posts, setPosts] = useState([]);
  const [userNames, setUserNames] = useState({});
  const token = sessionStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://cheapgames-i2xd74yl7a-uc.a.run.app/api/post/');
        const data = await response.json();
       
        if (data.status !== 200) {
          throw new Error('Erro ao buscar os dados');
        }
        setPosts(data.posts);
        
      } catch (error) {
        console.error('erro ao retornar os dados');
        
      }
    };

    fetchPosts();
    
  }, []);
  

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};      
      try {
        const response = await fetch(`https://cheapgames-i2xd74yl7a-uc.a.run.app/api/usuario`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          userData.users.forEach(user => {
            names[user.UserID] = user.Username;
            console.log(user.Username)
          });
          setUserNames(names);
          setLoading(false);
        } else if(response.status === 500){
          sessionStorage.clear();
          navigate('/login');
          throw new Error('Erro de autorização', response.status);
        }else{
          console.error('Erro ao buscar nomes de usuários. Status:', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar nomes de usuários:', error);
        setError(error);
        setLoading(false);
      }
      
      
    };

    fetchUserNames();
    
  }, [token]);

  
  const userStats = posts.reduce((acc, item) => {
    const userID = item.UserID;
    if (!acc[userID]) {
      acc[userID] = { count: 0, likes: 0, dislikes: 0 };
    }
    acc[userID].count++;
    acc[userID].likes += item.likes;
    acc[userID].dislikes += item.dislikes;
    return acc;
  }, {});
  
  // console.log(userStats);
  // Converte o objeto de contagens em um array de pares [UserID, count]
  const userIDStatsArray = Object.entries(userStats);

  // Ordena o array em ordem decrescente com base nas contagens
  userIDStatsArray.sort((a, b) => (b[1].likes - b[1].dislikes) - (a[1].likes - a[1].dislikes));
  
  if (loading) {
    return <div className='message'>Carregando...</div>;
  }

  if (error) {
    return <div className='message'>Erro: {error.message}</div>;
  }

  return (
    <div>
        <Titulo color='white' style={{display: 'flex', justifyContent: 'center', marginTop: 30 + 'px'}}><EmojiEventsTwoToneIcon fontSize="large" sx={{ color: yellow[400], marginRight: 10 + 'px' }}/>  Rank dos melhores contribuintes <EmojiEventsTwoToneIcon fontSize="large" sx={{ color: yellow[400],  marginLeft: 10 + 'px'}} /></Titulo>
        <TableContainer sx={{maxWidth: 800, margin: 0 + ' auto'}} component={Paper}>
        
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Usuário</StyledTableCell>
                <StyledTableCell align="right">Rank</StyledTableCell>
                <StyledTableCell align="right">Posts</StyledTableCell>
                <StyledTableCell align="right">Likes</StyledTableCell>
                <StyledTableCell align="right">Dislikes</StyledTableCell>                
            </TableRow>
            </TableHead>
            <TableBody>
            {userIDStatsArray.map(([userID, stats], index) => (
                <StyledTableRow key={userID}>
                <StyledTableCell component="th" scope="row">
                  {userNames[userID] || `UserID ${userID}`}
                </StyledTableCell>
                <StyledTableCell align="right">#{index + 1}</StyledTableCell>
                <StyledTableCell align="right">{stats.count}</StyledTableCell>
                <StyledTableCell align="right">{stats.likes}</StyledTableCell>
                <StyledTableCell align="right">{stats.dislikes}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}