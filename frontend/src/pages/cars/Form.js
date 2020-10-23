import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api'

export default function EditCar({ match }){

    const id = match.params.id;

    const history = useHistory();

    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');

    useEffect(() => {
        if (id != 0){
            api.get(`cars/${id}`).then(res => {
                setPlaca(res.data[0].placa)
                setMarca(res.data[0].marca)
                setModelo(res.data[0].modelo)
                setAno(res.data[0].ano)
                setCor(res.data[0].cor)
            }).catch((err) => {
                if (err.response) {
                    alert(err.response.data.error)
                    console.log(err.response)
                } else if (err.request) {
                    alert("Erro ao recuperar registro")
                    console.log(err.request)
                } else {
                    alert("Erro ao recuperar registro")
                    console.log(err)
                }
            })
        }
    }, [])

    function handleSave(){

        const data = {
            placa,
            marca,
            modelo,
            ano,
            cor
        }

        if(id != 0 ){
            api.put(`cars/${id}`, data).then(() => {
                alert("Registro alterado com sucesso")
                history.push(`/cars/${id}`);
            }).catch((err) => {
                if (err.response) {
                    alert(err.response.data.error)
                    console.log(err.response)
                } else if (err.request) {
                    alert("Erro ao alterar registro")
                    console.log(err.request)
                } else {
                    alert("Erro ao alterar registro")
                    console.log(err)
                }
            })
        } else {
            api.post(`cars`, data).then((res) => {
                alert("Registro salvo com sucesso")
                history.push(`/cars/${res.data.id}`);
            }).catch((err) => {
                if (err.response) {
                    alert(err.response.data.error)
                    console.log(err.response)
                } else if (err.request) {
                    alert("Erro ao salvar registro")
                    console.log(err.request)
                } else {
                    alert("Erro ao salvar registro")
                    console.log(err)
                }
            })
        }
    }

    return(

        <div>

            <Container maxWidth="lg">
                <Typography variant="h4" component="h4" gutterBottom>
                    Cadastro
                </Typography>

                <Box component="div" m={1}>
                    <Grid container direction="row" spacing={3} xs="6">
                            <Grid item xs={6}>
                                <TextField 
                                    type="text"
                                    placeholder="Placa"
                                    value={placa}
                                    onChange={e => setPlaca(e.target.value)}
                                />                                
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    type="text"
                                    placeholder="Marca"
                                    value={marca}
                                    onChange={e => setMarca(e.target.value)}
                                />                                
                            </Grid> 
                            <Grid item xs={6}>
                                <TextField 
                                    type="text"
                                    placeholder="Modelo"
                                    value={modelo}
                                    onChange={e => setModelo(e.target.value)}
                                />
                                
                            </Grid>              
                            <Grid item xs={6}>
                                <TextField 
                                    type="number"
                                    placeholder="Ano"
                                    value={ano}
                                    onChange={e => setAno(e.target.value)}
                                />                
                                
                            </Grid> 
                            <Grid item xs={6}>
                                <TextField 
                                    type="text"
                                    placeholder="Cor"
                                    value={cor}
                                    onChange={e => setCor(e.target.value)}
                                />                                  
                            </Grid>
                    </Grid>
                </Box>

                <Box component="div" m={1}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item>
                            <Button variant="contained" color="primary" className="button" onClick={() => handleSave()}>
                                Salvar
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" className="button" onClick={() => history.push(`/`)}>
                                Voltar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                
            </Container>
            
        </div>

    )
}