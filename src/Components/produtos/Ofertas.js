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


export default function CardOfertas({post}) {
  
    return (
      <Card sx={{ maxWidth: 345 }} style={{marginRight: 20 + 'px'}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
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
          image="https://image.api.playstation.com/vulcan/ap/rnd/202311/1309/746f848d0be7107e301df1142745b334b64fbc87c218e3b1.jpg"
          alt="Paella dish"
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
          <IconButton aria-label="like">
            <ThumbUpOffAltIcon/>
          </IconButton>
          <IconButton aria-label="deslike">
            <ThumbDownOffAltIcon/>
          </IconButton>
        </CardActions>
        </Card>
        
    )

    
}