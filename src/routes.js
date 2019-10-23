import React from 'react';
import {Switch, Route} from 'react-router-dom';
import contact from './components/contact';

const Routes =() => {
    return(
        <switch>
            <Route exact path='/contact' component={contact}/>
        </switch>
    )
}
export default Routes;