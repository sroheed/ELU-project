import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from '../pages/HomePage';
import NoPostsPage from "../pages/NoPostsPage";
import InfoPage from "../pages/InfoPage";
import Menu from './Menu';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Route path={"/"} component={Menu}/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/graph-without-posts" exact component={NoPostsPage}/>
          <Route path="/info" exact component={InfoPage}/>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;

