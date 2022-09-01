import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";
import "./StudentCard.css";
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

const StudentCard = ({ stdId }) => {
  const API_URL = "http://localhost:8001";
  const authToken = localStorage.getItem("authToken");
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/student/${stdId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="col-sm-8 offset-sm-2 col-md-12 offset-md-1  col-lg-12">
      <div className="profile-card card rounded-lg shadow p-4 p-xl-5 mb-4 text-center position-relative overflow-hidden">
        <div className="banner" />
        <img
          src="https://cmaexclusiveclasses.com/cms/uploads/3_1617275538passed_students-user-dummy-200x200.png"
          alt=""
          className="img-circle mx-auto mb-3"
        />
        <h3 className="mb-4">{data.name}</h3>
        <div className="mb-4">
          <p className="mb-2">
            <b>Roll No:</b> {data.rollno}
          </p>
          <p className="mb-2">
            <b>Shoba:</b> {data.shobaName}
          </p>
          <p className="mb-2">{data.mobile}</p>
          <p className="mb-2">{data.gender}</p>
          <hr />
          <br />
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
