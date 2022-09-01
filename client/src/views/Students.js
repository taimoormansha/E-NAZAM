import React, { useEffect, useState } from "react";
import axios from "axios";
import TdStudents from "../components/datatables/students"; //All Student DATA
import StudentFrmAdd from "../components/Forms/studentFrmAdd" //add new student
import { useParams, Switch, Route, Link } from "react-router-dom";

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
} from "react-bootstrap";

const Students = () => {

  const[change , setChange] = useState(false);// for update data 

  const [studentAct, setStudent] = useState([]);
  const [studentNotAct, setStudentNotAct] = useState([]);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      var res = await axios.get("/student?isActive=student", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });

      const res1 = await axios.get("/student?isActive=discharged", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });

      setStudent(res.data)
      setStudentNotAct(res1.data)
    }

    fetchData();

  }, [])

  console.log(studentAct);
  console.log(studentNotAct);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>Add New Student</b> <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12" >
                  <StudentFrmAdd  />
                  <br />
                </Col>
              </div>
            </div>
          </Col>
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">               
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>All Active Students</b> <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12" >
                  <TdStudents metaData="?isActive=student" detail="Active Students"  />
                  <br />
                </Col>
              </div>
            </div>
          </Col>
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>All Discharged Students</b> <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12" >
                  <TdStudents metaData="?isActive=discharged" detail="Discharged Students" />
                  <br />
                </Col>
              </div>
            </div>
          </Col>
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>All Students</b> <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12" >
                  <TdStudents metaData="" detail="ALL Students"  />
                  <br />
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </Container>  
      </>
  );
};

export default Students;
