import React, { Component } from "react";

class Reading extends Component {
  state = {
    articleId: "",
  };

  componentDidMount() {
    const articleId = this.props.location.pathname.split(":")[1]
      ? this.props.location.pathname.split(":")[1]
      : this.props.location.pathname.split(":")[0];

    this.setState({ articleId });
  }

  render() {
    return (
      <div className="container">
        <h5>{this.state.articleId}</h5>
      </div>
    );
  }
}

export default Reading;
