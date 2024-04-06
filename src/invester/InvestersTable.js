import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';



const InvestorsTable = () => {
  const [investors, setInvestors] = useState([]);
  const fetchInvestors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/investors');
      const result = await response.json()
      setInvestors(result);
    } catch (error) {
      console.error('Error fetching investors:', error);
    }
  };
  useEffect(() => {
    fetchInvestors();
  }, []);

  return (
    <div className='App'>
      <div className='Heading'>
        Welcome to Investment Portal
      </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className='Row-header' align="right">FirmId</TableCell>
                <TableCell className='Row-header' align="right">FirmName&nbsp;</TableCell>
                <TableCell className='Row-header' align="right">Type&nbsp;</TableCell>
                <TableCell className='Row-header' align="right">DateAdded&nbsp;</TableCell>
                <TableCell className='Row-header' align="right">Address&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investors.map((row) => (
                <TableRow component={Link} to={`/investors/${row.firm_id}`}
                  key={row.firm_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right"> {row.firm_id}</TableCell>
                  <TableCell align="right">{row.firm_name}</TableCell>
                  <TableCell align="right">{row.firm_type}</TableCell>
                  <TableCell align="right">{row.date_added}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};

export default InvestorsTable;