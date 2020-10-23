import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import MUIDataTable from "mui-datatables";

export default function List(){

    const history = useHistory();

    const columns = [
        {
            name: "id",
            label: "Id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "placa",
            label: "Placa",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "marca",
            label: "Marca",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "modelo",
            label: "Modelo",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "ano",
            label: "Ano",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "cor",
            label: "Cor",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "",
            label: "",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = tableMeta.rowData[0]
                    return (
                        <>
                            <IconButton aria-label="edit" onClick={() => history.push(`/cars/${id}`)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )
                }
            },
        },
    ]

    const options = {
        filterType: 'checkbox',
        selectableRowsHideCheckboxes: true,
        print: false,
        download: false,
        selectableRows: 'none',
    };

    const [cars, setCars] = useState([])

    useEffect(() => {
        api.get('cars').then(res => {
            setCars(res.data);
        }) 
    }, [])

    function loadCars(){
        api.get('cars').then(res => {
            setCars(res.data);
            console.log(cars)
        })
    }

    function handleDelete(id){  
        
        if( !window.confirm("Deseja realmente excluir o registro?") ){
            return
        }

        api.delete(`cars/${id}`).then((res) =>{
            loadCars()
            alert('Registro excluído com sucesso')
        }).catch((err) => {
            if (err.response) {
                alert(err.response.data.error)
                console.log(err.response)
            } else if (err.request) {
                alert("Erro ao excluir registro")
                console.log(err.request)
            } else {
                alert("Erro ao excluir registro")
                console.log(err)
            }
        })
    }

    return(

        <Paper variant="outlined">

            <Container maxWidth="lg">
                <Typography variant="h3" component="h3" gutterBottom>
                    Cars Manager
                </Typography>
                <Box component="div" m={1} ml={0}>                    
                    <Button variant="contained" color="primary" className="button" onClick={() => history.push(`/cars/0`)}>
                        Novo Cadastro
                    </Button>
                </Box>
                <MUIDataTable
                    title={"Lista de Carros"}
                    data={cars}
                    columns={columns}
                    options={options}
                />
            </Container>

        </Paper>

    )
}