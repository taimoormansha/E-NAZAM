import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';
import swal from 'sweetalert';
import EditDonation from "../Forms/donationEdit"


const DonorTable = (props) => {

    var url = "/donations" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    if (props.metaData === "/dashboardapi")
        url = props.metaData;

    const [search, setSearch] = useState("");
    const [donation, setDonation] = useState([]);
    const [filteredDonation, setFilteredDonation] = useState([]);

    const getDonations = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            if (props.metaData == "/dashboardapi") {
                if (props.detail == "Today's Donation Received") {
                    setDonation(response.data.dailyDonationData);
                    setFilteredDonation(response.data.dailyDonationData);
                }
                else if (props.detail == "Monthly Donation Received") {
                    setDonation(response.data.monthlyDonationData);
                    setFilteredDonation(response.data.monthlyDonationData);
                }
                else if (props.detail == "Annual Donation Received") {
                    setDonation(response.data.anuallyDonationData);
                    setFilteredDonation(response.data.anuallyDonationData);
                }

            } else {
                setDonation(response.data);
                setFilteredDonation(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async id => { //Delete Record
        try {
            await axios.delete(`/donations/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            setFilteredDonation(filteredDonation.filter(item => item._id !== id)); //filter updated data 


        } catch (error) {
            console.log(error);
        }

    }
    ////////////////////////////////////////////////////////////
    const columns = [
        {
            name: "Receipt No:",
            selector: (row) => row.receiptNo,
            sortable: true,
            width: "150px",
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "200px",
            center: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            width: "300px",
            center: true
        },
        {
            name: "Mobile",
            selector: (row) => row.mobile,
            width: "150px",
            center: true
        },
        {
            name: "Donate RS:",
            selector: (row) => "RS: " + row.donateRS,
            sortable: true,
            center: true,
            width: "150px",
        },

        {
            name: "Donation Nature",
            selector: (row) => row.donateNature,
            sortable: true,
            width: "150px",
            center: true

        },

        {
            name: "Address:",
            selector: (row) => row.address,
            width: "250px",
        },
        {
            name: "Remarks:",
            selector: (row) => row.remarks,
            width: "250px",

        },

        {
            name: "Donation Date",
            selector: (row) => new Date(row.createdAt).toDateString(),
            sortable: true,
            width: "150px",
            center: true
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
                                    `${row.name}'s Donation Record has been deleted.`,
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    `${row.name}'s Donation record is safe!`,
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

    useEffect(() => { getDonations() }, [])

    useEffect(() => {
        const result = donation.filter((item) => {
            return item.name.toLowerCase().match(search.toLowerCase());
        });
        setFilteredDonation(result);
    }, [search]);

    ////////////////////////////////////////////////////////////

    const [data, setData] = useState({}) //For Update data

    ////////////////////////////////////////////////////////////
    const [modal, setModal] = useState(false) //For Modal  



    ////////////////////////////////////////////////////////////


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

                    <EditDonation obj={data} />

                </ModalBody>


            </Modal>

            <div className="pageContainer">
                <div className="clientContainer_old">
                    <div className="tableContainer">
                        <DataTable
                            title={props.detail}
                            columns={columns}
                            data={filteredDonation}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight='450px'
                            highlightOnHover
                            subHeader
                            pointerOnHover
                            dense

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

export default DonorTable;