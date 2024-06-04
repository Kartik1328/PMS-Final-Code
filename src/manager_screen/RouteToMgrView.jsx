import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {GrAddCircle} from "react-icons/gr";

function RouteToMgrView() {

  const [modal,setModal]=useState(false);
  const location=useLocation();
  const data=location.state.data;
  console.log(data,"data location");
  return (
    <>
      <div className='flex'>
        <div>
          <h1 className="font-bold ml-5 mt-5 text-md text-lg">Quarter 3</h1>
          <h2 className="ml-5 mt-5 text-gray-500 text-md">01-Apr-2023 to 30-jun-2023</h2>
        </div>
        <div></div>
      </div>
      <div className="text-lg ml-5 p-2 border-b-[1px]  text-md text-gray-400">
        <span className="text-blue-500 underline decoration-blue underline-offset-8 decoration-4">Goal Setting</span>
        <span className="px-6">Self Appraisal</span>
        <span className="">Manager Review</span>
      </div>
  

      <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'> </h1>

      <div className='flex border-b-[1px] mt-6 text-md text-black'>
        <div className='ml-4 text-lg'>Object Area/KRA</div>
        <div className='ml-16 text-lg'>Goals/Objective</div>
        <div className='ml-[220px] text-lg'>Measurment Critiria</div>
        <div className='ml-20 text-lg'>Weightage(Total Should be 100%)</div>
      </div>

      <form className='break-words'>
        <div className="whitespace-normal break-words" style={{ display: "flex", marginBottom: "10px" }}>
          <textarea type="text" placeholder="KRA" className='mt-7 ml-4 break-all whitespace-normal' style={{ height: "100px", marginRight: "3px", border: "solid 1px #ccc", borderWidth: "thin", overflowWrap: "break-word" }} />
          <br />
          <textarea type="text" placeholder="goals" className='w-72 mt-7 ml-1 text-left whitespace-normal' style={{ marginRight: "50px", textIndent: "10px", border: "solid 1px #ccc", borderWidth: "thin" }} />
          <div className="flex items-center">
            <select className="mt-8 h-8 w-12 border border-solid border-gray-300">
              <option value="<">{'<'}</option>
              <option value="<=">{'<='}</option>
              <option value="=">{'='}</option>
              <option value=">">{'>'}</option>
              <option value=">=">{'>='}</option>
            </select>
          </div>
          <textarea type="text" placeholder="" className="ml-2 mt-16 w-20 h-8 text-left whitespace-normal border border-solid border-gray-300 p-2" style={{ textIndent: "10px" }} />
          <textarea type="text" placeholder="weightage" className='mt-16 ml-20 w-32 h-8 break-all' style={{ border: "2px solid #ccc", borderWidth: "thin" }} />
          <h3 className='ml-2 scale-110 mt-16 text-blue-400'>%</h3>
          <div className='ml-20 mt-14'>
          <svg  className='mt-3 pl-4' xmlns="http://www.w3.org/2000/svg"  height="24" width="34" viewBox="0 0 448 512" fill='red'>
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
          </div>
        
        </div>
      </form>
          <div className='flex ml-8 mt-4'>
          <button style={{ marginLeft: '28%' }} className="flex items-center font-bold text-blue-400 text-md">
      <GrAddCircle />
      Add More
      </button>
      </div> 


      <div className='flex flex-row border-b-2'>
        <button type="submit" style={{ marginLeft: '42%' }} className="flex ml-96 mt-7 text-black text-md">Total out Of 100%</button>
        <textarea type="text" placeholder="100" value={"100"} className='ml-2 my-7 text-black text-md' style={{ border: "solid 1px #ccc", borderWidth: "thin", marginLeft: "70px", width: "130px", height: "35px" }} onChange={() => { }} />
        <h3 className='ml-2 p-2 scale-110 mt-7 text-blue-400'>%</h3>
      </div>

      <div>
        <div className="font-bold ml-5 mt-5 text-md text-lg">Development Goals</div>
        <div className='flex border-b-2 mt-6 text-md text-black'>
          <div className='ml-4 text-lg'>Trainings</div>
          <div className='ml-48 text-lg'>Development Goals</div>
          <div className='ml-[120px] text-lg'>Self Assessment</div>
          <div className='ml-36 text-lg'>Manager Assessment</div>
        </div>


        <div className="whitespace-normal break-words" style={{ display: "flex", marginBottom: "10px" }}>
          <select className="h-16 w-72 px-1 py-4 mt-3 ml-2 border rounded">
            <option value="Training 1">Training 1</option>
            <option value="Training 2">Training 2</option>
            {/* Add more options as needed */}
          </select>
          <select className="h-16 w-72 px-1 py-4 mt-3 ml-4 border rounded">
            <option value="Goal 1">Goal 1</option>
            <option value="Goal 2">Goal 2</option>
            {/* Add more options as needed */}
          </select>
          <textarea placeholder="Self-assessment" className="w-72 h-16 py-1 px-3 mt-3 ml-4 border rounded border-gray-300 text-gray-500" value="NA" readOnly />
          <textarea placeholder="Manager assessment" className="w-72 py-1 h-16 mt-3 px-3 ml-4 border rounded border-gray-300 text-gray-500" value="NA" readOnly />
          
          {/* <button type="button" title='Delete' className="ml-4 scale-150 text-red-500" style={{ marginTop: '-60px' }}>Delete</button> */}
          <textarea placeholder="Description" className="w-72 py-1 px-3 mt-3 h-16 ml-4 border rounded border-gray-300 text-gray-500" value="" readOnly />
          <div className='ml-8 mt-6 mr-8'>
          <svg  className='mt-3 pl-4' xmlns="http://www.w3.org/2000/svg"  height="26" width="36" viewBox="0 0 448 512" fill='red'>
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
          </div>
        </div>
      </div>

      <div className='flex mt-4 ml-14'>
          <button style={{ marginLeft: '28%' }} className="flex items-center font-bold text-blue-400 text-md">
      <GrAddCircle />
      Add More
      </button>
      </div> 
      <div className='mb-64 -mt-12'>
        <button style={{ marginLeft: '60%' }} className="mt-32 ml-96 py-2 px-7 bg-green-400 text-white">Approve</button>
        <button style={{ marginLeft: '1%' }} className="mt-7 ml-2 py-2 px-5  bg-blue-400 text-white" onClick={(()=>setModal(true))}>Revert Back</button>
        <button style={{ marginLeft: '1%' }} className="mt-32 ml-2 py-2 px-7 bg-gray-300 text-white" >Cancel</button>
      </div>

{modal && 
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-12 rounded">
          <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Enter comment</h2>
          <div className='text-center'>
            <textarea type="text" placeholder=" " className="border p-12 mb-12 w-full" />
          </div>
          <div className="flex justify-between">
            <div className='w-[500px] text-center'>
              <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Submit</button>
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded" onClick={()=>setModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}

export default RouteToMgrView;

