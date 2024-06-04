import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CiFilter } from "react-icons/ci";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Service from '../Service';

function ManagerScreen2() {

    const [value,setValue]=useState([]);

    useEffect(() => {
    Service.getByMasterDummyUrl()
        .then((response) => setValue(response.data))
        .catch(err => console.log(err))
    }, [])
    
    console.log(value,"value")
    

    const [age, setAge] = useState('');

const handleChange = (event) => {
    setAge(event.target.value);
};

console.log(age);


    const columns = [
        {
            name: <div className='text-lg font-medium text-black ml-16'>Employee</div>,
            minWidth: "100px",
            cell: row => (
                <div className='flex mb-2 hover:cursor-pointer' onClick={()=>handleNavigate(row)}>

                    {/* HERE SONARLINIT IS ASKING TO REFRACTOR THE CODE BUT WE WILL NOT DO IT HERE BECAUSE HERE WE HAVE TO USE "div" tag only we cannot use button tag. */}
                    <img src="profile.jpeg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Profile" />
                    <div>
                        <h1 className='text-lg font-normal text-black pl-4 pt-2'><span className='text-blue-600 font-medium'>{row.empCode}</span> <span className='text-blue-600'>-</span> <span className='text-blue-600 font-medium'>{row.empName}</span></h1>
                        <div className='ml-12'>
                            <h3 className='text-lg text-gray-500 -ml-8'>{row.designation}</h3>
                            <h3 className='text-m text-gray-500 -ml-8'>{row.totalWorkPeriod}</h3>
                        </div>
                    </div>
                    
                </div>
            )
        },

        

        // SO HERE THE LOGIC WHICH I HAVE WRITTEN IS THAT IF THE GOAL IS SUBMITTED ON THE DATE THEN THE STATUS WILL BE SUBMITTED ELSE PENDING IS DISPLAYED.
        // MEANS IN THE BACKEND I HAVE FETCHED THE DATES BUT  IN FRONT END. IT WILL SHOW THE STATUS WITH THE HELP OF TERNARY OPERATIONS
        {
            name: <div className='text-lg font-medium text-black ml-4'>Employee Submit</div>,
            maxWidth: "200px",
            selector: row => (
                <div className='text-lg ml-4 '>
                    <span className='text-red-500'>{row.goalsSubmittedOn? "Submitted":"Pending"}</span>
                </div>
            )
        },

        {
            name: <div className='text-lg font-medium text-black ml-4 '>Manager Approval</div>,
            maxWidth: "200px",
            selector: row => (
                <div className='text-lg ml-4'>
                    <span className='text-gray-600'>{row.goalsReviewedOn? "Submitted":"Pending"}</span>
                </div>
            )
        },

        {
            name: <div className='text-lg font-medium text-black ml-4'>Self Assessment</div>,
            maxWidth: "200px",
            selector: row => (
                <div className='text-lg ml-4'>
                    <span className='text-red-500'>{row.assessmentSubmittedOn}</span>
                </div>
            )
        },

        {
            name: <div className='text-lg font-medium text-black ml-4 '>Manager Assessment</div>,
            maxWidth: "235px",
            selector: row => (
                <div className='text-lg ml-4'>
                    <span className='text-gray-600'>{row.assessmentReviewedOn}</span>
                </div>
            )
        },

    ];

    const navigate=useNavigate();
    const handleNavigate=(row)=>{
        navigate("/review",{state:{data:row}})
    }
    const[filter, setFilter] = useState(false);
    const handleClick = () => {
    // Handle the click event here
    console.log('Filter Button clicked');
    setFilter(!filter);
    }

    return (
        <div className='w-full h-screen bg-gray-200'>
            <checkbox />
            {/* Your content */}
            <div className='bg-white rounded-md relative top-12 ml-4 mr-3 border-[1px] border-blue-400 pb-24'>
                <div className='flex'>
                    <h1 className='text-[22px] font-medium text-black pl-12 pt-12'>Appraisee List</h1>
                    <div className='ml-[460px]'>
                        <h1 className='text-xl font-normal text-black pl-4 pt-10'>Quarter-2</h1>
                        <h3 className='text-m text-gray-500 -ml-8'>01-Apr 2023 to 30-Jun-2023</h3>
                    </div>
                    <div className='mt-12 ml-[460px] text-4xl text-black'>
                    <CiFilter onClick={handleClick} />
                    </div>

            {filter && <div className='absolute ml-[1200px] mt-24 z-50 '>
            <div className='border-[2px] border-black bg-gray-100 -ml-24 pb-12  rounded-md  ' value={age} onChange={handleChange}>
                
            <MenuItem value={1}>All</MenuItem>
            <MenuItem value={2}>Pending with Employee</MenuItem>
            <MenuItem value={3}>Pending with Manager</MenuItem>
    
        </div>
</div>}

                </div>

                {/* DataTable Component */}
                <DataTable className='mt-10 ' columns={columns} data={value} selectableRows highlightOnHover striped  />
            </div>
        </div>
    );
}

export default ManagerScreen2;







