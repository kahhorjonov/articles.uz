import React, { Component } from "react";
import { downloadMedia } from "services/mediaService";

class GetImages extends Component {
  state = {
    cover: "",
  };

  async componentDidMount() {
    await this.getImage(this.props.url ? this.props.url : "null");
  }

  getImage = async (id) => {
    let imageBlob;

    try {
      imageBlob = (await downloadMedia(id, { responseType: "blob" })).data;
    } catch (err) {
      return null;
    }

    return this.setState({ cover: URL.createObjectURL(imageBlob) });
  };

  render() {
    return (
      <>
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            width: "100%",
          }}
          src={this.state.cover}
        />
      </>
    );
  }
}

export default GetImages;
