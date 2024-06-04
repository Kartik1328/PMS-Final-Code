import React, { useEffect, useState } from 'react'
import Component from './Component';
import axios from 'axios';
import Service from '../Service';

//Here we have written two dots"..Service" because we want to import the service file which is in the services folder.For fetching the nested or file within a sub folder we use double dots..

function ProfileInfonfoFile() {

  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
   Service.getByProfileById()
      .then((response) => setProfileInfo(response.data))
  }, [])

  console.warn(profileInfo,"profileInfo");


  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 pt-6 mt-6 shadow-lg border border-white py-6 pl-3 rounded-md'>
        {/* this is the parent container that is of col-span-10 and contains all three containers */}

        {/* profile photo and information that is the first div */}
        <div className="col-span-2 bg-white">
          <div className="profile ml-12">
            <div className='img'>
              <div className='relative inline-block'>
                <img src="profile.jpeg" className='rounded-full h-40 w-40 ml-4' alt="Profile"></img>
                <div className="absolute bottom-2 right-5 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer">
                  <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1a11 11 0 00-11 11c0 6.075 4.925 11 11 11s11-4.925 11-11A11 11 0 0012 1zm0 2a9 9 0 019 9c0 4.97-4.03 9-9 9s-9-4.03-9-9A9 9 0 0112 3z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="text">
              <h2 className='font-semibold text-xl text-blue-900 mx-8 pt-3 w-56 flex-col -ml-[5px]'>{profileInfo.empName}</h2>

              <p className='font-normal'>{profileInfo.designation}</p>
            </div>
          </div>
        </div>

        {/* The second container */}
        <div className="col-span-4">
          <div className="div pt-8">
            <div className="div1  flex space-x-5 pl-10 p-7">
              <div className='emp w-56 flex-col '>
                <h3 className='font-normal text-normal'>Employee ID</h3>
                <h2 className='text-blue-900 font-semibold '>{profileInfo.employeeId}</h2>
              </div>
              <div className="">
                <h3 className='font-normal ml-4 '>Contact No.</h3>
                <h2 className='text-blue-900 font-semibold ml-4 '>{profileInfo.contactNo}</h2>
              </div>
            </div>
            <div className="div2 flex space-x-5 pl-10 p-7 pb-10 ">
              <div className='dept flex w-56 flex-col'>
                <h3 className='font-normal'>Department</h3>
                <p className='font-semibold overflow-hidden text-blue-900'>{profileInfo.department}</p>
              </div>
              <div className="reporting">
                <h3 className='font-normal ml-4'>Reporting To</h3>
                <h2 className='  text-blue-900 font-semibold ml-4'>{profileInfo.mgrName}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* The third container */}
        <div className="col-span-4 -ml-12">
          <div className="div pt-8">
            <div className="div1 flex space-x-5 pl-10 p-7">
              <div className='emp flex w-56 flex-col'>
                <h3 className='font-normalt '>Email</h3>
                <h2 className='text-blue-900 font-semibold '>{profileInfo.email}</h2>
              </div>
              <div className="contact">
                <h3 className='font-normal'>Location</h3>
                <h2 className='text-blue-900 font-semibold '>{profileInfo.location}</h2>
              </div>
            </div>
            <div className="div2  flex space-x-52 pl-10 p-7 pb-10">
              <div className='dept flex w-56 flex-col'>
                <h3 className='font-normal'>Employment Status</h3>
                <h2 className='text-green-500 font-semibold '>Active</h2>
                {/* <h2 className='text-green-500 font-semibold '>{profileInfo.eStatus}</h2> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Component/>
    </>
  );
}

export default ProfileInfonfoFile;
