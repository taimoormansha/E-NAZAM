import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';

const donationEdit = (props) => {
    const authToken = localStorage.getItem("authToken");

    const EditDonation = async (data) => {      
        try {
                const response = await axios.put(`/donations/${props.obj._id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

                if (response) {
                    swal("Great Job!", `${data.name}'s Donation has been updated!`, "success");
                    reset();
                }
                else
                    swal("Error!", "Record Not updated!", "error");
            

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
        EditDonation(data)
        reset();
    };

    // console.log(watch());
    // console.log(errors.name)



    return (
        <>
            <div className=" pt-0 pb-5 pl-0 pr-0 " >
                <div className="row justify-content-sm-center pt-0">
                    <div className="col-sm-10 shadow round pb-3 backgroundColor">
                        <h1 className="text-center pt-3 text-secondary">Edit Donation Form</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="row">
                                <div className="form-group col-md-9"> { /* Name */}
                                    <label className="col-form-label" >Name:</label>
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

                                <div className="form-group col-md-3"> { /* Donation RS */}
                                    <label className="col-form-label">Donation Amount:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.donateRS && "invalid"}`}
                                        {...register("donateRS", {
                                            required: "Donation Rupees is Required",
                                            min: {
                                                value: 1,
                                                message: "Minimum Required Donation Rupees is 1",
                                            },
                                            max: {
                                                value: 10000000,
                                                message: "Maximum allowed Donation Rupees is 10000000",
                                            },
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Only numbers are allowed",
                                            }
                                        })}
                                        onKeyUp={() => {
                                            trigger("donateRS");
                                        }}
                                        defaultValue={props.obj.donateRS}
                                    />
                                    {errors.donateRS && (
                                        <small className="text-danger">{errors.donateRS.message}</small>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4"> { /*Email*/}
                                    <label className="col-form-label" >Email:</label>
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
                                        defaultValue={props.obj.email}
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
                                        defaultValue={props.obj.address}
                                    />
                                    {errors.address && (
                                        <small className="text-danger">{errors.address.message}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-4"> { /* Donation Nature  */}
                                    <label for="donateNature" >Choose Donation Nature:</label>
                                    <select
                                        className={`form-control ${errors.donateNature && "invalid"}`}
                                        {...register("donateNature", { required: "Donation Nature is Required" })}
                                        onKeyUp={() => {
                                            trigger("donateNature");
                                        }}
                                        defaultValue={props.obj.donateNature}
                                    >

                                        <option value="Offline payment">Offline payment</option>
                                        <option value="Online payment">Online payment</option>

                                    </select>
                                    {errors.donateNature && (
                                        <small className="text-danger">{errors.donateNature.message}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-3"> { /* Receipt No */}
                                    <label className="col-form-label" disabled>Receipt No:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.receiptNo && "invalid"}`}
                                        {...register("receiptNo", {
                                            //required: "Receipt No is Required",
                                            min: {
                                                value: 1,
                                                message: "Minimum Required Receipt No is 1",
                                            },
                                            max: {
                                                value: 10000,
                                                message: "Maximum allowed Receipt No is 10000",
                                            },
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Only numbers are allowed",
                                            }
                                        })}
                                        onKeyUp={() => {
                                            trigger("receiptNo");
                                        }}
                                        defaultValue={props.obj.receiptNo}
                                        disabled
                                    />
                                    {errors.receiptNo && (
                                        <small className="text-danger">{errors.receiptNo.message}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-5"> {/*Remarks*/}
                                    <label className="col-form-label" >Remarks:</label>
                                    <textarea
                                        className={`form-control ${errors.remarks && "invalid"}`}
                                        {...register("remarks", {
                                            required: "Remarks is Required",
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
                                            trigger("remarks");
                                        }}
                                        defaultValue={props.obj.remarks}
                                    ></textarea>
                                    {errors.remarks && (
                                        <small className="text-danger">{errors.remarks.message}</small>
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

        </>
    )
}

export default donationEdit
