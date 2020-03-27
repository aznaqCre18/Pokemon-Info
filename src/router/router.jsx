import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; 

import LandingPage from '../container/page/home';
import DetailPage from '../container/page/detail/detailPage'

class Routers extends Component {
    render() {
        return(
            <Router>
                <Switch>

                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/detail/:pokemonIndex" component={DetailPage}/>

                </Switch>
            </Router>
        )
    }
}

export default Routers