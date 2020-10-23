import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function EditCar({ match }){

    const history = useHistory();

    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');

    function handleSave(){

        const data = {
            placa,
            marca,
            modelo,
            ano,
            cor
        }

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

    return(

        <div>
            <Link className="button" to={`/`}>
                Voltar
            </Link>  
            <form>
                <input 
                    placeholder="Placa"
                    value={placa}
                    onChange={e => setPlaca(e.target.value)}
                />
                <input 
                    placeholder="Marca"
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                />
                <input 
                    placeholder="Modelo"
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}
                />
                <input 
                    placeholder="Ano"
                    value={ano}
                    onChange={e => setAno(e.target.value)}
                />
                <input 
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