import React, { useEffect, useState } from "react";
import axios from 'axios'
import TdStudents from "../components/datatables/students"; //All Student DATA
import TdTeacher from '../components/datatables/teacher'; //All Teachers
import TdScholarship from "../components/datatables/scholarship";//All scholarships
import TdShobajaat from "../components/datatables/shobajaat";//All Shobajaat
import TdCourses from "../components/datatables/courses";//All Table Data Courses 
import TdRequest from "../components/datatables/requester"; //All Requesters
import TdDonor from "../components/datatables/donor";//All Donations Info

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


function Dashboard() {

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

  console.log(dashApi);

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
                      <i className="nc-icon nc-money-coins text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Expected Fee({mm})</p>
                      <Card.Title as="h4">{dashApi.expectedFeeSum}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
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
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Fee Received({mm})</p>
                      <Card.Title as="h4">{dashApi.receivedFeeSum}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
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
                      <i className="nc-icon nc-money-coins text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Receiveable({mm})</p>
                      <Card.Title as="h4">{dashApi.remainingFeeSum}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
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

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-alert"></i>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Today's Madarrasa Expendetures({d.getDate()}-{mm}-{yy})</p>
                      <Card.Title as="h4">{dashApi.dailyExpendeturesSum}</Card.Title>
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
                      <i className="nc-icon nc-money-coins text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Monthly Madarrasa Expendetures({mm})</p>
                      <Card.Title as="h4">{dashApi.monthlyExpendeturesSum}</Card.Title>
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
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Anually Madarrasa Expendetures({yy})</p>
                      <Card.Title as="h4">{dashApi.anuallyExpendeturesSum}</Card.Title>
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

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Students</p>
                      <Card.Title as="h4">{dashApi.totalStudentSum}</Card.Title>
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
                      <i className="nc-icon nc-single-02 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Present Students</p>
                      <Card.Title as="h4">{dashApi.presentStudentSum}</Card.Title>
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
                      <i className="nc-icon nc-single-02 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Absent Students</p>
                      <Card.Title as="h4">{dashApi.absentStudentSum}</Card.Title>
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
                      <i className="nc-icon nc-badge text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Staff</p>
                      <Card.Title as="h4">{dashApi.totalStaffSum}</Card.Title>
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
                      <i className="nc-icon nc-badge text-alert"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Present Staff</p>
                      <Card.Title as="h4">{dashApi.totalPresentStaffSum}</Card.Title>
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
                      <i className="nc-icon nc-badge text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Absent Staff</p>
                      <Card.Title as="h4">{dashApi.totalAbsentStaffSum}</Card.Title>
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
        </Row>

        <Row>
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Student Quick Search <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdStudents metaData="" detail="All  Students" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Teacher Quick Search <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdTeacher metaData="" detail="ALL Teachers" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Shobajaat Quick Search <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdShobajaat metaData="" detail="ALL Shobajaat" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Courses Quick Search <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdCourses metaData="" detail="ALL Courses" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Scholarship Quick Search <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdScholarship metaData="" detail="ALL Scholarships" />
                  <br />
                </Col>
              </div>
            </div>
          </Col> 
          
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Requests Quick Search <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdRequest metaData="" detail="ALL Requests" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Donations Quick Search <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdDonor metaData="" detail="ALL Donations" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

        </Row>       
      </Container>
    </>
  );
}

export default Dashboard;
