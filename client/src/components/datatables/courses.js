import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import EditCourse from "../Forms/coursesEdit"
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';

const CoursesTable = (props) => {
    const url = "/courses" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal  

    const getCourses = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            console.log(response);
            setCourses(response.data);
            setFilteredCourses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async id => { //Delete Record
        try {
            await axios.delete(`/courses/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            setFilteredCourses(filteredCourses.filter(item => item._id !== id)); //filter updated data 

        } catch (error) {
            console.log(error);
        }

    }


    const columns = [
        {
            name: "Course Title",
            selector: (row) => row.courseTitle,
            sortable: true,
            reorder: true,
        },
        {
            name: "Shoba Name",
            selector: (row) => row.shoba,
            sortable: true,
            center: true,
            width: "200px"
        },
        {
            name: "Total Marks",
            selector: (row) => row.totalMarks,
            center: true,
            width: "200px",
        },
        {
            name: "Action",
            cell: (row) => (
                <Button variant="info" onClick={() => { setData(row); setModal(true); }}>
                    Edit
                </Button>
            ),
            right: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <Button variant="danger"
                    onClick={() => swal({
                        title: "Are you sure?",
                        text: `Do you really want to delete ${row.courseTitle} Record?`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                handleDelete(row._id); //Delete Record
                                swal(
                                    'Deleted!',
                                    `${row.courseTitle} has been deleted.`,
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    `${row.courseTitle} is safe!`,
                                    "error"
                                );
                            }
                        })

                    }
                >
                    Delete
                </Button>
            ),
            left: true,
            width: "150px",
        },

    ];

    useEffect(() => { getCourses() }, [])

    useEffect(() => {
        const result = courses.filter((item) => {
            return item.courseTitle.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCourses(result);
    }, [search]);

    return (
        <>
            <Modal
                size='lg'
                isOpen={modal}
                toggle={() => setModal(!modal)}
            >
                <ModalHeader
                    toggle={() => setModal(!modal)}

                >

                </ModalHeader>
                <ModalBody>

                    <EditCourse obj={data} />

                </ModalBody>


            </Modal>
            <div className="pageContainer">
                <div className="clientContainer_old">
                    <div className="tableContainer">
                        <DataTable
                            title={props.detail}
                            columns={columns}
                            data={filteredCourses}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight='450px'
                            highlightOnHover
                            subHeader
                            subHeaderComponent={
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-25 form-control"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoursesTable;