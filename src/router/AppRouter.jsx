import React, {useContext} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from "./routes";
import {FEED_URL} from "../utils/consts";
import {Context} from "../index";


const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user.isAuth)

    return (
        <Switch>
            {publicRoutes.map(({path, Component})  =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={FEED_URL} />
        </Switch>
    );
};

export default AppRouter;