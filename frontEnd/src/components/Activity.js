import React from "react";
import { connect } from "react-redux";
import { getActivity } from "../actions/activityAction";
import PropTypes from "prop-types";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer
} from "mdbreact";
class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: []
    };
  }

  componentDidMount() {
    //const name = "5de552431c9d440000b8138a";
    this.props.getActivity();
  }

  render() {
    //const dat = this.props.activity.activityData.act;
    if (this.props.activity.activityData) {
      const dat = this.props.activity.activityData;
      return (
        <React.Fragment>
          <MDBContainer className="mb-1">
            <MDBCarousel
              activeItem={1}
              length={dat.length}
              showControls={true}
              showIndicators={true}
              className="z-depth-1"
            >
              <MDBCarouselInner>
              { dat.map((dat, index) => (
                <MDBCarouselItem itemId={index+1} key={dat._id}>
                  <MDBView>
                    <img
                      className="img d-block img-act"
                      src={process.env.PUBLIC_URL + "/img/act/" + dat.pic}
                      alt=""
                    />
                    <MDBMask overlay="black-light" />
                  </MDBView>
                </MDBCarouselItem>
              ))}
              </MDBCarouselInner>
            </MDBCarousel>
          </MDBContainer>
        </React.Fragment>
      );
    }

    return <div>bla</div>;
    //const datasd = this.props.activity.activityData.act.pic;
  }
}

Activity.propTypes = {
  getActivity: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    activity: state.activity
  };
};

export default connect(mapStateToProps, { getActivity })(Activity);
