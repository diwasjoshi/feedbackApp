import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={() => <div>Hello</div>} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route exact path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        );
    }
};


export default connect(null, actions)(App);;
