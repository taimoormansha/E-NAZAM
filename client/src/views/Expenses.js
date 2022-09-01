import React, { useEffect, useState } from "react";
import axios from 'axios'
import TdExpendetures from "../components/datatables/Expensetures";
import AddExpendeture from "../components/Forms/expensesAdd"
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


const Expenses = (props) => {

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

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Add New Expendeture <br></br><b className="flaticon-down-arrow-1"></b></h2>                  
                </div>
                <Col lg="12" sm="12">
                  <AddExpendeture  />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Today's Expendetures({d.getDate()}-{mm}-{yy}) <br></br><b className="flaticon-down-arrow-1">Total Rs: {dashApi.dailyExpendeturesSum}</b></h2>                  
                </div>
                <Col lg="12" sm="12">
                  <TdExpendetures metaData="/dashboardapi" detail="Today's Expendetures" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Monthly Expendetures({mm})<br></br><b className="flaticon-down-arrow-1">Total Rs: {dashApi.monthlyExpendeturesSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdExpendetures metaData="/dashboardapi" detail="Monthly Expendetures" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Yearly Expendetures({yy})<br></br><b className="flaticon-down-arrow-1">Total Rs: {dashApi.anuallyExpendeturesSum}</b></h2>                 
                </div>
                <Col lg="12" sm="12">
                  <TdExpendetures metaData="/dashboardapi" detail="Yearly Expendetures" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Expendetures History<br></br></h2>                  
                </div>
                <Col lg="12" sm="12">
                  <TdExpendetures metaData="" detail="Expendetures History" />
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

export default Expenses