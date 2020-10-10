import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from '../pages/HomePage';
import Menu from './Menu';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Route path={"/"} component={Menu}/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;

