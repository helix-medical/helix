import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [patient, setPatient] = useState({
        name: "",
        lastName: "",
        birthDate: "",
        sex: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const patientId = location.pathname.split('/')[2];

    const handleChange = (e) => {
        setPatient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/patients/${patientId}`, patient);
            navigate('/patients');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Update a Patient</h1>
            <div className="form">
                <input type="text" placeholder="Name" onChange={handleChange} name="name" />
                <input type="text" placeholder="Last Name" onChange={handleChange} name="lastName" />
                <input type="text" placeholder="Sex" onChange={handleChange} name="sex" />
                <input type="text" placeholder="Birth Date" onChange={handleChange} name="birthDate" />
            </div>
            <button onClick={handleClick}>Update</button>
        </div>
    )
};

export default Update;