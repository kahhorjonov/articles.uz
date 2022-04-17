import React, { Component } from "react";
import PDFReader from "components/PDFReader";

export default class Reading extends Component {
  render() {
    return (
      <div className="container">
        <PDFReader />
      </div>
    );
  }
}
