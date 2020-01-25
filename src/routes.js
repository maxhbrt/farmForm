import React from 'react';
import Edit from "./Components/Edit/Edit";
import Register from './Components/Register/Register';
import { Switch, Route} from "react-router-dom";

export default(
    <Switch>
        <Route component={Edit} path = "/edit"/>
        <Route component={Register} exact path = "/" />
    </Switch>
)