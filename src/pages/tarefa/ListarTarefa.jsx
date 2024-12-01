import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Função para criar dados iniciais
function createData(idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Aguardando', 'Recurso 5'),
];

// Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('');
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  // Dados iniciais
  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  // Filtro por status
  const tarefasFiltradas = filtroStatus
    ? tarefas.filter((tarefa) => tarefa.statusTarefa === filtroStatus)
    : tarefas;

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);
    const tarefaParaEditar = tarefas.find((tarefa) => tarefa.idTarefa === id);
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTarefas((current) => current.filter((tarefa) => tarefa.idTarefa !== id));
    }
  };

  const getRowStyle = (status) => {
    switch (status) {
      case 'Aguardando':
        return { backgroundColor: '#FFEBEE' };
      case 'Em Andamento':
        return { backgroundColor: '#FFF9C4' };
      case 'Concluída':
        return { backgroundColor: '#E8F5E9' };
      default:
        return {};
    }
  };

  return (
    <>
      <Card style={{ margin: '20px', padding: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <FormControl style={{ marginBottom: '10px' }}>
            <InputLabel id="filtro-status-label">Filtrar por Status</InputLabel>
            <Select
              labelId="filtro-status-label"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Aguardando">Aguardando</MenuItem>
              <MenuItem value="Em Andamento">Em Andamento</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefasFiltradas.map((row, indice) => (
                  <TableRow key={indice} style={getRowStyle(row.statusTarefa)}>
                    <TableCell>{row.idTarefa}</TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}>
                        <EditIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="large" variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold' }} onClick={handleOpen}>
            Criar Tarefa
          </Button>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>
      <Modal open={openEditar} onClose={handleCloseEditar}>
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>
    </>
  );
};

export default ListarTarefa;
