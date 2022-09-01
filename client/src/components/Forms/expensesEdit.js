import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';


function editExpenses(props) {
    const authToken = localStorage.getItem("authToken");

    const AddExpenses = async (data) => {
        try {

            const response = await axios.put(`/expendetures/${props.obj._id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            if (response)
                {
                    swal("Great Gob!", `${data.title} has been updated!`, "success");
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
        AddExpenses(data)
        reset();
    };

    // console.log(watch());

    // console.log(errors.name)

    return (
        <div className="pt-0 pb-5 pl-0 pr-0">
            <div className="row justify-content-sm-center pt-0">
                <div className="col-sm-10 shadow round pb-3 backgroundColor">
                    <h1 className="text-center pt-3 text-secondary">Edit Expendeture Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group"> { /* Name */}
                            <label className="col-form-label">Name:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.byName && "invalid"}`}
                                {...register("byName", {
                                    required: "Name is Required",
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: "Invalid Name",
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger("byName");
                                }}
                                defaultValue={props.obj.byName}
                            />
                            {errors.byName && (
                                <small className="text-danger">{errors.byName.message}</small>
                            )}
                        </div>

                        <div className="row">
                            <div className="form-group col-md-8"> { /* Item Title */}
                                <label className="col-form-label">Item Title:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title && "invalid"}`}
                                    {...register("title", {
                                        required: "Title is Required",
                                        pattern: {
                                            value: /[A-Za-z]/,
                                            message: "Invalid Title",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("title");
                                    }}
                                    defaultValue={props.obj.title}
                                />
                                {errors.title && (
                                    <small className="text-danger">{errors.title.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-4"> { /* item Price RS */}
                                <label className="col-form-label">Item Price Rs:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.totalPrice && "invalid"}`}
                                    {...register("totalPrice", {
                                        required: "Item Price is Required",
                                        min: {
                                            value: 1,
                                            message: "Minimum Required Item Price is 1",
                                        },
                                        max: {
                                            value: 1000000,
                                            message: "Maximum allowed Item Price is 1000000",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("totalPrice");
                                    }}
                                    defaultValue={props.obj.totalPrice}
                                />
                                {errors.totalPrice && (
                                    <small className="text-danger">{errors.totalPrice.message}</small>
                                )}
                            </div>
                        </div>
                        <div className="form-group"> {/*Detail About Item*/}
                            <label className="col-form-label">Detail About Item:</label>
                            <textarea
                                className={`form-control ${errors.details && "invalid"}`}
                                {...register("details", {
                                    required: "Detail About Item is Required",
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

export default editExpenses;
