import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "styles/pdfReaderStyles.css";
import Loader from "./Loader";
import ControlPanel from "./ControlPanel";
import api from "utils/config.json";
const { apiLocal } = api;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = (props) => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const articleId = window.location.pathname.split(":")[1]
    ? window.location.pathname.split(":")[1]
    : window.location.pathname.split(":")[0];

  const [file, setFile] = useState(
    apiLocal + `/article/readArticle/${articleId}`
  );

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <div className="AppReader">
      <Loader isLoading={isLoading} />
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center"
      >
        <Document
          // file="/assets/docs/file-sample.pdf"
          file={file && file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>

        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file={file && file}
        />
      </section>
    </div>
  );
};

export default React.memo(PDFReader);
