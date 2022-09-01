import "./studentFrmAdd.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from 'sweetalert';

function CoursesAdd(props) {
    const authToken = localStorage.getItem("authToken");

    function toTitleCase(str) { //For Searching Purpose
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const [shoba, setShoba] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const shoba = await axios.get("/shobajaat", {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            setShoba(shoba.data)
        }

        fetchData();

    }, [])


    let shobaList = shoba.length > 0 //For Dynamic Select Options
        && shoba.map((item, i) => {
            return (
                <option value={item.shobaName}>{item.shobaName}</option>
            )
        }, this);


    const AddCourses = async (data) => {
        try {

            if (data.courseTitle === props.obj.courseTitle) {
                const response = await axios.put(`/courses/${props.obj._id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

                if (response) {
                    swal("Great Job!", `${data.courseTitle} has been updated!`, "success");
                    reset();
                }
                else
                    swal("Error!", "Record Not save!", "error");
            }
            else {
                const course = await axios.get(`/courses?courseTitle=${data.courseTitle}`, { //if course already exist
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

                if (!(course.data.length >= 1)) {
                    const response = await axios.put(`/courses/${props.obj._id}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authToken,
                        }
                    });

                    if (response) {
                        swal("Great Job!", `${data.courseTitle} has been updated!`, "success");
                        reset();
                    }
                    else
                        swal("Error!", "Record Not save!", "error");
                } else {
                    swal("Duplicated Record!", `${data.courseTitle} has already exist!`, "error");

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
    data.courseTitle = toTitleCase(data.courseTitle); //for search perfect only
    console.log(data);
    AddCourses(data)
    reset();
};

// console.log(watch());

// console.log(errors.name)

return (
    <div className="pt-0 pb-5 pl-0 pr-0">
        <div className="row justify-content-sm-center pt-0">
            <div className="col-sm-10 shadow round pb-3 backgroundColor">
                <h1 className="text-center pt-3 text-secondary">Edit Course Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="row">
                        <div className="form-group col-md-9"> { /* Course Title */}
                            <label className="col-form-label">Name Title:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.courseTitle && "invalid"}`}
                                {...register("courseTitle", {
                                    required: "Course Title is Required",
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: "Invalid Course Title",
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger("courseTitle");
                                }}
                                defaultValue={props.obj.courseTitle}
                            />
                            {errors.courseTitle && (
                                <small className="text-danger">{errors.courseTitle.message}</small>
                            )}
                        </div>

                        <div className="form-group col-md-3"> { /* Total Marks */}
                            <label className="col-form-label">Total Marks:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.totalMarks && "invalid"}`}
                                {...register("totalMarks", {
                                    required: "Total Marks is Required",
                                    min: {
                                        value: 50,
                                        message: "Minimum Required Marks is 50",
                                    },
                                    max: {
                                        value: 100,
                                        message: "Maximum allowed Marks is 100",
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Only numbers are allowed",
                                    }
                                })}
                                onKeyUp={() => {
                                    trigger("totalMarks");
                                }}
                                defaultValue={props.obj.totalMarks}
                            />
                            {errors.totalMarks && (
                                <small className="text-danger">{errors.totalMarks.message}</small>
                            )}
                        </div>
                    </div>

                    <div className="form-group col-md-3 "> { /* shoba  */}
                        <label for="donateNature">Choose Shoba:</label>
                        <select
                            className={`form-control ${errors.shoba && "invalid"}`}
                            {...register("shoba", {
                                required: "Shoba is Required"
                            })}
                            onKeyUp={() => {
                                trigger("shoba");
                            }}
                            defaultValue={props.obj.shoba}
                        >
                            {shobaList}{/*Dynamic Shobajaat List*/}

                        </select>
                        {errors.shoba && (
                            <small className="text-danger">{errors.shoba.message}</small>
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

export default CoursesAdd;
