import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useReactToPrint } from "react-to-print";

import StudentCard from "./StudentCard";
import { Col, Container, Row } from "react-bootstrap";

const StudentReportInfo = ({ stdData }) => {
  const API_URL = "http://localhost:8001";
  const authToken = localStorage.getItem("authToken");
  const [data, setData] = useState({});
  const params = useParams();

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/student/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      setData(res.data);
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
        <div className="card-header text-center">
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
          <div className="logo-img d-flex justify-content-center">
            <hr/>
            <img
              style={{ width: "530px", height:"140px" }}
              src={require("assets/img/logo.png")}
              alt="..."
            />
          </div>
         
          {/* <h2 style={{ textAlign: "center" }}>Idara Ma'arif ul Quran</h2> */}
          <div>
            <h3 className="bg-info bg-gradient text-center text-white pb-2 fw-bold ">
              Student Personal Detail
            </h3>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">Roll No: </div>
              <div className="col-8">{data.rollno}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">Name: </div>
              <div className="col-8">{data.name}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">Father's Name: </div>
              <div className="col-8">{data.fatherName}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">
                Father's Occupation:{" "}
              </div>
              <div className="col-8">{data.fatherOccupation}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">Date of Birth: </div>
              <div className="col-8">{new Date(data?.dateOfBirth).toDateString()}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">Shoba: </div>
              <div className="col-8">{data.shobaName}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">
                Monthly Fees Discount:{" "}
              </div>
              <div className="col-8">{data.scholarship ?? "NA"}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">Gender: </div>
              <div className="col-8 text-uppercase">{data.gender}</div>
            </div>
            <h3 className="bg-info bg-gradient text-center text-white pb-2 fw-bold mt-3">
              Previous Academic Information
            </h3>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">
                School Qualification:{" "}
              </div>
              <div className="col-8">{data.schoolQualification}</div>
            </div>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">
                Islamic Qualification:
              </div>
              <div className="col-8">{data.islamicQualification}</div>
            </div>
            <h3 className="bg-warning bg-gradient text-center text-white pb-2 fw-bold mt-3">
              Contact Detail
            </h3>
            <div className="row border-bottom p-3">
              <div className="col-4 font-weight-bold">Student Contact: </div>
              <div className="col-8">{data.mobile}</div>
            </div>
          </div>
        </Container>
        {/*end profile */}
      </div>
    </div>
  );
};

export default StudentReportInfo;