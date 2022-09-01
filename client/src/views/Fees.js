import React, { useEffect, useState } from "react";
import axios from 'axios'
import TdFeeHistory from "../components/datatables/FessHistory";
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


const Fees = () => {

  const [IsChange, setChange] = useState(false) //for render our page for updated data

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

  }, [IsChange])

  
  function AutoGenerateFeeChallans() {
    const callAutoApiFee = async (data) => {
      try {

        const response = await axios.get("/GenerateFeeChallans", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          }
        });
        if (response.data !== "Already Generated this month challans") {
          swal("Great job!", `${response.data.length} Challans has been Generated!`, "success");
          Fees(); //render the current page to see new changes

        }
        else
          swal("Error!", `Already Generated challans of the Month ${mm}!`, "error");

      } catch (err) {
        console.log(err);
      }
    }
    callAutoApiFee();
  };


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

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">
                    <b className="flaticon-down-arrow-1">
                      Automatic Generate Fee Challans<br></br></b></h2>
                  <p>One of the Best feature Regarding Auto Generate Whole Maddarasa Students Fee Challans in just one click.
                    All Challans are set Automatically. Scholarship holder Student Fee is auto Adjust according to their
                    Scholarship Fee Concession Plan.
                  </p>
                  <center>
                    <Button
                      className="text-center btn-fill pull-right"
                      type="submit"
                      variant="primary"
                      onClick={() => AutoGenerateFeeChallans()}>
                      <i className="fa fa-edit"></i>
                      Auto Generate Fee Challans
                    </Button>
                  </center>
                </div>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Fee Received({mm})<br></br><b className="flaticon-down-arrow-1">Total Rs: {dashApi.receivedFeeSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdFeeHistory metaData="/dashboardapi" detail="Fee Received" month={mm} />
                  <br />
                </Col>
              </div>
            </div>
          </Col>
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Fee Receivable({mm})<br></br><b className="flaticon-down-arrow-1">Total Rs: {dashApi.remainingFeeSum}</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdFeeHistory metaData="/dashboardapi" detail="Receivable Fee" month={mm} />
                  <br />
                </Col>
              </div>
            </div>
          </Col>
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><br></br><b className="flaticon-down-arrow-1">Fee History</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdFeeHistory metaData="" detail="Fee History" month={mm} />
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

export default Fees