import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaCheck} from 'react-icons/fa'
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { StyleSheetManager } from 'styled-components';

const blueIconStyle = {
  color: '#40cd40',
  fontSize: '20px',
};

function EmployeeStatusTracker() {
  const [employeePerformance,setemployeePerformance] = useState('');
  const options1 = ['2023', '2024', '2025'];
  const defaultOption1 = options1[0];
  const options2 = ['2023-2024', '2024-2025', '2025-2026'];
  const defaultOption2 = options2[0];
  const [DateStatus, setDateStatus] = useState("");
  const [DateStatus2, setDateStatus2] = useState("");
  const handleSelect = (selectedOption) => {
    console.log(`Selected option: ${selectedOption.value}`);
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

      // this date is for goal setting submisson date
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

      // this date is for asssessment submission date from the self assessment table.
     },

     //the four dates that are fetched and displayed here are- submittedOn, approvedOn, submittedOnn, reviewedOn
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
        if (row.manager === "Harish Kumar") {
          return (
            //<span to="/managerView" onClick={()=>renderMV(row)}>Harish Kumar</span>
          <a href="/managerView" onClick={(event) => { event.preventDefault(); renderMV(row); }}>Harish Kumar</a>
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
        if (row.currentStatus === "Opened") {
          return (
             <span to="/open" onClick={()=>render(row)}>Opened</span>
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

            {/* ASK THE LOGIC BEHIND THIS COLUMN HOW THE BUTTON IS DISPLAYED. */}

            {/* HERE THE STATUS IS DISPLAYED AS THE HARD CODED AND THEY ARE TAKEN AS THE INDIVIDUAL ROWS OF THE DATA TABLE COMPOENENT */}

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

// -----------------------------------------------------------------------------------------------------------------------------------------------
  
// HERE I HAVE USED THE LOGIC- IN WHICH I AM REMOVING THE VARIABLE-"submittedOnn and reviewedOnn" FROM THE API RESPONSE. and then adding the variable ="submittedOn and reviewedOn" a diffrent variable from a diffrent table in that place only.
//basically i have added the variables of my designed table and adding into this table.
//for this I am taking a new array and storing the new data in it.
//And i have iterated through the objects and then first removed from its orignal table and then and then adding the new value back again in the table.

const newEmpPerformanceList = [];
let newEmpPerformance1;
for (let i of employeePerformance) {
  const { submittedOnn, reviewedOnn, ...newEmpPerformance } = i;
  newEmpPerformance1 = { ...newEmpPerformance, submittedOnn: DateStatus.submittedOn, 
                            reviewedOnn: DateStatus2.reviewedOn };
  newEmpPerformanceList.push(newEmpPerformance1);
}

console.log(newEmpPerformance1);

  // -------------------------------------------------------------------------------------------------------------------------------------------------

useEffect(() => {
  axios.get('http://localhost:8080/api/getByEmployeeStatus')

  // THIS IS THE PLACE WHERE I HAVE TO PASTE MY API
  
    .then((response) => {
      console.log("response data ====="+response.data);
      setemployeePerformance(response.data);
      console.log("initial date:"+response.data.approvedOn);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);

const render=(row)=>{
  navigate("/open",{state:{data:row}})
}
const renderMV=(row)=>{
  navigate("/managerView",{state:{data:row}})
}

// HERE THESE ARE THE TWO APIs THAT FETCHES THE submittedOn and reviewedOn DATES FROM THEIR ORIGNAL TABLE INTO THIS TABLE
useEffect(()=>{
  axios.get("http://localhost:8080/api/getBySelfAsm/10")
  .then((response)=>{
    setDateStatus(response.data)

    // the response.data is in built react keywords and they can be used repeat
  })
},[])
console.log(DateStatus.submittedOn)

useEffect(()=>{
  axios.get("http://localhost:8080/api/getByManagerAsm/20")
  .then((response)=>{
    setDateStatus2(response.data)
  })
},[])
console.log(DateStatus2.reviewedOn)


return (
<>
<StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
    <div className='ml-5 mt-1'>
        <div className='flex flex-col space-y-5 items-center sm:flex-row sm:space-x-28 sm:items-center'>
            <div>
                <h1 className='font-bold text-lg mt-[-5px]'>Year</h1> {/* Adjust margin-top */}
            </div>
            <div className='w-full sm:w-1/6 font-bold'>
                <Dropdown
                    options={options1}
                    onChange={handleSelect}
                    value={defaultOption1} 
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
                    options={options2}
                    onChange={handleSelect}
                    value={defaultOption2} 
                    placeholder="Select an option" 
                />
            </div>
        </div>
    </div>
    <DataTable data={newEmpPerformanceList} columns={columns} responsive customStyles={newStyle} />
</StyleSheetManager>

    {/*---react data table ends here--*/}
</>
  );
}

export default EmployeeStatusTracker;
