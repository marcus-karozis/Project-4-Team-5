import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import STUDENTDATA from '../data/studentData.json'
import { COLUMNS } from '../data/columns'
import './table.css'

//refer to studentData.json and columns.js

const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => STUDENTDATA, []) 

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div>
            <table {...getTableProps()}>
                {/* header */}
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {/* in COLUMNS, for every header, show */}
                                {
                                    headerGroup.headers.map(column => (
                                        <th { ...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    ))
                                }
                            </tr>
                    ))}
                </thead>
                {/* body */}
                <tbody {...getTableBodyProps()}>
                    {/* in COLUMNS, for every accessor, refer to studentData, take values from there */}
                    {
                        rows.map(row => {
                            prepareRow(row);
                            //If isPresent = true , green, if false, red
                            const isPresent = `row-isPresent-${row.original.isPresent}`;
                            return (
                                <tr {...row.getRowProps()} className={isPresent}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BasicTable