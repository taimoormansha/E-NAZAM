import React, { useEffect, useState } from "react";
import TdCourses from "../components/datatables/courses";//All Table Data Courses 
import CourseAdd from "../components/Forms/coursesAdd";
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



const Courses = () => {


  return (
    <>
      <Container fluid>
        <Row>
        
          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5"><b>Add New Course</b> <i className="flaticon-down-arrow-1"></i></h2>
                </div>
                <Col lg="12" sm="12" >
                  <CourseAdd />
                  <br />
                </Col>
              </div>
            </div>
          </Col>

          <Col md='12' sm='12' lg='12'>
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="card-header bg-transparent">
                  <h2 className="text-center border-primary rounded p-2 border-bottom mb-4 border-5">All Courses<br></br><b className="flaticon-down-arrow-1"></b></h2>
                </div>
                <Col lg="12" sm="12">
                  <TdCourses metaData="" detail="ALL Courses"  />
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

export default Courses