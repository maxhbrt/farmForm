import React from 'react';
import Edit from "./Components/Edit/Edit";
import Register from './Components/Register/Register';
import RestaurantForm from './Components/Order/RestaurantForm';
import { Switch, Route} from "react-router-dom";

export default(
    <Switch>
        <Route component={RestaurantForm} path = "/orderform"/>
        <Route component={Edit} path = "/edit"/>
        <Route component={Register} exact path = "/" />
    </Switch>
)