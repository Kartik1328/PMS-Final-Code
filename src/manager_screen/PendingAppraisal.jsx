import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const options2 = ['2023-2024', '2024-2025', '2025-2026'];
const defaultOption2 = options2[0];
const handleSelect = (selectedOption) => {
  console.log(`Selected option: ${selectedOption.value}`);
};

function PendingAppraisal() {
  const navigate = useNavigate();
  const [appraisal, setAppraisal] = useState([]);
  const handleActiveClick = (row) => {
    if (row.status === 'Active') {
      navigate('/appraiseeList');
    }
  };

  const empId = 1;
  useEffect(() => {
    axios.get('http://localhost:8080/api/getPendingAppraisal/1')
    // PmsService.getPendingAppraisal()

      .then((response) => {
        setAppraisal(response.data);
        console.log(response.data,"<<<<<<<<<<<<<<<<<<");
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(appraisal,">>>>>>>>>>>>>>>>>>");

const header = [
    {
      name: <strong>Appraisal Cycle</strong>, 
      cell: row => (
        <div className='flex-row mt-6 mb-4'>
            <h1 style={{ color: row.status === 'Active' ? '#6dadd3' : 'inherit' }}><strong>{row.appraisalQuarter}</strong></h1>
            <div className='flex'>
              <h1>{row.periodFrom}</h1>
              <h1>{row.periodTo}</h1>
            </div>
          </div>
      )
    },
    {
      name: <strong>Status</strong>, 
      selector: row => row.status,
      conditionalCellStyles: [
        {
          when: row => row.status === 'Active',
          style: { color: '#6dadd3' },
        },
      ],
      cell: row => {
        if (row.status === 'Active' || row.status === 'Completed') {
          return (
            <button onClick={() => handleActiveClick(row)} style={{ color: row.status === 'Active' ? '#6dadd3' : 'inherit' }}><strong>{row.status}</strong></button>
          );
        } else {
          return <strong>{row.status}</strong>;
        }
      },
    },
  ];
  
  const customStyles = {
    header: {
      style: {
        fontSize: '18px',
      },
    },
    rows: {
      style: {
        fontSize: '20px', 
      },
    },
  };

   return (
    <div style={{ backgroundColor: '#DCDCDC', padding: '10px' }}>
    <Card sx={{ borderRadius: '20px' }}>
      <CardContent>
        <div className='flex flex-col space-y-5 items-center mt-1 sm:flex-row sm:space-x-12 sm:mt-0'>
          <div>
            <h1 className='font-bold text-lg mt-[25px] ml-4'>Review Cycle</h1> 
          </div>
          <div className='w-full sm:w-1/6 font-bold'>
            <Dropdown
              options={options2}
              onChange={handleSelect}
              value={defaultOption2} 
              placeholder="Select an option" 
            />
          </div>
        </div>
        <DataTable columns={header} data={appraisal} customStyles={customStyles} />
      </CardContent>
    </Card>
  </div>
  );
}
 export default PendingAppraisal;

