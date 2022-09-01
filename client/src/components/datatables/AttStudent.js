import React from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import { useState , useEffect } from "react";
import "./courses.css";
import Button from 'react-bootstrap/Button';


const AttStudentTable = () => {
    const [search, setSearch] = useState("");
    const [att, setAtt] = useState([]);
    const [filteredAtt, setFilteredAtt] = useState([]);

    const getAttendance = async () => {
        try {
            const response = await axios.get("http://localhost:8001/StudentAttendance");
            console.log(response);
            setAtt(response.data);
            setFilteredAtt(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            name: "Roll No",
            selector: (row) => row.rollNo ,
            sortable: true,            
        },
        {
            name: "Name",
            selector: (row) => row.name ,
            sortable: true,            
        },
        {
            name: "Is Present",
            selector: (row) =>  row.isPresent, 
            sortable: true,                     
        },
        {
            name: "Status",
            selector: (row) => row.studentStatus,                       
        },
        {
            name: "Remarks",
            selector: (row) => row.remarks,                      
        },
       
        {
            name: "Data",
            selector: (row) => new Date(row.createdAt).toDateString(),          
            sortable: true,
        },

             
        {
            name: "Action",
            cell: (row) => (
                <Button variant="info">
                    Edit
                </Button>                
            ),
            right: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <Button variant="danger"                   
                    onClick={() => alert("Hi")}
                >
                    Delete
                </Button>
            ),
            left: true,
        },
       
    ];

    useEffect(()=>{getAttendance()},[])

    useEffect(() => {
        const result = att.filter((item) => {            
           return item.name.toLowerCase().match(search.toLowerCase());
           // return item.rollNo.toLowerCase().match(search.toLowerCase());
        });
        setFilteredAtt(result);
    }, [search]);

    return (
        <div className="pageContainer">
        <p className="pageHeading center">Student Attendance</p>
        <div className="clientContainer_old">
        <div className="tableContainer">
        <DataTable         
            title='List of Attendance'
            columns={columns}
            data={filteredAtt}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='450px'
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            actions={<button className="btn btn-sm btn-info">Export</button>}
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
    );
};

export default AttStudentTable;