import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Service from '../Service';

function MangerReview() {
  // Defines a functional component named MangerReview.
const [data,setData]=useState("");
const [value,setValue]=useState([])
const [info,setInfo]=useState('')
const [message,setDataMessage]=useState()
const [store,setStore]=useState("");
const [comments,setComments]=useState(" ");
const [mgrAssm, setMgrAssm] = useState([]);
const [selfAssm, setSelfAssm] = useState([]);
const [mgrComm, setMgrComm] = useState([]);
const [devGoals, setDevGoals] = useState([]);


console.log(value,"value.........")
console.warn(data,"data");
// The console. warn() method is used to write a warning message in the console.
console.log(store,"store")
console.log(data);
console.log(message);


const handleChangeComments=(e)=>{
const key=e.target.name;
const value=e.target.value;
setInfo({...info,[key]:value})
}
console.log(info);


useEffect(() => {
  Service.getemployeeKraOrDraft(1)
    .then((response) => setMgrAssm(response.data))
    .catch(err => console.log(err))
}, [])

console.log(mgrAssm,"mgrAssm");

console.warn(value,"value")


useEffect(() => {
 Service.getByProfileById()
    .then((response) => setValue(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value")

useEffect(() => {
  Service.getByManagerAsmById()
    .then((response) => setMgrComm(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(mgrComm,"mgrComm")
// ------------------------------------------------------------------------------------------------------------------------------------------

const [ratingMng, setRatingMng] = useState([])
const [commentsMng, setCommentsMng] = useState([])


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



const [ratingMng1, setRatingMng1] = useState([])
const [commentsMng1, setCommentsMng1] = useState([])


useEffect(() => {
  Service.getByManagerAsmById()
    .then((response) => {
      setMgrComm(response.data)
      setRatingMng1(response.data.mgrRating)
      setCommentsMng1(response.data.mgrComment)
    })
      
    .catch(err => console.log(err))
}, [])

console.log(mgrComm,"mgrComm")

console.log(ratingMng1,"ratingMng1")
console.log(commentsMng1,"commentsMng1")

const ratingArr1 = typeof ratingMng1 === 'string' ? ratingMng1.split(",") : [];
const commentArr1 = (typeof commentsMng1 === 'string' && commentsMng1 !== '') ? commentsMng1.split(",") : [];

console.warn(value,"value")
console.log(value,"value")


useEffect(() => {
  Service.getByDevGoalsById()
    .then((response) => setDevGoals(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value");


// ----------------------------------------------------------------THIS IS THE DISPLAY PART----------------------------------------------------------------------//

    return (

    <div className='w-full h-screen bg-gray-200 '>
      <div className='bg-white top-2 pb-24'>
        {/* anything that is written under square bracket CSS property is a arbitrary value */}

    {/* Adding one seprating line according to the figma design */}

    <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4 mt-4'> </h1>

    {/* To make this we have to make a grid of 11 coloumns.4 for profile picture,role etc and 2 for "submitted on" and 5 for self rating */}

      <div className='grid grid-cols-11'>

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
                <div className="text-m -mt-1">{mgrComm.reviewedOn}</div>
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
                  {mgrComm.overallMgrRating}
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
          <p className=' placeholder-gray-300 overflow-hidden resize-none w-[20%] h-[40px] font-extralight text-lg text-black -ml-0 pt-3 border-[1px] border-gray-300 p-1'>{mgrComm.overallMgrRating}</p>
          <p className=' placeholder-gray-300 overflow-hidden resize-none w-[100%] h-[130px] font-extralight text-lg text-black -ml-0 pt-3 border-[1px] border-gray-300 p-1'>{mgrComm.overallMgrComments}</p>

          </div>
          </div>

        </div>
      </div>

      {/* NOW THE THIRD PART STARTS */}

      <div className='mt-4'>

        <div className='flex pb-1 '>
          
          <h1  className='text-lg font-medium text-black pl-5 pt-4 text-left'>Objective Area & KRA / Goals & Objective</h1>
          <h1 className='text-lg font-medium text-black  pt-4 pl-[115px] whitespace-nowrap ml-8'>Measurement criteria / Target</h1>
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


  <div className='grid grid-cols-12 mb-8'>
    <div className='col-span-7'>
    {
                mgrAssm.data?.map((i, index) => (
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
                          {i.goals.split(/(?=\d+\.\s)/).map((line, lineIndex) => (
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

<div className='-ml-[120px] -mr-14'>

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
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[2]}></input>
          </div>
  
    </div>

</div>

<div className='col-span-3 -mr-[20px]  ml-16'>
<div className='col-span-3 -mt-1 space-y-11 ml-12 '>
            <div className='space-y-1'>
                  <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="firstRatings" onChange={handleChangeComments} value={ratingArr1[0]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frstComments" onChange={handleChangeComments} value={commentArr1[0]}></input>
          </div>

          <div className='space-y-1'>
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="firstRatings" onChange={handleChangeComments} value={ratingArr1[1]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frstComments" onChange={handleChangeComments} value={commentArr1[1]}></input>
          </div>

          <div className='space-y-1'>
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="firstRatings" onChange={handleChangeComments} value={ratingArr1[2]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frstComments" onChange={handleChangeComments} value={commentArr1[2]}></input>
          </div>

          <div className='space-y-1'>
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="firstRatings" onChange={handleChangeComments} value={ratingArr1[3]}></input>
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frstComments" onChange={handleChangeComments} value={commentArr1[3]}></input>
          </div>
          </div>
          <div className='-ml-[920px] pb-8 pt-24'>
                  <h1 className='text-xl font-medium mb-6 pt-12'>Development Goals</h1>
                  <div className='grid grid-cols-8 -space-x-10'>

                    <div className='col-span-2'>
                      <h2 className='text-lg'>Trainings</h2>
                      <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.training}</p>
                    </div>

                    <div className='col-span-2'>
                    <h2 className='text-lg'>Development goals & Plans</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.goal}</p>
                    <p className='overflow-hidden resize-none w-[70%] h-[60px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.description}</p>
                    </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Self Assessment</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.selfAssessment}</p>
                    </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Manager Assessment</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.managerAssessment}</p>
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
export default MangerReview

