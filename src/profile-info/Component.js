import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaCheck} from 'react-icons/fa'
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { StyleSheetManager } from 'styled-components';
import Service from '../Service';
// import PmsService from '../services/PmsService';

const blueIconStyle = {
  color: '#40cd40',
  fontSize: '20px',
};

function Component() {
  
  const navigate=useNavigate();

  const [employeePerformance, setEmployeePerformance] = useState([]);

  const date = new Date();
  const Year = date.getFullYear();

  const currentYear = Year.toString();
  const currentYearRange = Year.toString() + "-" + (Year + 1).toString();

  const [year, setYear] = useState(currentYear); // Set initial year to current year
  const [reviewCycle, setReviewCycle] = useState(currentYearRange); // Set initial review cycle based on current year
  const [reviewCycleOptions, setReviewCycleOptions] = useState([currentYearRange]); // Set initial review cycle options

  const options1 = ['2023', '2024', '2025'];
  const yearIndex = options1.indexOf(currentYear);
  const defaultOption1 = options1[yearIndex];

  const generateReviewCycleOptions = (year) => {
    const nextYear = parseInt(year) + 1;
    return [`${year}-${nextYear}`];
  };

  useEffect(() => {
    const initialReviewCycleOptions = generateReviewCycleOptions(currentYear);
    setReviewCycleOptions(initialReviewCycleOptions);
    setReviewCycle(initialReviewCycleOptions[0]);
  }, [currentYear]);

  useEffect(() => {
    if (year && reviewCycle) {
      console.log(year, reviewCycle);
      Service.getByYearAndReviewCycle(year,reviewCycle,1)
        .then((res) => {
          setEmployeePerformance(res.data);
        });
    }
  }, [year, reviewCycle]);

  const handleSelect1 = (selectedOption) => {
    const selectedYear = selectedOption.value;
    setYear(selectedYear);
    const newReviewCycleOptions = generateReviewCycleOptions(selectedYear);
    setReviewCycleOptions(newReviewCycleOptions);
    setReviewCycle(newReviewCycleOptions[0]);
  };

  const handleSelect2 = (selectedOption) => {
    setReviewCycle(selectedOption.value);
  };
  const columns=[
    {
      name:"Appraisal Cycle",
      selector:row=>row.appraisalCycle,
      font:"bold",
      conditionalCellStyles: [
        {
          when: (row) => row.submittedOn === null,
          style: {color: ' #6dadd3'},
        },
      ],
       },
    {
      name:" Submitted for Approval",
      cell: (row) => (row.submittedOn !==null ? <FaCheck style={blueIconStyle}/> : ""),
  },
     {
      name:" Submitted On",
      selector:row=>row.submittedOn,
    },
    {
      name:"Manager Approval",
      cell: (row) => (row.approvedOn !==null ? <FaCheck style={blueIconStyle}/> : ""),
      },
    {
      name:" Approved on",
      selector:row=>row.approvedOn,
       },
    {
      name:" self review",
      cell: (row) => (row.submittedOnn !==null ? <FaCheck style={blueIconStyle}/> : ""),
       },
     {
      name:" Submitted On",
      selector:row=>row.submittedOnn,
     },
    {
      name:" Manager ",
      selector:row=>row.manager,
     
      conditionalCellStyles: [
        {
          when: (row) => row.submittedOn === null,
          style: {color: '#6dadd3'},
        },
      ],
      cell: (row) => {
        if (row.manager === "Mathimaran.P") {
          return (
             <button to="/managerView" onClick={()=>renderMV(row)}>Mathimaran.P</button>
          );
        } 
        else {
          return row.manager;
        }
      },
       },
    {
      name:" Manager Review  ",
      cell: (row) => (row.reviewedOn !==null ? <FaCheck style={blueIconStyle}/> : ""),      
    },
    {
      name:" Reviewed On ",
      selector:row=>row.reviewedOnn,
    },
    {
      name: "current Status",
      selector: (row) => row.currentStatus,
      wrap: "true",
      conditionalCellStyles: [
        {
          when: (row) => row.submittedOn === null,
          style: { color: " #6dadd3" },
        },
      ],

      cell: (row) => {
        if (row.currentStatus === "Open") {
          return (
            
             <button to="/open" onClick={()=>render(row)}>Open</button>
          );
        } 
        else {
          return row.currentStatus;
        }
      },
    },
     {
        name: "status",
        selector: (row) => row.status,
        style: { minWidth: "120px" }, 
        cell: (row) => (
          <div>
          {row.status === "Due in 5 Days" && (
            <button
              className="statusButton"
              style={{ backgroundColor: "gray", padding: "6px",fontWeight: "bold",color: "white",borderRadius: "5px",width: "98px"  }}  > Due in 5 Days
            </button>
          )}
          {row.status === "Done" && (
            <button
              className="statusButton"
              style={{ backgroundColor: "#55DD33", padding: "6px",fontWeight: "bold",color: "white",borderRadius: "5px",width: "90px" }} > Done </button>
          )}
        </div>
        )}];

    const newStyle={
    headCells:{
       style:{
    fontSize:"12px",
    fontWeight:"700",
     }
    }
  }

const render=(row)=>{
  navigate("/open",{state:{data:row}})
}
const renderMV=(row)=>{
  navigate("/managerView",{state:{data:row}})
}
return (
  <div style={{ backgroundColor: '#DCDCDC', padding: '10px' }}>
  <Card sx={{ borderRadius: '20px' }}>
    <CardContent>

<StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
    <div className='ml-5 mt-1'>
        <div className='flex flex-col space-y-5 items-center sm:flex-row sm:space-x-28 sm:items-center'>
            <div>
                <h1 className='font-bold text-lg mt-[-5px]'>Year</h1>
            </div>
            <div className='w-full sm:w-1/6 font-bold'>
            <Dropdown
                    options={options1}
                    onChange={handleSelect1}
                    value={year || defaultOption1}
                    placeholder="Select an option"
                  />
            </div>
        </div>

        <div className='flex flex-col space-y-5 items-center mt-1 sm:flex-row sm:space-x-12 sm:mt-0'>
            <div>
                <h1 className='font-bold text-lg mt-[-5px]'>Review Cycle</h1> 
            </div>
            <div className='w-full sm:w-1/6 font-bold'>
            <Dropdown
                    options={reviewCycleOptions}
                    onChange={handleSelect2}
                    value={reviewCycle}
                    placeholder="Select an option"
                  />
            </div>
        </div>
    </div>
    <DataTable data={employeePerformance} data-testid="comp" columns={columns} responsive customStyles={newStyle}/>
    
</StyleSheetManager>
</CardContent>
    </Card>
  </div>

   );
}

export default Component;























// import PmsServices from '../services/PmsServices';

// const blueIconStyle = {
//   color: '#40cd40',
//   fontSize: '20px',
// };

// function Component() {
//   const navigate = useNavigate();
//   const [employeePerformance, setEmployeePerformance] = useState([]);

//   const date = new Date();
//   const Year = date.getFullYear();

//   const currentYear = Year.toString();
//   const currentYearRange = Year.toString() + "-" + (Year + 1).toString();

//   const [year, setYear] = useState(currentYear); // Set initial year to current year
//   const [reviewCycle, setReviewCycle] = useState(currentYearRange); // Set initial review cycle based on current year
//   const [reviewCycleOptions, setReviewCycleOptions] = useState([currentYearRange]); // Set initial review cycle options

//   const options1 = ['2023', '2024', '2025'];
//   const yearIndex = options1.indexOf(currentYear);
//   const defaultOption1 = options1[yearIndex];

//   const generateReviewCycleOptions = (year) => {
//     const nextYear = parseInt(year) + 1;
//     return [${year}-${nextYear}];
//   };

//   useEffect(() => {
//     const initialReviewCycleOptions = generateReviewCycleOptions(currentYear);
//     setReviewCycleOptions(initialReviewCycleOptions);
//     setReviewCycle(initialReviewCycleOptions[0]);
//   }, [currentYear]);

//   useEffect(() => {
//     if (year && reviewCycle) {
//       PmsServices.getByYearAndReviewCycle(year,reviewCycle,empId)
//         .then((res) => {
//           setEmployeePerformance(res.data);
//         });
//     }
//   }, [year, reviewCycle]);

//   const handleSelect1 = (selectedOption) => {
//     const selectedYear = selectedOption.value;
//     setYear(selectedYear);
//     const newReviewCycleOptions = generateReviewCycleOptions(selectedYear);
//     setReviewCycleOptions(newReviewCycleOptions);
//     setReviewCycle(newReviewCycleOptions[0]);
//   };

//   const handleSelect2 = (selectedOption) => {
//     setReviewCycle(selectedOption.value);
//   };

//   const columns=[
//     {
//       name:"Appraisal Cycle",
//       selector:row=>row.appraisalCycle,
//       font:"bold",
//       conditionalCellStyles: [
//         {
//           when: (row) => row.submittedOn === null,
//           style: {color: ' #6dadd3'},
//         },
//       ],
//        },
//     {
//       name:" Submitted for Approval",
//       cell: (row) => (row.submittedOn !==null ? <FaCheck style={blueIconStyle}/> : ""),
//   },
//      {
//       name:" Submitted On",
//       selector:row=>row.submittedOn,
//     },
//     {
//       name:"Manager Approval",
//       cell: (row) => (row.approvedOn !==null ? <FaCheck style={blueIconStyle}/> : ""),
//       },
//     {
//       name:" Approved on",
//       selector:row=>row.approvedOn,
//        },
//     {
//       name:" self review",
//       cell: (row) => (row.submittedOnn !==null ? <FaCheck style={blueIconStyle}/> : ""),
//        },
//      {
//       name:" Submitted On",
//       selector:row=>row.submittedOnn,
//      },
//     {
//       name:" Manager ",
//       selector:row=>row.manager,
     
//       conditionalCellStyles: [
//         {
//           when: (row) => row.submittedOn === null,
//           style: {color: '#6dadd3'},
//         },
//       ],
//       cell: (row) => {
//         if (row.manager === "Mathimaran.P") {
//           return (
//              <button to="/managerView" onClick={()=>renderMV(row)}>Mathimaran.P</button>
//           );
//         } 
//         else {
//           return row.manager;
//         }
//       },
//        },
//     {
//       name:" Manager Review  ",
//       cell: (row) => (row.reviewedOnn !==null ? <FaCheck style={blueIconStyle}/> : ""), 
//     },
//     {
//       name:" Reviewed On ",
//       selector:row=>row.reviewedOnn,
//     },
//     {
//       name: "current Status",
//       selector: (row) => row.currentStatus,
//       wrap: "true",
//       conditionalCellStyles: [
//         {
//           when: (row) => row.submittedOn === null,
//           style: { color: " #6dadd3" },
//         },
//       ],

//       cell: (row) => {
//         if (row.currentStatus === "Open") {
//           return (
            
//              <button to="/open" onClick={()=>render(row)}>Open</button>
//           );
//         } 
//         else {
//           return row.currentStatus;
//         }
//       },
//     },
//      {
//         name: "status",
//         selector: (row) => row.status,
//         style: { minWidth: "120px" }, 
//         cell: (row) => (
//           <div>
//           {row.status === "Due in 5 Days" && (
//             <button
//               className="statusButton"
//               style={{ backgroundColor: "gray", padding: "6px",fontWeight: "bold",color: "white",borderRadius: "5px",width: "98px"  }}  > Due in 5 Days
//             </button>
//           )}
//           {row.status === "Done" && (
//             <button
//               className="statusButton"
//               style={{ backgroundColor: "#55DD33", padding: "6px",fontWeight: "bold",color: "white",borderRadius: "5px",width: "90px" }} > Done </button>
//           )}
//         </div>
//         )}];

       
//   const newStyle = {
//     headCells: {
//       style: {
//         fontSize: "12px",
//         fontWeight: "700",
//       }
//     }
//   }

//   const empId = 1;

//   const render = (row) => {
//     navigate("/open", { state: { data: row } });
//   };
//   const renderMV = (row) => {
//     navigate("/managerView", { state: { data: row } });
//   };

//   return (
//     <div style={{ backgroundColor: '#DCDCDC', padding: '10px' }}>
//       <Card sx={{ borderRadius: '20px' }}>
//         <CardContent>
//           <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
//             <div className='ml-5 mt-1'>
//               <div className='flex flex-col space-y-5 items-center sm:flex-row sm:space-x-28 sm:items-center'>
//                 <div>
//                   <h1 className='font-bold text-lg mt-[-5px]'>Year</h1>
//                 </div>
//                 <div className='w-full sm:w-1/6 font-bold'>
//                   <Dropdown
//                     options={options1}
//                     onChange={handleSelect1}
//                     value={year || defaultOption1}
//                     placeholder="Select an option"
//                   />
//                 </div>
//               </div>

//               <div className='flex flex-col space-y-5 items-center mt-1 sm:flex-row sm:space-x-12 sm:mt-0'>
//                 <div>
//                   <h1 className='font-bold text-lg mt-[-5px]'>Review Cycle</h1>
//                 </div>
//                 <div className='w-full sm:w-1/6 font-bold'>
//                   <Dropdown
//                     options={reviewCycleOptions}
//                     onChange={handleSelect2}
//                     value={reviewCycle}
//                     placeholder="Select an option"
//                   />
//                 </div>
//               </div>
//             </div>
//             <DataTable data={employeePerformance} data-testid="comp" columns={columns} responsive customStyles={newStyle} />
//           </StyleSheetManager>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Component;