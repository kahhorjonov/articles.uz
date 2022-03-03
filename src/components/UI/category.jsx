import React, { Component } from "react";
import categoryServices from "services/getCategories";

import axios from "axios";
import { toast } from "react-toastify";

import { Col, Row } from "reactstrap";

import "../../styles/category.css";

class Category extends Component {
  state = {
    name: "",
    active: "",
    activeId: "",

    categories: [],
  };

  componentDidMount() {
    this.handleGetCategories();
  }

  handleGetCategories = async () => {
    try {
      await categoryServices.getCategories().then((res) => {
        this.setState({ categories: res.data });
      });
    } catch (ex) {
      toast.error(ex);
    }
  };

  handleChangeActivity = async (id) => {
    try {
      await categoryServices.changeActivityOfCategory(id).then((res) => {
        toast.success(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async (id) => {
    try {
      await categoryServices.deleteCategories(id).then((res) => {
        toast.success(res.data.message);
        this.handleGetCategories();
      });
    } catch (error) {
      console.log(error);
    }
  };

  submitHandler = async (e) => {
    e.preventDefault();
    try {
      await categoryServices
        .createOrEditCategories({
          name: this.state.name,
          active: this.state.active,
          id: this.state.activeId,
        })
        .then((res) => {
          toast.success(res.data.message);
          this.handleGetCategories();
          this.setState({ name: "" });
          this.setState({ active: "" });
          this.setState({ activeId: "" });
        });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const { categories } = this.state;

    return (
      <div className="content">
        <h6>Category</h6>

        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add+
        </button>

        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modal Heading</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={(e) => this.submitHandler(e)}>
                  <Row>
                    <Col lg="12">
                      <div>
                        <label>Name</label>
                        <input
                          type="text"
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col lg="12">
                      <div>
                        <select
                          className="form-control mt-3"
                          defaultValue="true"
                          onChange={(e) => {
                            console.log(e.target.value);
                            this.setState({ active: e.target.value });
                          }}
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info"
                  onClick={(e) => this.submitHandler(e)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------- edit------------------ */}
        <div className="modal" id="myModalForEdit">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modal Heading</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={(e) => this.submitHandler(e)}>
                  <Row>
                    <Col lg="12">
                      <div>
                        <label>Name</label>
                        <input
                          defaultValue={this.state.name}
                          type="text"
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col lg="12">
                      <div>
                        <select
                          defaultValue={this.state.active}
                          className="form-control mt-3"
                          defaultValue="true"
                          onChange={(e) =>
                            this.setState({ active: e.target.value })
                          }
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info"
                  onClick={(e) => this.submitHandler(e)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>№</th>
              <th>Category name</th>
              <th>Parent Category Name</th>
              <th>Active</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>Cart1</td>
                <td>
                  <label className="switch">
                    <input
                      defaultChecked={category.active}
                      onChange={() => this.handleChangeActivity(category.id)}
                      type="checkbox"
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="text-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#myModalForEdit"
                      className="btn btn-warning"
                      onClick={() => {
                        this.setState({ name: category.name });
                        this.setState({ active: category.active });
                        this.setState({ activeId: category.id });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => this.handleDelete(category.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Category;
