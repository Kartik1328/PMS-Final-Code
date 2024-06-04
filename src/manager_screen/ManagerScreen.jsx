import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Service from '../Service';
// imports necessary modules for creating a React component, 
// IoMdCheckmarkCircleOutline- this is the React Icon from the react-icons library.

function ManagerScreen() {

const [data,setData]=useState("");
const [buttonsVisible, setButtonsVisible] = useState(true);
const [value,setValue]=useState([])
const [info,setInfo]=useState('')
const [message,setMessage]=useState()
const [store,setStore]=useState("");
const [submitted, setSubmitted] = useState(false);
const [icon,setIcon]=useState();
const [popoverVisible1, setPopoverVisible1] = useState(false);   
const [mgrScr, setMgrScr] = useState([]);
const [overallValue,setOverallValue]=useState("");
const [devGoals, setDevGoals] = useState([]);
const [addDevGoals, setAddDevGoals] = useState("");
const [selfAssm, setSelfAssm] = useState([]);
// THESE ARE THE State Declarations AND THEY ARE DECLARED BECAUSE HERE AN ACTION IS PERFORMED OR CHANGE OF DATA IS OCCURING THAT IS WHY THEY ARE WRITTEN WITH THE HELP OF THE REACT HOOKS.


console.log(popoverVisible1);

console.log(overallValue,"overallValue......................");

  let ratingBreak = overallValue?.mgrRating?.split(",") || [];
  console.log(ratingBreak, "ratingBreak");
  
  let commentBreak=overallValue?.mgrComment?.split(",") || [];
  console.log(commentBreak,"ratingBreak")


let mgr_id=20;


useEffect(() => {
  Service.getByDevGoalsById()
    .then((response) => setDevGoals(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value")

useEffect(() => {
 Service.getBySelfAsmAll()
    .then((response) => setMgrScr(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value")

useEffect(() => {
 Service.getByProfileById()
    .then((response) => setValue(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value")

// --------------------------------------------------------------------------------------------------------------------------------------------------

const [rating1, setRating1] = useState({});

const handleChangeRating1 = (e) => {
  const key = e.target.name;
  const newValue = e.target.value;
  setRating1(prevState => ({ ...prevState, [key]: newValue })); // Update ratingComment state with the new value
}

console.log(rating1);

const [comment1, setComment1] = useState({});

const handleChangeComment1 = (e) => {
  const key = e.target.name;
  const newValue = e.target.value;
  setComment1(prevState => ({ ...prevState, [key]: newValue })); // Update ratingComment state with the new value
}

console.log(comment1);

let str=""
for(let i in rating1){
  str+=rating1[i]+",";
}

let totalStr=str.slice(0,str.length-1);
console.log(str.slice(0,str.length-1)); // This will log the current state of ratingComment

let str1=""
for(let i in comment1){
  str1+=comment1[i]+",";
}

let totalStr1=str1.slice(0,str1.length-1);
console.log(str1.slice(0,str1.length-1));

// --------------------------------------------------------------------------------------------------------------------------------------------------

console.log(overallValue,"overallValue");
console.log(info);

const overallRatingAndComment=()=>{
  console.log(info);
  let infoAll={...info,"mgrId":mgr_id,"mgrRating":totalStr,"mgrComment":totalStr1};
  // the thing that is written in double quotes is the backend variable

  console.log(infoAll,"infoAll...........");
  Service.postByMng(infoAll)
    .then((response) => {
      Service.getByManagerAsmById()
      .then(res=>{
        console.log(res.data,"response data **********************************")
        setOverallValue(res.data)     
      })
      setSubmitted("You have successfully reviewed");
    setIcon(<IoMdCheckmarkCircleOutline />);
    setButtonsVisible(false);
    setPopoverVisible1(false);
      })
}

useEffect(()=>{
  Service.getByManagerAsmById() 
  .then(res=>{
    console.log(res.data,"response data **********************************")
    setOverallValue(res.data)     
  })
},[])


console.log(value,"value.........")
console.warn(data,"data");
// The console. warn() method is used to write a warning message in the console.
console.log(store,"store")
// useEffect hook to make an asynchronous API call to fetch self-appraisal data from the server when the component mounts.

console.log(data);

console.log(message);

// THIS IS THE LOGIC FOR filling THE COMMENTS IN THE form type filds THAT WE WRITE IN THE FRONT END and updation of the state input fields.

const handleChangeComments=(e)=>{
const key=e.target.name;
const value=e.target.value;
setInfo({...info,[key]:value})
}
console.log(info);

const [count,setCount]=useState(0)
console.log(count)

console.warn(value,"value")


const handleAddDevelopmentGoals = () => {

  console.log(addDevGoals,"addDevGoals...");
  Service.postDevlopmentGoalsUrl(addDevGoals)
  .then((response) => {
    console.log(response.data);
  })
}


console.log(addDevGoals,"addDevGoals");
handleAddDevelopmentGoals();
const handleChangeAddDevelopmentGoals=(e)=>{
  setAddDevGoals({...addDevGoals,"managerAssessment":e.target.value});
}


const [ratingMng, setRatingMng] = useState([])
const [commentsMng, setCommentsMng] = useState([]);
useEffect(() => {
  Service.getBySelfAsmById()
    .then((response) => {
      setSelfAssm(response.data)
      setRatingMng(response.data.rating)
      setCommentsMng(response.data.comment)
    })
      
    .catch(err => console.log(err))
}, [])

console.log(selfAssm,"selfAssm")

console.log(ratingMng,"ratingMng")
console.log(commentsMng,"commentsMng")

const ratingArr = typeof ratingMng === 'string' ? ratingMng.split(",") : [];
const commentArr = (typeof commentsMng === 'string' && commentsMng !== '') ? commentsMng.split(",") : [];


const handleDateFromEmployeeStatus=()=>{
  console.warn("manager jee");
  axios.get("http://localhost:8080/api/setReviewedOn/1")
  .then((response)=>console.log(response.data))
}

// The handleChangeComments function is an event handler for form input fields, extracting the name and value attributes from the target element 
// (typically an input field). It dynamically updates the info state with the latest user input and logs the updated state for debugging.

// ----------------------------------------------------------------THIS IS THE DISPLAY PART----------------------------------------------------------------------//

    return (

    <div className='w-full h-screen bg-gray-200 '>
      <div className='bg-white rounded-md relative top-12 ml-4 mr-3 border-[1px] border-blue-400 pb-24'>
        {/* anything that is written under square bracket CSS property is a arbitrary value */}

          {/* HERE THE COMPONENT STARTS (first part) */}
        <h1 className='text-xl font-normal text-black pl-4 pt-10'>Quarter 4</h1>
        <div className='flex space-x-[500px]'>
        <h3 className='text-m text-gray-500 pl-5 mt-2'>01-Apr 2023 to 30-Jun-2023</h3>
        <div className='flex space-x-2 text-green-500 items-center text-lg'>
        
        <h1 className='text-xl'>{icon}</h1>
        <h1 className=''>{submitted} </h1>
        </div>
        </div>
      

        {/* MENU BAR */}
      <div className='text-gray-400 pl-2'>
        <div className="relative">
          <div className="toggle-bar absolute h-2  transition-transform duration-300">
          </div>
          <ul className="flex space-x-4  p-4">
          <li><button  className="text-lg">Goal Setting</button></li>
            <li><button className="text-lg">Self Assessment</button></li>
            <li><button className="text-lg">Manager Assessment</button></li>
            <li><button className="text-lg">Annual Review</button></li>
        </ul>
        </div>   
      </div>
      
    {/* Adding one seprating line according to the figma design */}

    <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'> </h1>

    {/* To make this we have to make a grid of 11 coloumns.4 for profile picture,role etc and 2 for "submitted on" and 5 for self rating */}

      <div className='grid grid-cols-11 '>
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------ */}

      {/* PROFILE CARD IS displayed HERE */}

        <div className="col-span-4 ">
            <div className="grid grid-cols-12">
                  <div className='col-span-2 '>
                    <img src="profile.jpeg" className='rounded-full h-[40px] w-[42px] ml-6 mt-4' alt="Profile"></img>
                    </div>

                      <div className='col-span-10 '>
                      <div className="ml-2 mb-4">
                          <h2 className='font-thin text-lg  mx-8 pt-3 w-56 flex-col justify-center -ml-0 text-black'>{value.empName}</h2>
                          <p className=' font-medium text-m text-blue-900 -ml-0 pt-1'>{`${value.designation} - ${value.department}`}</p>
                      </div>
                      </div>
            </div>
        </div>

        <div className='col-span-2 border-l-[1px] border-gray-300 mt-2'>
        <div className='ml-8 pl-6 mt-2'>
                <div className="pb-1">
                  <h2 className='text-lg font-thin text-black'>Reviewed By</h2>
                </div>
              <div className='flex space-x-3 pt-1'>
              <img src="manager.jpg" className='rounded-full h-[30px] w-[32px] -mt-1  mb-3 -ml-1' alt="Manager"></img>

                <div className="text-[16px] -mt-[2px] text-blue-900">{value.mgrName}</div>
              </div>
            </div>
          
        </div>

          {/* Adding one seprating line according to the figma design */}

          <div className='col-span-2 border-l-[1px] border-gray-300 mt-2'>

             {/* NOW THE DATE/submitted ON PART IS DIPLAYED HERE */}

              <div className='ml-8 pl-6 mt-2'>
                <div className="pb-1">
                  <h2 className='text-lg font-thin text-black'>Reviewed On</h2>
                </div>
              <div className='flex space-x-3 pt-1'>
                <div className='calender-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" fill='gray'>
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/>
                  </svg>
                </div>
                <div className="text-m -mt-1">{overallValue.reviewedOn}</div>
              </div>
            </div>
          </div>

          {/* NOW THE SELF RATING PART is displayed AND ALSO ADDING ONE SEPRATING LINE ACCORDING TO THE FIGMA DESIGN*/}

          <div className='col-span-3 border-l-[1px] border-gray-300 mt-2'>

            <div className="div ml-6 pl-6 mt-2">
              <div className="pb-1">
              <h2 className='text-lg font-thin text-black'>Manager rating</h2>
              </div>
              <div className="text-xl text-red-600 font-medium pl-6">
              {overallValue.overallMgrRating}
              </div>
            </div>
          </div>
      </div>

      {/* A SEPRATING LINE AS PER THE FIGMA DESIGN */}
      <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'> </h1>

      {/* NOW THE SELF APPRAISAL-SECTION (second part) */}

      <div>
        <h1  className='text-xl font-normal text-gray-700 pl-4 pt-4'>Manager Feedback</h1>

        {/* we have to divide the grid in 9 parts and then give the devison of col span according */}

        <div className='grid grid-cols-9'>
          {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

          <div className='col-span-2 ml-4 mt-3 mb-6'>
          <div className="ml-4 mb-12 space-y-6 pt-3">
          <h2 className='font-extralight text-lg  mx-8 pt-3 w-56 flex-col justify-center -ml-0 text-black'>Overall Rating</h2>
          <p className=' font-extralight text-lg text-black -ml-0 pt-2 flex-col  '>Overall Comments</p>
          </div>
          </div>

          <div className='col-span-4 mt-3 '>
          <div className="-ml-28 mb-12 space-y-6 pt-3">
          <textarea type="text" placeholder="Add rating.." className=' placeholder-gray-300 overflow-hidden resize-none w-[20%] h-[40px] font-extralight text-lg text-black -ml-0 pt-3 border-[1px] border-gray-300 p-1' name='overallMgrRating' onChange={handleChangeComments} value={overallValue.overallMgrRating} />
          <textarea type="text" placeholder="Add comment.." className='  placeholder-gray-300 overflow-hidden resize-none w-[100%] h-[130px] font-extralight text-lg text-black -ml-0 pt-1 border-[1px] border-gray-300 p-1' name='overallMgrComments' onChange={handleChangeComments} value={overallValue.overallMgrComments} />

          </div>
          </div>

        </div>
      </div>

      {/* NOW THE THIRD PART STARTS */}

      <div className='mt-4'>

        <div className='flex pb-1 '>
          
          <h1  className='text-lg font-medium text-black pl-5 pt-4 text-left'>Objective Area & KRA / Goals & Objective</h1>
          <h1 className='text-lg font-medium text-black  pt-4 pl-[115px] whitespace-nowrap ml-8 '>Measurement criteria / Target</h1>
          <div className='flex'>
            <div className='flex space-x-3 ml-6 '>
              <img src="profile.jpeg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Profile"></img>
              <h2 className='font-thin text-base  mx-8 pt-3 w-56 flex-col justify-center -ml-0 mt-2 text-blue-500'>{value.empName}</h2>
            </div>
            
            <div className='flex space-x-3 -ml-1'>
              <img src="manager.jpg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Manager"></img>
              <h2 className='font-thin text-base  mx-8 pt-3 w-56 flex-col justify-center -ml-0 mt-2 text-blue-500'>{value.mgrName}</h2>
            </div>
            </div>
        </div>

        {/* A SEPRATING LINE AS PER THE FIGMA DESIGN */}
        <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4 mb-4'> </h1>

        {/* we have to divide the grid in 7 parts and then give the devison of col span according */}

  <div className='grid grid-cols-12 mb-8'>
    <div className='col-span-7'>
    {
      //  LOGIC FOR DISPLAYING DATA

mgrScr?.map((i, index) => (
<div key={`${index}-${i}`} className='grid grid-cols-7'>
      
        <div className='col-span-1 -mt-4 '>
          <h2 className='font-extralight text-lg  mx-8 pt-3 justify-center ml-10'>{i.weightage}</h2>
          <p className=' font-extralight text-lg  ml-4 mt-2 text-gray-500'>Weightage</p>
        </div>

        <div className='col-span-3 -mt-4 -ml-8'>
        <div className="ml-4 mb-12">
          <h2 className='font-extralight text-lg  mx-8 pt-3  flex-col justify-center ml-10 '>{i.kra}</h2>
          <div className='font-extralight text-m mt-2 flex-col justify-center ml-10 text-gray-500'>

            {/* THIS IS CALLED AS THE REGEX or REGULAR EXPRESSION */}
            {/* The goal of this code seems to be splitting a string (i.goals) into an array of lines based on a specific pattern using a regular expression. */}
            {i.goals.split(/(?=\d+\.\s)/).map((line, lineIndex) => (
              // THIS PATTERN HAS COME BECAUSE THE DATA WAS ENTERED IN THIS WAY IN THE DATABASE.
              // matches a position in the string where there is a sequence of one or more digits, 
              // followed by a dot, and then followed by whitespace. However, it doesn't consume the actual digits, dot, or whitespace; 
              // it only asserts that they are present at that position.
              // It means that the string is split at positions where the positive lookahead pattern is matched.
            <p key={`${lineIndex}-${line.trim()}`}>{line.trim()}</p>
              // The trim method is used to remove leading and trailing whitespace from each line.

            ))}
          </div>
          </div>
        </div>
        {/* THIS MEASUREMNET CRITERIA IS WRITTEN UNDER THE LOOP ONLY BECAUSE IT WILL BE ACCORDING TO THE KRA and GOALS and under this measurement criteria includes the target and target operator*/}
        <div className='col-span-3  mt-4 flex -space-x-3'>
                    <h2 className='font-extralight text-2xl  mx-8  justify-center ml-10 border-[1px] border-gray-300 w-[45px] h-[35px] pl-4'>=</h2>
                    <h2 className='font-extralight text-lg  mx-8  justify-center ml-10 border-[1px] border-gray-300 w-[60px] h-[35px] pl-2 pt-1'>150</h2>
                    </div>
      </div>
    
  ))
}
</div>

<div className='-ml-[120px] -mr-14'>

  {/* THE CONCEPT OF CREATING ONE SEPRATE MAP FUNCTION TO DISPLAY A LIST OF ITEM IS APPLICABLE ONLY WHEN THERE IS AN ARRAY OF ITEMS TO DISPLAY */}
  {/* BUT WHEN THERE IS A OBJECT WE NEED NOT TO CREATE MAP FUNCTION LIKE ABOVE FROM LINE 345-360 WE CAN SIMPLY DO LIKE THIS -value={comments.frdRatings}, value={comments.frdComments} */}

        <div className='col-span-3 -mt-1 space-y-11  ml-10 '>
            <div className='space-y-1'>
                  <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[0]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[0]}></input>
          </div>

          <div className='space-y-1 '>
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[1]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[1]}></input>
          </div>

          <div className='space-y-1'>
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[2]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[2]}></input>
          </div>

          <div className='space-y-1'>
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[3]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[3]}></input>
          </div>

    </div>

</div>

<div className='col-span-3 -mr-[20px]  ml-16 '>
<div className='col-span-3 -mt-1 space-y-3 ml-12'>   
                  <div className='space-y-2'>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating1" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                  
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment1" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>

                  <div className='space-y-2'>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating2" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                  
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment2" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>

                  <div className='space-y-2'>
                  <div>
                    <div className=' h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating3" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                  
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment3" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>

                  <div className='space-y-2'>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating4" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                  
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment4" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>
          </div>

          <div className='-ml-[920px] pb-8'>
                  <h1 className='text-xl font-medium mb-6 pt-12'>Development Goals</h1>

                  <div className='grid grid-cols-8 -space-x-10'>

                    <div className='col-span-2'>
                      <h2 className='text-lg'>Trainings</h2>
                      <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.training}</p>
                    </div>

                    <div className='col-span-2'>
                    <h2 className='text-lg'>Development goals & Plans</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.goal}</p>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.description}</p>

                    </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Self Assessment</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.selfAssessment}</p>
                    </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Manager Assessment</h2>
                    <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' name='managerAssessment' onChange={handleChangeAddDevelopmentGoals} value={devGoals.managerAssessment}  />
                    </div>
                    
                  </div>

                </div>


                <div className='-ml-1 pt-8  '>
                    <div className="grid grid-cols-2 space-x-5 pt-2">

                    {/* {buttonsVisible} == disable */}

                {count>=0?
                      <div className="col-span-1 ">
                        <div className='relative'>
                          {/* relative is written just to maintain that position between the popover and the button */}
                          <button
                            className="border-2 border-white bg-blue-500 text-white  rounded-md hover:bg-gray-500 w-[100px] h-11 font-medium -ml-16"
                            // onClick={handleSubmit}
                            onClick={()=>{overallRatingAndComment();handleAddDevelopmentGoals();handleDateFromEmployeeStatus();}}
                            onChange={handleChangeComments}
                            onMouseMove={() => setPopoverVisible1(true)}
                            onMouseOut={() => { setPopoverVisible1(false) }}
                            onBlur={() => { setPopoverVisible1(false) }}
                            >Submit</button>
                          {popoverVisible1 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight">
                              {/* Your popover content goes here */}
                              <p className='space-x-4'>Once submitted cannot edit</p>
                            </div>
                          )}
                        </div>
                      </div>
                      :"" }


    {count==1?"":

        <div className="col-span-1 pl-5 ">
          <button className="border-2 border-white bg-black text-white rounded-md w-[100px] h-11 -ml-[130px] font-medium">Cancel</button>
        </div>
      
    }

      </div>
</div>

</div>
</div>

          </div>
        </div>
      </div>

  )
}
export default ManagerScreen

