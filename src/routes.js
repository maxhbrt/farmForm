import React from 'react';
import Edit from "./Components/Edit/Edit";
import { Switch, Route} from "react-router-dom";

export default(
    <Switch>
        <Route component={Edit} exact path="/"/>
    </Switch>
)