import React, { useEffect, useState } from 'react';
import { GrAddCircle } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropdown/style.css';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Service from '../Service';


function ManagerView() {
  const [kragoals, setKragoals] = useState([{ kra: "", goals: "", measurementCriteria: "", measurement: "", weightage: "" }]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [store, setStore] = useState([]);
  const [isManagerRivertCommentOpen, setIsManagerRivertCommentOpen] = useState(false);
  const [rivertcomment, setRivertcomment] = useState([]);
  

    const handleManagerRivertCommentSubmit = () => {
    const requestData = {
      empId: 1,
      mgrRevertComments: rivertcomment
    };
    Service.postmanagerrevertcomments(requestData)
       

      .then(response => {
        console.log("Manager's rivert comments submitted successfully:", response.data);
        closeModal();
      })
      .catch(error => {
        console.error("Error submitting manager's rivert comments:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      });
     };

 const closeModal = () => {
    setIsManagerRivertCommentOpen(false);
  };
 const developmentGoalOptions = {
  };
const trainingOptions = () => {
  };
 const handleApprove = () => {
    toast.success('KRA Approved successfully!');
  }

  const [appro, setAppro] = useState("");
  const app = useLocation();

  const postSubmit = () => {
    setAppro(app.state.data);
    console.log(appro, "appro");
    const managerApproval = app.state.data;
    Service.postmanagerApproval(managerApproval)
      .then(() => {
        console.warn(app.state.data, "......");
        console.log("approved");
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };
  console.warn(appro, "data")

  //initial data fetching
  const empId = 1;
  useEffect(() => {
    Service.getemployeeKraOrDraft(empId)
      .then((response) => {
        setKragoals(response.data.data);
        })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    console.log(store);
    Service.getdevelopmentGoals()
      .then((response) => { 
        setStore(response.data);
        console.log(response.data, "response.data<<<<<<<<<<<<<<")
      })
      .catch(error => console.error('Error retrieving data:', error));
  }, []);

 return (
  <div style={{ backgroundColor: '#DCDCDC', padding: '10px' }}>
  <Card sx={{ borderRadius: '20px' }}>
    <CardContent>
  
    
      <div className=' flex'>
        <div>
          <h1 className=" font-bold  ml-5  mt-5  text-md  text-lg">Quarter 3</h1>
          <h2 className=" ml-5  mt-5   text-gray-500  text-md">01-Apr-2023 to 30-jun-2023</h2>
        </div>
      </div>
      <div className=" text-lg  ml-5  p-2  border-b-[1px]  font-bold  text-md">
        <span className="  text-blue-500  underline  decoration-blue  underline-offset-8  decoration-4">Goal Setting</span>
        <span className=" px-6  text-gray-400">Self Appraisal</span>
        <span className="  text-gray-400">Manager Review</span>
      </div>

      <div className=' flex  border-b-[1px]  mt-6 text-md  text-gray-800  font-semibold'>
        <div className='KRA  ml-8'> Object Area/KRA </div>
        <div className='Target/Goals  ml-32 '> Goals/Objective</div>
        <div className='Measurment critiria  ml-44 '> Measurment Critiria </div>
        <div className=' ml-20'>Weightage(Total Should be 100%) </div>
      </div>

      <form className=' break-words' >
      {kragoals?.map((kragoal, index) => (
    <div key={index} className="whitespace-normal break-words" style={{ display: "flex", marginBottom: "10px" }}>
        <textarea
            type="text" placeholder="kra" name='kra' value={kragoal?.kra || ''} 
            onChange={() => { }}
            className='mt-7 ml-4 break-all whitespace-normal cursor-not-allowed'
            style={{ height: "100px", marginRight: "3px", border: "solid 1px #ccc", borderWidth: "thin", overflowWrap: "break-word" }}
        />
        <br />
        <textarea
            type="text" placeholder="goals" name="goals" value={kragoal?.goals || ''} 
            onChange={() => { }}
            className='w-72 mt-7 ml-1 text-left whitespace-normal cursor-not-allowed'
            style={{ marginRight: "50px", textIndent: "10px", border: "solid 1px #ccc", borderWidth: "thin" }} />

        <div className=" flex  items-center">
            <select
                value={kragoal?.target || ''} 
                onChange={() => { }}
                className="mt-8 h-8 w-12 border border-solid border-gray-300 cursor-not-allowed">
                <option value="<">{'<'}</option>
                <option value="<=">{'<='}</option>
                <option value="=">{'='}</option>
                <option value=">">{'>'}</option>
                <option value=">=">{'>='}</option>
            </select>
        </div>

        <textarea
            type="text" placeholder="Measurement" name="measurement" value={kragoal?.measurement || ''} 
            onChange={() => { }}
            className="ml-2 mt-16 w-20 h-8 text-left whitespace-normal border border-solid border-gray-300 p-2 cursor-not-allowed"
            style={{ textIndent: "10px" }} />

        <textarea
            type="text" placeholder="weightage" name="weightage" value={kragoal?.weightage || ''} 
            onChange={() => { }}
            className='mt-16 ml-20 w-32 h-8 break-all cursor-not-allowed '
            style={{ border: "2px solid #ccc", borderWidth: "thin" }} />

        <h3 className='ml-2 scale-110 mt-16 text-blue-400 cursor-not-allowed'>%</h3>
        <button type="button" title='Delete' className="ml-28 mt-6 scale-150 text-red-500 "> <RiDeleteBin5Fill /></button>
    </div>
))}

      <button style={{ marginLeft: '28%' }} className=" flex  items-center  font-bold  text-blue-400  text-md"> <GrAddCircle />  Add More </button>
        <div className=' flex  flex-row  border-b-2'>
          <button type="submit" style={{ marginLeft: '42%' }} className="  flex  ml-96  mt-7  text-black  text-md cursor-not-allowed">Total out Of 100% </button>

     <textarea
        type="text"  placeholder="100"  value={"100"}
        className='ml-2 my-7 text-black text-md'
        style={{ border: "solid 1px #ccc", borderWidth: "thin", marginLeft: "70px", width: "130px", height: "35px" }}
        onChange={() => {}}/>
       <h3 className=' ml-2   p-2  scale-110  mt-7   text-blue-400 cursor-not-allowed '>%</h3>
        </div>

        {/* Development Goals */}
        <div className=''>
          <div className=" font-bold  ml-5  mt-5  text-md  text-lg">Development Goals</div>
          <div className=' flex mt-6  text-md  text-gray-800 font-semibold'>
            <div className='  ml-8'> Trainings </div>
            <div className='  ml-64 '> Development Goals</div>
            <div className='  ml-44 '> self Assesment </div>
            <div className=' ml-52'>Manager assesment </div>
          </div>
  {store.map((goal, index) => (
  <div key={index} className="whitespace-normal break-words" style={{ display: "flex", marginBottom: "10px" }}>
    <select
      value={goal.training}
      onChange={(e) => { }}
      className="h-16 w-72 px-1 py-4 mt-3 ml-2 border rounded cursor-not-allowed">
      {trainingOptions.length === 0 && store.length > 0 ? (
        store.map((item, idx) => (
          <option key={'fetched-training-${idx}'} value={item.training}>{item.training}</option>
        ))
      ) : (
        trainingOptions.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))
      )}
    </select>

    <select
      value={goal.goal}
      onChange={(e) => {
        const newGoals = [...store];
        newGoals[index].goal = e.target.value;
        setSelectedGoal(newGoals);
      }}
      className={`h-16 w-72 px-1 py-4 mt-3 ml-4 border rounded cursor-not-allowed`} >
    {developmentGoalOptions[goal.training]?.map((goalOption, goalIndex) => (
    <option key={goalIndex} value={goalOption}>{goalOption}</option>
))}

      {store.map((item, idx) => (
        <option key={'fetched-goal-${idx}'} value={item.goal}>{item.goal}</option>
      ))}
    </select>

    <textarea placeholder="Self-assessment"  className="w-72 h-16 py-1 px-3 mt-3 ml-4 border rounded border-gray-300 cursor-not-allowed"  value={goal.selfAssessment || "NA"}   readOnly onChange={() => {}}   ></textarea>
    <textarea  placeholder="Manager assessment"  className="w-72 py-1 h-16 mt-3 px-3 ml-4 border rounded border-gray-300 cursor-not-allowed"  value={goal.managerAssessment || "NA"} readOnly onChange={() => {}}  ></textarea>

    <button type="button" title='Delete' className="ml-4 scale-150 text-red-500" style={{ marginTop: '-120px' }}><RiDeleteBin5Fill /></button>

    <div className='mt-20 -ml-[945px]'>
    <label className=" flex text-md ml-8 mt-8 text-gray-800  font-semibold ">Description </label>
  <textarea placeholder=""
        className="w-72 py-1 px-3 mt-4 h-16 ml-4 border rounded border-gray-300"
        value={goal.description || (store[index] ? store[index].description || "" : "")}
        readOnly
        onChange={() => {}} 
      ></textarea>
      
    </div>
  </div>
))}

          <button onClick={(e) => { e.preventDefault(); }} style={{ marginLeft: '38%' }} className="flex items-center font-bold text-blue-400 text-md"><GrAddCircle /> Add More</button>
        </div>
      </form>

      <div className='mb-64' style={{ marginTop: '-150px' }}>
        <button style={{ marginLeft: '60%' }} className="mt-32 ml-96 py-2 px-7  bg-green-400 text-white " onClick={(e) => { e.preventDefault(); handleApprove(); postSubmit(); }}>Approve</button>
        <button style={{ marginLeft: '1%' }} className="mt-7 ml-2 py-2 px-5 font-bold bg-blue-400 text-white  " onClick={() => setIsManagerRivertCommentOpen(true)}>Revert Back</button>
        <button style={{ marginLeft: '1%' }} className="mt-32 ml-2 py-2 px-7 font-bold bg-gray-300 text-white ">Cancel</button>
      </div>

      {isManagerRivertCommentOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="bg-white rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">comment</h2>
      <div className="text-center">
        <textarea
          type="text"
          placeholder=""
          value={rivertcomment}
          onChange={(e) => setRivertcomment(e.target.value)}
          className="border p-3 mb-3 w-96 rounded"
          style={{ minHeight: '150px' }}
        />
      </div>
      <div className="flex justify-between p-4">
        <div className="w-[500px] text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleManagerRivertCommentSubmit} >
            Submit</button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
            onClick={closeModal} >
            Cancel</button>
        </div>
      </div>
    </div>
  </div>
)}
<ToastContainer />
</CardContent>
    </Card>
    </div>
   
  );
}
export default ManagerView;
