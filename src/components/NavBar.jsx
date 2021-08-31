import React, {useContext} from 'react';
import {Navbar, Container, Button, Dropdown} from "react-bootstrap";
import logo from '../assets/images/logo.png'
import {Link, NavLink, useHistory} from "react-router-dom";
import {CREATE_POST_URL, HOME_URL, LOGIN_URL, MY_PROFILE_URL} from "../utils/consts";
import {BiUser, FaUserCircle} from 'react-icons/all'
import {observer} from "mobx-react-lite/";
import {Context} from "../index";


const navbar = {
    position: 'sticky',
    height: '63px',
    padding: 'auto 0',
    zIndex: 100,
    top: '0',
    left: 0,
    width: '100%',
}

const navbarUser = {
    cursor: 'pointer',
}
const spanLogo = {
    fontSize: '1.4rem'
}

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    console.log(user.user)

    return (
        <Navbar style={navbar} bg="primary">
            <Container className="container-xl d-flex justify-content-between text-secondary">
                <NavLink to={HOME_URL}>
                    <Navbar.Brand className="d-flex align-center no-blue">
                        <img className="me-1" height={37} width={37} src={logo}/>
                        <span style={spanLogo} className="text-secondary d-none d-sm-block">Sparkys</span>
                    </Navbar.Brand>
                </NavLink>

                { user.isAuth ?
                    <Dropdown style={navbarUser} >
                        <Dropdown.Toggle className="d-flex align-items-center" variant="info" id="dropdown-basic">
                            {user.user.avatar === 'unknown' ?
                                <FaUserCircle className="h2 mb-0 me-1"/>
                                :
                                <div style={{background: `url("${process.env.REACT_APP_AVATARS_STORAGE_URL + user.user.avatar}") center`,
                                    backgroundSize: 'cover'}}
                                    className="navbar__avatar-wrapper me-1">
                                    {/*<img src={process.env.REACT_APP_AVATARS_STORAGE_URL + user.user.avatar} />*/}
                                </div>
                            }
                            <span >{user.user.name}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => history.push(MY_PROFILE_URL)}>Профиль</Dropdown.Item>
                            <Dropdown.Item onClick={() => history.push(CREATE_POST_URL)}>Новый пост</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={()=>user.exit(user, () => {
                                history.push(HOME_URL)
                                history.go(0)
                            })}>Выйти</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <Link to={LOGIN_URL}><Button className="no-shadow" variant="info">Войти</Button></Link>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;