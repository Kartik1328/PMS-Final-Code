import Axios from "./Axios";
import Config from "./Config";

const apiClient = Axios(`${Config.pmsUrl}`);

// // Manager Review

const getBySelfAsmAll=()=>{
    const response = apiClient.get("/getBySelfAsmAll");
    return response;
}


const getByProfileById=()=>{
    const response = apiClient.get("/getByProfile/10");
    return response;
}


const getByManagerAsmById=()=>{
    const response = apiClient.get("/getByManagerAsm/10");
    return response;
}

const getBySelfAsmById=()=>{
    const response = apiClient.get("/getBySelfAsm/10");
    return response;
}


const getByDevGoalsById=()=>{
    const response = apiClient.get("/getByDevGoals/10");
    return response;
}


// //  Annual Review By Manager

// const postByAnnRevMgr=(data)=>{
//     const response = apiClient.post("/api/postByAnnRev",data);
//     return response;
// }


// const getByAnnualMgrById=()=>{
//     const response = apiClient.get("/api/getByAnnual/10");
//     return response;
// }

// // Annual Review  By Employee

const postByAnnRevEmp=(data)=>{
    const response = apiClient.post("/postByAnnRev",data);
    return response;
}


const getByAnnualEmpById=()=>{
    const response = apiClient.get("/getByAnnual/10");
    return response;
}

// // self Appraisal

const getSelfAssessmentGetAllUrl=()=>{
    const response = apiClient.get("/getBySelfAsmAll");
    return response;
}

const getDevelopmentGoalsByEmpIdUrl=()=>{
    const response = apiClient.get("/getByDevGoals/1");
    return response;
}

const getProfileByEmpIdAllUrl=()=>{
    const response = apiClient.get("/getByProfile/10");
    return response;
}

const postDevlopmentGoalsUrl=(data)=>{
    const response = apiClient.post("/postDevGoalByEmpId",data);
    return response;
}

const getSelfAssessmentDraftByEmpIdUrl=()=>{
    const response = apiClient.get("/getBySelfAsmDraft/10");
    return response;
}


const getSelfAssessmentByEmpIdUrl=()=>{
    const response = apiClient.get("/getBySelfAsm/10");
    return response;
}


const postSelfAssessmentDraft=(data)=>{
    const response = apiClient.post("/postBySelfAsmDraft",data);
    return response;
}

const postSelfAssessmentUrl=(data)=>{
    const response = apiClient.post("/postBySelfAsm",data);
    return response;
}



const getDevGoalsByEmpId=()=>{
    const response = apiClient.get("/getByDevGoalByEmpId/1");
    return response;
}



// // Manager Screen

// const postByMng=(data)=>{
//     const response = apiClient.post("/api/postByManager",data);
//     return response;
// }

// // Manager Screen 2

// const getByMasterDummyUrl=()=>{
//     const response = apiClient.get("/api/getByMasterDummy/12");
//     return response;
// }



// //  amulya 



const getAllTrainings = async()=>{
    try {
        const response = await apiClient.get('/getTrainingOption');
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const getDevelopmentOption =async()=>{
    try {
        const response = await apiClient.get('/getDevelopmentOption');
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const getdevelopmentGoals =async()=>{
    try {
        const response = await apiClient.get('/getdevelopmentGoals');
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const getemployeeKraId =async(empId)=>{
    try {
        const response = await apiClient.get(`/getemployeeKraId/${empId}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const getemployeeDevelopmentOrDraft =async(empId)=>{
    try {
        const response = await apiClient.get(`/getemployeeDevelopmentOrDraft/${empId}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const getemployeeKraDraft =async(empId)=>{
    try {
        const response = await apiClient.get(`/getemployeeKraDraft/${empId}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const getemployeeKraOrDraft =async(empId)=>{
    try {
        const response = await apiClient.get(`/getemployeeKraOrDraft/${empId}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const getmess =async()=>{
    try {
        const response = await apiClient.get('/getmess');
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const getemployeePerformance =async(empId)=>{
    try {
        const response = await apiClient.get(`/getemployeePerformance/${empId}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const getPendingAppraisal =async(empId)=>{
    try {
        const response = await apiClient.get(`/getPendingAppraisal/${empId}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const getByYearAndReviewCycle = async(empId,year,reviewCycle)=>{
    try {
        const response = await apiClient.get(`/getByYearAndReviewCycle/${empId}/${year}/${reviewCycle}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const postemployeeKra =async(empId,kragoals)=>{
    try {
        const response = await apiClient.post(`/postemployeeKra/${empId}`,kragoals);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const postemployeeKraDrafts =async(kragoals)=>{
    try {
        const response = await apiClient.post('/postemployeeKraDrafts',kragoals);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const postemployeedevelopment =async(selectedGoal)=>{
    try {
        const response = await apiClient.post('/postemployeedevelopment',selectedGoal);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const postemployeedevelopmentDraft =async(developmentGoals)=>{
    try {
        const response = await apiClient.post('/postemployeedevelopmentDraft',developmentGoals);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const postemployeePerformance =async(empPerformance)=>{
    try {
        const response = await apiClient.post('/postemployeePerformance',empPerformance);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}
const postmanagerApproval =async(managerApproval)=>{
    try {
        const response = await apiClient.post('/postmanagerApproval',managerApproval);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const postmanagerrevertcomments =async(requestData)=>{
    try {
        const response = await apiClient.post('/postmanagerrevertcomments',requestData);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const deletedevelopmentdraftbyempid =async(empId)=>{
    try {
        const response = await apiClient.delete(`/deletedevelopmentdraftbyempid/${empId}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const deleteDevelopmentGoal =async(id)=>{
    try {
        const response = await apiClient.delete(`/deleteDevelopmentGoal/${id}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}

const deleteEmployeeKraOrDraft =async(id)=>{
    try {
        const response = await apiClient.delete(`/deleteEmployeeKraOrDraft/${id}`);
        return response;
    } catch (error) {
        console.error("Error during fetching", error);
        throw error;
    }
}



const Service = {
    getBySelfAsmAll,
     getByProfileById,
    getByManagerAsmById,
    getBySelfAsmById,
    getByDevGoalsById,
    // postByAnnRevMgr,
    // getByAnnualMgrById,

    getDevGoalsByEmpId,

    postByAnnRevEmp,
    getByAnnualEmpById,
    getSelfAssessmentGetAllUrl,
    getDevelopmentGoalsByEmpIdUrl,
    getProfileByEmpIdAllUrl,
    postDevlopmentGoalsUrl,
    getSelfAssessmentDraftByEmpIdUrl,
    getSelfAssessmentByEmpIdUrl,
    postSelfAssessmentDraft,
    postSelfAssessmentUrl,
    // postByMng,
    // getByMasterDummyUrl,


    // amulya

    
    getAllTrainings,
    getDevelopmentOption,
    getdevelopmentGoals,
    getemployeeKraId,
    getemployeeDevelopmentOrDraft,
    getemployeeKraDraft,
    getemployeeKraOrDraft,
    getmess,
    getemployeePerformance,
    getPendingAppraisal,
    postemployeeKra,
    postemployeeKraDrafts,
    postemployeedevelopment,
    postemployeedevelopmentDraft,
    postemployeePerformance,
    postmanagerApproval,
    postmanagerrevertcomments,
    deletedevelopmentdraftbyempid,
    deleteDevelopmentGoal,
    deleteEmployeeKraOrDraft,
    getByYearAndReviewCycle,


};

export default Service;



