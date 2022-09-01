import React, { useEffect, useState } from "react";
import axios from 'axios'
import TdMonthlyResults from "../components/datatables/ResultsMonthly";
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
  const authToken = localStorage.getItem("authToken");
 

  
  function AutoResultsGenerator() {
    const callAutoApiResult = async () => {
      try {        
        const response = await axios.get("/GenerateResults", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          }
        });
        if (response.data !== "Already Generated Monthly Result")
          {
            swal("Great job!", `${response.data.length} Results has been Generated!`, "success");
            Fees(); //render the current page to see new changes          
          }
        else
          swal("Error!", `Already Generated Results of the Month ${mm}!`, "error");
          
      } catch (err) {
        console.log(err);
      }
    }
    callAutoApiResult();    
  };


  return (
    <>
      <Container fluid>
        <Row>
           <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">
                    <b className="flaticon-down-arrow-1">
                      Automatic Generate Results<br></br></b></h2>
                  <p>One of the Best feature Regarding Auto Generate Whole Maddarasa Students Results in just one click.
                    All Results are set Automatically as Dummy, after Teacher can edit the results. 
                  </p>
                  <center>
                    <Button
                      className="text-center btn-fill pull-right"
                      type="submit"
                      variant="primary"
                      onClick={() => AutoResultsGenerator()}>
                      <i className="fa fa-edit"></i>
                      Auto Generate Reasults
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
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><br></br><b className="flaticon-down-arrow-1">Results</b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdMonthlyResults metaData="" detail="Results" />
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