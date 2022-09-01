import React, { useEffect, useState } from "react";
import axios from 'axios'
import TdDonations from "../components/datatables/donor";
import DonationAdd from "../components/Forms/donationAdd"
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


const Donations = () => {

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
                      <i className="nc-icon nc-credit-card text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Today's Donation Received({d.getDate()}-{mm}-{d.getFullYear()})</p>
                      <Card.Title as="h4">{dashApi.dailyDonationSum}</Card.Title>
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
                      <i className="nc-icon nc-credit-card text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Monthly Donation Received({mm})</p>
                      <Card.Title as="h4">{dashApi.monthlyDonationSum}</Card.Title>
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
                      <i className="nc-icon nc-credit-card text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Anual Donation Received({yy})</p>
                      <Card.Title as="h4">{dashApi.anuallyDonationSum}</Card.Title>
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
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>Add New Student</b> <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12" >
                  <DonationAdd />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Today's Donation Received({d.getDate()}-{mm}-{d.getFullYear()})<br></br><b className="flaticon-down-arrow-1">Total RS: {dashApi.dailyDonationSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdDonations metaData="/dashboardapi" detail="Today's Donation Received" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Monthly Donation Received({mm})<br></br><b className="flaticon-down-arrow-1">Total RS: {dashApi.monthlyDonationSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdDonations metaData="/dashboardapi" detail="Monthly Donation Received" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Annual Donation Received({yy})<br></br><b className="flaticon-down-arrow-1">Total RS: {dashApi.anuallyDonationSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdDonations metaData="/dashboardapi" detail="Annual Donation Received" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><br></br><b className="flaticon-down-arrow-1">Donation History</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdDonations metaData="" detail="Donation History" />
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

export default Donations