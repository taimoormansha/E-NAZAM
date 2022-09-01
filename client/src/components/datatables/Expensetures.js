import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';
import EditExpenses from "../Forms/expensesEdit"

const ExpendeturesTable = (props) => {
    
    let url = "/expendetures" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    if (props.metaData === "/dashboardapi")
        url = props.metaData;



    const [search, setSearch] = useState("");
    const [Expendetures, setExpendetures] = useState([]);
    const [filteredExpendetures, setFilteredExpendetures] = useState([]);

    const getExpendetures = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": authToken,
                }
              });
            console.log(response.data.dailyExpendeturesData);
            if (props.metaData == "/dashboardapi") 
            {
                if (props.detail == "Today's Expendetures") {
                    setExpendetures(response.data.dailyExpendeturesData);
                    setFilteredExpendetures(response.data.dailyExpendeturesData);
                } else if (props.detail == "Monthly Expendetures") {
                    setExpendetures(response.data.monthlyExpendeturesData);
                    setFilteredExpendetures(response.data.monthlyExpendeturesData);
                }
                else if (props.detail == "Yearly Expendetures") {
                    setExpendetures(response.data.anuallyExpendeturesData);
                    setFilteredExpendetures(response.data.anuallyExpendeturesData);
                }

            } else {
                setExpendetures(response.data);
                setFilteredExpendetures(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async id => { //Delete Record
        try {
            await axios.delete(`/expendetures/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });         
            setFilteredExpendetures(filteredExpendetures.filter(item => item._id !== id)); //filter updated data 

        } catch (error) {
            console.log(error);
        }

    }

    const columns = [
       
        {
            name: "Name",
            selector: (row) => row.byName,
            sortable: true,
            width: 200
        },
        {
            name: "Item Title",
            selector: (row) => row.title,
            width: 200,
        },
        {
            name: "Total Rs:",
            selector: (row) => "RS: " + row.totalPrice,
        },
        {
            name: "Details",
            selector: (row) => row.details,
            width: "300px",
        },

        {
            name: "Data",
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
                        text: `Do you really want to delete ${row.title}?`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                handleDelete(row._id); //Delete Record
                                swal(
                                    'Deleted!',
                                    `${row.title} has been deleted.`,
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    `${row.title} is safe!`,
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

    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal  


    useEffect(() => { getExpendetures() }, [])

    useEffect(() => {
        const result = Expendetures.filter((item) => {
            return item.byName.toLowerCase().match(search.toLowerCase());
            /// return item.rollNo.toLowerCase().match(search.toLowerCase());
        });
        setFilteredExpendetures(result);
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

                    <EditExpenses obj={data} />

                </ModalBody>


            </Modal>

        <div className="pageContainer">
            <div className="clientContainer_old">
                <div className="tableContainer">
                    <DataTable
                        title={props.detail}
                        columns={columns}
                        data={filteredExpendetures}
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

export default ExpendeturesTable;