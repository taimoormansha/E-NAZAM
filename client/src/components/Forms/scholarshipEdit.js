import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';

function ScholarshipAdd(props) {
    const authToken = localStorage.getItem("authToken");

    function toTitleCase(str) { //For Searching Purpose
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const AddScholarship = async (data) => {
        try {
            if (data.scholarshipTitle === props.obj.scholarshipTitle) {
                const response = await axios.put(`/scholarship/${props.obj._id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

                if (response) {
                    swal("Great Job!", `${data.scholarshipTitle} has been updated!`, "success");
                    reset();
                }
                else
                    swal("Error!", "Record Not save!", "error");
            }
            else {
                const scholarship = await axios.get(`/scholarship?scholarshipTitle=${data.scholarshipTitle}`, { //if scholarship already exist
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

                if (!(scholarship.data.length >= 1)) {
                    const response = await axios.put(`/scholarship/${props.obj._id}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authToken,
                        }
                    });

                    if (response) {
                        swal("Great Job!", `${data.scholarshipTitle} has been updated!`, "success");
                        reset();
                    }
                    else
                        swal("Error!", "Record Not save!", "error");
                }
                else {
                    swal("Duplicated Record!", `${data.scholarshipTitle} has already exist!`, "error");
                }
            }
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

        data.scholarshipTitle = toTitleCase(data.scholarshipTitle); //for search perfect only
        console.log(data);
        AddScholarship(data)
    };

    // console.log(watch());

    // console.log(errors.name)

    return (
        <div className="pt-0 pb-5 pl-0 pr-0">
            <div className="row justify-content-sm-center pt-0">
                <div className="col-sm-10 shadow round pb-3 backgroundColor">
                    <h1 className="text-center pt-3 text-secondary">Add Scholarship Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group"> { /*Scholarship Title */}
                            <label className="col-form-label">Scholarship Title:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.scholarshipTitle && "invalid"}`}
                                {...register("scholarshipTitle", {
                                    required: "Scholarship Title is Required",
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: "Invalid Scholarship Title",
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger("scholarshipTitle");
                                }}
                                defaultValue={props.obj.scholarshipTitle}
                            />
                            {errors.scholarshipTitle && (
                                <small className="text-danger">{errors.scholarshipTitle.message}</small>
                            )}
                        </div>

                        <div className="form-group"> { /* Stipend % */}
                            <label className="col-form-label">Enter Stipend Percent:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.stipendPercent && "invalid"}`}
                                {...register("stipendPercent", {
                                    required: "Stipend Percent is Required",
                                    min: {
                                        value: 10,
                                        message: "Minimum Required Stipend Percent is 10",
                                    },
                                    max: {
                                        value: 100,
                                        message: "Maximum allowed Stipend Percent is 100",
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Only numbers are allowed",
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger("stipendPercent");
                                }}
                                defaultValue={props.obj.stipendPercent}
                            />
                            {errors.stipendPercent && (
                                <small className="text-danger">{errors.stipendPercent.message}</small>
                            )}
                        </div>

                        <div className="form-group"> {/*Detail About Scholarship*/}
                            <label className="col-form-label">Detail About Scholarshi:</label>
                            <textarea
                                className={`form-control ${errors.details && "invalid"}`}
                                {...register("details", {
                                    required: "Detail About Scholarshi is Required",
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
                                    trigger("details");
                                }}

                                defaultValue={props.obj.details}
                            ></textarea>
                            {errors.details && (
                                <small className="text-danger">{errors.details.message}</small>
                            )}
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

export default ScholarshipAdd;
