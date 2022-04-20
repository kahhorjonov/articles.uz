import React, { useState } from "react";
import axios from "axios";
import {
  FaFileDownload,
  FaFastBackward,
  FaBackward,
  FaForward,
  FaFastForward,
  FaSearchMinus,
  FaSearchPlus,
} from "react-icons/fa";
import "styles/pdfReaderStyles.css";

const ControlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const articleId = window.location.pathname.split(":")[1]
    ? window.location.pathname.split(":")[1]
    : window.location.pathname.split(":")[0];

  const [pdfFile, setPdfFile] = useState(
    `http://192.168.100.27:8080/api/article/readArticle/${articleId}`
  );

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? "disabled" : "clickable";
  const lastPageClass = isLastPage ? "disabled" : "clickable";

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? "disabled" : "clickable";
  const zoomInClass = isMaxZoom ? "disabled" : "clickable";

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="control-panel m-3 p-3 d-flex align-items-baseline justify-content-between">
      <div className="d-flex justify-content-between align-items-baseline">
        <FaFastBackward
          className={`fas fa-fast-backward mx-3 ${firstPageClass}`}
          onClick={goToFirstPage}
        />

        <FaBackward
          className={`fas fa-backward mx-3 ${firstPageClass}`}
          onClick={goToPreviousPage}
        />

        <span>
          Page{" "}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className="p-0 pl-1 mx-2"
            value={pageNumber}
            onChange={onPageChange}
          />{" "}
          of {numPages}
        </span>

        <FaForward
          className={`fas fa-forward mx-3 ${lastPageClass}`}
          onClick={goToNextPage}
        />

        <FaFastForward
          className={`fas fa-fast-forward mx-3 ${lastPageClass}`}
          onClick={goToLastPage}
        />
      </div>
      <div className="d-flex justify-content-between align-items-baseline">
        <FaSearchMinus
          className={`fas fa-search-minus mx-3 ${zoomOutClass}`}
          onClick={zoomOut}
        />

        <span>{(scale * 100).toFixed()}%</span>

        <FaSearchPlus
          className={`fas fa-search-plus mx-3 ${zoomInClass}`}
          onClick={zoomIn}
        />
      </div>

      <div className="mx-3">
        <a
          onClick={() => {
            axios.get(
              "http://192.168.100.27:8080/api/attachment/download/8ca15804-ff55-4286-8b97-e0383dd72b9c"
            );
          }}
        >
          <FaFileDownload />
        </a>
      </div>
    </div>
  );
};

export default ControlPanel;
