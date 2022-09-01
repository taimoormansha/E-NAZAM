import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import { ModalBody } from 'react-bootstrap';
import EditScholarship from "../Forms/scholarshipEdit"
import { Modal, ModalHeader } from "reactstrap";


const ScholarshipTable = (props) => {
    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal  


    const url = "/scholarship" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    const [search, setSearch] = useState("");
    const [scholarship, setScholarship] = useState([]);
    const [filteredScholarship, setFilteredScholarship] = useState([]);

    const getScholarship = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            //console.log(response);
            setScholarship(response.data);
            setFilteredScholarship(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async id => { //Delete Record
        try {
            const response = await axios.get(`/scholarship/${id}`, { //Find Object 
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            console.log(response.data.scholarshipTitle)

            const students = await axios.get(`/student?scholarship=${response.data.scholarshipTitle}`, { //All students with deleted scholarship
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            })

            console.log(students.data)

            await axios.delete(`/scholarship/${id}`, { //Delete Object 
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            setFilteredScholarship(filteredScholarship.filter(item => item._id !== id)); //filter updated data 


            for (let i = 0; i < students.data.length; i++)
                await axios.patch(`/student/${students.data[i]._id}`, //Remove scholarship from student data
                    {
                        scholarship: "NA",
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authToken,
                        }
                    }
                )

        } catch (error) {
            console.log(error);
        }

    }

    const columns = [
        {
            name: "Scholarship Title",
            selector: (row) => row.scholarshipTitle,
            sortable: true,
            width: 200,
        },
        {
            name: "Scholarship Stipend %",
            selector: (row) => row.stipendPercent + ' %',
            sortable: true,
            center: true,
        },
        {
            name: "Scholarship Details",
            selector: (row) => row.details,
            width: 300,
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
                        text: `Do you really want to delete ${row.scholarshipTitle}?`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                handleDelete(row._id); //Delete Record
                                swal(
                                    'Deleted!',
                                    `${row.scholarshipTitle} has been deleted.`,
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    `${row.scholarshipTitle} is safe!`,
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

    useEffect(() => { getScholarship() }, [])

    useEffect(() => {
        const result = scholarship.filter((item) => {
            return item.scholarshipTitle.toLowerCase().match(search.toLowerCase());
        });
        setFilteredScholarship(result);
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

                    <EditScholarship obj={data} />

                </ModalBody>


            </Modal>


            <div className="pageContainer">
                <div className="clientContainer_old">
                    <div className="tableContainer">
                        <DataTable
                            title={props.detail}
                            columns={columns}
                            data={filteredScholarship}
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

export default ScholarshipTable;