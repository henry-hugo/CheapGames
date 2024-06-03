import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Logo from '../../images/joystick.svg';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import Badge from '@mui/material/Badge';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const pages = [
  { nome: 'Ofertas', url: '/cadastroOferta' },
  { nome: 'Postagens', url: '/' },
  { nome: 'Ranks', url: '/Ranks'}
];

const settings = [
    { nome: 'Cadastrar', url: '/cadastroUser' },
    { nome: 'Login', url: '/login' }
];
const settingsLogin = [
    { nome: 'Perfil', url: '/perfil' },
    { nome: 'Logout', url: '/logout' }
]

function ResponsiveAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const token = sessionStorage.getItem('token');
    const isMenuOpen = Boolean(anchorEl);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };    

    return (
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters >
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/> */}
            <img src={Logo} style={{height: 40 + 'px', alignSelf: 'start', paddingTop: 7 +'px',marginRight: 5+'px'}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                
                }}
            >
                CheapGames
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page.nome} onClick={() =>{
                      window.location.href = page.url;
                    }}>
                      <Typography textAlign="center">{page.nome}</Typography>
                    </MenuItem>
                ))}
                    
                </Menu>
            </Box>
            
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page.nome}
                    onClick={() =>{
                      window.location.href = page.url;}}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.nome}
                </Button>
                ))}
                
            </Box>
            {/* <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search> */}
            {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
                </IconButton>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
            </Box> */}
            <Box sx={{ flexGrow: 0, marginLeft: 10 + 'px'}}>
                <Fab size="small" color="success" aria-label="add" sx={{marginRight: 10 + 'px'}} onClick={() => {window.location.href = '/cadastroOferta';}}>
                    <AddIcon />
                </Fab>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                    <Avatar sx={{ bgcolor: '#f5f5f5'[500] }}></Avatar>
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {token? (settingsLogin.map((setting) => (
                    <MenuItem key={setting.nome} onClick={() => {
                      window.location.href = setting.url;
                    }}>
                    <Typography textAlign="center">{setting.nome}</Typography>
                    </MenuItem>
                ))): (settings.map((setting) => (
                    <MenuItem key={setting.nome} onClick={() => {
                      window.location.href = setting.url;
                    }}>
                    <Typography textAlign="center">{setting.nome}</Typography>
                    </MenuItem>
                )))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        
    );
}
export default ResponsiveAppBar;