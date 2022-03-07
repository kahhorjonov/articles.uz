import React, { Component } from "react";
import categoryServices from "services/getCategories";
import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";
import { toast } from "react-toastify";
import { Col, Input, Row } from "reactstrap";

import "styles/category.css";

class Category extends Component {
  state = {
    name: "",
    active: "true",
    activeCategoryId: "",
    activeParentCategoryId: "",

    categories: [],
    parentCategories: [],
    search: "",

    currentPage: 1,
    pageSize: 8,
  };

  componentDidMount() {
    this.handleGetCategories();
    this.handleGetParent();
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGetCategories = async () => {
    try {
      await categoryServices.getCategories().then((res) => {
        this.setState({ categories: res.data });
      });
    } catch (ex) {
      toast.error(ex);
    }
  };

  // searchCategory = async (str) => {
  //   try {
  //     await axios.get(`http://192.168.100.27:8080/api/category/allParentCategory/${str}`)
  //     .then((res) => {
  //       console.log(res)
  //       this.setState({ categories: res.data });
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  handleChangeActivity = async (id) => {
    try {
      await categoryServices.changeActivityOfCategory(id).then((res) => {
        toast.success(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleGetParent = async () => {
    try {
      await categoryServices.getParentCategories().then((res) => {
        this.setState({ parentCategories: res.data });
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
          parentId: this.state.activeParentCategoryId,
          active: this.state.active,
          id: this.state.activeCategoryId,
        })
        .then((res) => {
          toast.success(res.data.message);
          this.handleGetCategories();
          this.setState({ name: "" });
          this.setState({ active: "" });
          this.setState({ activeCategoryId: "" });
          this.setState({ activeParentCategoryId: "" });
        });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const {
      categories: allCategories,
      parentCategories,
      currentPage,
      pageSize,
    } = this.state;

    console.log(this.state);

    const categories = paginate(allCategories, currentPage, pageSize);

    return (
      <div className="content">
        <div className="card">
          <div className="card-header">
            <h3>Category</h3>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#myModal"
              >
                Add
              </button>

              <form>
                <div className="input-group mb-3">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text   btn-info">Search</span>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Modal Heading</h4>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={(e) => this.submitHandler(e)}>
                      <Row>
                        <Col lg="12">
                          <div>
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) =>
                                this.setState({ name: e.target.value })
                              }
                            />
                          </div>
                        </Col>

                        <Col lg="12">
                          <div>
                            <label className="pt-3">Active</label>
                            <select
                              className="form-control "
                              onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({ active: e.target.value });
                              }}
                            >
                              <option></option>
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </div>
                        </Col>
                        <Col lg="12">
                          <div>
                            <label className="pt-3">Parent Category</label>
                            <select
                              className="form-control"
                              defaultValue=""
                              onChange={(e) =>
                                this.setState({
                                  parentId: e.target.value,
                                })
                              }
                            >
                              <option value="">Choose one</option>

                              {parentCategories &&
                                parentCategories.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
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
                            <Input
                              type="select"
                              className="form-control mt-3"
                              defaultValue={this.state.active.toString()}
                              onChange={(e) =>
                                this.setState({ active: e.target.value })
                              }
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </Input>
                          </div>
                        </Col>

                        <Col lg="12">
                          <div>
                            <Input
                              type="select"
                              defaultValue={
                                this.state.activeParentCategoryId &&
                                this.state.activeParentCategoryId.toString()
                              }
                              onChange={(e) =>
                                this.setState({
                                  activeParent: e.target.value,
                                })
                              }
                              className="form-control mt-3"
                            >
                              <option value="">Choose One</option>

                              {parentCategories &&
                                parentCategories.length &&
                                parentCategories.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
                            </Input>
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
            {/*_______ edit____________ */}
            <table className="table table-hover">
              <thead>
                <tr>
                  {/* <th>№</th> */}
                  <th>Category name</th>
                  <th>Parent Category Name</th>
                  <th>Active</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    {/* <td>{category.id}</td> */}
                    <td>{category.name}</td>
                    <td>{category.parent && category.parent.name}</td>
                    <td>
                      <label className="switch">
                        <input
                          defaultChecked={category.active}
                          onChange={() =>
                            this.handleChangeActivity(category.id)
                          }
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
                          onClick={(e) => {
                            e.preventDefault();

                            this.setState({ name: category.name });
                            this.setState({ active: category.active });
                            this.setState({
                              activeParentCategoryId:
                                category.parent &&
                                category.parent.length &&
                                category.parent.id,
                            });
                            this.setState({ activeCategoryId: category.id });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => this.handleDelete(category.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer">
            <Pagination
              itemsCount={this.state.categories && this.state.categories.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
