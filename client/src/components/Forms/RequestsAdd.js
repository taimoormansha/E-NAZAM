import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';

function RequestAdd() {
    const authToken = localStorage.getItem("authToken");

    const AddRequest = async (data) => {
        try {

            const response = await axios.post("/requesters", data); //Without Toke Request

            if (response)
                swal("Done!", `${data.name}'s Request on ${data.when} has been added!`, "success");
            else
                swal("Error!", "Record Not save!", "error");

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
        AddRequest(data)
        reset();
    };

    // console.log(watch());

    // console.log(errors.name)

    return (
        <div className="container pt-5">
            <div className="row justify-content-sm-center pt-0">
                <div className="col-sm-10 shadow round pb-3 backgroundColor">
                    <h1 className="text-center pt-3 text-secondary">Request Reminder Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">
                            <div className="form-group col-md-12"> { /* Name */}
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
                            <div className="form-group col-md-4"> { /*Email*/}
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

                            <div className="form-group col-md-3">  {/*Mobile*/}
                                <label className="col-form-label">Mobile:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.mobile && "invalid"}`}
                                    {...register("mobile", {
                                        required: "mobile is Required",
                                        pattern: {
                                            value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                                            message: "Invalid Mobile Number",
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

                            <div className="form-group col-md-5"> { /* Address */}
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
                                    placeholder="Enter Address"
                                />
                                {errors.address && (
                                    <small className="text-danger">{errors.address.message}</small>
                                )}
                            </div>
                        </div>

                        <div className="form-group"> {/*Detail*/}
                            <label className="col-form-label">Detail:</label>
                            <textarea
                                className={`form-control ${errors.details && "invalid"}`}
                                {...register("details", {
                                    required: "Detail is Required",
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
                            ></textarea>
                            {errors.details && (
                                <small className="text-danger">{errors.details.message}</small>
                            )}
                        </div>

                        <div className="row">
                            <div className=" col-md-3"> { /* EVENT EXPECTED DATE */}
                                <label className="col-form-label">EVENT EXPECTED DATE:</label>
                                <input
                                    type="date"
                                    className={`form-control ${errors.when && "invalid"}`}
                                    {...register("when", {
                                        required: "Required",
                                    })}
                                    onKeyUp={() => {
                                        trigger("when");
                                    }}
                                    placeholder="Enter EVENT EXPECTED DATE"
                                />
                                {errors.when && (
                                    <small className="text-danger">{errors.when.message}</small>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-2"> { /*Is Processed */}
                                <label for="donateNature">Is Processed?</label>
                                <select
                                    className={`form-control ${errors.isProceed && "invalid"}`}
                                    {...register("isProceed", {
                                        //required: "Required" 
                                    })}
                                    onKeyUp={() => {
                                        trigger("isProceed");
                                    }}>

                                    <option value="Pending">Pending</option>
                                    <option value="Promised">Promised</option>

                                </select>
                                {errors.isProceed && (
                                    <small className="text-danger">{errors.isProceed.message}</small>
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

export default RequestAdd;
