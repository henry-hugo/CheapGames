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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Vanna', '#1', 30, 44, 2),
  createData('Gustavo', '#2', 25, 42, 3),
  createData('Rodrigo', '#3', 15, 36, 5),
  createData('Hugo', '#4', 12, 25, 4),
  createData('Quintas', '#5', 10, 21, 3),
];

export default function Ranks() {
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
            {rows.map((row) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}