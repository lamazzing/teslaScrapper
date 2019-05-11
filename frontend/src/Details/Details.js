import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from "react-redux";

export class Details extends Component {
  render() {
    return (
      <div>
        {this.props.tesla ? (
          <div>
            <div>
              <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                emulateTouch={true}
                showStatus={false}
              >
                {this.props.tesla.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="detailsContent">
              <Grid container spacing={15} justify="space-between">
                <Typography variant="h2" color="textPrimary" gutterBottom>
                  {this.props.tesla.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  gutterBottom
                >
                  {this.props.tesla.price}
                </Typography>
              </Grid>
            </div>
            <div className="detailsContent">
              <Typography variant="h4" color="textPrimary" gutterBottom>
                Criterias
              </Typography>
              <Grid container spacing={15} justify="space-between">
                {this.props.tesla.criteria.map((criteria, index) => (
                  <Grid item xs key={index}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                      {criteria.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {criteria.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className="detailsContent">
              <Typography variant="h4" color="textPrimary" gutterBottom>
                Details
              </Typography>
              <Grid container spacing={15} justify="space-between">
                <div className="desciption">
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Description:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {this.props.tesla.description}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Seller:
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {this.props.tesla.seller}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {this.props.tesla.tel}
                  </Typography>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Location:
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {this.props.tesla.place}
                  </Typography>
                </div>
              </Grid>
            </div>
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tesla: state.teslas.selectedTesla
  };
};

export default connect(
  mapStateToProps,
  {}
)(Details);
