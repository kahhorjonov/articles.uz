import React, { Component } from "react";
import axios from "axios";

class GetImages extends Component {
  state = {
    cover: "",
  };

  async componentDidMount() {
    await this.getImage(this.props.url);
  }

  getImage = async (id) => {
    let imageBlob;

    try {
      imageBlob = (
        await axios.get(
          `http://192.168.100.27:8080/api/attachment/download/${id}`,
          { responseType: "blob" }
        )
      ).data;
    } catch (err) {
      return null;
    }

    return this.setState({ cover: URL.createObjectURL(imageBlob) });
  };

  render() {
    return (
      <img
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          width: "100%",
        }}
        src={this.state.cover}
      />
    );
  }
}

export default GetImages;
