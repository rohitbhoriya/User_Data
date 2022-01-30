import React from 'react';
import Users from '../users'
import { useParams, Link } from "react-router-dom"
import "./userDetails.css"



const UserDetails = () => {
    const { id } = useParams();
    const user = Users.find(user => user.id === Number(id));
    console.log(user)
    console.log(typeof(id))
    return (
        <>
            <div className="main_container">
                <h2>User Details page</h2>
                <div className="mid_container">
                    <div className="main_name">
                        <h1>
                            <Link
                                to="/users"
                                style={{
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}
                            >
                                &#8592;
                            </Link>
                            &nbsp;&nbsp; Details:&nbsp;
                            {user.first_name}&nbsp;{user.last_name}
                        </h1>
                    </div>
                    <div>
                        First Name: <p>&nbsp;{user.first_name}</p>
                    </div>
                    <div>
                        Last Name: <p>&nbsp;{user.last_name}</p>
                    </div>
                    <div>
                        Company_name: <p>&nbsp;{user.company_name}</p>
                    </div>
                    <div>
                        City: <p>&nbsp;{user.city}</p>
                    </div>
                    <div>
                        State: <p>&nbsp;{user.state}</p>
                    </div>
                    <div>
                        Zip: <p>&nbsp;{user.zip}</p>
                    </div>
                    <div>
                        Email: <p>&nbsp;{user.email}</p>
                    </div>
                    <div>
                        Web:{' '}
                        <p>
                            &nbsp;<a href={user.web}
                                style={{ textDecoration: 'none', color: "black" }}
                            target="_blank">
                            {user.web}

                            </a>
                        </p>
                    </div>
                    <div>
                        Age: <p>&nbsp;{user.age}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetails;
