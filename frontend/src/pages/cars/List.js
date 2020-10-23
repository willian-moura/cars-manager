import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function List(){

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
        api.delete(`cars/${id}`).then((res) =>{
            alert('Registro excluído com sucesso')
            loadCars()
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

        <div>
            <header>
                Cars Manager
            </header>
            <h1>Cars</h1>
            <Link className="button" to={`/cars/new`}>
                Novo
            </Link> 
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Placa</td>
                        <td>Marca</td>
                        <td>Modelo</td>
                        <td>Ano</td>
                        <td>Cor</td>
                        <td>Ação</td>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (                        
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.placa}</td>
                            <td>{car.marca}</td>
                            <td>{car.modelo}</td>
                            <td>{car.ano}</td>
                            <td>{car.cor}</td>
                            <td>
                                <Link className="button" to={`/cars/${car.id}`}>
                                    Editar
                                </Link>/
                                <Link className="button" onClick={() => handleDelete(car.id)} to="">
                                    Excluir
                                </Link> 
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr></tr>
                </tfoot>
            </table>
        </div>

    )
}