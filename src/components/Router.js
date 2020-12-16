import React, { useState } from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator";


const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigator />}
            <Switch>
                {isLoggedIn ? ( 
                <>
                    <Route exact path="/">
                        <Home />
                        <Profile />
                    </Route>
                </>
                ) : (
                <Route exact path="/">
                    <Auth />
                </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;