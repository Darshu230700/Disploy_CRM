import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Loading from './Loading';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const DynamicTable = ({ columns, data, modelLabel, setOpenModal }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        state: { pageIndex },
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 5 }, }, useSortBy, usePagination);


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-[9999] flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {modelLabel}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-3xl text-primary cursor-pointer"
                                onClick={() =>
                                    setOpenModal(false)}
                            />
                        </div>
                        <div className="xl:w-full h-96 vertical-scroll-inner relative p-4">
                            <div >
                                <div className="relative scroll-inner shadow-md sm:rounded-lg">
                                    {loading ? (
                                        <div className="flex justify-center items-center h-60">
                                            <Loading />
                                        </div>
                                    ) : (
                                        <div className="relative scroll-inner block w-full">
                                            <table className="w-full border border-slate-200 table " {...getTableProps()}>
                                                <thead className="text-md font-medium border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                                    {headerGroups.map(headerGroup => (
                                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                                            {headerGroup.headers.map(column => (
                                                                <th
                                                                    key={column.accessor}
                                                                    className=" mw-200 px-4 py-2 "
                                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                                >
                                                                    <div className="flex justify-center items-center w-full">
                                                                        {column.render('Header')}
                                                                        <span>
                                                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                                        </span>
                                                                    </div>
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </thead>
                                                <tbody {...getTableBodyProps()}>
                                                    {page.map(row => {
                                                        prepareRow(row);
                                                        return (
                                                            <tr
                                                                key={row.index}
                                                                className={`bg-white dark:bg-gray-800 capitalize cursor-pointer text-center`}
                                                                {...row.getRowProps()}
                                                            >
                                                                {row.cells.map(cell => (
                                                                    <td
                                                                        key={cell.column.accessor}
                                                                        className="w-4 px-4 py-2 border border-slate-200"
                                                                        {...cell.getCellProps()}
                                                                    >
                                                                        {/* {cell?.value} */}
                                                                        {cell.render('Cell')}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                                <div className="flex lg:flex-row lg:justify-between md:flex-row md:justify-between sm:flex-row sm:justify-between flex-col justify-end p-5 gap-3">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 font-semibold">{`Total ${data?.length} Deals `}</span>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => previousPage()}
                                            disabled={!canPreviousPage}
                                            className="font-semibold flex cursor-pointer hover:bg-white hover:text-primary items-center justify-center px-3 h-8 me-3 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <svg
                                                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 5H1m0 0 4 4M1 5l4-4"
                                                />
                                            </svg>
                                            Previous
                                        </button>
                                        <div className="flex items-center me-3">
                                            <span className="text-gray-500">{`Page ${pageIndex} of ${pageCount}`}</span>
                                        </div>
                                        <button
                                            onClick={() => nextPage()}
                                            disabled={!canNextPage}
                                            className="font-semibold flex hover:bg-white hover:text-primary cursor-pointer items-center justify-center px-3 h-8 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            Next
                                            <svg
                                                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DynamicTable;
