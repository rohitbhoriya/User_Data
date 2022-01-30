import React from 'react';
import { useState } from 'react';

const Pagination = ({
    itemPerPage,
    totalUsers,
    paginate,
    currentPage,
    handleNextPage,
    handlePrevPage,
}) => {
    const [pageNumberLimit, setPageNumberLimit] = useState(5);

    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages = [];
    for (let i = 1; i <= Math.ceil(totalUsers / itemPerPage); i++) {
        pages.push(i);
    }

    const nextButton = () => {
        handleNextPage();
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const prevButton = () => {
        handlePrevPage();
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    return (
        <>
            <ul className="pageNumbers">
                <button
                    className="btn_prev_next"
                    onClick={prevButton}
                    disabled={currentPage === pages[0] ? true : false}
                >
                    &lt;
                </button>
                {pages.map((number) => {
                    if (
                        number < maxPageNumberLimit + 1 &&
                        number > minPageNumberLimit
                    ) {
                        return (
                            <li
                                onClick={() => paginate(number)}
                                key={number}
                                id={number}
                                className={
                                    currentPage === number ? 'active' : null
                                }
                            >
                                {number}
                            </li>
                        );
                    }
                })}
                
                    <button
                        className="btn_prev_next"
                        onClick={nextButton}
                        disabled={currentPage === pages[pages.length-1]}
                    >
                        &gt;
                    </button>
                
            </ul>
        </>
    );
};

export default Pagination;
