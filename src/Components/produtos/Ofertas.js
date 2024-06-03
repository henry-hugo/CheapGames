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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

//Quebrado quando tem mais de uma informação ele também tira o menu lateral
export default function CardOfertas({post}) {
    let firstImage = post.images[Object.keys(post.images)[0]];
    let imageURL = typeof(firstImage) === 'object'? firstImage.ImageURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png'
    const userID = sessionStorage.getItem('UserID');
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [loadingLike, setLoadingLike] = useState(true);
    const [error, setError] = useState(null);

    const [like, setLike] = useState({
      PostID: '',
      Liked: null,
      UserID: userID,
      Date: dayjs().format('YYYY-MM-DD')
    });

    const [groupedByPostID, setGroupedByPostID] = useState({});
    const [userLikeStatus, setUserLikeStatus] = useState(null);

    const getLike = async () => {
      setLoadingLike(true);
      setError(null);
      try {
        const response = await fetch('https://cheapgames-i2xd74yl7a-uc.a.run.app/api/reacao', {
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
          throw new Error('Erro ao pesquisar os likes');
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
        
        setLoading(false);
        setLoadingLike(false);
      } catch (error) {
        console.error('Erro ao buscar os like:', error);
        setError(error);
        setLoading(false);
        setLoadingLike(false);
      }
    };

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
          const response = await fetch('https://cheapgames-i2xd74yl7a-uc.a.run.app/api/reacao', {
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
          
        }
        navigate('/',{ replace: true });
      };
  
      
      enviarLikeParaAPI();
      getLike();
    }, [like, token]); // Este efeito será acionado sempre que o estado "like" ou "token" forem alterados
    
    useEffect(() => {
      
      getLike();
    }, [token, post.PostID, userID]);

    const countLikesOrDislikes = (postID,value) => {
      if (!groupedByPostID[postID]) {
        return 0;
      }
      return groupedByPostID[postID].filter(rating => rating.Liked === value).length;
    };

    if (loading) {
      return <div className='message'>Carregando...</div>;
    }
  
    if (error && token) {
      return <div className='message'>Erro: {error.message}</div>;
    }

    return (
      <Card sx={{ maxWidth: 345 }} style={{marginRight: 20 + 'px'}} className='card'>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              
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
                <Texto size='20px' color= '#59eb82'>R$ {post.NewPrice}</Texto>
            </Container>            
            <Typography className='title'>{post.Title}</Typography> 
            <Typography>Plataforma: {post.platform?.Name || 'N/A'}</Typography>
            <Texto color='#00A8FF' className='link'><a href={post.Link} target="_blank">{post.Link}</a></Texto>
          </Typography>
        </CardContent>
        {(token && !loadingLike)? 
        <CardActions disableSpacing className='container-likes'>
          <IconButton aria-label="like" value={post.PostID} onClick={() => setLikePost(post.PostID)}>
          {userLikeStatus === 1 ? <ThumbUpIcon color= 'inherit'/>: <ThumbUpOffAltIcon color= 'inherit' />}
            
          </IconButton>
          
          <Typography variant="body2" color="text.secondary">
           {countLikesOrDislikes(post.PostID, 1)}
          </Typography>
          <IconButton aria-label="deslike" value={post.PostID} onClick={() => setDislikePost(post.PostID)}>
          {userLikeStatus === 0 ? <ThumbDownAltIcon color= 'inherit'/>: <ThumbDownOffAltIcon color= 'inherit' />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {countLikesOrDislikes(post.PostID, 0)}
          </Typography>
        </CardActions> : (!token && !loadingLike) ? 
        <CardActions disableSpacing className='container-likes'>
          <IconButton aria-label="like" value={post.PostID} onClick={() => navigate('/login')}>
          <ThumbUpOffAltIcon color= 'inherit' />
            
          </IconButton>
          
          <Typography variant="body2" color="text.secondary">
           {post.likes}
          </Typography>
          <IconButton aria-label="deslike" value={post.PostID} onClick={() => navigate('/login')}>
           <ThumbDownOffAltIcon color= 'inherit' />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.dislikes}
          </Typography>
        </CardActions> : <div className='message-like'>Carregando...</div>}
        </Card>
        
    )

    
}