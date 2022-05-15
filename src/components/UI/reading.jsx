import React, { Component } from "react";
import PDFReader from "components/PDFReader";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Reading extends Component {
  render() {
    return (
      <div className="container">
        <PDFReader />
      </div>
    );
  }
}
