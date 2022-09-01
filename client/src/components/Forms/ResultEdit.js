import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';


function EditResult(props) {
    const authToken = localStorage.getItem("authToken");
    const [courseTitle, setCourseTitle] = useState("");

    const ResultEdit = () => {

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
       
       // ResultEdit(data)
      //  reset();
    };

    // console.log(watch());

    // console.log(errors.name)

    return (

        <div className="pt-0 pb-5 pl-0 pr-0">
            <div className="row justify-content-sm-center pt-0">
                <div className="col-sm-10 shadow round pb-3 backgroundColor">
                    <h1 className="text-center pt-3 text-secondary">Edit Results</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {
                            props?.data?.map((item) => (

                            <div className="form-group col-md-3"> { /* obtained Marks */}
                            <label className="col-form-label">{item?.courseTitle}</label>
                            
                            <input
                                type="text"
                                className={`form-control ${errors.item?.courseTitle && "invalid"}`}
                                {...register(`${item.courseTitle}`, {
                                    required: "Marks is Required",
                                    min: {
                                        value: 0,
                                        message: "Minimum Required Marks is 0",
                                    },
                                    max: {
                                        value: `${item.totalMarks}`,
                                        message: `Maximum allowed Marks is ${item?.totalMarks}` ,
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Only numbers are allowed",
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger(`${item?.courseTitle}`);
                                }}

                                defaultValue={item?.obtainedMarks}
                            />
                            {errors.item?.courseTitle && (
                                <small className="text-danger">{errors.item?.courseTitle.message}</small>
                            )}
                            </div>

                            ))
                        }


                        <input
                            type="submit"
                            className="btn btn-primary my-3"
                            value="Submit Data"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditResult;
