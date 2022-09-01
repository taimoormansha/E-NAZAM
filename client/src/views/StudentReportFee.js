import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

import StudentCard from "./StudentCard";

const StudentReportFee = ({ stdData }) => {
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
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get(`${API_URL}/FeeHistory/student/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

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
            </span>{" "}
            Print
          </button>{" "}
        </div>

        <Container ref={printRef}>
          <div>
            <br></br>
          </div>
          <div className="logo-img d-flex justify-content-center">
            <img
               style={{ width: "530px", height:"140px" }}
              src={require("assets/img/logo.png")}
              alt="..."
            />
          </div>
          {/* <h4 className="my-1" style={{ textAlign: "center" }}>
            ABC School
          </h4>
          <h6 style={{ textAlign: "center" }}>Contact # 090078601</h6> */}
          <Container className="my-3">
            <Row>
              <Col xs={3} className="font-weight-bold">
                Registration No:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData?.rollno}
              </Col>
            </Row>
            <Row>
              <Col xs={3} className="font-weight-bold">
                Student Name:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData?.name}
              </Col>
            </Row>
            <Row>
              <Col xs={3} className="font-weight-bold">
                Father's Name:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData?.fatherName}
              </Col>
            </Row>
            <Row>
              <Col xs={3} className="font-weight-bold">
                Shoba:
              </Col>
              <Col xs={6} className="border-bottom">
                {stdData?.shobaName}
              </Col>
            </Row>
          </Container>
          <Table striped bordered hover size="sm" className="mt-3">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>             
              <tr>
                <th>Fee</th>
                <td>{data?.Fee}</td>
              </tr>
              <tr>
                <th>Discount</th>
                <td>{data?.Discount}</td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>{data?.totalFee}</td>
              </tr>
              <tr>
                <th>Challan Generated Date</th>
                <td>{new Date(data?.createdAt).toDateString()}</td>
              </tr>
              <br></br>
              <br></br>

              <tr>
                <th>Receipt # </th>
                <td>{data?.receiptNo || "Not Paid"}</td>
              </tr>
             
              <tr>
                <th>Challan Status</th>
                <td>{data?.isPaid}</td>
              </tr>           
             

              <tr>
                <th>Paid Date</th>
                <td>{(data?.isPaid === "UnPaid") || new Date(data?.updatedAt).toDateString()}</td>
              </tr>

              <tr>
                <th>Remarks</th>
                <td>{data?.Remarks}</td>
              </tr>
              
            </tbody>
            {/* <thead>
              <tr>
                <th>Months</th>
                <th>Receipt #</th>
                <th>Fees</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.map((feeHistory, idx) => (
                  <tr key={idx}>
                    <th>{MONTH[new Date(feeHistory.createdAt).getMonth()]}</th>
                    <td>{feeHistory.receiptNo}</td>
                    <td>{feeHistory.totalFee}</td>
                    <td>{new Date(feeHistory.createdAt).toDateString()}</td>
                  </tr>
                ))}
            </tbody> */}
          </Table>
        </Container>
        {/*end fees */}
      </div>
    </div>
  );
};

export default StudentReportFee;