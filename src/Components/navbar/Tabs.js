import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardOfertas from '../produtos/Ofertas';
import CardOfertas2 from '../produtos/CardPlaceHolder';
import { Container } from '../styles/Containers';
import { useState, useEffect } from 'react';
import '../styles/main.css';
function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/post/');
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

  

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className='tab-panel'
      >
        <Tab label="Destaques" {...a11yProps(0)}  className='tabs'/>
        <Tab label="Recentes" {...a11yProps(1)}  className='tabs'/>
        <Tab label="Menor preço" {...a11yProps(2)}  className='tabs'/>
        
      </Tabs>
      
      <TabPanel value={value} index={0} style={{display: 'flex'}}>
        <Container className='container'>
          {posts.map(post => (
            <CardOfertas key={post.PostID} post={post} />
          ))}
            
        </Container>          
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container className='container'>
          {posts.map(post => (
              <CardOfertas key={post.PostID} post={post} />// esse aqui fica um em baixo do outro 
            ))}
          </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container className='container'>
            {posts.map(post => (
            <CardOfertas key={post.PostID} post={post} />
          ))}
        </Container>
            
          
      </TabPanel>
    </Box>
  );
}
