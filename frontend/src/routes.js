import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ListarCarros from './pages/cars/List'
import Form from './pages/cars/Form'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ListarCarros} />
                <Route path="/cars/:id" component={Form} />
            </Switch>
        </BrowserRouter>
    );
};
