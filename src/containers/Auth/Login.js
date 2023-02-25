import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

//import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from "../../services/userService";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('dang dong: ', error.response)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login'>
                            <div className='custom-input-password'>
                                <label>Username:</label>
                                <input type='text'
                                    className='form-control login-input'
                                    placeholder='Enter your username'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}
                                />
                            </div>
                        </div>
                        <div className='col-12 form-group login'>
                            <label>password</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control login-input'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 btn-login'>
                            <button onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12 forgot-password'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-other-login'>
                            <span>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
