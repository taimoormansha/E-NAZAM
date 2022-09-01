import axios from "axios";
import AuthContext from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const Users = (probs) => {
  const { user, getUsers } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  // const [msg, setMsg] = useState("");
  // const { signin } = useAuth();

  const host = "http://localhost:8001";
  const authToken = localStorage.getItem("authToken");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUsers().then((res) => {
        setData(res.data);
        setLoading(false);
      });
    };

    fetchData();
  }, []);

  const handleApprove = async (e, idUser, isApproved) => {
    try {
      const response = await axios.post(
        `${host}/user/approve/id/${idUser}`,
        { isApproved },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );
      e.target.classList.remove(isApproved ? "btn-warning" : "btn-info");
      e.target.classList.add(isApproved ? "btn-info" : "btn-warning");
      e.target.innerText = !isApproved ? "Disapprove" : "Approve";
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (e, idUser) => {
    try {
      const response = await axios.delete(`${host}/user/id/${idUser}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (response.data?.success) {
        e.target.closest("tr").remove();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">
          <b>Users</b>
        </h3>
        <hr />
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-head-bg-success table-striped">
            <thead>
              <tr className="bg-dark table-bordered">
                <th scope="col">
                  <h4 className="text-center my-1">
                    <b className="text-white">#</b>
                  </h4>
                </th>
                <th scope="co1">
                  <h4 className="text-center my-1">
                    <b className="text-white">Name</b>
                  </h4>
                </th>
                <th scope="co2">
                  <h4 className="text-center my-1">
                    <b className="text-white">Email</b>
                  </h4>
                </th>
                <th scope="co4">
                  <h4 className="text-center my-1">
                    <b className="text-white">Created On</b>
                  </h4>
                </th>
                <th scope="co5">
                  <h4 className="text-center my-1">
                    <b className="text-white">Actions</b>
                  </h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString(
                        undefined,
                        options
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className={`btn btn-${
                          !!user.isApproved ? "warning" : "info"
                        } btn-border btn-round btn-sm mx-1`}
                        onClick={(e) =>
                          handleApprove(e, user._id, !!user.isApproved)
                        }
                      >
                        {!!user.isApproved ? "Disapprove" : "Approve"}
                      </button>
                      <button
                        className={`btn btn-danger btn-border btn-round btn-sm mx-1`}
                        onClick={(e) => handleRemove(e, user._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;