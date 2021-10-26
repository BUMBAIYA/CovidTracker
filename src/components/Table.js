import React from 'react';
import '../css/Table.css';
import numeral from 'numeral';

const Table = ({ countries }) => {
    return (
        <div className="table">
            <table>
                <tbody>
                    {countries.map(({ country, cases }) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>
                                <strong>{numeral(cases).format("0,0")}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
