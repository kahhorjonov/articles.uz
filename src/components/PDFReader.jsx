import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Document, Page, pdfjs } from "react-pdf";
import ControlPanel from "./ControlPanel";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(
    "http://192.168.100.27:8080/api/article/readArticle/26d615a3-bbe0-4276-9fb4-05bc371c5485"
  );

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.27:8080/api/attachment/download/26d615a3-bbe0-4276-9fb4-05bc371c5485`
      )
      .then((res) => console.log(res));
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <div className="container">
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
          // file="/assets/docs/sample.pdf"
          // file="/assets/docs/file-sample.pdf"
          file={file && file}
        />
      </section>
    </div>
  );
};

export default PDFReader;
