import React, { Component } from "react";

import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { toast } from "react-toastify";
import { getUsersInfo } from "services/userService";
import ru from "translations/ru";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

Chart.register(...registerables);

class Dashboard extends Component {
  state = {
    data: {},
    lang: "",
  };

  async componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    this.getUsersInformation();
  }

  getUsersInformation = async () => {
    try {
      await getUsersInfo()
        .then((res) => {
          this.setState({ data: res.data });
        })
        .catch((ex) => {
          toast.error(ex.response.data.message);
        });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const {
      numberOfNewArticles,
      numberOfReadyOfPublicationArticles,
      numberOfFreeAndPublishedArticles,
      numberOfPaidAndPublishedArticles,
      numberOfRejectedArticles,
      numberOfRecycleArticles,
      numberOfInReviewArticles,
      numberOfIsBeingEditedArticles,
      numberOfNewAndPayFalse,
    } = this.state.data;

    const numberOfUsers = (
      this.state.data &&
      this.state.data.numberOfUsers +
        this.state.data.numberOfReviewers +
        this.state.data.numberOfRedactors +
        this.state.data.numberOfAdmins
    ).toString();

    const numberOfArticles = (
      +numberOfFreeAndPublishedArticles +
      numberOfNewArticles +
      numberOfPaidAndPublishedArticles +
      numberOfReadyOfPublicationArticles +
      numberOfRejectedArticles +
      numberOfRecycleArticles +
      numberOfInReviewArticles +
      numberOfIsBeingEditedArticles +
      numberOfNewAndPayFalse
    ).toString();

    return (
      <>
        <div className="content">
          <Row>
            {/* <Col lg="6" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Maqolalar Umumiy hajmi</p>
                        <CardTitle tag="p">15GB</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
            <Col lg="4" md="12" sm="12">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" sm="4" lg="4" xs="4">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="4" sm="4" lg="4" xs="4">
                      {/* <CardTitle tag="p">Umumiy maqolalar</CardTitle> */}
                      <p className="card-category">
                        {this.state.lang === "ru"
                          ? ru.main_allArticles
                          : "Umumiy maqolalar"}
                      </p>
                    </Col>
                    <Col md="4" sm="4" lg="4" xs="4">
                      {/* <CardTitle tag="p">Yangi qo'shilgan maqolalar</CardTitle> */}
                      <p className="card-category">
                        {this.state.lang === "ru"
                          ? ru.admin_1
                          : "Yangi maqolalar"}
                      </p>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col md="4" xs="4">
                      <CardTitle tag="p"></CardTitle>
                    </Col>
                    <Col md="4" xs="4">
                      <CardTitle tag="p">
                        <span>{numberOfArticles && numberOfArticles}</span>
                      </CardTitle>
                    </Col>
                    <Col md="4" xs="4">
                      <CardTitle tag="p">
                        <span>+{this.state.data && numberOfNewArticles}</span>
                      </CardTitle>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" md="12" sm="12">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="4">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="4" xs="4">
                      <p className="card-category">
                        {this.state.lang === "ru"
                          ? ru.admin_2
                          : "Nashr qilingan maqolalar"}
                      </p>
                    </Col>

                    <Col md="4" xs="4">
                      <p className="card-category">
                        {this.state.lang === "ru"
                          ? ru.admin_3
                          : "Nashrga tayyor maqolalar"}
                      </p>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col md="4" xs="4"></Col>

                    <Col md="4" xs="4">
                      <CardTitle tag="p">
                        <span>
                          {numberOfPaidAndPublishedArticles &&
                            numberOfPaidAndPublishedArticles +
                              numberOfFreeAndPublishedArticles}
                        </span>
                      </CardTitle>
                    </Col>

                    <Col md="4" xs="4">
                      <CardTitle tag="p">
                        <span>
                          {this.state.data &&
                            numberOfReadyOfPublicationArticles}
                        </span>
                      </CardTitle>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" md="12" sm="12">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="4">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-refresh-69 text-success" />
                      </div>
                    </Col>
                    <Col md="4" xs="4">
                      <p className="card-category">
                        {this.state.lang === "ru"
                          ? ru.admin_4
                          : "Qayta ishlashdagilar"}
                      </p>
                    </Col>

                    <Col md="4" xs="4">
                      <p className="card-category">
                        {this.state.lang === "ru"
                          ? ru.admin_5
                          : "Qaytarilgan maqolalar"}
                      </p>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col md="4" xs="4" className="offset-4">
                      <CardTitle tag="p">
                        <span>
                          {this.state.data && numberOfRecycleArticles}
                        </span>
                      </CardTitle>
                    </Col>

                    <Col md="4" xs="4">
                      <CardTitle tag="p">
                        <span>
                          {this.state.data && numberOfRejectedArticles}
                        </span>
                      </CardTitle>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">
                    {this.state.lang === "ru"
                      ? ru.admin_6
                      : "Foydalanuvchilar Statistikasi"}
                  </CardTitle>
                  {/* <p className="card-category">Last Campaign Performance</p> */}
                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                  <Pie
                    // data={variables.dashboardUserStatistics}
                    data={{
                      labels:
                        this.state.lang === "ru"
                          ? ["Авторы", "Рецензенты", "Редакторы", "Админы"]
                          : ["Authors", "Reviewers", "Reductors", "Admins"],

                      datasets: [
                        {
                          label: "Users",
                          pointRadius: 0,
                          pointHoverRadius: 0,
                          backgroundColor: [
                            "#fcc468",
                            "#e3e3e3",
                            "#4acccd",
                            "#ef8157",
                          ],
                          borderWidth: 0,
                          data: [
                            this.state.data && this.state.data.numberOfUsers,
                            this.state.data &&
                              this.state.data.numberOfReviewers,
                            this.state.data &&
                              this.state.data.numberOfRedactors,
                            this.state.data && this.state.data.numberOfAdmins,
                          ],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },

                      maintainAspectRatio: false,

                      pieceLabel: {
                        render: "percentage",
                        fontColor: ["white"],
                        precision: 2,
                      },

                      scales: {
                        y: {
                          ticks: {
                            display: false,
                          },

                          grid: {
                            drawBorder: false,
                            display: false,
                          },
                        },

                        x: {
                          barPercentage: 1.6,
                          grid: {
                            drawBorder: false,
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                    }}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-warning" />{" "}
                    {this.state.lang === "ru" ? ru.main_avtorlar : "Avtorlar"}{" "}
                    <i className="fa fa-circle text-danger" />{" "}
                    {this.state.lang === "ru" ? ru.admin_red : "Tahrirchilar"}{" "}
                    <i className="fa fa-circle text-primary" />{" "}
                    {this.state.lang === "ru" ? ru.admin_rev : "Taqrizchilar"}{" "}
                    <i className="fa fa-circle text-gray" />{" "}
                    {this.state.lang === "ru" ? ru.admin_admin : "Adminlar"}
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" />
                    <span>
                      {this.state.lang === "ru"
                        ? ru.admin_NumUsers
                        : "Foydalanuvchilar soni"}{" "}
                      : {numberOfUsers && numberOfUsers.toString()}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">
                    {this.state.lang === "ru"
                      ? ru.admin_grafik
                      : "Foyda grafigi"}
                  </CardTitle>
                  {/* <p className="card-category">Avtorlar va Maqolalar</p> */}
                </CardHeader>
                <CardBody>
                  <Line
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],

                      // datasets: [
                      //   {
                      //     label: "First dataset",
                      //     data: [33, 53, 85, 41, 44, 65],
                      //     fill: true,
                      //     backgroundColor: "rgba(75,192,192,0.2)",
                      //     borderColor: "rgba(75,192,192,1)",
                      //   },
                      //   {
                      //     label: "Second dataset",
                      //     data: [33, 25, 35, 51, 54, 76],
                      //     fill: false,
                      //     borderColor: "#742774",
                      //   },
                      // ],

                      datasets: [
                        {
                          label:
                            this.state.lang === "ru" ? ru.admin_kirim : "Kirim",
                          fill: true,
                          data: [
                            1400000, 1600000, 1900000, 1000000, 3500000,
                            9000000, 4800000,
                          ],
                          fill: true,
                          backgroundColor: "rgba(75,192,192,0.2)",
                          borderColor: "#51CACF",
                          // backgroundColor: "transparent",
                          pointBorderColor: "#51CACF",
                          pointRadius: 4,
                          pointHoverRadius: 4,
                          pointBorderWidth: 8,
                          tension: 0.4,
                        },

                        {
                          label:
                            this.state.lang === "ru"
                              ? ru.admin_chiqim
                              : "Chiqim",
                          data: [
                            1500000, 1200000, 1800000, 2000000, 2500000,
                            2000000, 1800000,
                          ],
                          fill: false,
                          borderColor: "#fbc658",
                          backgroundColor: "transparent",
                          pointBorderColor: "#fbc658",
                          pointRadius: 4,
                          pointHoverRadius: 4,
                          pointBorderWidth: 8,
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: { display: true },
                      },
                    }}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" />{" "}
                    {this.state.lang === "ru" ? ru.admin_kirim : "Kirim"}{" "}
                    <i className="fa fa-circle text-warning" />{" "}
                    {this.state.lang === "ru" ? ru.admin_chiqim : "Chiqimlar"}{" "}
                    <i className="fa fa-circle text-success" />{" "}
                    {this.state.lang === "ru" ? ru.admin_foyda : "Foyda"} : 8
                    000 000
                  </div>

                  {/* <hr /> */}
                  {/* <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
