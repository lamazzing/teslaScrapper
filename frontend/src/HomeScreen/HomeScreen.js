import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ListDisplay from "../ListDisplay/ListDisplay";
import { withRouter } from "react-router-dom";

export class HomeScreen extends Component {
  render() {
    return (
      <div>
        <div className="heroContent child">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            The Best Place to find a Tesla
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            Tesla's bon coin is the best place to find a tesla if you're too
            lazy to go on the real{" "}
            <a href="https://www.leboncoin.fr">leboncoin</a>
          </Typography>
        </div>
        <ListDisplay history={this.props.history} />
      </div>
    );
  }
}

export default withRouter(HomeScreen);
