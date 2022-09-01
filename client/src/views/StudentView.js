import StudentCard from "./StudentCard";
import StudentReportInfo from "./StudentReportPersonal";
import StudentReportFee from "./StudentReportFee";
import StudentReportExam from "./StudentReportExam";
import StudentReportTerminalExam from "./StudentReportTerminalExam";
import { useParams, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const StudentView = () => {
  const API_URL = "http://localhost:8001";
  const authToken = localStorage.getItem("authToken");
  const params = useParams();
  const stdId = params.id;
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/student/${stdId}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      setData(res.data);
    };

    fetchData();
    document.querySelector("#pills-profile-tab").click();
  }, []);

  return (
    <div className="page-inner">
      <div className="row">
        <div className="col-md-4">
          <StudentCard stdId={stdId} />
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <ul
                className="nav nav-pills nav-secondary"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item submenu">
                  <Link
                    className="nav-link show"
                    id="pills-profile-tab"
                    to={`/admin/StudentView/${stdId}/personal`}
                  >
                    <i className="far fa-arrow-alt-circle-down" /> Profile
                  </Link>
                </li>
                <li className="nav-item submenu">
                  <Link
                    className="nav-link show"
                    id="pills-profile-tab"
                    to={`/admin/StudentView/${stdId}/fee`}
                  >
                    <i className="far fa-arrow-alt-circle-down" /> Fees
                  </Link>
                </li>
                <li className="nav-item submenu">
                  <Link
                    className="nav-link show"
                    id="pills-profile-tab"
                    to={`/admin/StudentView/${stdId}/exam/monthly`}
                  >
                    <i className="far fa-arrow-alt-circle-down" /> Monthly Exams
                  </Link>
                </li>
                <li className="nav-item submenu">
                  <Link
                    className="nav-link show"
                    id="pills-profile-tab"
                    to={`/admin/StudentView/${stdId}/exam/terminal`}
                  >
                    <i className="far fa-arrow-alt-circle-down" /> Terminal
                    Exams
                  </Link>
                </li>
              </ul>
              <Switch>
                <Route
                  path="/admin/StudentView/:id/personal"
                  render={(props) => (
                    <StudentReportInfo {...props} stdData={data} />
                  )}
                  key="personal"
                />
                <Route
                  path="/admin/StudentView/:id/fee"
                  render={(props) => (
                    <StudentReportFee {...props} stdData={data} />
                  )}
                  key="fee"
                />
                <Route
                  path="/admin/StudentView/:id/exam/monthly"
                  render={(props) => (
                    <StudentReportExam {...props} stdData={data} />
                  )}
                  key="exam"
                />
                <Route
                  path="/admin/StudentView/:id/exam/terminal"
                  render={(props) => (
                    <StudentReportTerminalExam {...props} stdData={data} />
                  )}
                  key="exam"
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      {/*end row */}
    </div>
  );
};

export default StudentView;