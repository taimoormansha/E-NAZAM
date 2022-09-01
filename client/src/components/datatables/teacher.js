import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import EditTeacher from "../Forms/teacherEdit"
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';

const TeachersTable = (props) => {

    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal  

    const url = "/teacher" + props.metaData;

    const authToken = localStorage.getItem("authToken");
    const [search, setSearch] = useState("");
    const [teacher, setTeacher] = useState([]);
    const [filteredTeacher, setFilteredTeacher] = useState([]);

    const getTeachers = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            console.log(response);
            setTeacher(response.data);
            setFilteredTeacher(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const conditionalCellStyles = [
        {
            when: row => row.isActive == "Yes",
            style: row => ({ color: row.isActive ? 'green' : 'red' }),
        },
        {
            when: row => row.isActive == "Not",
            style: row => ({ color: row.isActive ? 'red' : 'green' }),
        },
    ];

    const handleDelete = async id => { //Delete Record
        try {
            await axios.delete(`/teacher/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            setFilteredTeacher(filteredTeacher.filter(item => item._id !== id)); //filter updated data 

        } catch (error) {
            console.log(error);
        }

    }

    const columns = [
        {
            name: "Teacher ID",
            selector: (row) => row.teacherID,
            sortable: true,
            width: "110px",
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            center: true,
            width: "200px",
        },
        {
            name: "Father Name",
            selector: (row) => row.fatherName,
            center: true,
            width: "200px",
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
            sortable: true,
            center: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            center: true,
            width: "300px",
        },
        {
            name: "Address",
            selector: (row) => row.address,
            width: "200px",
        },
        {
            name: "Mobile",
            selector: (row) => row.mobile,
            width: "150px",
            center: true
        },
        {
            name: "Islamaic Education",
            selector: (row) => row.islamicQualification,
            width: "150px",
        },
        {
            name: "School Education",
            selector: (row) => row.schoolQualification,
            width: "150px",
        },

        {
            name: "IsActive?",
            selector: (row) => row.isActive,
            sortable: true,
            center: true,
            conditionalCellStyles: conditionalCellStyles
        },
        {
            name: "Joining Date",
            selector: (row) => new Date(row.createdAt).toDateString(),
            sortable: true,
            width: "180px",
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
                                handleDelete(row._id); //Delete Record
                                swal(
                                    'Deleted!',
                                    `${row.name}'s Record has been deleted.`,
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    `${row.name}'s Record is safe!`,
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

    useEffect(() => { getTeachers() }, [])

    useEffect(() => {
        const result = teacher.filter((item) => {
            return item.name.toLowerCase().match(search.toLowerCase());
        });
        setFilteredTeacher(result);
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

                    <EditTeacher obj={data} />

                </ModalBody>


            </Modal>

            <div className="pageContainer">
                <div className="clientContainer_old">
                    <div className="tableContainer">
                        <DataTable
                            title={props.detail}
                            columns={columns}
                            data={filteredTeacher}
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

export default TeachersTable;