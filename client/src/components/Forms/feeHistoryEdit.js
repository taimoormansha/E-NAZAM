import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';

function FeeHistoryEdit(props) {
    const authToken = localStorage.getItem("authToken");

    const EditFeeHistory = async (data) => {
        try {
            var tempObj = {};
            const response = await axios.put(`/FeeHistory/${props.obj._id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            if (response) {
                swal("Great Job!", `${response.data.name}'s Fee Challan has been updated!`, "success");
                reset();
            }
            else
                swal("Error!", "Record Not update!", "error");


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
        EditFeeHistory(data)
        reset();
    };

    // console.log(watch());

    // console.log(errors.name)

    return (
        <div className="pt-0 pb-5 pl-0 pr-0">
            <div className="row justify-content-sm-center pt-0">
                <div className="col-sm-10 shadow round pb-3 backgroundColor">
                    <h1 className="text-center pt-3 text-secondary">Edit Fee Challans</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">
                            <div className=" col-md-3"> { /* Roll NO */}
                                <label className="col-form-label">Roll No:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.rollNo && "invalid"}`}
                                    {...register("rollNo", {
                                        // required: "Roll No is Required",
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
                                        trigger("rollNo");
                                    }}
                                    defaultValue={props.obj.rollNo}
                                    disabled
                                />
                                {errors.rollNo && (
                                    <small className="text-danger">{errors.rollNo.message}</small>
                                )}
                            </div>

                            <div className=" col-md-9"> { /* Name */}
                                <label className="col-form-label">Name:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name && "invalid"}`}
                                    {...register("name", {
                                        // required: "Name is Required",
                                        pattern: {
                                            value: /[A-Za-z]/,
                                            message: "Invalid Name",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("name");
                                    }}
                                    defaultValue={props.obj.name}
                                    disabled
                                />
                                {errors.name && (
                                    <small className="text-danger">{errors.name.message}</small>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className=" col-md-6"> { /* fee month */}
                                <label className="col-form-label">Fee Month:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.createdAt && "invalid"}`}
                                    {...register("createdAt", {
                                        // required: " Required",
                                    })}
                                    onKeyUp={() => {
                                        trigger("createdAt");
                                    }}
                                    defaultValue={new Date(props.obj.createdAt).toDateString()}
                                    disabled
                                />
                                {errors.createdAt && (
                                    <small className="text-danger">{errors.createdAt.message}</small>
                                )}
                            </div>
                        </div>

                        <br></br>
                        <br></br>
                        <hr></hr>
                        <div className="row">
                            <div className="form-group col-md-4"> { /* Monthly Fee */}
                                <label className="col-form-label">Monthly Fee:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.Fee && "invalid"}`}
                                    {...register("Fee", {
                                        // required: "Required",
                                        min: {
                                            value: 0,
                                            message: "Minimum Required FEE is 0",
                                        },
                                        max: {
                                            value: 10000,
                                            message: "Maximum allowed Fee is 10000",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("Fee");
                                    }}
                                    defaultValue={props.obj.Fee}
                                    disabled
                                />
                                {errors.Fee && (
                                    <small className="text-danger">{errors.Fee.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-4"> { /*Discount /Scholarship */}
                                <label className="col-form-label">Discount Amount:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.Discount && "invalid"}`}
                                    {...register("Discount", {
                                        // required: "Required",
                                        min: {
                                            value: 0,
                                            message: "Minimum 0",
                                        },
                                        max: {
                                            value: 10000,
                                            message: "Maximum 10000",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("Discount");
                                    }}
                                    defaultValue={props.obj.Discount}
                                    disabled
                                />
                                {errors.Discount && (
                                    <small className="text-danger">{errors.Discount.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-4"> { /* Total */}
                                <label className="col-form-label">Total Fee:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.totalFee && "invalid"}`}
                                    {...register("totalFee", {
                                        //  required: "Required",
                                        min: {
                                            value: 0,
                                            message: "Minimum Required  0",
                                        },
                                        max: {
                                            value: 10000,
                                            message: "Maximum  is 10000",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("totalFee");
                                    }}
                                    defaultValue={props.obj.totalFee}
                                    disabled
                                />
                                {errors.totalFee && (
                                    <small className="text-danger">{errors.totalFee.message}</small>
                                )}
                            </div>
                        </div>
                        <hr></hr>
                        <br></br>


                        <div className="row">
                            <div className="form-group col-md-4"> { /* is paid?  */}
                                <label for="isLocal">Is Paid?</label>
                                <select
                                    className={`form-control ${errors.isPaid && "invalid"}`}
                                    {...register("isPaid", { required: "Required" })}
                                    onKeyUp={() => {
                                        trigger("isPaid");
                                    }}

                                >

                                    <option value="UnPaid">UnPaid</option>
                                    <option value="Paid">Paid</option>

                                </select>
                                {errors.isPaid && (
                                    <small className="text-danger">{errors.isPaid.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-4"> { /*Fee Paid RS */}
                                <label className="col-form-label">Fee Paid Rs:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.paidFee && "invalid"}`}
                                    {...register("paidFee", {
                                        required: "Fee Paid  is Required",
                                        min: {
                                            value: 0,
                                            message: "Minimum Required 0",
                                        },
                                        max: {
                                            value: 10000,
                                            message: "Maximum  is 10000",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("paidFee");
                                    }}

                                />
                                {errors.paidFee && (
                                    <small className="text-danger">{errors.paidFee.message}</small>
                                )}
                            </div>

                            <div className="form-group col-md-4"> { /* Receipt No */}
                                <label className="col-form-label">Receipt No:</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.receiptNo && "invalid"}`}
                                    {...register("receiptNo", {
                                        required: "Required",
                                        min: {
                                            value: 0,
                                            message: "Minimum Required 0",
                                        },
                                        max: {
                                            value: 9999,
                                            message: "Maximum  is 9999",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only numbers are allowed",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("receiptNo");
                                    }}

                                />
                                {errors.receiptNo && (
                                    <small className="text-danger">{errors.receiptNo.message}</small>
                                )}
                            </div>
                        </div>



                        <div className="row" style={{margin:"20px"}}>
                            <div className="form-group col-md-5"> {/*Remarks*/}
                                <label className="col-form-label" >Remarks:</label>
                                <textarea
                                    className={`form-control ${errors.Remarks && "invalid"}`}
                                    {...register("Remarks", {
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
                                        trigger("Remarks");
                                    }}
                                    defaultValue={props.obj.Remarks}
                                ></textarea>
                                {errors.Remarks && (
                                    <small className="text-danger">{errors.Remarks.message}</small>
                                )}
                            </div>
                        </div>

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

export default FeeHistoryEdit;
