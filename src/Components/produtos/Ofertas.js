import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PrecoAnterior, Texto } from '../styles/Textos';
import { Container } from '../styles/Containers';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Share } from '@mui/icons-material';
import { useState } from 'react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

//Quebrado quando tem mais de uma informação ele também tira o menu lateral
export default function CardOfertas({post}) {
    let firstImage = post.images[Object.keys(post.images)[0]];
    let imageURL = typeof(firstImage) === 'object'? firstImage.ImageURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png'
    const userID = sessionStorage.getItem('UserID');
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const [like, setLike] = useState({
      PostID: '',
      Liked: null,
      UserID: userID,
      Date: dayjs().format('YYYY-MM-DD')
    });

    const [groupedByPostID, setGroupedByPostID] = useState({});
    const [userLikeStatus, setUserLikeStatus] = useState(null);

    const setLikePost = (postID) => {
      setLike(prevState => ({
        ...prevState, // Mantém os valores existentes do estado
        PostID: postID,
        Liked: (prevState.Liked === 0 || prevState.Liked === null) ? 1 :  null 
      }));
    }
    const setDislikePost = (postID) => {
      setLike(prevState => ({
        ...prevState, // Mantém os valores existentes do estado
        PostID: postID,
        Liked: (prevState.Liked === 1 || prevState.Liked === null) ? 0 :  null
      }));
    }
    useEffect(() => {
      const enviarLikeParaAPI = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/reacao', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(like)
          });
          if(response.status === 500){
            sessionStorage.clear();
            navigate('/login');
            throw new Error('Erro de autorização', response.status);
          }
          if (!response.ok) {
            throw new Error('Erro ao dar like no post');
          }
  
          console.log('Like enviado para a API:', JSON.stringify(like));
        } catch (error) {
          console.error('Erro ao dar like:', error);
          alert('Erro ao dar like. Por favor, tente novamente.');
        }
      };
  
      if (like.PostID) {
        enviarLikeParaAPI();
      }
    }, [like, token]); // Este efeito será acionado sempre que o estado "like" ou "token" forem alterados
  
    useEffect(() => {
      const getLike = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/reacao', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if(response.status === 500){
            sessionStorage.clear();
            navigate('/login');
            throw new Error('Erro de autorização', response.status);
          }
          if (!response.ok) {
            throw new Error('Erro ao dar like no post');
          }
  
          const grouped= data.reduce((acc, rating) => {
            if (!acc[rating.PostID]) {
                acc[rating.PostID] = [];
            }
            acc[rating.PostID].push(rating);
            return acc;
          }, {});

          setGroupedByPostID(grouped);

          const userReaction = grouped[post.PostID]?.find(rating => rating.UserID === parseInt(userID));
          if (userReaction) {
            setUserLikeStatus(userReaction.Liked);
          } else {
            setUserLikeStatus(null);
          }
          
        
        } catch (error) {
          console.error('Erro ao dar like:', error);
        }
      };
      getLike();
    }, [token, post.PostID, userID]);

    const countLikesOrDislikes = (postID,value) => {
      if (!groupedByPostID[postID]) {
        return 0;
      }
      return groupedByPostID[postID].filter(rating => rating.Liked === value).length;
    };
    return (
      <Card sx={{ maxWidth: 345 }} style={{marginRight: 20 + 'px'}} className='card'>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              ?
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <Share />
            </IconButton>
          }
          title={post.Title}
          subheader={post.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt={'Capa do jogo '+ post.Title}
          className='postImage'
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Container>
                <PrecoAnterior color='white'>R$ {post.OldPrice}</PrecoAnterior>
                <Texto size='20px' color= 'Green'>R$ {post.NewPrice}</Texto>
            </Container>            
            {post.Title} Plataforma: {post.platform?.Name || 'N/A'}
            <Texto color='#00A8FF'>Link: {post.Link}</Texto>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="like" value={post.PostID} onClick={() => setLikePost(post.PostID)}>
            <ThumbUpOffAltIcon color={userLikeStatus === 1 ? 'primary': 'inherit'}/>
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Likes: {countLikesOrDislikes(post.PostID, 1)}
          </Typography>
          <IconButton aria-label="deslike" value={post.PostID} onClick={() => setDislikePost(post.PostID)}>
            <ThumbDownOffAltIcon color={userLikeStatus === 0 ? 'primary': 'inherit'}/>
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Dislikes: {countLikesOrDislikes(post.PostID, 0)}
          </Typography>
        </CardActions>
        </Card>
        
    )

    
}