import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import Export from "react-data-table-component"
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';
import EditStudent from "../Forms/studentFrmEdit"


const StudentTable = (props) => {
    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal  


    const url = "/student" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    const getstudents = async () => {            //Get Data
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            console.log(response);
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    const conditionalCellStyles = [
        {
            when: row => row.isActive == "student",
            style: row => ({ color: row.isActive ? 'green' : 'red' }),
        },
        {
            when: row => row.isActive == "discharged",
            style: row => ({ color: row.isActive ? 'red' : 'green' }),
        },
    ];

    const handleDelete = async (id, rollNo) => { //Delete  Student Record in FeeHistory + Student Collection
        try {
            const res = await axios.get(`/FeeHistory?rollNo=${rollNo}`, { //Get Fee IDs
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            await axios.delete(`/student/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            props.stateChanger(true); //for render component purpose

            for (let i = 1; i <= res.data.length; i++) //res has many records
                await axios.delete(`/FeeHistory/${res.data[i]._id}`, { //Delete FeeHitory as well
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    }
                });

            setFilteredStudents(filteredStudents.filter(item => item._id !== id)); //filter updated data 

        } catch (err) {
            console.log(err);
        }
    }

    const columns = [
        {
            name: "Roll No",
            selector: (row) => row.rollno,
            sortable: true,
            grow: 2,
            reorder: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "200px",
            center: true,
        },
        {
            name: "Father Name",
            selector: (row) => row.fatherName,
            sortable: true,
            width: "200px",
            center: true,
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
            sortable: true,
            center: true
        },
        {
            name: "Father Occupation",
            selector: (row) => row.fatherOccupation,
            width: "150px",

        },
        {
            name: "DOB",
            selector: (row) => new Date(row.dateOfBirth).toDateString(),
            sortable: true,
            width: "150px",
            center: true,
        },
        {
            name: "Mobile",
            selector: (row) => row.mobile,
            width: "150px",
            center: true
        },
        {
            name: "Islamic Qualification",
            selector: (row) => row.islamicQualification,
            width: "150px",
        },
        {
            name: "School Qualification",
            selector: (row) => row.schoolQualification,
            width: "150px",
        },
        {
            name: "Shoba",
            selector: (row) => row.shobaName,
            sortable: true,
            center: true,
        },
        {
            name: "Scholarship",
            selector: (row) => row.scholarship,
            sortable: true,
            width: "150px",
            center: true,
        },
        {
            name: "Is Local",
            selector: (row) => row.isLocal,
            sortable: true,
        },
        {
            name: "Is Student",
            selector: (row) => row.isActive,
            sortable: true,
            width: "150px",
            center: true,
            conditionalCellStyles: conditionalCellStyles

        },
        {
            name: "Admission Date",
            selector: (row) => new Date(row.createdAt).toDateString(),
            sortable: true,
            width: "200px",
            center: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <Link to={`/admin/StudentView/${row._id}`}>
                    <Button variant="primary">
                        View
                    </Button>
                </Link>
            ),
            right: true,
            width: "150px",
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
                        text: `Do you really want to delete ${row.name}'s Record?`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                handleDelete(row._id, row.rollno); //Delete Record
                                swal(
                                    'Deleted!',
                                    `${row.name}'s Record has been deleted.`,
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    `${row.name}'s is safe!`,
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

    useEffect(() => { getstudents() }, [])

    useEffect(() => {
        const result = students.filter((item) => {
            return item.name.toLowerCase().match(search.toLowerCase());
        });
        setFilteredStudents(result);
    }, [search]);

    return (
        <>
            <Modal style={{maxWidth: '1000px', width: '100%'}}
                size='lg'
                isOpen={modal}
                toggle={() => setModal(!modal)}
            >
                <ModalHeader
                    toggle={() => setModal(!modal)}
                    

                >

                </ModalHeader>
                <ModalBody>

                    <EditStudent obj={data}  stateChanger={props.stateChanger}/>

                </ModalBody>


            </Modal>

            <div className="pageContainer">
                <div className="clientContainer_old">
                    <div className="tableContainer">
                        <DataTable
                            title={props.detail + ' List'}
                            columns={columns}
                            data={filteredStudents}
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

export default StudentTable;