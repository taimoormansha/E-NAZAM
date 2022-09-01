import React, { useEffect, useState } from "react";
import axios from 'axios';
import TdScholarship from '../components/datatables/scholarship'
import AddScholarship from '../components/Forms/scholarshipAdd'
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

const Teachers = () => {

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
                <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">Add New Scholarships <br></br><b className="flaticon-down-arrow-1"></b></h2>
              </div>
              <Col lg="12" sm="12">
                <AddScholarship />
                <br />
              </Col>
            </div>
          </div>
        </Col> 

        <Col md='12' sm='12' lg='12'>
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="card-header bg-transparent">
                <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>All Available Scholarships</b> <i className="flaticon-down-arrow-1"></i></h2>
              </div>
              <Col lg="12" sm="12">
                <TdScholarship metaData="" detail="ALL Available Scholarships" />
                <br />
              </Col>
            </div>
          </div>
        </Col>
      </Row >
    </Container >
  )
}

export default Teachers;