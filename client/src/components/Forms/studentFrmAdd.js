import "./studentFrmAdd.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from 'sweetalert';

function StudentFrmAdd() {

  const [shoba, setShoba] = useState([]);
  const [scholarship, setScholarship] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      const scholarship = await axios.get("/Scholarship", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });

      const shoba = await axios.get("/shobajaat", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });

      setShoba(shoba.data)
      setScholarship(scholarship.data)
    }

    fetchData();

  }, [])


  const AddStudent = async (data) => {
    try {
      // const id = parseInt(data.teacherID); //convert String ID into Numbers
      const student = await axios.get(`/student?rollno=${data.rollno}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        }
      });

      console.log(student.data);

      if (!(student.data.length >= 1)) {

        const response = await axios.post(`/student`, data, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          }
        });
        console.log(response.data);
        swal("Good Job!", `${data.name}'s Record has been added!`, "success");
        props.stateChanger(true); //for render component purpose
        reset(); //form reset
      }
      else swal("Duplicated Data!", `Record has been already found on ID: ${data.rollno}`, "error");

    } catch (err) {
      swal("Server Error!", err, "error");
    }
  }


  let shobaList = shoba.length > 0 //For Dynamic Select Options
    && shoba.map((item, i) => {
      return (
        <option value={item.shobaName}>{item.shobaName}</option>
      )
    }, this);

  let scholarshipList = scholarship.length > 0 //For Dynamic Select Options
    && scholarship.map((item, i) => {
      return (
        <option value={item.scholarshipTitle}>{item.scholarshipTitle}</option>
      )
    }, this);

  //console.log(shoba);
  //console.log(scholarship);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    AddStudent(data);
  };

  // console.log(watch());

  // console.log(errors.name)

  return (
    <div className="container pt-5">
      <div className="row justify-content-sm-center pt-0">
        <div className="col-sm-10 shadow round pb-3 backgroundColor ">
          <h1 className="text-center pt-3 text-secondary">Student Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="row">
              <div className=" col-md-3"> { /* Roll NO */}
                <label className="col-form-label">Roll No:</label>
                <input
                  type="text"
                  className={`form-control ${errors.rollno && "invalid"}`}
                  {...register("rollno", {
                    required: "Roll No is Required",
                    min: {
                      value: 1,
                      message: "Minimum Required Roll No is 1",
                    },
                    max: {
                      value: 99999,
                      message: "Maximum allowed Roll No is 99999",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Only numbers are allowed",
                    }
                  })}
                  onKeyUp={() => {
                    trigger("rollno");
                  }}
                  placeholder="Enter Roll No"
                />
                {errors.rollno && (
                  <small className="text-danger">{errors.rollno.message}</small>
                )}
              </div>

              <div className=" col-md-9"> { /* Name */}
                <label className="col-form-label">Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.name && "invalid"}`}
                  {...register("name", {
                    required: "Name is Required",
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "Invalid Name",
                    }
                  })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                  placeholder="Enter Name"
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6"> { /* Father Name */}
                <label className="col-form-label">Father Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.fatherName && "invalid"}`}
                  {...register("fatherName", {
                    required: "Father Name is Required",
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "Invalid Name",
                    }
                  })}
                  onKeyUp={() => {
                    trigger("fatherName");
                  }}
                  placeholder="Enter Father Name"
                />
                {errors.fatherName && (
                  <small className="text-danger">{errors.fatherName.message}</small>
                )}

              </div>

              <div className="form-group col-md-6"> { /* Father Occupation */}
                <label className="col-form-label">Father Occupation:</label>
                <input
                  type="text"
                  className={`form-control ${errors.fatherOccupation && "invalid"} `}
                  {...register("fatherOccupation", {
                    //required: "Father Occupation is Required" ,
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "Invalid String",
                    }

                  })}
                  onKeyUp={() => {
                    trigger("fatherOccupation");
                  }}
                  placeholder="Enter Father Occupation"
                />
                {errors.fatherOccupation && (
                  <small className="text-danger">{errors.fatherOccupation.message}</small>
                )}
              </div>
            </div>

            <div className="row">
              <div className=" col-md-4 "> { /* Gender  */}
                <label for="gender">Choose Gender:</label>
                <select
                  className={`form-control ${errors.gender && "invalid"}`}
                  {...register("gender", { required: "Gender is Required" })}
                  onKeyUp={() => {
                    trigger("gender");
                  }}>

                  <option value="Male">Male</option>
                  <option value="Female">Female</option>

                </select>
                {errors.gender && (
                  <small className="text-danger">{errors.gender.message}</small>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6"> { /*Email*/}
                <label className="col-form-label">Email:</label>
                <input
                  type="text"
                  className={`form-control ${errors.email && "invalid"}`}
                  {...register("email", {
                    //required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    }
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>

              <div className="form-group col-md-6">  {/*Mobile*/}
                <label className="col-form-label">Mobile:</label>
                <input
                  type="text"
                  className={`form-control ${errors.mobile && "invalid"}`}
                  {...register("mobile", {
                    required: "mobile is Required",
                    pattern: {
                      value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                      message: "Invalid mobile no",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("mobile");
                  }}
                  placeholder="Enter Mobile"
                />
                {errors.mobile && (
                  <small className="text-danger">{errors.mobile.message}</small>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6"> { /* Islamic Qualification */}
                <label className="col-form-label">Islamic Qualification:</label>
                <input
                  type="text"
                  className={`form-control ${errors.islamicQualification && "invalid"} `}
                  {...register("islamicQualification", {
                    //required: "Islamic Qualification is Required" ,
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "Invalid Name",
                    }
                  })}
                  onKeyUp={() => {
                    trigger("islamicQualification");
                  }}
                  placeholder="Enter Islamic Qualification"
                />
                {errors.islamicQualification && (
                  <small className="text-danger">{errors.islamicQualification.message}</small>
                )}
              </div>

              <div className="form-group col-md-6"> { /* School Qualification */}
                <label className="col-form-label">School Qualification:</label>
                <input
                  type="text"
                  className={`form-control ${errors.shobaNamefication && "invalid"} `}
                  {...register("schoolQualification", {
                    // required: "School Qualification is Required",
                    pattern: {
                      value: /[A-Za-z]/,
                      message: "Invalid Name",
                    }
                  })}

                  onKeyUp={() => {
                    trigger("schoolQualification");
                  }}
                  placeholder="Enter School Qualification"
                />
                {errors.schoolQualification && (
                  <small className="text-danger">{errors.schoolQualification.message}</small>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-8"> { /* Shoba  */}
                <label for="shoba">Choose Shoba:</label>
                <select
                  className={`form-control ${errors.shobaName && "invalid"}`}
                  {...register("shobaName", { required: "Shoba is Required" })}
                  onKeyUp={() => {
                    trigger("shobaName");
                  }}>
                  {shobaList}

                </select>
                {errors.shobaName && (
                  <small className="text-danger">{errors.shobaName.message}</small>
                )}
              </div>

              <div className="form-group col-md-4"> { /* Scholarship  */}
                <label for="scholarship">Choose Scholarship:</label>
                <select
                  className={`form-control ${errors.scholarship && "invalid"}`}

                  {...register("scholarship", {
                    //required: "Scholarship is Required" 
                  })}
                  onKeyUp={() => {
                    trigger("scholarship");
                  }}>
                  <option value="NA">NA</option>
                  {scholarshipList}

                </select>
                {errors.scholarship && (
                  <small className="text-danger">{errors.scholarship.message}</small>
                )}

              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6"> { /* IsLocal  */}
                <label for="isLocal">Is Local?</label>
                <select
                  className={`form-control ${errors.isLocal && "invalid"}`}
                  {...register("isLocal", { required: "Required" })}
                  onKeyUp={() => {
                    trigger("isLocal");
                  }}>

                  <option value="local">local</option>
                  <option value="hostel">hostel</option>

                </select>
                {errors.isLocal && (
                  <small className="text-danger">{errors.isLocal.message}</small>
                )}
              </div>

              <div className="form-group col-md-6"> { /* Is Active */}
                <label for="isActive">Is Active?</label>
                <select
                  className={`form-control ${errors.isActive && "invalid"}`}
                  {...register("isActive", { required: "Required" })}
                  onKeyUp={() => {
                    trigger("isActive");
                  }}>

                  <option value="student">Student</option>
                  <option value="discharged">discharged</option>

                </select>
                {errors.isActive && (
                  <small className="text-danger">{errors.isActive.message}</small>
                )}
              </div>
            </div>

            <div className="row">
              <div className=" col-md-6"> { /* DOB */}
                <label className="col-form-label">Date-of-Birth:</label>
                <input
                  type="date"
                  className={`form-control ${errors.dateOfBirth && "invalid"}`}
                  {...register("dateOfBirth", {
                    required: "Date-of-Birth is Required",
                  })}
                  onKeyUp={() => {
                    trigger("dateOfBirth");
                  }}
                  placeholder="Enter Date-of-Birth"
                />
                {errors.dateOfBirth && (
                  <small className="text-danger">{errors.dateOfBirth.message}</small>
                )}
              </div>
            </div>

            {/* {<div className="form-group">
              <label className="col-form-label">Message:</label>
              <textarea
                className={`form-control ${errors.message && "invalid"}`}
                {...register("message", {
                  required: "Message is Required",
                  minLength: {
                    value: 10,
                    message: "Minimum Required length is 10",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum allowed length is 50 ",
                  }
                })}
                onKeyUp={() => {
                  trigger("message");
                }}
              ></textarea>
              {errors.message && (
                <small className="text-danger">{errors.message.message}</small>
              )}
            </div>} */}

            <input
              type="submit"
              className="btn btn-primary my-3"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentFrmAdd;
