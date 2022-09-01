import React, { useEffect, useState } from "react";
import axios from 'axios'
import TdRequest from "../components/datatables/requester";
import RequestAdd from "../components/Forms/RequestsAdd"
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";


const d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const mm = months[d.getMonth()]; //current month
const yy = d.getFullYear(); //current month


const Requests = () => {

  const [dashApi, setDashApi] = useState([])
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/dashboardapi", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });
      setDashApi(res.data)
    }
    fetchData();

  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-email-85 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Daily Quranic Requests({d.getDate()}-{mm}-{yy})</p>
                      <Card.Title as="h4">{dashApi.todayRequestsSum}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-email-85 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Monthly Quranic Requests({mm})</p>
                      <Card.Title as="h4">{dashApi.monthlyRequestsSum}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-email-85 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Anually Quranic Requests({yy})</p>
                      <Card.Title as="h4">{dashApi.anuallyRequestsSum}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>Make Request Reminder</b> <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12" >
                  <RequestAdd />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Daily Quranic Requests({d.getDate()}-{mm}-{yy})<br></br><b className="flaticon-down-arrow-1">Total Requests: {dashApi.todayRequestsSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdRequest metaData="/dashboardapi" detail="Daily Quranic Requests" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Monthly Quranic Requests({mm})<br></br><b className="flaticon-down-arrow-1">Total Requests: {dashApi.monthlyRequestsSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdRequest metaData="/dashboardapi" detail="Monthly Quranic Requests" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Annually Quranic Requests({yy})<br></br><b className="flaticon-down-arrow-1">Total Requests: {dashApi.anuallyRequestsSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdRequest metaData="/dashboardapi" detail="Annually Quranic Requests" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><br></br><b className="flaticon-down-arrow-1">Requests History</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdRequest metaData="" detail="Request History" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </>
  )
}

export default Requests