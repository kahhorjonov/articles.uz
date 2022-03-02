import React, { Component } from "react";
import { Row, Col, Card, CardBody, Label, Input, CardHeader } from "reactstrap";

class JurnalQoshish extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h3>Jurnal Qoshish</h3>
                </CardHeader>
                <CardBody>
                  <form>
                    <Row className="my-4">
                      <Col lg="3">
                        <div>
                          <label>name</label>
                          <input className="form-control" placeholder="Name" />
                        </div>
                      </Col>
                      <Col lg="3">
                        <div>
                          <label>publishedDate</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="data"
                          />
                        </div>
                      </Col>
                      <Col lg="3">
                        <div>
                          <label>receivedDate</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="data"
                          />
                        </div>
                      </Col>
                      <Col lg="3">
                        <div>
                          <label>maqolaJurnaldaNechaKundaChiqishi</label>
                          <input className="form-control" placeholder="kun" />
                        </div>
                      </Col>
                    </Row>

                    <Row className="my-4">
                      <Col lg="4">
                        <div>
                          <label>jurnalNechaKundaChiqishi</label>
                          <input className="form-control" placeholder="kun" />
                        </div>
                      </Col>
                      <Col lg="4">
                        <div>
                          <label>ISSN</label>
                          <input className="form-control" placeholder="kun" />
                        </div>
                      </Col>
                      <Col lg="4">
                        <div>
                          <label>jurnalSertificat</label>
                          <input className="form-control" placeholder="kun" />
                        </div>
                      </Col>
                    </Row>

                    <Row className="my-4">
                      <Col lg="4">
                        <div>
                          <label>journalsStatus</label>
                          <input className="form-control" placeholder="kun" />
                        </div>
                      </Col>
                      <Col lg="4">
                        <div>
                          <Label>Category</Label>
                          <Input
                            style={{ height: "3rem" }}
                            className="form-control"
                            type="select"
                          >
                            <option>True</option>
                            <option>False</option>
                          </Input>
                        </div>
                      </Col>
                      <Col lg="4">
                        <div>
                          <Label>photoJournals</Label>
                          <input min="0" type="urls" className="form-control" />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="3">
                        <div>
                          <Label for="exampleEmail">Narxi</Label>
                          <Input
                            disabled
                            className="form-control h-100"
                            placeholder="100 som"
                          />
                        </div>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default JurnalQoshish;
