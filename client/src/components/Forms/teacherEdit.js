import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';

function TeacherAdd(props) {
    const authToken = localStorage.getItem("authToken");

    const AddTeacher = async (data) => {
        try {
            // const id = parseInt(data.teacherID); //convert String ID into Numbers
            if ((data.email === props.obj.email) && (data.mobile === props.obj.mobile)) {
                const response = await axios.put(`/teacher/${props.obj._id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });
                console.log(response.data);
                swal("Good Job!", `${data.name}'s Record has been updated!`, "success");
                reset(); //form reset

            } else if (data.email === props.obj.email) {
                const duplicatedMobile = await axios.get(`/teacher?mobile=${data.mobile}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                })

                if (!(duplicatedMobile.data.length >= 1)) {
                    const response = await axios.put(`/teacher/${props.obj._id}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authToken,
                        }
                    });
                    console.log(response.data);
                    swal("Good Job!", `${data.name}'s Record has been updated!`, "success");
                    reset(); //form reset
                }
                else swal("Mobile No Duplicated!", `${data.mobile} is already in use`, "warning");
           
            } else if (data.mobile === props.obj.mobile) {

                const duplicatedEmail = await axios.get(`/teacher?email=${data.email}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                })

                if (!(duplicatedEmail.data.length >= 1)) {
                    const response = await axios.put(`/teacher/${props.obj._id}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authToken,
                        }
                    });
                    console.log(response.data);
                    swal("Good Job!", `${data.name}'s Record has been updated!`, "success");
                    reset(); //form reset
                }
                else swal("Email Duplicated!", `${data.email} is already in use`, "warning");
           
             } else swal("Email & Mobile Duplicated!", `${data.email} & ${data.mobile} are already in use`, "warning");


        } catch (err) {
            swal("Server Error!", err, "error");
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        AddTeacher(data);
    };

    // console.log(watch());

    // console.log(errors.name)

    return (
        <div className="pt-0 pb-5 pl-0 pr-0">
            <div className="row justify-content-sm-center pt-0">
                <div className="col-sm-10 shadow round pb-3 backgroundColor">
                    <h1 className="text-center pt-3 text-secondary">Edit Teacher Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">
                            <div className="form-group col-md-3"> { /* Teacher Id */}
                                <label className="col-form-label">Teacher ID:</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.teacherID && "invalid"}`}
                                    {...register("teacherID", {
                                        //required: "Teacher ID is Required",
                                        min: {
                                            value: 1,
                                            message: "Minimum Required Teacher ID is 1",
                                        },
                                        max: {
                                            value: 9999,
                                            message: "Maximum allowed Teacher ID is 9999",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("teacherID");
                                    }}
                                    defaultValue={props.obj.teacherID}
                                    disabled

                                />
                                {errors.teacherID && (
                                    <small className="text-danger">{errors.teacherID.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-9"> { /* Teacher Name */}
                                <label className="col-form-label">Teacher Name:</label>
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
                                    defaultValue={props.obj.name}
                                />
                                {errors.name && (
                                    <small className="text-danger">{errors.name.message}</small>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-8"> { /* Father Name */}
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
                                    defaultValue={props.obj.fatherName}
                                />
                                {errors.fatherName && (
                                    <small className="text-danger">{errors.fatherName.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-4">  {/*Mobile*/}
                                <label className="col-form-label">Mobile:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.mobile && "invalid"}`}
                                    {...register("mobile", {
                                        //required: "mobile is Required",
                                        pattern: {
                                            value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                                            message: "Invalid Mobile Number",
                                        },
                                    })}
                                    onKeyUp={() => {
                                        trigger("mobile");
                                    }}
                                    defaultValue={props.obj.mobile}
                                />
                                {errors.mobile && (
                                    <small className="text-danger">{errors.mobile.message}</small>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-4"> { /* Gender  */}
                                <label for="gender">Choose Gender:</label>
                                <select
                                    className={`form-control ${errors.gender && "invalid"}`}
                                    {...register("gender", { required: "Gender is Required" })}
                                    onKeyUp={() => {
                                        trigger("gender");
                                    }}
                                    defaultValue={props.obj.gender}
                                >

                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                                {errors.gender && (
                                    <small className="text-danger">{errors.gender.message}</small>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-7"> { /* Address */}
                                <label className="col-form-label">Address:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.address && "invalid"}`}
                                    {...register("address", {
                                        required: "Address is Required",
                                    })}
                                    onKeyUp={() => {
                                        trigger("address");
                                    }}
                                    defaultValue={props.obj.address}
                                />
                                {errors.address && (
                                    <small className="text-danger">{errors.address.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-5"> { /*Email*/}
                                <label className="col-form-label">Email:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.email && "invalid"}`}
                                    {...register("email", {
                                        required: "Email is Required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("email");
                                    }}
                                    defaultValue={props.obj.email}
                                />
                                {errors.email && (
                                    <small className="text-danger">{errors.email.message}</small>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6"> { /* islamicQualification */}
                                <label className="col-form-label">Islamaic Education:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.islamicQualification && "invalid"}`}
                                    {...register("islamicQualification", {
                                        required: "Islamaic Education Required",
                                        pattern: {
                                            value: /[A-Za-z]/,
                                            message: "Invalid Name",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("islamicQualification");
                                    }}
                                    defaultValue={props.obj.islamicQualification}
                                />
                                {errors.islamicQualification && (
                                    <small className="text-danger">{errors.islamicQualification.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-6"> { /* School Education */}
                                <label className="col-form-label">School Education:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.schoolQualification && "invalid"}`}
                                    {...register("schoolQualification", {
                                        required: "School Education Required",
                                        pattern: {
                                            value: /[A-Za-z]/,
                                            message: "Invalid Name",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("schoolQualification");
                                    }}
                                    defaultValue={props.obj.schoolQualification}
                                />
                                {errors.schoolQualification && (
                                    <small className="text-danger">{errors.schoolQualification.message}</small>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4"> { /* is Active  */}
                                <label for="gender">Choose Status:</label>
                                <select
                                    className={`form-control ${errors.isActive && "invalid"}`}
                                    {...register("isActive", { required: "Required" })}
                                    onKeyUp={() => {
                                        trigger("isActive");
                                    }}
                                    defaultValue={props.obj.isActive}
                                >

                                    <option value="Yes">Yes</option>
                                    <option value="Not">Not</option>

                                </select>
                                {errors.isActive && (
                                    <small className="text-danger">{errors.isActive.message}</small>
                                )}
                            </div>
                        </div>

                        <input
                            type="submit"
                            className="btn btn-primary my-3"
                            value="Send Data"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TeacherAdd;
