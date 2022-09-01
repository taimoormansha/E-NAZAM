import React, { useEffect, useState } from "react";
import axios from 'axios';
import TdShobajaat from '../components/datatables/shobajaat' 
import AddShoba from '../components/Forms/ShobajaatAdd'
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
} from "react-bootstrap";

const Shobajaat = () => {

  const [teacherAct, setTeacherAct] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      var res = await axios.get("/teacher?isActive=Yes", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });
      setTeacherAct(res.data)
    }
    fetchData();
  }, [])
  console.log(teacherAct);

  return (
    <Container fluid>
      <Row>

        <Col md='12' sm='12' lg='12'>
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="card-header bg-transparent">
                <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Add New Shobajaat <br></br><b className="flaticon-down-arrow-1"></b></h2>
              </div>
              <Col lg="12" sm="12">
                <AddShoba />
                <br />
              </Col>
            </div>
          </div>
        </Col>

        <Col md='12' sm='12' lg='12'>
          <div className="card shadow-lg">
            <div className="card-body">              
              <div className="card-header bg-transparent">
                <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>All Shobajaat</b> <i className="flaticon-down-arrow-1"></i></h2>
              </div>
              <Col lg="12" sm="12">
                <TdShobajaat metaData="" detail="All Shobajaat" />
                <br />
              </Col>
            </div>
          </div>
        </Col>
      </Row >
    </Container >
  )
}

export default Shobajaat;