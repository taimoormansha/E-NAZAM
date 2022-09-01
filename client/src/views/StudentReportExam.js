import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Card, Table } from "react-bootstrap";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import swal from 'sweetalert';

import StudentCard from "./StudentCard";
import { CardBody } from "reactstrap";

const d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const mm = months[d.getMonth()]; //current month
const yy = d.getFullYear(); //current month


const StudentReportExam = ({ stdData }) => {

  const API_URL = "http://localhost:8001";
  const authToken = localStorage.getItem("authToken");
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);
  const [avg, setAvg] = useState(0);
  const [obtainedMarks, setObtainedMarks,] = useState(0);
  const [loading, setLoading] = useState(true);
  const monthlyResult = [];
  const params = useParams();
  const printRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/resultsMonthly?rollNo=${stdData.rollno}&monthYear=${(new Date().getFullYear()).toString() + (new Date().getMonth()).toString()}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      })

      setAllData(res.data[0]);
      setData(res.data[0].StudentResults)
      setLoading(false)
      console.log(res.data[0].StudentResults);
    };


    CalculateMarks();
    fetchData();
  }, [loading]);


  let CalculateMarks = () => {
    let total = 0, obtain = 0;

    for (let i = 0; i < data?.length; i++) {
      total += data[i]?.totalMarks;
      obtain += data[i]?.obtainedMarks;
    }

    setTotalMarks(total)
    setObtainedMarks(obtain);
    setAvg((obtain * 100.0) / total);
  }
  //CalculateMarks //calculate Marks 

  return (
    <div className="tab-content mt-2 mb-3" id="pills-tabContent">
      <div
        className="tab-pane active show animated fadeInDown"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <div className="card-header text-center my-2">
          <button
            onClick={handlePrint}
            className="btn btn-info btn-border btn-round btn-sm"
          >
            <span className="btn-label">
              <i className="fa fa-print" />
            </span>
            Print
          </button>
        </div>

        <Container ref={printRef}>
          <br></br>
          <div className="logo-img d-flex justify-content-center">            
            <img
              style={{ width: "530px", height: "140px" }}
              src={require("assets/img/logo.png")}
              alt="..."
            />
          </div>
          {/* <h4 className="my-1" style={{ textAlign: "center" }}>
            ABC School
          </h4>
          <h6 style={{ textAlign: "center" }}>Contact # 090078601</h6> */}
          <div className="d-flex justify-content-center">            
           <h3 style={{ color: "red" }}><b><u>Monthly Exams</u></b></h3> 
          </div>
          <br></br>

          <Container className="my-3">
            <Row>
              <Col xs={3} className="font-weight-bold">
                Registration No:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData.rollno}
              </Col>
            </Row>
            <Row>
              <Col xs={3} className="font-weight-bold">
                Student Name:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData.name}
              </Col>
            </Row>
            <Row>
              <Col xs={3} className="font-weight-bold">
                Father's Name:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData.fatherName}
              </Col>
            </Row>
            <Row>
              <Col xs={3} className="font-weight-bold">
                Shoba:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData.shobaName}
              </Col>
            </Row>
            <Row>
              <Col xs={3} className="font-weight-bold">
                Exam Date:
              </Col>
              <Col xs={6} className="border-bottom">
                {new Date(allData?.createdAt).toDateString()}
              </Col>
            </Row>
          </Container>
          <br></br>
          <Table striped bordered hover size="sm" className="mt-3">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                  <th>English</th>
                  <td>100</td>
                  <td>79</td>
                </tr> */}

              {
                data?.map((item) => (
                  <tr key={item?._id}>
                    <td>{item?.courseTitle}</td>
                    <td>{item?.totalMarks}</td>
                    <td>{item?.obtainedMarks}</td>
                  </tr>
                ))
              }

              {/* {StudentMarks} */}

              <br></br>
              <br></br>
            </tbody>
          </Table>

          <Row>
            <Col xs={3} className="font-weight-bold">
              Obtained Marks:
            </Col>
            <Col xs={3} className="border-bottom">
              {obtainedMarks}
            </Col>
          </Row>

          <Row>
            <Col xs={3} className="font-weight-bold">
              Total Marks:
            </Col>
            <Col xs={3} className="border-bottom">
              {totalMarks}
            </Col>
          </Row>

          <Row>
            <Col xs={3} className="font-weight-bold">
              Average :
            </Col>
            <Col xs={3} className="border-bottom">
              {avg}%
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col xs={3} className="font-weight-bold">
              Nazam Remarks :
            </Col>
            <Col xs={6} className="border-bottom">

            </Col>
          </Row>
          <br></br>

          <Row>
            <Col xs={3} className="font-weight-bold">
              Nazam Signature :
            </Col>
            <Col xs={6} className="border-bottom">

            </Col>
          </Row>

          <br></br>

          <Row>
            <Col xs={3} className="font-weight-bold">
              Maddarasa Stamp :
            </Col>
            <Col xs={6} className="border-bottom">

            </Col>
          </Row>

        </Container>

      </div>
    </div>
  );
};

export default StudentReportExam;