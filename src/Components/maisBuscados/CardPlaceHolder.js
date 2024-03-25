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
import { purple, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PrecoAnterior, Texto } from '../styles/Textos';
import { Container } from '../styles/Containers';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Share } from '@mui/icons-material';


export default function CardOfertas2() {
  
    return (
      <Card sx={{ maxWidth: 345 }} style={{marginRight: 20 + 'px'}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
              G
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <Share />
            </IconButton>
          }
          title="Hogwarts Legacy"
          subheader="24 de março, 2024"
        />
        <CardMedia
          component="img"
          height="194"
          image="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000014724/72ce0a17215521a167c3da579db4cc48a2f7a52eacc81ad985ba20fd6817fdc2"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Container>
                <PrecoAnterior color='white'>R$ 339</PrecoAnterior>
                <Texto size='20px' color= 'Green'>R$ 250</Texto>
            </Container>            
            Hogwarts Legacy Plataforma: Playstation 5
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