// annualReviewEmp.jsx
import React, { useEffect, useState } from 'react'
import {GrAddCircle} from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axios from 'axios';
import Service from '../Service';


function AnnualReviewByMgr() {
    const [rows, setRows] = useState(1);
    const [annRevValues, setAnnRevValues] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [icon, setIcon] = useState();
    const [popoverVisible1, setPopoverVisible1] = useState(false);
    const [popoverVisible2, setPopoverVisible2] = useState(false);

      const handleSubmit = () => {
          Service.postByAnnRev()
            .then((response) => {
             Service.getByAnnualById()
                .then((response) => setAnnRevValues(response.data))
            })
        
        setSubmitted("You have filled annual review.");
        setIcon(<IoMdCheckmarkCircleOutline />);
        setPopoverVisible1(false);
        setPopoverVisible2(false);

      }

      const handleAnnRevValueChange=(e)=>{
        const key=e.target.name;
        const value=e.target.value;
        setAnnRevValues({...annRevValues,[key]:value});
      }
      
      console.log(annRevValues,"annRevValues");

      const handleSaveAsDraft = () => {
        setPopoverVisible1(false);
        setPopoverVisible2(false);
      }

       // Assuming you want this effect to run only once on component mount
      

   console.warn(annRevValues,"annRevValues")

   console.log(annRevValues,"annRevValues")

  return (
    <div className='w-full h-screen bg-gray-200'>
      <div className='bg-white rounded-md relative top-12 ml-4 mr-3 border-[1px] border-blue-400 pb-24'>
      {/* <h1 className='text-xl font-normal text-black pl-4 pt-10'>Quarter 4</h1> */}
        <div className='flex space-x-[500px] pt-6'>
          <h3 className='text-m text-gray-500 pl-5 mt-2'>01-Apr 2023 to 30-Jun-2023</h3>
          <div className='flex space-x-2 text-green-500 items-center text-lg'>
            <h1 className='text-xl'>{icon}</h1>
            <h1 className=''>{submitted} </h1>
          </div>
        </div>

        {/* MENU BAR */}
        <div className='text-gray-400 pl-1'>
          <div className="relative">
            <div className="toggle-bar absolute h-2  transition-transform duration-300">
            </div>
            <ul className="flex space-x-4  p-4">
            <li><button className="text-lg">Goal Setting</button></li>
            <li><button className="text-lg">Self Assessment</button></li>
            <li><button className="text-lg">Manager Assessment</button></li>
            <li><button className="text-lg">Annual Review</button></li>
            </ul>
          </div>
        </div>

        {/* Adding one seprating line according to the figma design */}

        <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'> </h1>

        <h2 className='text-xl font-normal text-black pl-6 pt-6'>Manager Feedback</h2>

        {/* NOW CREATING THE GRID AND TEXT AREAS FOR THE COMMENTS AND THYE ANNUAL REVIEW */}

        <div className='container'>
        {[...Array(rows)].map((_, index) => (

        <div className='grid grid-cols-10 ml-5'>
            
          <div className='col-span-2 mt-5 '>

          <div className='pl-4 text-gray-600 space-y-16 ml-2'>
              <h2 className={`text-lg pt-2 ${index !== 0 && 'hidden'}`}>Manager Rating</h2>
              <h2 className={`text-lg pt-1.5 ${index !== 0 && 'hidden'}`}>Manager Comment</h2>
              <h2 className={`text-lg pt-12 ${index !== 0 && 'hidden'}`}>Area of imporvement</h2>
              <h2 className={`text-lg pt-16 ${index !== 0 && 'hidden'}`}>Strength</h2>
          </div>

          {/* <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[80%] h-[100px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' name='appraiseeComment' onChange={handleAnnRevValueChange} value={annRevValues.appraiseeComment} />  */}
          </div>

          <div className='col-span-6  mt-5  space-y-6 -ml-14'>

          {/* <h2 className={`text-lg ${index !== 0 && 'hidden'}`}>Manager Comment</h2> */}
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[23%] h-[60px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={annRevValues.ratings}/>
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[78%] h-[120px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={annRevValues.managerComment}/>
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[78%] h-[120px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={annRevValues.areaOfImprovement}/>
          <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[78%] h-[120px] font-extralight text-normal text-gray-600 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' value={annRevValues.appraiseeStrength}/>

          </div>

          <div className='col-span-2 mt-5'>
            <ul className='pr-4 ml-4 mb-12 -mt-8 space-y-2 text-m font-medium'>
              <li className='text-green-400'>5 - Outstanding</li>
              <li className='text-blue-400'>4 - Above Plan</li>
              <li className='text-blue-900'>3 - Meets Expectations</li>
              <li className='text-yellow-400'>2 - Below Plan</li>
              <li className='text-red-500'>1 - Unsatisfactory</li>
            </ul>
          </div>

        </div>
        
  ))}

        </div>

        <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4 pt-12'> </h1>

        <div className=''>
        <h2 className='text-xl font-normal text-black pl-6 pt-10'>Employee Feedback</h2>
        <h2 className='text-lg font-normal text-gray-600 pl-6 pt-10 ml-5'>Employee Comment</h2>
        <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[49%] h-[120px] font-extralight text-normal text-gray-600 ml-52 pt-2 border-[1px] border-gray-300 p-1 -mt-5 cursor-not-allowed' value={annRevValues.managerComment} readOnly/>

        </div>

          {/* NOW THE SUBMIT, DRAFT AND CANCEL BUTTONS */}
          <div className='grid grid-cols-3 ml-[700px] mt-24 '>

            <div className="col-span-1">
                        <div className='relative'>
                          <button
                            className="border-2 border-white bg-blue-500 text-white  rounded-md hover:bg-gray-500 w-[100px] h-11 font-medium"
                            onClick={handleSubmit}
                            onMouseMove={() => setPopoverVisible1(true)}
                            onMouseOut={() => { setPopoverVisible1(false) }}
                            onBlur={() => { setPopoverVisible1(false) }}
                            >Submit</button>
                          {popoverVisible1 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight pl-2">
                              {/* Your popover content goes here */}
                              <p className='space-x-4'>Once submitted cannot edit</p>
                            </div>
                          )}
                        </div>
            </div>

            <div className="col-span-1">
                        <div className='relative'>
                          <button
                            className="border-2 border-white bg-gray-500 text-white w-[100px] h-11 rounded-md hover:bg-blue-500 -ml-24 font-medium"
                            onClick={handleSaveAsDraft}
                            onMouseMove={() => setPopoverVisible2(true)}
                            onMouseOut={() => setPopoverVisible2(false)}
                            onBlur={() => { setPopoverVisible1(false) }}
                            >Save as Draft</button>
                          {popoverVisible2 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight">
                              {/* Your popover content goes here */}
                              <p>You can edit it later</p>
                            </div>
                          )}
                        </div>
            </div>

            <div className="col-span-1 ">
                        <button className="border-2 border-white bg-black text-white rounded-md w-[100px] h-11 -ml-48 font-medium">Cancel</button>
            </div>

                      </div>

      </div>

    </div>
  )
}

export default AnnualReviewByMgr
