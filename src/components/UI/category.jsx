import React, { Component } from "react";
import categoryServices from "services/getCategories";
import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";
import { toast } from "react-toastify";
import { Col, Input, Row } from "reactstrap";
import ru from "translations/ru";

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

    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

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
      toast.error(error.response.data.message);
    }
  };

  handleGetParent = async () => {
    try {
      await categoryServices.getParentCategories().then((res) => {
        this.setState({ parentCategories: res.data });
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  handleDelete = async (id) => {
    try {
      await categoryServices.deleteCategories(id).then((res) => {
        toast.info(res.data.message);
        this.handleGetCategories();
      });
    } catch (error) {
      toast.error(error.response.data.message);
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

          this.setState({ name: "" });
          this.setState({ active: "" });
          this.setState({ activeCategoryId: "" });
          this.setState({ activeParentCategoryId: "" });

          this.handleGetCategories();
          this.handleGetParent();
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
      lang,
      name,
      activeParentCategoryId,
    } = this.state;

    const categories = paginate(allCategories, currentPage, pageSize);

    return (
      <div className="content">
        <div className="card">
          <div className="card-header">
            <h3>
              {this.state.lang === "ru"
                ? ru.admin_kategoriyalar
                : "Kategoriyalar"}
            </h3>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#myModal"
              >
                {this.state.lang === "ru" ? ru.admin_add : "Qo'shish"}
              </button>

              {/* <form>
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
              </form> */}
            </div>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">
                      {this.state.lang === "ru"
                        ? ru.admin_add_cat
                        : "Kategoriya Qo'shish"}
                    </h4>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={(e) => this.submitHandler(e)}>
                      <Row>
                        <Col lg="12">
                          <div>
                            <label>
                              {this.state.lang === "ru"
                                ? ru.admin_type
                                : "Turi"}
                            </label>
                            <input
                              value={name}
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                this.setState({ name: e.target.value });
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg="12">
                          <div>
                            <label className="pt-3">
                              {this.state.lang === "ru"
                                ? ru.admin_root_cat
                                : "Ildiz kategoriya"}
                            </label>
                            <select
                              value={activeParentCategoryId}
                              className="form-control"
                              style={{ height: "auto" }}
                              onChange={(e) =>
                                this.setState({
                                  activeParentCategoryId: e.target.value,
                                })
                              }
                            >
                              <option value="">
                                {this.state.lang === "ru"
                                  ? ru.admin_root_option
                                  : "Birini tanlang"}
                              </option>

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
                      onClick={(e) => {
                        this.submitHandler(e);
                      }}
                    >
                      {this.state.lang === "ru" ? ru.restore_3 : "Tasdiqlash"}
                    </button>
                    <button type="button" className="btn" data-dismiss="modal">
                      {this.state.lang === "ru" ? ru.admin_close : "Yopish"}
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
                    <h4 className="modal-title">
                      {this.state.lang === "ru"
                        ? ru.admin_edit_cat
                        : "Tahrirlash"}
                    </h4>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={(e) => this.submitHandler(e)}>
                      <Row>
                        <Col lg="12">
                          <div>
                            <label>
                              {this.state.lang === "ru"
                                ? ru.admin_type
                                : "Turi"}
                            </label>
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

                        <Col lg="12" className="mt-3">
                          <div>
                            <label>
                              {this.state.lang === "ru"
                                ? ru.admin_root_cat
                                : "Ildiz kategoriya"}
                            </label>
                            <Input
                              type="select"
                              style={{ height: "auto", marginTop: "0" }}
                              defaultValue={
                                this.state.activeParentCategoryId &&
                                this.state.activeParentCategoryId.toString()
                              }
                              onChange={(e) => {
                                this.setState({
                                  activeParentCategoryId: e.target.value,
                                });
                              }}
                              className="form-control"
                            >
                              <option value="">
                                {this.state.lang === "ru"
                                  ? ru.admin_root_option
                                  : "Birini tanlang"}
                              </option>

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
                      {this.state.lang === "ru" ? ru.restore_3 : "Tasdiqlash"}
                    </button>
                    <button type="button" className="btn" data-dismiss="modal">
                      {this.state.lang === "ru" ? ru.admin_close : "Yopish"}
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
                  <th> {this.state.lang === "ru" ? ru.admin_type : "Turi"}</th>
                  <th>
                    {this.state.lang === "ru"
                      ? ru.admin_root_cat
                      : "Ildiz kategoriya"}
                  </th>
                  <th>
                    {this.state.lang === "ru"
                      ? ru.admin_activate
                      : "Aktivlashtirish"}
                  </th>
                  <th className="text-center">
                    {this.state.lang === "ru" ? ru.admin_actions : "Amallar"}
                  </th>
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
                          className="btn btn-info"
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
                          {this.state.lang === "ru"
                            ? ru.admin_edit
                            : "Tahrirlash"}
                        </button>
                        <button
                          onClick={() => this.handleDelete(category.id)}
                          type="button"
                          className="btn"
                        >
                          {this.state.lang === "ru"
                            ? ru.admin_edit
                            : "O'chirish"}
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

export default React.memo(Category);
