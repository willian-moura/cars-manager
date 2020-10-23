import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
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
    }, [])

    function handleSave(){

        const data = {
            placa,
            marca,
            modelo,
            ano,
            cor
        }

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
    }

    return(

        <div>
            <Link className="button" to={`/`}>
                Voltar
            </Link>  
            <form>
                <input 
                    type="text"
                    placeholder="Placa"
                    value={placa}
                    onChange={e => setPlaca(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Marca"
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Ano"
                    value={ano}
                    onChange={e => setAno(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Cor"
                    value={cor}
                    onChange={e => setCor(e.target.value)}
                />

                <button onClick={handleSave} className="button" type="button">
                    Salvar
                </button>

            </form>
        </div>

    )
}