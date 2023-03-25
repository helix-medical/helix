import React from "react";
import Calendar from "../calendar";

const Home = () => {
    return (
        <div>
            <h1>Welcome User</h1>
            {/* <h1 className="form">Je t'aime Maivy 💛</h1> */}
            <div className="form">
                <Calendar />
            </div>
        </div>
    )
};

export default Home;