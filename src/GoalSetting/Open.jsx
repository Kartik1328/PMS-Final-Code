import React, { useEffect, useState } from 'react';
import { GrAddCircle } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropdown/style.css';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SelfAppraisel from '../selfAppraisel/SelfAppraisel';
import ManagerReview from '../managerReview/ManagerReview';
import AnnualReviewByEmp from '../annualReview/AnnualReviewByEmp';
import { Typography } from '@mui/material';
import Swal from 'sweetalert2';
import {useSessionStorage} from 'react-use';
import Service from '../Service';

//import '../Pms.css'

function Open() {
  const [kragoals, setKragoals] = useState(Array.from({ length: 1 }, () => ({ kra: "", goals: "", measurementCriteria: "", measurement: "", target:"" ,weightage: "" }))); 
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState("");
  const [selectedTraining, setSelectedTraining] = useState("");
  const [developmentGoals, setDevelopmentGoals] = useState([{ training: "", goal: "", description: "", selfAssessment: "", managerAssessment: "", employeeId: 1 }]);  
  const [selectedGoal, setSelectedGoal] = useState("");
  const [store, setStore] = useState([]);
  const [trainingOptions, setTrainingOptions] = useState([]);
  const trainingDropdown = trainingOptions.map(training=>training.trainingName);
  const [developmentOption, setDevelopmentOption] = useState([]);
  const developmentDropdown = mapDevelopmentOption();
  const [session, setSession] = useSessionStorage('my-key', false);
  const [local, setLocal] = useSessionStorage('my-key1', 'false');

  function mapDevelopmentOption() {
    if (selectedTraining === "Deep Technical") {
      return developmentOption.map(develop => develop.deepTechnical);
    } else if (selectedTraining === "Functional") {
      let functionalOptions = developmentOption.map(develop => develop.functional);
      return trimOptions(functionalOptions);
    } else if (selectedTraining === "Soft Skills") {
      let softSkillsOptions = developmentOption.map(develop => develop.softSkills);
      return trimOptions(softSkillsOptions);
    } else if (selectedTraining === "Product Testing") {
      let productTestingOptions = developmentOption.map(develop => develop.productTesting);
      return trimOptions(productTestingOptions);
    } else if (selectedTraining === "NA") {
      let naOptions = developmentOption.map(develop => develop.na);
      return trimOptions(naOptions);
    } else {
      return [];
    }
  }
  function trimOptions(options) {
    if (!options || options.length === 0) {
        return []; }
    return options.filter(option => option && option.trim() !== '');}

  // Axios to fetch data
  const empId = 1;
  useEffect(() => {
    Service.getemployeeKraOrDraft(empId)
      .then((response) => {
        setKragoals(response.data.data);
        setInfo(response.data.isDraft);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    Service.getemployeeDevelopmentOrDraft(empId)
    .then(response => {
      const responseData = response.data;
      setDevelopmentGoals(responseData.data);
      setInfo(responseData.developmentDraft);
      console.log(responseData.data,""); 
    })
    .catch(error => {
       console.error('Error fetching data:', error);
    });
    Service.getDevelopmentOption()
    .then((res)=>{
      setDevelopmentOption(res.data);
    })
    .catch(error=>{
      console.error('Error fetching data:', error);
    })
      Service.getAllTrainings()
    .then((response)=>{
      setTrainingOptions(response.data);
      console.log(response.data,"<<<<<<<<<<<<<<<<<");
    })
    .catch(error=>{
      console.error('Error fetching data:', error);
    });
    }, [count]);
    console.log(kragoals,"kragoals");
  console.log(store, ",,,,,,,,,,,,,,,,,,,store")
  console.log(developmentGoals, ",,,,,,,,,,,,,,,,,,,,developmentGoals")


  const [trigger,setTrigger]=useState(false);
    const handleKragoalChange = (e, i) => {
      let str=e.target.value;
      if(str.length!=0){
        setTrigger(true);
      }
      
    const newKragoals = [...kragoals];
    newKragoals[i] = { ...newKragoals[i], [e.target.name]: e.target.value };
    setKragoals(newKragoals);};
   const MAX_KRAGOALS = 10;
   const handleAddKragoal = () => {
    if (kragoals.length < MAX_KRAGOALS) {
      setKragoals([...kragoals, { kra: "", goal: "", empId: 1 }]);
    } else {
      toast.warning(`You can only add up to ${MAX_KRAGOALS} KRA & Goal items.`);
    }
  };
 const MAX_DEVELOPMENT_GOALS = 1;
  if (developmentGoals.length < MAX_DEVELOPMENT_GOALS) {
      setDevelopmentGoals(prevGoals => [
        ...prevGoals,
        { training: "", goal: "", description: "", employeeId: 1 }
      ]);
     }
  const handleAddDevelopmentGoal = () => {
    const MAX_DEVELOPMENT_GOALS = 10;
    if (developmentGoals.length < MAX_DEVELOPMENT_GOALS) {
      setDevelopmentGoals(prevGoals => [
        ...prevGoals,
        { training: "", goal: "", description: "", employeeId: 1 }
      ]);
    } else {
      toast.warning(`You can only add up to ${MAX_DEVELOPMENT_GOALS} development goals.`);
    }
  };
   const handleClick = () => {
    console.log('Button clicked!');
  }
   
  //Delete
  const confirmDelete = (index, dg_id) => {
    Swal.fire({title: 'Are you sure?', text: "Do you really want to delete the data?", icon: 'warning', showCancelButton: true,confirmButtonText: 'Yes, delete it!',cancelButtonText: 'No, cancel!' })
    .then((result) => {
      if (result.isConfirmed) {
        handleDeleteDevelopmentGoal(index, dg_id);
      }
    });
  };
  const confirmKraDelete = (i, id) => {
    Swal.fire({title: 'Are you sure?', text: "Do you really want to delete the data?", icon: 'warning',showCancelButton: true, confirmButtonText: 'Yes, delete it!',cancelButtonText: 'No, cancel!'})
    .then((result) => {
      if (result.isConfirmed) {
        handleDeleteKragoal(i, id);
      }
    });
  };
    const handleDeleteKragoal = (i, id) => {
    const newKragoals = [...kragoals];
    newKragoals.splice(i, 1);
    setKragoals(newKragoals);
        Service.deleteEmployeeKraOrDraft(id)
      .then((response) => {
        console.log('Successfully deleted data:', response.data);
      })
    };
    const handleDeleteDevelopmentGoal = (i, id) => {
    const newDevelopmentGoals = [...developmentGoals];
    newDevelopmentGoals.splice(i, 1);
    setDevelopmentGoals(newDevelopmentGoals);
    Service.deleteDevelopmentGoal(id)
      .then((response) => {
        console.log('Successfully deleted development goal:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting development goal:', error);
      });
     };

 //Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setKragoals([]);
   };
  const handleSubmitClick = () => {
  const totalWeightage = kragoals ? kragoals.reduce((acc, kragoal) => acc + parseFloat(kragoal.weightage) || 0, 0) : 0;
   if (totalWeightage !== 100) {
    toast.error('Total weightage should be 100%. Please check your input.');
    return;
    }
    const goals = developmentGoals.map(goal => ({
    training: goal.training,
    goal: goal.goal,
    description: goal.description,
    employeeId: empId, 
     }));
     console.log(goals,"goalsgoals")
      Service.postemployeeKra(empId, kragoals)
    .then(() => {
      Service.getemployeeKraId(empId)
          .then((response) => {
          setKragoals(response.data);
          console.log(kragoals, "kragoals.................");
        Service.getmess()
            .then(response => setData(response.data))
            .then(() => {
      Service.deletedevelopmentdraftbyempid(empId)
                .then(() => {
                  console.log('Draft data deleted successfully.');
                })
                .catch((error) => {
                });
            });
        })
    })
    .catch((error) => console.error('Error saving data:', error));
    goals.forEach(goal => postDraft(goal));
   }
   
 const postDraft = (selectedGoal) => {
  Service.postemployeedevelopment(selectedGoal)
    .catch(error => console.error('Error posting data:', error));
  }
  

  //status update
  const [loc, setLoc] = useState("");
  const location = useLocation();
  const empPerformance = location.state.data;

   const postSubmit = () => {
    setLoc(location.state.data)
    Service.postemployeePerformance(empPerformance)
      .then((res) => {
       console.log("submitted")
      }) }
  console.warn(loc, "data")

  //Save As Draft
    const postSaveDraft = () => {
    Service.postemployeedevelopmentDraft(developmentGoals)
      .then((res) => {
          Service.getdevelopmentGoals()
              .then((response) => {
                  setStore(response.data);
                })
               })
           .catch(error => console.error('Error posting data:', error));
           }
  function handleSaveAsDraftClick() {
    Service.postemployeeKraDrafts(kragoals)
          .then((response) => {
    Service.getemployeeKraDraft(empId)
          .then((response) => {
            setKragoals(response.data);
          })
          .catch((error) => {
            console.error('Error fetching draft data:', error);
          });
      })
      .catch((error) => console.error('Error saving draft data:', error));
      toast.info('Your form is saved as draft. It has not been submitted.');
  };

  console.log(kragoals,"kragoals");

 const [valueOnchange, setValueOnchange] = useState(0);
  const handleSaveAsDraftOnChange = (e) => {
    setValueOnchange(valueOnchange => valueOnchange + 1);
  };

  const [value, setValue] = useState('one');
  console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [appraisal, setAppraisal] = useState([]);

useEffect(() => {
  Service.getPendingAppraisal(empId)
    .then((response) => {
      const data = response.data;
      const matchedData = data.filter(item => item.appraisalQuarter === empPerformance.appraisalCycle);
      setAppraisal(matchedData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);

  return (
      <Box sx={{ width: '100%' }}>
        <>
 <div className=' flex'>
        <div>
            <h1 className="text-xl font-normal text-black pl-4 pt-10">{empPerformance.appraisalCycle}</h1>
            {appraisal.map((item, index) => (
    <div key={index}>
      <h2 className="text-m text-gray-500 pl-5 mt-4">{item.periodFrom} to{item.periodTo}</h2>
    </div>
  ))}
        </div>

        <div> {data &&  <div className=' flex  items-center  text-green-500  ml-52  mt-12'><IoMdCheckmarkCircleOutline className='  mr-2  ml' /> You Have Successfully Submitted your Kra And Goals</div>}
        </div>
      </div>
      </>

      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab className='text-xl' value="one" 
          label={
          <Typography
            style={{
              fontWeight: "bold",
              textTransform: "none", 
            }}
          >Goal Setting
          </Typography>}
          />

        <Tab className='text-xl' value="two" 
          label={
          <Typography
            style={{
              fontWeight: "bolder",
              textTransform: "none", // Set text-transform to none
            }}
          >Self Assessment
          </Typography>}
          />

        <Tab className='text-xl' value="three" 
          label={
          <Typography
            style={{
              fontWeight: "bolder",
              textTransform: "none", // Set text-transform to none
            }}
          >Manager Assessment
          </Typography>}
          />

        <Tab className='text-xl' value="four" 
          label={
          <Typography
            style={{
              fontWeight: "bolder",
              textTransform: "none", // Set text-transform to none
            }}
          >Annual Review
          </Typography>}
          />
      </Tabs>
      
      {value=="one" && <>
      <div style={{  padding: '10px' }}>
   
   
  <div className='flex border-b-[1px] mt-6 text-md text-lg font-normal text-black'>
      <div className='KRA ml-2'> Object Area/KRA </div>
      <div className='Target/Goals ml-32'> Goals/Objective</div>
      <div className='Measurment critiria ml-36'> Measurment Critiria/Target </div>
      <div className='ml-20'>Weightage(Total Should be 100%) </div>
  </div>

 {/* Kra Goal Setting */}
    <form onSubmit={handleSubmit} className=' break-words' >
    {kragoals?.map((kragoal, index) => (
    <div key={index} className=" whitespace-normal  break-words" style={{ display: "flex", marginBottom: "10px" }}>
        <textarea
            type="text" placeholder="kra" name='kra' value={kragoal?.kra || ''} 
            className=' mt-7  ml-4  break-all  whitespace-normal'
            onChange={(e) => { handleKragoalChange(e, index); handleSaveAsDraftOnChange(); }}
            style={{ height: "100px", marginRight: "3px", border: "solid 1px #ccc", borderWidth: "thin", overflowWrap: "break-word" }}
        /> <br/>
        <textarea
            type="text" placeholder="goals" name="goals" value={kragoal?.goals || ''} 
            className=' w-72   mt-7  ml-1  text-left   whitespace-normal'
            onChange={(e) => { handleKragoalChange(e, index); handleSaveAsDraftOnChange(); }}
            style={{ marginRight: "50px", textIndent: "10px", border: "solid 1px #ccc", borderWidth: "thin" }}/>
           <div className=" flex  items-center">
         <select
                value={kragoal?.target || ''} 
                onChange={(e) => { const updatedValue = e.target.value;
                handleKragoalChange({ target: { name: 'target', value: updatedValue } }, index);
                handleSaveAsDraftOnChange();
                }}
                className="mt-8 h-8 w-12 border border-solid border-gray-300">
                <option value="<">{'<'}</option>
                <option value="<=">{'<='}</option>
                <option value="=">{'='}</option>
                <option value=">">{'>'}</option>
                <option value=">=">{'>='}</option>
            </select>
        </div>
        <textarea
            type="text" placeholder="" name="measurement"
            value={kragoal?.measurement || ''} 
            className="ml-2 mt-16 w-20 h-8 text-left whitespace-normal border border-solid border-gray-300 p-2"
            onChange={(e) => { handleKragoalChange(e, index); handleSaveAsDraftOnChange(); }}required
            style={{ textIndent: "10px" }} />
        <textarea
            type="text" placeholder="weightage" name="weightage" value={kragoal?.weightage || ''} 
            className=' mt-16  ml-28  w-32  h-8 break-all '
            onChange={(e) => { handleKragoalChange(e, index); handleSaveAsDraftOnChange(); }} 
            style={{ border: "2px solid #ccc", borderWidth: "thin" }} />
        <h3 className=' ml-2  scale-110  mt-16  text-blue-400'>%</h3>
        <button type="button" onClick={() => confirmKraDelete(index, kragoal?.id)} title='Delete' className="ml-28 mt-6 scale-150 text-red-500">  <RiDeleteBin5Fill />  </button>
    </div>
   ))}
   <button onClick={handleAddKragoal} style={{ marginLeft: '28%' }} className=" flex  items-center  font-bold  text-blue-400  text-md"><GrAddCircle />Add More </button>
        <div className=' flex  flex-row  border-b-2'>
          <button type="submit" style={{ marginLeft: '42%' }} className="  flex  ml-96  mt-7  text-black  text-md">Total out Of 100% </button>
      <textarea
            type="text"   placeholder="100"  value={"100"}
            className=' ml-2  my-7  text-black  text-md'
            style={{ border: "solid 1px #ccc", borderWidth: "thin", marginLeft: "100px", width: "130px", height: "35px" }}
            readOnly/>
          <h3 className=' ml-1   p-2  scale-110  mt-7   text-blue-400 '>%</h3>
        </div>

      {/* Development Goals */}
        <div className=''>
            <div className="text-xl font-medium mb-6 pt-12">Development Goals</div>
            <div className='flex mt-6 text-lg text-black'>
            <div className='ml-8 '> Trainings </div>
            <div className='ml-64 '> Development Goals</div>
            <div className='ml-44 '> self Assesment </div>
            <div className='ml-52'>Manager assesment </div>
           </div>

       {developmentGoals.map((goal, index) => (
  <div key={index} className="whitespace-normal break-words" style={{ display: "flex", marginBottom: "10px" }}>
      <select
        value={goal.training}
        onChange={(e) => {
          const newGoals = [...developmentGoals];  newGoals[index].training = e.target.value; newGoals[index].goal = '';
          setDevelopmentGoals(newGoals);
          setSelectedTraining(e.target.value);
        }}
        className="h-16 w-72 px-1 py-4 mt-3 ml-2 border rounded" >
       {trainingDropdown.length === 0 && store.length > 0 ? (
          store.map((item, idx) => (
         <option key={`fetched-training-${idx}`} value={item.training}>{item.training}</option>
         ))
         ) : (
       trainingDropdown.map((option, index) => (
       <option key={`training-option-${index}`} value={option.id}>{option}</option>
        ))
        )}
  </select>
  <select
    value={goal.goal}
    onChange={(e) => { const newGoals = [...developmentGoals]; newGoals[index].goal = e.target.value; setDevelopmentGoals(newGoals);}}
    className={`h-16 w-72 px-1 py-4 mt-3 ml-4 border rounded`} >
      {developmentDropdown.length === 0 && developmentGoals.length > 0 ? (
    developmentGoals.map((item, idx) => (
      <option key={`fetched-training-${idx}`} value={item.goal}>{item.goal}</option>
    ))
  ) : (
    developmentDropdown.map((goalOption, goalIndex) => (
      <option key={goalIndex} value={goalOption}>{goalOption}</option>
    ))
  )}
 </select>
  <textarea placeholder="Self-assessment" className="w-72 h-16 py-1 px-3 mt-3 ml-4 border rounded border-gray-300 cursor-not-allowed" value={goal.selfAssessment || "NA"} readOnly></textarea>
  <textarea placeholder="Manager assessment" className="w-72 py-1 h-16 mt-3 px-3 ml-4 border rounded border-gray-300 cursor-not-allowed" value={goal.managerAssessment || "NA"} readOnly></textarea>
  <button type="button" onClick={() => confirmDelete(index, goal.dg_id)} title='Delete' className="ml-4 scale-150 text-red-500" style={{ marginTop: '-120px' }} > <RiDeleteBin5Fill /></button>
  <div className='mt-20 -ml-[945px] '>
  <label htmlFor="description" className=" flex ml-8 mt-8 text-lg text-black ">Description </label>
  <textarea placeholder=""
      className="w-72 py-1 px-3 mt-4 h-16 ml-4 border rounded border-gray-300"
      value={goal.description || (store[index] ? store[index].description || "" : "")}
      onChange={(e) => { const newGoals = [...developmentGoals];  newGoals[index].description = e.target.value;  setTrigger(true); setDevelopmentGoals(newGoals);  }}></textarea>
   </div>
  </div>
))}
<button onClick={(e) => { e.preventDefault(); handleAddDevelopmentGoal();}} style={{ marginLeft: '38%' }} className="flex items-center font-bold text-blue-400 text-md"><GrAddCircle /> Add More</button> </div>


 {/* Render form buttons conditionally for submission, saving as draft, and canceling actions*/}
 {local=="true" ? "":
 <>
 {session ? 
        <button style={{ marginLeft: '64%', marginBottom: '20%' }} className=" mt-7  ml-96  py-2  px-7   bg-blue-400  text-white" onClick={() => { handleSubmitClick(); setLocal("true");}}  >Submit</button> : 
            <>
              <button style={{ marginLeft: '64%', marginBottom: '20%' }} className=" mt-7   ml-96  py-2  px-7   bg-blue-400  text-white" onClick={() => { handleSubmitClick(); postDraft(selectedGoal); postSubmit(); setLocal("true"); }}title='Click Here To Submit' >Submit</button>
              <button
                style={{ marginLeft: '1%' }} className=" mt-7  ml-2  py-2  px-5  font-bold  bg-gray-400  text-white"
                onClick={() => { handleSaveAsDraftClick();   postSaveDraft();  setSession(true);}} title='Click Here To Save the data in draft' >Save as Draft </button>
             <button
                style={{ marginLeft: '1%' }}  className=" mt-7  ml-2  py-2  px-7  font-bold  bg-gray-300  text-white"
                onClick={handleClick} > Cancel</button>
            </>
}
</>
}

{local=="false" ?
<>
{trigger && session ?
<> <button
                style={{ marginLeft: '1%' }} className=" mt-7  ml-2  py-2  px-5  font-bold  bg-gray-400  text-white"
                onClick={() => { handleSaveAsDraftClick();   postSaveDraft();  setSession(true);}} title='Click Here To Save the data in draft' >Save as Draft </button>
                <button
                style={{ marginLeft: '1%' }}  className=" mt-7  ml-2  py-2  px-7  font-bold  bg-gray-300  text-white"
                onClick={handleClick} > Cancel</button>
            </>
             :""}
         </>:""
            } 
      </form>
      <ToastContainer />
      </div>
    </>
      }
      {value=="two" &&
      <>
        <SelfAppraisel/>
      </>
      }

      {value=="three" &&
      <>
        <ManagerReview/>
      </>
      }

      {value=="four" &&
      <>
        <AnnualReviewByEmp/>
      </>
      }
    </Box>
  );
  }
export default Open;


