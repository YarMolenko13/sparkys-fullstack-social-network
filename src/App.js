import 'assets/styles/style.scss';
import AppRouter from "./router/AppRouter";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import MainWrapper from "./components/MainWrapper";
import {Context} from './index'
import React, {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Col, Spinner} from "react-bootstrap";

const navbar = (<NavBar />)

const appRoute = (<AppRouter />)

function App() {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            check().then(async data => {
                await user.setUser(data)
                user.setIsAuth(true)
                console.log(data)
            }).finally(() => setLoading(false))
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e.message)
        }
    }, [])


    return (
        <BrowserRouter>
            { loading ?
                <Col className="d-flex justify-content-center align-items-center spinner">
                    <Spinner style={{width: '50px', height: '50px'}} variant="info" animation="border" />
                </Col>
                :
                <MainWrapper navbar={navbar} appRoute={appRoute} />
            }
        </BrowserRouter>
    );
}

export default App;
