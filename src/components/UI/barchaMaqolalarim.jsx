import React, { Component } from "react";
import { Col, Input, Row, Label, Form, Table, CardBody } from "reactstrap";
import { getAllMyArticles } from "services/articleService";
import { toast } from "react-toastify";

import "styles/chopetilgan.css";

class BarchaMaqolalarim extends Component {
  state = {
    status: "all",

    articles: [],
  };

  componentDidMount() {
    this.getAllMyArticles(this.state.status);
  }

  getAllMyArticles = async (status) => {
    try {
      await getAllMyArticles(status).then((res) =>
        this.setState({ articles: res.data })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    console.log(this.state.articles);

    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3>Barcha maqolalarim</h3>
                </div>
                <div className="card-body">
                  <Form>
                    <Col lg="5" className="w-100 pl-0 d-flex">
                      <Label>
                        <b style={{ fontSize: "17px" }}>Tanlang:</b>{" "}
                      </Label>
                      <Input
                        style={{ height: "unset" }}
                        defaultValue="all"
                        className="ml-4 form-control"
                        name="select"
                        type="select"
                        onChange={(e) => this.getAllMyArticles(e.target.value)}
                      >
                        <option value="all">Barcha Maqollarim</option>

                        <option value="REJECTED">Rad etilgan maqollarim</option>

                        <option value="BEGIN_CHECK">
                          Tekshirish jarayonidagi maqolalarim
                        </option>

                        <option value="PUBLISHED">
                          Chop etilgan maqolalarim
                        </option>
                      </Input>
                    </Col>
                  </Form>

                  <Row>
                    <CardBody>
                      <Table>
                        <thead>
                          <tr className="col-md-12">
                            <th className="col-md-2">title</th>
                            <th className="col-lg-2">Status</th>
                            <th className="col-lg-1">Jurnal</th>
                            <th className="col-lg-2">Orginal File</th>
                            <th className="col-lg-2">Redactor File</th>
                            <th className="col-lg-1">Certificate</th>
                            <th className="col-lg-1">Author</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>lorem</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BarchaMaqolalarim;
