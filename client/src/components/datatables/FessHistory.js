import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';
import FeeHistoryEdit from "../Forms/feeHistoryEdit"


const FeeHistoryTable = (props) => {

    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal  


    let url = "/FeeHistory" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    if (props.metaData == "/dashboardapi")
        url = props.metaData;


    const [search, setSearch] = useState("");
    const [fee, setFee] = useState([]);
    const [filteredFee, setFilteredFee] = useState([]);

    const getFee = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });

            if (props.metaData == "/dashboardapi") {
                if (props.detail == "Fee Received") {
                    setFee(response.data.receivedFeeSData);
                    setFilteredFee(response.data.receivedFeeSData);
                }
                else if (props.detail == "Receivable Fee") {
                    setFee(response.data.remainingFeeData);
                    setFilteredFee(response.data.remainingFeeData);
                }

            } else {
                setFee(response.data);
                setFilteredFee(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const conditionalCellStyles = [
        {
            when: row => row.isPaid == "Paid",
            style: row => ({ color: row.isPaid ? 'green' : 'red' }),
        },
        {
            when: row => row.isPaid == "UnPaid",
            style: row => ({ color: row.isPaid ? 'red' : 'green' }),
        },
    ];

    const conditionalCellStylesScholarship = [
        {
            when: row => row.Discount > 0,
            style: row => ({ backgroundColor: '#f2a0cf', color: 'white', }),
        },
    ];

    const handleDelete = async id => { //Delete Record

        await axios.delete(`/FeeHistory/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            }
        });
        setFilteredFee(filteredFee.filter(item => item._id !== id)); //filter updated data 

    }

    const columns = [
        {
            name: "Roll No",
            selector: (row) => row.rollNo,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "200px",
            center: true,
        },
        {
            name: "Fee Month",
            selector: (row) => new Date(row.createdAt).toDateString(),
            width: "200px",
            center: true
        },
        {
            name: "Monthly Fee:",
            selector: (row) => "RS: " + row.Fee,
            sortable: true,
            width: "120px",
            center: true
        },
        {
            name: "Scholarship/Discout",
            selector: (row) => "RS: " + row.Discount,
            sortable: true,
            width: "250px",
            center: true,
            conditionalCellStyles: conditionalCellStylesScholarship
        },
        {
            name: "Total",
            selector: (row) => "RS: " + row.totalFee,
            sortable: true,
            center: true,
            width: "150px"
        },
        {
            name: ".....",
            selector: (row) => ".....",
        },
        {
            name: "IsPaid",
            selector: (row) => row.isPaid,
            sortable: true,
            center: true,
            conditionalCellStyles: conditionalCellStyles

        },
        {
            name: "Fee Paid Rs:",
            selector: (row) => "RS: " + row.paidFee,
            center: true

        },
        {
            name: "Receipt No",
            selector: (row) => row.receiptNo,
            sortable: true,
            width: "130px",
            center: true
        },

        {
            name: "Remarks",
            selector: (row) => row.Remarks,

        },
        {
            name: "Paid Date",
            selector: (row) => {
                if (row.isPaid === "Paid")
                    return new Date(row.updatedAt).toDateString();
                else
                    return "UnPaid";
            },
            width: "150px",
            center: true,
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

    useEffect(() => { getFee() }, [])

    useEffect(() => {
        const result = fee.filter((item) => {
            return item.name.toLowerCase().match(search.toLowerCase());
            /// return item.rollNo.toLowerCase().match(search.toLowerCase());
        });
        setFilteredFee(result);
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

                    <FeeHistoryEdit obj={data} />

                </ModalBody>


            </Modal>

            <div className="pageContainer">
                <div className="clientContainer_old">
                    <div className="tableContainer">
                        <DataTable
                            title={props.detail}
                            columns={columns}
                            data={filteredFee}
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

export default FeeHistoryTable;