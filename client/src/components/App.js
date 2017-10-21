import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Header from '../components/Header';

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
                </div>
            </BrowserRouter>
        );
    }
};


export default connect(null, actions)(App);;
