// import React from "react";
// import "./custom.css";

// function CustomTable() {
//   const columns = [
//     { id: "1", name: "Employee", width: 200 },
//     { id: "2", name: "Basic" },
//     { id: "3", name: "Alowances" },
//     { id: "4", name: "Pension" },
//     { id: "5", name: "Taxable" },
//     { id: "6", name: "Paye" },
//     { id: "7", name: "insurance" },
//     { id: "8", name: "Deductions" },
//     { id: "9", name: "Net salary" },
//     { id: "10", name: "status" },
//   ];

//   const rows = [
//     {
//       name: "Athanas Shauritanga",
//       basic: "900,000",
//       alowance: "40,000",
//       pension: "39088",
//       taxable: "650000",
//       paye: "60005",
//       insurance: "7000",
//       deduction: "70000",
//       netSalary: "6000",
//       status: "active",
//     },
//     {
//       name: "James Mwang'amba",
//       basic: "900,000",
//       alowance: "40,000",
//       pension: "39088",
//       taxable: "650000",
//       paye: "60005",
//       insurance: "7000",
//       deduction: "70000",
//       netSalary: "6000",
//       status: "active",
//     },
//     {
//       name: "Agustino Kapangamwaka",
//       basic: "900,000",
//       alowance: "40,000",
//       pension: "39088",
//       taxable: "650000",
//       paye: "60005",
//       insurance: "7000",
//       deduction: "70000",
//       netSalary: "6000",
//       status: "active",
//     },
//     {
//       name: "Blessila Luambano",
//       basic: "900,000",
//       alowance: "40,000",
//       pension: "39088",
//       taxable: "650000",
//       paye: "60005",
//       insurance: "7000",
//       deduction: "70000",
//       netSalary: "6000",
//       status: "inactive",
//     },
//   ];

//   const deducedRows = (row) => {
//     const list = [];
//     for (let key in row) {
//       list.push(<td key={key}>{row[key]}</td>);
//     }
//     return list;
//   };
//   return (
//     <div className="custom">
//       <table>
//         <thead>
//           <tr>
//             {columns.map((column) => (
//               <th style={{ width: `${column.width}px` }} key={column.id}>
//                 {column.name}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row) => (
//             <tr key={row.id}>{deducedRows(row)}</tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CustomTable;
