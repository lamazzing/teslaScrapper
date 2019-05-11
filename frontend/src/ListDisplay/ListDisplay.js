import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TeslaCard from "../TeslaCard/TeslaCard";
import { connect } from "react-redux";
import { teslasRequest } from "../services/teslas/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";

export class ListDisplay extends Component {
  componentDidMount() {
    this.props.teslasRequest();
  }

  render() {
    return (
      <div>
        <Grid
          className="child"
          direction="row"
          justify="center"
          alignItems="center"
          container
          spacing={40}
        >
          {this.props.fetching ? <CircularProgress /> : null}
          {this.props.teslas
            ? this.props.teslas.map((tesla, index) => (
                <Grid id={index} item md={4}>
                  <TeslaCard tesla={tesla} index={index} history={this.props.history} />
                </Grid>
              ))
            : null}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teslas: state.teslas.teslas,
    fetching: state.teslas.fetching
  };
};

export default connect(
  mapStateToProps,
  { teslasRequest }
)(ListDisplay);
