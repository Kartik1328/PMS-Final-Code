import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Service from '../Service';
import { useLocalStorage } from 'react-use';
// imports necessary modules for creating a React component, 
// making HTTP requests with Axios, navigating in a React application, 
// IoMdCheckmarkCircleOutline- this is the React Icon from the react-icons library.

function SelfAppraisel() {
  // Defines a functional component named SelfAppraisal.

  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [value, setValue] = useState("")
  const [info, setInfo] = useState('')
  const [icon, setIcon] = useState();
  const [popoverVisible1, setPopoverVisible1] = useState(false);
  const [popoverVisible2, setPopoverVisible2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draftInfo, setDraftInfo] = useState("");
  const [selfAssm, setSelfAssm] = useState([]);
  const [devGoals, setDevGoals] = useState([]);
  const [addDevGoals, setAddDevGoals] = useState({});
  const [SubmitRatingComments, setSubmitRatingComments] = useState([]);
  const [moveToggle,setmoveToggle] = useState(0);
  const [active,setActive]=useState(false);
  
  console.log(devGoals,"devGoals//???...");

  console.log(value,"value...")
  
//   var emp_id=10;
//   // it is for fetching data based on the emp id 

  useEffect(() => {
    Service.getemployeeKraOrDraft(1)
      .then((response) => setSelfAssm(response.data))
      .catch(err => console.log(err))
  }, [])


  useEffect(()=>{
    Service.getProfileByEmpIdAllUrl()
    .then(res=>setValue(res.data))
  },[])
  
  console.warn(devGoals,"devGoals...");

  // console.warn(value,"value")

  useEffect(() => {
    Service.getDevGoalsByEmpId()
      .then((response) => setDevGoals(response.data))
      .catch(err => console.log(err))
  }, [])

  console.warn(value,"value")

//   // THIS IS THE LOGIC FOR filling THE COMMENTS IN THE form type filds THAT WE WRITE IN THE FRONT END and updation of the state input fields.

  // const handleAddDevelopmentGoals = () => {
  //   Service.postDevlopmentGoalsUrl(addDevGoals)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  // }

console.log(addDevGoals,"addDevGoals");
  const handleChangeAddDevelopmentGoals=(e)=>{
    setAddDevGoals({...devGoals,"selfAssessment":e.target.value});
  }

  const handleSubmitDevGoals=()=>{
    alert("hello");
    Service.postDevlopmentGoalsUrl(addDevGoals)
    .then(res=>console.log("devGoals",res.data))
  }

  console.log(addDevGoals,"addDevGoals+++++++++++++++++++++++++++++");

  const [dateLocal, setDateLocal, remove] = useLocalStorage('date', 'local');
  const [draftRatingComments, setDraftRatingComments] = useState("");
  console.warn(draftRatingComments,"draftRatingComments");

// handleRatingsCommentsChange

const [submitRatings, setSubmitRatings] = useState("one");
const handleRatingsChange=(e)=>{
  const key=e.target.name;
  const value=e.target.value;
  if(value.length>=1){
    setActive(true);
  }
  setSubmitRatings({...submitRatings,[key]:value});
}

const [submitComments, setSubmitComments] = useState("");

const handleCommentsChange=(e)=>{
  const key=e.target.name;
  const value=e.target.value;
  if(value.length>=1){
    setActive(true);
  }
  setSubmitComments({...submitComments,[key]:value});
}

// CONVERTING STRING TO OBJECT AND STORE IN DATABASE 

let submitRatingsString=""
for(let i in submitRatings){
  submitRatingsString+=submitRatings[i]+",";
}

let totalSubmitRatingsString=submitRatingsString.slice(0,submitRatingsString.length-1);
//console.log(submitRatingsString.slice(0,submitRatingsString.length-1)); // This will log the current state of ratingComment

let submitCommentsString=""
for(let i in submitComments){
  submitCommentsString+=submitComments[i]+",";
}

let totalSubmitCommentsString=submitCommentsString.slice(0,submitCommentsString.length-1);
//console.log(submitCommentsString.slice(0,submitCommentsString.length-1)); // This will log the current state of ratingComment

// // convert string to List 

// Draft Rating And Comments

useEffect(()=>{
  Service.getSelfAssessmentDraftByEmpIdUrl()
  .then((response)=>{
    setDraftRatingComments(response.data)
    setDateLocal(response.data.submittedOn);
    
setSubmitRatings({"rating":response.data.rating.split(",")[0],"rating1":response.data.rating.split(",")[1],"rating2":response.data.rating.split(",")[1],"rating3":response.data.rating.split(",")[1]})

setSubmitComments({"comment":response.data.comment.split(",")[0],"comment1":response.data.comment.split(",")[1],"comment2":response.data.comment.split(",")[1],"comment3":response.data.comment.split(",")[1]})

  })
},[])

// HERE I TAKEN THE FLAG VALUE TO PERFORM THE FUNCTIONALITY OF SAVE AS DRAFT AND SUBMIT 
const [flag,setFlag]=useState(true);

useEffect(()=>{
  Service.getSelfAssessmentByEmpIdUrl()
  .then((response)=>{
    setDraftRatingComments(response.data)
    setFlag(false);

    // THIS MEANS THAT-----
    
setSubmitRatings({"rating":response.data.rating.split(",")[0],"rating1":response.data.rating.split(",")[1],"rating2":response.data.rating.split(",")[1],"rating3":response.data.rating.split(",")[1]})

setSubmitComments({"comment":response.data.comment.split(",")[0],"comment1":response.data.comment.split(",")[1],"comment2":response.data.comment.split(",")[1],"comment3":response.data.comment.split(",")[1]})

  })
  .catch((error)=>error)
},[])


const handleChangeFeedback=(e)=>{
  
    const key=e.target.name;
    const value=e.target.value;
    if(value.length>=1){
      setActive(true);
    }
    
    setDraftRatingComments({...draftRatingComments,[key]:value});
}

console.log(draftRatingComments,"draftRatingComments");

const [devAssessment, setDevAssessment] = useState("");
const handleChangeAssessment=(e)=>{
  const value=e.target.value;
  if(value.length>=1){
    setActive(true);
  }
  setDevAssessment(value);
}


const handleDraftRatingComments = () => {

  
  let AllDraftRatingComments={...draftRatingComments,"empId":10,"rating":totalSubmitRatingsString,"comment":totalSubmitCommentsString};
  console.log(AllDraftRatingComments,"AllDraftRatingComments");
  Service.postSelfAssessmentDraft(AllDraftRatingComments)
  .then((response) => {
    Service.getSelfAssessmentDraftByEmpIdUrl()
    .then((response)=>{
      setDraftRatingComments(response.data)
      // setLocal("You have saved as draft");
   
    setIcon(<IoMdCheckmarkCircleOutline />);
    setButtonsVisible(false);
    setPopoverVisible1(false);
    }
   )
  })
  
}
// THIS FUNCTION IS TO MANAGE MULTIPLE VALUES OR ENTRIES.
//A var is declared that accepts the values from the draftRatingComments and returns it as a string.
//then post and GET API are called and setSubmitted function is INVOKED.

// submit 

const handleSubmitRatingComments = () => {

  console.log(totalSubmitRatingsString,totalSubmitCommentsString,"totalSubmitRatingsString,totalSubmitCommentsString");
  let AllSubmitRatingComments={...draftRatingComments,"empId":10,"rating":totalSubmitRatingsString,"comment":totalSubmitCommentsString};
  console.log(AllSubmitRatingComments,"AllSubmitRatingComments");
  Service.postSelfAssessmentUrl(AllSubmitRatingComments)
  .then((response) => {
    Service.getSelfAssessmentByEmpIdUrl()
    .then((response)=>setSubmitRatingComments(response.data))
  }) 
  setSubmitted("You have successfully submitted your self-appraisal");
 
}


const handleDateFromEmployeeStatus=()=>{
  axios.get("http://localhost:8080/api/setSubmittedOn/1")
  .then((response)=>console.log(response.data))
}

//WE CANNOT EDIT THE ARRAYS DIRECTLY IN THE FRONT END UI AFTER SUBMITTING IT AS DRAFT.
// TO EDIT THE ARRAY OF RATING AND COMMENTS WE HAVE TAKEN IT IN OBJECT WAY AND CONVERTED IT TO STRING AND SPLIT

  return (
    <div className='w-full h-screen bg-gray-200 '>
      
      <div className='bg-white top-2 pb-24'>

        {/* Adding one seprating line according to the figma design */}

        <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4 mt-4'> </h1>

        {/* To make this we have to make a grid of 11 coloumns.4 for profile picture,role etc and 2 for "submitted on" and 5 for self rating */}

        <div className='grid grid-cols-11 '>
          {/* ------------------------------------------------------------------------------------------------------------------------------------------------------ */}

          {/* PROFILE CARD IS displayed HERE */}

          <div className="col-span-4 ">
            <div className="grid grid-cols-12">
              <div className='col-span-2 '>
                <img src="profile.jpeg" className='rounded-full h-[40px] w-[42px] ml-6 mt-6' alt="Profile"></img>
              </div>

              <div className='col-span-10 '>
                <div className="ml-2 mb-4 mt-2">
                  <h2 className='font-thin text-lg  mx-8 pt-3 w-56 flex-col justify-center -ml-0 text-black'>{value.empName}</h2>
                  <p className=' font-medium text-m text-blue-900 -ml-0 pt-1'>{`${value.designation} - ${value.department}`}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Adding one seprating line according to the figma design */}

          <div className='col-span-2 border-l-[1px] border-gray-300 mt-2'>

            <div className='ml-8 pl-6 mt-2'>
              <div className="pb-1">
                <h2 className='text-lg font-thin text-black'>Submitted On</h2>
              </div>
              <div className='flex space-x-3 pt-1'>
                <div className='calender-icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="44" viewBox="0 0 448 512" fill='gray'>
                    <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
                  </svg>
                </div>
                <div className="text-m -mt-1">{draftRatingComments.submittedOn}</div>
              </div>
            </div>
          </div>

          {/* NOW THE SELF RATING PART is displayed AND ALSO ADDING ONE SEPRATING LINE ACCORDING TO THE FIGMA DESIGN*/}

          <div className='col-span-5 border-l-[1px] border-gray-300 mt-2'>

            <div className="div ml-6 pl-6 mt-2">
              <div className="pb-1">
                <h2 className='text-lg font-thin text-black'>Self Assessment</h2>
              </div>
              <div className="text-xl text-red-600 font-medium pl-6">
                {draftRatingComments.overallRating}
                {/* BECAUSE THE  VALUE OF SELF ASSESSMENT IS SAME AS THE OVERALL RATING */}
              </div>
            </div>
          </div>
        </div>

        {/* A SEPRATING LINE AS PER THE FIGMA DESIGN */}
        <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'> </h1>

        {/* NOW THE SELF APPRAISAL-SECTION (second part) */}

        <div>
          <h1 className='text-xl font-medium text-black pl-4 pt-4'>Self Assessment</h1>

          {/* we have to divide the grid in 9 parts and then give the devison of col span according */}

          <div className='grid grid-cols-9'>
            {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

            <div className='col-span-2  ml-4 mt-3 mb-6'>
              <div className="ml-4 mb-12 space-y-6 pt-3">
                <h2 className='font-extralight text-lg  mx-8 pt-3 w-56 flex-col justify-center -ml-0 text-black'>Overall Rating</h2>
                <p className=' font-extralight text-lg text-black -ml-0 pt-2 flex-col'>Overall Comments</p>
              </div>
            </div>

            <div className='col-span-4 mt-3'>
              <div className="-ml-28 mb-12 space-y-6 pt-3">
                <textarea type="text" placeholder="Add rating.." className=' placeholder-gray-300 overflow-hidden resize-none w-[20%] h-[40px] font-extralight text-lg text-black -ml-0 pt-3 border-[1px] border-gray-300 p-1' name='overallRating' onChange={handleChangeFeedback} value={draftRatingComments.overallRating} />
                <textarea type="text" placeholder="Add comment.." className='  placeholder-gray-300 overflow-hidden resize-none w-[100%] h-[130px] font-extralight text-lg text-black -ml-0 pt-1 border-[1px] border-gray-300 p-1' name='overallComments'onChange={handleChangeFeedback} value={draftRatingComments.overallComments}/>
              </div>

            </div>
          </div>
        </div>

        {/* NOW THE THIRD PART STARTS */}

        <div className=''>

          <div className='flex space-x-[130px] pb-1'>
            <h1 className='text-lg font-medium text-black pl-5 pt-4 text-left'>Objective Area & KRA / Goals & Objective</h1>
            <h1 className='text-lg font-medium text-black pl-5 pt-4 text-left '>Measurement criteria / Target</h1>
            <div className='flex space-x-3 pr-24'>
              <img src="profile.jpeg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Profile"></img>
              <h2 className='font-thin text-base  mx-8 pt-3 w-56 flex-col justify-center -ml-0 mt-2 text-blue-500'>{value.empName}</h2>
            </div>
          </div>

          {/* A SEPRATING LINE AS PER THE FIGMA DESIGN */}
          <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4 mb-4'> </h1>

          {/* we have to divide the grid in 12 parts and then give the devison of col span according */}
          {/* THIS IS THE LOGIC OF DISPLAYING THE DATA FROM THE DATABASE FROM THE BACKEND AND THEN WRITING IN THE FRONT END */}

          <div className='grid grid-cols-12 mb-8'>
            <div className='col-span-7'>
              {
                selfAssm.data?.map((i, index) => (
                <div key={`${index}-${i}`} className='grid grid-cols-7'>                    

                    <div className='col-span-1 -mt-4'>
                      <h2 className='font-extralight text-lg  mx-8 pt-3 justify-center ml-10'>{i.weightage}</h2>
                      <p className=' font-extralight text-lg  ml-4 mt-2 text-gray-500'>Weightage</p>
                    </div>

                    <div className='col-span-3 -mt-4 -ml-8'>
                      <div className="ml-4 mb-12 ">
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
                    <div className='col-span-3  mt-4 flex -space-x-3 ml-4'>
                    <h2 className='font-extralight text-2xl  mx-8  justify-center ml-10 border-[1px] border-gray-300 w-[45px] h-[35px] pl-4'>{i.target}</h2>
                    <h2 className='font-extralight text-lg  mx-8  justify-center ml-10 border-[1px] border-gray-300 w-[60px] h-[35px] pl-2 pt-1'>{i.measurement}</h2>
                    </div>
                  </div>

                ))
              }

            </div>
            
            <div className='col-span-5 ml-8'>
              {/* THIS IS FOR RATING AND COMMENT SECTION */}
              <div className={`col-span-3 -mt-1 ${submitted ? 'space-y-14' : 'space-y-4'}`}>
                <div className='space-y-2'>
                  <div>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Rating</h3>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[15%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="rating" onChange={handleRatingsChange} value={submitRatings.rating} /> 
                  </div>
                  <div>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[60%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="comment"  onChange={handleCommentsChange} value={submitComments.comment}
                    />
                  </div>
                </div>

                <div className=' space-y-2'>
                  <div>
                  
                  <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Rating</h3>
                  <input type="text" placeholder="0.0"
                    className={`input input-bordered w-[15%] h-[30px] outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                    name="rating1"  onChange={handleRatingsChange}  value={submitRatings.rating1}/> 
                    {/* array is converted into object form that is why we have taken "value={submitRatings.rating1}" */}
                    </div>
                    <div>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                  <textarea type="text" placeholder=""
                    className={`overflow-hidden resize-none w-[60%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-none bg-white' : 'border-[1px] border-gray-200'}`}
                    name="comment1"  onChange={handleCommentsChange}   value={submitComments.comment1}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <div>
                  <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Rating</h3>
                  <input type="text" placeholder="0.0"
                    className={`input input-bordered w-[15%] h-[30px] outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                    name="rating2" disabled={submitted}  onChange={handleRatingsChange} value={submitRatings.rating2}/>  
                    </div>
                  <div>
                  <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                  <textarea type="text" placeholder=""
                    className={`overflow-hidden resize-none w-[60%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-none bg-white' : 'border-[1px] border-gray-200'}`}
                    name="comment2" disabled={submitted}  onChange={handleCommentsChange}  value={submitComments.comment2}
                  />
                  </div>
                </div>

                <div className='space-y-2'>
                  <div>
                  <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Rating</h3>
                  <input type="text" placeholder="0.0"
                    className={`input input-bordered w-[15%] h-[30px] outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                    name="rating3"  disabled={submitted}  onChange={handleRatingsChange} value={submitRatings.rating3} />   
                    </div>
                    <div>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                  <textarea type="text" placeholder=""
                    className={`overflow-hidden resize-none w-[60%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                    name="comment3"  disabled={submitted}  onChange={handleCommentsChange} value={submitComments.comment3}
                  />
                  </div>
                </div>

{/* -----------------------------------------------NOW THE DEVELOPMENT GOALS------------------------------------------------- */}

                <div className='-ml-[780px] pb-8'>
                  <h1 className='text-xl font-medium mb-6 pt-12'>Development Goals</h1>

                  <div className='grid grid-cols-8 -space-x-10'>

                    <div className='col-span-2'>
                      <h2 className='text-lg'>Trainings</h2>
                      <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.training}</p>
                      {/* <textarea type="text" placeholder="Soft skills" className=' placeholder-gray-600 overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-black -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' /> */}
                    </div>

                    <div className='col-span-2'>
                    <h2 className='text-lg'>Development goals & Plans</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.goal}</p>
                      <textarea type="text" placeholder="Decription" className=' placeholder-gray-600 overflow-hidden resize-none w-[70%] h-[80px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={devGoals.description}/>
                      </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Self Assessment</h2>
                    <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' name='selfAssessment' onChange={handleChangeAddDevelopmentGoals}  value={devGoals.selfAssessment}/>
                    </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Manager Assessment</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-400 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3 cursor-not-allowed'>NA</p>
                    </div>

                  </div>

                </div>
                {/* NOW THE BUTTONS SECTION- "SUBMIT" "SAVE AS DRAFT" AND "CANCEL" BUTTON */}

                  <div className='-ml-1 pt-8  '>
                    <div className="grid grid-cols-3 space-x-5">

                    {/* {buttonsVisible} == disable */}

                      <div className="col-span-1">
                        <div className='relative'>
                          <button
                            className="border-2 border-white bg-blue-500 text-white  rounded-md hover:bg-gray-500 w-[100px] h-11 font-medium"
                           onClick={()=>{handleSubmitRatingComments(); handleDateFromEmployeeStatus();handleSubmitDevGoals();}}
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

                      <div className="col-span-1">
                      {
                        <div className='relative'>
                          <button
                            className="border-2 border-white bg-gray-500 text-white w-[100px] h-11 rounded-md hover:bg-blue-500 -ml-20 font-medium"
                            onClick={()=>{handleDraftRatingComments()}}
                            onMouseMove={() => setPopoverVisible2(true)}
                            onMouseOut={() => setPopoverVisible2(false)}
                            onBlur={() => { setPopoverVisible1(false) }}>
                          Save as Draft
                            </button>
                          {popoverVisible2 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight">
                              {/* Your popover content goes here */}
                              <p>You can edit it later</p>
                            </div>
                          )}
                        </div>
                        }
                      </div>

                      <div className="col-span-1 pl-5">
                        <button className="border-2 border-white bg-black text-white rounded-md w-[100px] h-11 -ml-[158px] font-medium">Cancel</button>
                      </div>
                      
                    </div>
                  </div>

              </div>
            </div>
          </div>

        </div>        

      </div>
    </div>

  )
}
export default SelfAppraisel

