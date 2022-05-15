import React, { Component } from "react";
import { downloadMedia } from "services/mediaService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BounceLoader } from "react-spinners";
import "react-lazy-load-image-component/src/effects/blur.css";

class GetImages extends Component {
  state = {
    cover: "",
    loading: true,
  };

  async componentDidMount() {
    await this.getImage(this.props.url ? this.props.url : "null");
  }

  getImage = async (id) => {
    let imageBlob;

    try {
      imageBlob = (await downloadMedia(id, { responseType: "blob" })).data;
      this.setState({ loading: false });
    } catch (err) {
      return null;
    }

    return this.setState({ cover: URL.createObjectURL(imageBlob) });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <BounceLoader size={40} loading={this.state.loading} />
        ) : (
          <>
            <LazyLoadImage
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                width: "100%",
                justifyContent: "center",
              }}
              effect="blur"
              alt="img"
              height="100%"
              src={this.state.cover}
              width="100%"
              placeholderSrc={<h3>Loading...</h3>}
            />

            {/* <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            width: "100%",
          }}
          src={this.state.cover}
        /> */}
          </>
        )}
      </>
    );
  }
}

export default GetImages;
