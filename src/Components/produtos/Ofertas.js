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


export default function CardOfertas() {
  
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
          title="Dragon's Dogma"
          subheader="25 de março, 2024"
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
                <PrecoAnterior color='white'>R$ 339</PrecoAnterior>
                <Texto size='20px' color= 'Green'>R$ 250</Texto>
            </Container>            
            Dragon's Dogma 2 Plataforma: Steam
            <Texto color='#00A8FF'>Link: http://ww.placeholder.com</Texto>
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