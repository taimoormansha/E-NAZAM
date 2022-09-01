import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState, useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';
import { Modal, ModalHeader } from "reactstrap";
import { ModalBody } from 'react-bootstrap';
import EditShobajaat from "../Forms/ShobajaatEdit"


const ShobajaatTable = (props) => {

    const [data, setData] = useState({}) //For Update data
    const [modal, setModal] = useState(false) //For Modal

    const url = "/shobajaat" + props.metaData;
    const authToken = localStorage.getItem("authToken");

    const [search, setSearch] = useState("");
    const [shobajaat, setShobajaat] = useState([]);
    const [filteredShobajaat, setFilteredShobajaat] = useState([]);

    const getShobajaat = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            console.log(response);
            setShobajaat(response.data);
            setFilteredShobajaat(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async id => { //Delete Record
        try {
            const response = await axios.get(`/shobajaat/${id}`, { //Find Object 
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            console.log(response.data.shobaName)

            const students = await axios.get(`/student?shobaName=${response.data.shobaName}`, { //All students with deleted Shobajaat
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            })
            console.log(students.data)

            await axios.delete(`/shobajaat/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                }
            });
            setFilteredShobajaat(filteredShobajaat.filter(item => item._id !== id)); //filter updated data                     

            for (let i = 0; i < students.data.length; i++)
                await axios.patch(`/student/${students.data[i]._id}`, //Remove Shobajaat from student data
                    {
                        shobaName: "",
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

    const conditionalCellStyles = [
        {
            when: row => row.isActive == "Active",
            style: row => ({ color: row.isActive ? 'green' : 'red' }),
        },
        {
            when: row => row.isActive == "Postponed",
            style: row => ({ color: row.isActive ? 'red' : 'green' }),
        },
    ];

    const columns = [
        {
            name: "Shoba Name",
            selector: (row) => row.shobaName,
            sortable: true,
            width: "200px",
            left: true,
        },
        {
            name: "FEES RS:",
            selector: (row) => "RS " + row.fee,
            sortable: true,
            center: true
        },
        {
            name: "IS Active",
            selector: (row) => row.isActive,
            sortable: true,
            center: true,
            conditionalCellStyles: conditionalCellStyles
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.createdAt).toDateString(),
            sortable: true,
            center: true,
            width: "150px",
        },
        {
            name: "Updated At",
            selector: (row) => new Date(row.updatedAt).toDateString(),
            sortable: true,
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
                        text: `Do you really want to delete shoba ${row.shobaName}?`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                handleDelete(row._id); //Delete Record
                                swal(
                                    'Deleted!',
                                    `Shoba ${row.shobaName} has been deleted.`,
                                    'success'
                                );
                            } else {
                                swal(
                                    "Cancelled",
                                    `Shoba ${row.shobaName} is safe!`,
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

    useEffect(() => { getShobajaat() }, [])

    useEffect(() => {
        const result = shobajaat.filter((item) => {
            return item.shobaName.toLowerCase().match(search.toLowerCase());
        });
        setFilteredShobajaat(result);
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

                    <EditShobajaat obj={data} />

                </ModalBody>


            </Modal>

        <div className="pageContainer">
            <div className="clientContainer_old">
                <div className="tableContainer">
                    <DataTable
                        title={props.detail}
                        columns={columns}
                        data={filteredShobajaat}
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

export default ShobajaatTable;