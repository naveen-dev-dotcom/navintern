import {createContext,useState} from 'react';

export const UserRegContext=createContext();
export const UserRegProvider=({children})=>{
  const [ userRegData,setuserRegData]=useState(null);
  const [ userPlanData,setuserPlanData]=useState(null);
  const saveUserRegData=(formData)=>{
    setuserRegData(formData)
    console.log('Data saved in context');
  };
  

  const saveUserPlanData=(plan)=>{
    setuserPlanData(plan)
    console.log('Plan saved in context');
  };

  const completeData=()=>{
    const userFullData={
      ...userRegData,
      plan:userPlanData
    };
    return userFullData;
  };

  return (
    <UserRegContext.Provider value={{userRegData,userPlanData,completeData,saveUserPlanData,saveUserRegData}}>
      {children}
    </UserRegContext.Provider>
  );

};