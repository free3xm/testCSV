import React from "react";
import Upload from "./containers/Upload/Upload";
import Orders from "./containers/Orders/Orders";
import { NavLink, Route, Switch } from "react-router-dom";
import cls from "./App.module.css";

function App(props) {
  return (
    <div className={cls.App}>
      <header className={cls.header}>
        <nav className={cls.navbar}>
          <NavLink
            className={cls.link}
            exact
            activeClassName={cls.linkActive}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={cls.link}
            activeClassName={cls.linkActive}
            to="/upload"
          >
            Upload
          </NavLink>
        </nav>
      </header>
      <Switch>
        <Route path="/" exact component={Orders} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </div>
  );
}

export default App;
