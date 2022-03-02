import React, { Component } from "react";

class Category extends Component {
  state = {};
  render() {
    return (
      <div className="content">
        <h6>Category</h6>

        <button
          type="button"
          class="btn btn-success"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add+
        </button>

        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Modal Heading</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                 
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
