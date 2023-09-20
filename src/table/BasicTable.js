import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import STUDENTDATA from '../data/studentData.json'
import { COLUMNS } from '../data/columns'
import './table.css'

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
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
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
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
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