// import React from 'react'
// import AnnualReviewByEmp from './annualReview/AnnualReviewByEmp';
// import AnnualReviewByMgr from './annualReview/AnnualReviewByMgr'
// import SelfAppraisel from './selfAppraisel/SelfAppraisel'
// import MangerReview from './managerReview/ManagerReview'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css';
// import PendingAppraisal from './manager_screen/PendingAppraisal';
// import ManagerScreen from './manager_screen/ManagerScreen';
// import ManagerScreen2 from './manager_screen/ManagerScreen2';
// import RouteToMgrView from './manager_screen/RouteToMgrView';
// import ProfileInfoFile from './profile-info/ProfileInfoFile';
// import Open from './GoalSetting/Open';
// import ManagerView from './GoalSetting/ManagerView';

// function App() {
//   return (
//     <>

//       <BrowserRouter>
//       <Routes>
//         <Route path="/annualReviewByEmp" element={<AnnualReviewByEmp/>}></Route>
//         <Route path="/AnnualReviewByMgr" element={<AnnualReviewByMgr/>}></Route>
//         <Route path="/ManagerScreen" element={<ManagerScreen/>}></Route>
//         <Route path="/ManagerScreen2" element={<ManagerScreen2/>}></Route>
//         <Route path="/RouteToMgrView" element={<RouteToMgrView/>}></Route>
//         <Route path="/MangerReview" element={<MangerReview/>}></Route>
//         <Route path="/" element={<ProfileInfoFile/>}></Route>
//         <Route path="/SelfAppraisel" element={<SelfAppraisel/>}></Route> 
//         <Route path="/managerView" element={<ManagerView />}/>
//         <Route path="/open" element={<Open />} />
//         <Route path="/pendingMgrReview" element={<PendingAppraisal/>}></Route>
        
//       </Routes>
//     </BrowserRouter> 
//     </>
//   )
// }

// export default App




import React from 'react'
import AnnualReviewByEmp from './annualReview/AnnualReviewByEmp';
import AnnualReviewByMgr from './annualReview/AnnualReviewByMgr'
import SelfAppraisel from './selfAppraisel/SelfAppraisel'
import MangerReview from './managerReview/ManagerReview'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import PendingAppraisal from './manager_screen/PendingAppraisal';
import ManagerScreen from './manager_screen/ManagerScreen';
import ManagerScreen2 from './manager_screen/ManagerScreen2';
import RouteToMgrView from './manager_screen/RouteToMgrView';
import ProfileInfoFile from './profile-info/ProfileInfoFile';
import Open from './GoalSetting/Open';
import ManagerView from './GoalSetting/ManagerView';

function App() {
  return (
    <>

      <BrowserRouter>
      <Routes>
        {/* <Route path="/annualReviewByEmp" element={<AnnualReviewByEmp/>}></Route>
        <Route path="/AnnualReviewByMgr" element={<AnnualReviewByMgr/>}></Route>
        <Route path="/ManagerScreen" element={<ManagerScreen/>}></Route>
        <Route path="/ManagerScreen2" element={<ManagerScreen2/>}></Route>
        <Route path="/RouteToMgrView" element={<RouteToMgrView/>}></Route>
        <Route path="/MangerReview" element={<MangerReview/>}></Route> */}
        <Route path="/" element={<ProfileInfoFile/>}></Route>
        {/* <Route path="/SelfAppraisel" element={<SelfAppraisel/>}></Route>  */}
        <Route path="/managerView" element={<ManagerView />}/>
        <Route path="/open" element={<Open />} />
        {/* <Route path="/pendingMgrReview" element={<PendingAppraisal/>}></Route> */}
        
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App