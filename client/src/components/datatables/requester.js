import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';
import EditRequests from "../Forms/RequestsEdit"

const RequesterTable = (props) => {

    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal  


    let url = "/requesters" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    if (props.metaData === "/dashboardapi")
        url = props.metaData;

    const [search, setSearch] = useState("");
    const [request, setRequest] = useState([]);
    const [filteredRequest, setFilteredRequest] = useState([]);


    const conditionalCellStyles = [
        {
            when: row => row.isProceed == "Promised",
            style: row => ({ color: row.isProceed ? 'green' : 'red' }),
        },
        {
            when: row => row.isProceed == "Pending",
            style: row => ({ color: row.isProceed ? 'red' : 'green' }),
        },
    ];

    const getRequests = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            if (props.metaData == "/dashboardapi") {
                if (props.detail == "Daily Quranic Requests") {
                    setRequest(response.data.todayRequestsData);
                    setFilteredRequest(response.data.todayRequestsData);
                }
                else if (props.detail == "Monthly Quranic Requests") {
                    setRequest(response.data.monthlyRequestsData);
                    setFilteredRequest(response.data.monthlyRequestsData);
                }
                else if (props.detail == "Annually Quranic Requests") {
                    setRequest(response.data.anuallyRequestsData);
                    setFilteredRequest(response.data.anuallyRequestsData);
                }

            } else {
                setRequest(response.data);
                setFilteredRequest(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async id => { //Delete Record

        await axios.delete(`/requesters/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            }
        });

        setFilteredRequest(filteredRequest.filter(item => item._id !== id)); //filter updated data 

    }

    const columns = [
        {
            name: "NAME",
            selector: (row) => row.name,
            sortable: true,
            width: "200px",
        },
        {
            name: "EMAIL",
            selector: (row) => row.email,
            center: true,
            width: "200px",
        },
        {
            name: "ADDRESS",
            selector: (row) => row.address,
            width: "250px",
        },
        {
            name: "MOBILE",
            selector: (row) => row.mobile,
            center: true,
            width: "150px",
        },
        {
            name: "REQUEST DATE",
            selector: (row) => new Date(row.createdAt).toDateString(),
            sortable: true,
            center: true,
            width: "150px",
        },
        {
            name: "DETAILS",
            selector: (row) => row.details,
            width: "300px",
        },


        {
            name: "EVENT EXPECTED DATE",
            selector: (row) => new Date(row.when).toDateString(),
            sortable: true,
            center: true,
            width: "180px",
        },
        {
            name: "Is Processed?",
            selector: (row) => row.isProceed,
            sortable: true,
            center: true,
            width: "150px",
            conditionalCellStyles: conditionalCellStyles
        },


        {
            name: "ACTION",
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
                        text: "Do you really want to delete this Record?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                handleDelete(row._id); //Delete Record
                                swal(
                                    'Deleted!',
                                    'Your Record has been deleted.',
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    "Record is safe!",
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

    useEffect(() => { getRequests() }, [])

    useEffect(() => {
        const result = request.filter((item) => {
            return item.name.toLowerCase().match(search.toLowerCase());
        });
        setFilteredRequest(result);
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

                    <EditRequests obj={data} />

                </ModalBody>


            </Modal>

            <div className="pageContainer">
                <div className="clientContainer_old">
                    <div className="tableContainer">
                        <DataTable
                            title={props.detail}
                            columns={columns}
                            data={filteredRequest}
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

export default RequesterTable;