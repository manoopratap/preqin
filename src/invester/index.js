import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, Box, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';

const Invester = () => {
  const { id } = useParams()
  const [selectedAssetClass, setSelectedAssetClass] = useState('');
  const [commitmentInfo, setCommitmentInfo] = useState([]);


  const handleAssetClassChange = async (event) => {
    setSelectedAssetClass(event.target.value);
    try {
      let selecetedValue = (event.target.value).toLowerCase()
      const response = await fetch(`http://127.0.0.1:8000/api/investor/commitment/${selecetedValue}/${id}`);
      const result = await response.json();
      console.log(result);
      setCommitmentInfo(result);
    } catch (error) {
      console.error('Error fetching commitment information:', error);
    }
  };
  return (
    <div>
      <h1>Investor Page for Investor ID: {id}</h1>
      <Box sx={{ minWidth: 120, width: '200px' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Asset Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAssetClass}
            label="selectedAssetClass"
            onChange={handleAssetClassChange}
          >
            <MenuItem value="PE">Private Equity</MenuItem>
            <MenuItem value="PD">Private Debt</MenuItem>
            <MenuItem value="RE">Real Estate</MenuItem>
            <MenuItem value="INF">Infrastructure</MenuItem>
            <MenuItem value="NR">Natural Resources</MenuItem>
            <MenuItem value="HF">Hedge Funds</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div>
        <h2>Commitment Information</h2>
        <div className='App'>
          {commitmentInfo.length ?
            <div> <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className='Row-header' align="right">ID</TableCell>
                    <TableCell className='Row-header' align="right">Asset Class&nbsp;</TableCell>
                    <TableCell className='Row-header' align="right">Firm Id&nbsp;</TableCell>
                    <TableCell className='Row-header' align="right">currency&nbsp;</TableCell>
                    <TableCell className='Row-header' align="right">amount&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commitmentInfo.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right"> {row.id}</TableCell>
                      <TableCell align="right">{row.asset_class}</TableCell>
                      <TableCell align="right">{row.firm_id}</TableCell>
                      <TableCell align="right">{row.currency}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer></div> :
            <div className='No-data'> No Data Available Please select Asset Class</div>}

        </div>
      </div>
    </div>
  );
};

export default Invester;