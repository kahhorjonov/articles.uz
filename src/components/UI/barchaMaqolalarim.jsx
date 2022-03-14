import React, { Component } from "react";
import { Col, Input, Row, Label, Form, Table, CardBody } from "reactstrap";

import "styles/chopetilgan.css";

class BarchaMaqolalarim extends Component {
  render() {
    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h2 className="m-0">Barcha maqolalarim</h2>
                </div>
                <div className="card-body">
                  <Form>
                    <Col lg="5" className="w-100 pl-0 d-flex">
                      <Label>
                        <b style={{ fontSize: "17px" }}>Select:</b>{" "}
                      </Label>
                      <Input
                        style={{ height: "unset" }}
                        className="ml-4 form-control"
                        name="select"
                        type="select"
                      >
                        <option value="Barcha Maqollarim">
                          Barcha Maqollarim
                        </option>

                        <option value="Rad etilgan maqollarim">
                          Rad etilgan maqollarim
                        </option>

                        <option value="Rad etilgan maqollarim">
                          Rad etilgan maqollarim
                        </option>

                        <option value="Rad etilgan maqollarim">
                          Rad etilgan maqollarim
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
                            <th className="col-lg-2 col-md-1">Status</th>
                            <th className="col-lg-1 col-md-1">Jurnal</th>
                            <th className="col-lg-2 col-md-1">Orginal File</th>
                            <th className="col-lg-2 col-md-1">Reductor File</th>
                            <th className="col-lg-1 col-md-1">Serficat</th>
                            <th className="col-lg-1 col-md-1">Authhor</th>
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
