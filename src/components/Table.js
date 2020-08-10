import React from 'react';
import '../css/Table.css';

function Table({ countries }) {
    console.log("countries", countries.length);
    return (
        <div className="table">
            <table>
                <tbody>
                    { countries.map(({country, cases, countryInfo: { _id } }) => {
                        return (
                            <tr key={country}>
                                <td className="">{country}</td>
                                <td className=""><strong>{cases}</strong></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table