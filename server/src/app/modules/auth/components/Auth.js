import React, {Component} from "react";
import {Formik} from "formik";
import AuthAPI from "../../../utils/AuthAPI";
import logo from "../../../assets/imgs/logo.png";


const authApi = new AuthAPI();


export default class App extends Component {


    render() {
        const {history} = this.props;

        if (authApi.isAuth()) {
            history.push('/games');
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4 auth-form">
                        <img src={logo} width="150"
                             height="150" className="logo-img"
                             alt=""/>
                        <span className="logo-text">Durak</span>
                        <br/>
                        <br/>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h3>Привет, бро!</h3>
                                </div>

                                <Formik
                                    initialValues={{
                                        username: ''
                                    }}
                                    onSubmit={(values) => {
                                        authApi.register(values.username, values.guid, values.password).then((data) => {
                                            alert(`Привет, ${values.username}! Ты крут!`);
                                            history.push('/games');
                                        });
                                    }}
                                    render={({values, errors, touched, handleChange, handleSubmit, isSubmitting}) =>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    style={{marginBottom: '5px'}}
                                                    className="form-control"
                                                    placeholder="Твой ник"
                                                    name="username"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.username}/>

                                                <input
                                                    style={{marginBottom: '5px'}}
                                                    className="form-control"
                                                    placeholder="UID блокчейна"
                                                    name="guid"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.uid}/>

                                                <input
                                                    className="form-control"
                                                    placeholder="Пароль"
                                                    name="password"
                                                    type="password"
                                                    onChange={handleChange}
                                                    value={values.password}/>
                                            </div>
                                            <button type="submit"
                                                    className="btn btn-lg btn-success btn-block">
                                                Начать играть
                                            </button>
                                        </form>}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
