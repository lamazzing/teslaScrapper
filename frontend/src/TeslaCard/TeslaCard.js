import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { selectTesla } from "../services/teslas/actions";
import { connect } from "react-redux";
import "css/css.css";
var isEmpty = require("lodash.isempty");

const styles = theme => ({
  title: {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: "1.6",
    letterSpacing: "0.0075em"
  }
});

export class TeslaCard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className="card">
        <CardHeader
          classes={{
            title: classes.title
          }}
          title={this.props.tesla.title}
          subheader={this.props.tesla.price + "€"}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{ align: "center" }}
          className="cardHeader"
        />
        <CardMedia
          component="img"
          className="media"
          image={
            !isEmpty(this.props.tesla.images)
              ? this.props.tesla.images[0]
              : "https://storage.googleapis.com/webdesignledger.pub.network/WDL/12f213e1-t1.jpg"
          }
          title={this.props.tesla.title}
        />
        <CardContent>
          <Typography align="right" component="h4">
            {this.props.tesla.tel ? "Tel:" + this.props.tesla.tel : null}
          </Typography>
        </CardContent>
        <Button
          fullWidth
          color="primary"
          onClick={() => {
            this.props.selectTesla(this.props.teslas[this.props.index]);
            this.props.history.push("/details");
          }}
        >
          More informations
        </Button>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    teslas: state.teslas.teslas
  };
};

const StyledTeslaCard = withStyles(styles)(TeslaCard);

export default connect(
  mapStateToProps,
  { selectTesla }
)(StyledTeslaCard);
