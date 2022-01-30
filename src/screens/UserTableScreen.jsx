import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

import "../App.css"

const UserTableScreen = () => {
    const [users, setUsers] = useState([]);

    const [value, setValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [order,setOrder] = useState("ASC")

    useEffect(() => {
        axios
            .get(
                `https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json`
            )
            .then((res) => {

                setUsers(res.data);
            });
    }, []);
    
    const handleSearch = () => {
        
        const searchData = users.filter(
            (user) =>
                user.first_name.toLowerCase().includes(value) ||
                user.last_name.toLowerCase().includes(value)
        );

        setUsers(searchData);
    }

    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                col==="age" ? a[col] - b[col] :   
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1   
            )
            setUsers(sorted);
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                col === 'age'
                    ? b[col] - a[col]
                    : a[col].toLowerCase() < b[col].toLowerCase()
                    ? 1
                    : -1
            );
            setUsers(sorted);
            setOrder("ASC")
        }
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;

    let currentItems;
    if (users.length !== 1) {
        currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    }
    else {
        currentItems = users
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <>
            <div className="app-container">
                <h2>User Table page</h2>

                <div className="container">
                    <h3>Users</h3>
                    {/* <form onSumit={handleSearch}> */}
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="Search first or last name"
                            value={value.toLowerCase()}
                            onChange={(e) =>
                                setValue(e.target.value.toLowerCase())
                            }
                        />
                        <button
                            type="button"
                            className="search_btn"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </label>
                    {/* </form> */}
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => sorting('first_name')}>
                                    First Name &nbsp;<span></span>
                                </th>
                                <th onClick={() => sorting('last_name')}>
                                    Last Name &nbsp;
                                </th>
                                <th onClick={() => sorting('age')}>
                                    Age &nbsp;
                                </th>
                                <th onClick={() => sorting('email')}>
                                    Email &nbsp;
                                </th>
                                <th onClick={() => sorting('web')}>
                                    Website &nbsp;
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user) => (
                                <tr key={user.id} className="table_row">
                                    <td>
                                        <Link
                                            to={`/users/${user.id}`}
                                            className="linkpage"
                                        >
                                            {user.first_name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/users/${user.id}`}
                                            className="linkpage"
                                        >
                                            {user.last_name}
                                        </Link>
                                    </td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <a
                                            href={user.web}
                                            className="linkInTab"
                                            target="_blank"
                                        >
                                            {user.web}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    itemPerPage={itemPerPage}
                    totalUsers={users.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    handleNextPage={() =>
                        setCurrentPage(
                            currentPage <= users.length
                                ? currentPage + 1
                                : currentPage
                        )
                    }
                    handlePrevPage={() => setCurrentPage(currentPage - 1)}
                />
            </div>
        </>
    );
};

export default UserTableScreen;
