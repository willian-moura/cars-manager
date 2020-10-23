import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import ListarCarros from './pages/cars/List'
import CadastrarCarro from './pages/cars/New'
import EditarCarro from './pages/cars/Edit'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ListarCarros} />
                <Route path="/cars/new" component={CadastrarCarro} />
                <Route path="/cars/:id" component={EditarCarro} />
            </Switch>
        </BrowserRouter>
    );
};
