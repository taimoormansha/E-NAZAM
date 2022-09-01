import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';

function ShobaEdit(props) {
    const authToken = localStorage.getItem("authToken");

    function toTitleCase(str) { //For Searching Purpose
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const AddShobajaat = async (data) => {
        try {
            if (data.shobaName === props.obj.shobaName) {
                const response = await axios.put(`/shobajaat/${props.obj._id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

                if (response)
                    swal("Great Job!", `Shoba ${data.shobaName} has been updated!`, "success");
                else
                    swal("Error!", "Record Not update!", "error");

            } else {

                const shoba = await axios.get(`/shobajaat?shobaName=${data.shobaName}`, { //if Shoba is already exist
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

                if (!(shoba.data.length >= 1)) {
                    const response = await axios.put(`/shobajaat/${props.obj._id}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authToken,
                        }
                    });

                    if (response)
                        swal("Great Job!", `Shoba ${data.shobaName} has been updated!`, "success");
                    else
                        swal("Error!", "Record Not update!", "error");
                }
                else {
                    swal("Duplicated Record!", `${data.shobaName} has already exist!`, "error");
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
        data.shobaName = toTitleCase(data.shobaName)
        console.log(data);
        AddShobajaat(data)
        reset();
    };

    // console.log(watch());

    // console.log(errors.name)

    return (
        <div className="pt-0 pb-5 pl-0 pr-0">
            <div className="row justify-content-sm-center pt-0">
                <div className="col-sm-10 shadow round pb-3 backgroundColor">
                    <h1 className="text-center pt-3 text-secondary">Edit Shobajaat Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <div className="row ">
                            <div className="form-group col-md-8"> { /* Shoba Name */}
                                <label className="col-form-label">Shoba Name:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.shobaName && "invalid"}`}
                                    {...register("shobaName", {
                                        required: "Shoba Name is Required",
                                        pattern: {
                                            value: /[A-Za-z]/,
                                            message: "Invalid Name",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("shobaName");
                                    }}
                                    defaultValue={props.obj.shobaName}
                                />
                                {errors.shobaName && (
                                    <small className="text-danger">{errors.shobaName.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-4"> { /* Fee RS */}
                                <label className="col-form-label">Fee RS:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.fee && "invalid"}`}
                                    {...register("fee", {
                                        required: "Fee is Required",
                                        min: {
                                            value: 0,
                                            message: "Minimum Required Fee is 0",
                                        },
                                        max: {
                                            value: 5000,
                                            message: "Maximum allowed Fee is 5000",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("fee");
                                    }}
                                    defaultValue={props.obj.fee}
                                />
                                {errors.fee && (
                                    <small className="text-danger">{errors.fee.message}</small>
                                )}
                            </div>
                        </div>

                        <div className="row ">
                            <div className="form-group col-md-3"> { /* Is Active  */}
                                <label for="donateNature">Choose Shoba Status:</label>
                                <select
                                    className={`form-control ${errors.isActive && "invalid"}`}
                                    {...register("isActive", { required: "Required" })}
                                    onKeyUp={() => {
                                        trigger("isActive");
                                    }}
                                    defaultValue={props.obj.isActive}
                                >

                                    <option value="Active">Active</option>
                                    <option value="Postponed">Postponed</option>

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

export default ShobaEdit;
