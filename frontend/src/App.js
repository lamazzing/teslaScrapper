import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HomeScreen from "./HomeScreen/HomeScreen";
import Details from "./Details/Details";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <main className="main">
            <AppBar
              style={{ backgroundColor: "#eae7dc" }}
              position="static"
              className="appBar"
            >
              <Toolbar>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    className="toolBarTitle"
                  >
                    Tesla's Bon Coin
                  </Typography>
                </Link>
              </Toolbar>
            </AppBar>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/details" component={Details} />

            <footer className="footer">Built with ❤️ by Papayajuice</footer>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
