import React, { Component } from 'react';
import { connect } from 'react-redux';
import Payments from './Payments';

class Header extends Component{
    renderHeaderOptions = () => {
        console.log(this.props);
        switch (this.props.auth) {
            case null:
            case undefined:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return [
                    <li key="1"> <Payments /> </li>,
                    <li key="2"> Credits: {this.props.auth.credits} </li>,
                    <li key="3"> <a>Logout</a> </li>
                ];
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        FeedbackApp
                    </a>
                    <ul className="right">
                        { this.renderHeaderOptions() }
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }){
    return { auth };
}

export default connect(mapStateToProps)(Header);
