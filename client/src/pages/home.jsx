import React from "react";

const Home = () => {
    return (
        <div>
            <h1>Helix: CRUD APP</h1>

            <div className="form">
                <ul>
                    <li><a href="/patients">Patients</a></li>
                    <li><a href="/add">Add</a></li>
                    <li><a href="/update">Update</a></li>
                </ul>
            </div>
        </div>
    )
};

export default Home;