"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from '@/Components/Shared/Loader';
import DamcoFailReports from '@/Components/Layouts/Reports/fail/Damco';
import NexusFailedReports from '@/Components/Layouts/Reports/fail/NexusInfor';

const FailedReports = () => {
  
  const [damFailReports, setDamFailReports] = useState([]);
  const [nexFailReports, setNexFailReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const companyId = useSelector(state => state.value)

  useEffect(()=>{
    if(companyId == 1){
      handleDamFailedReports();
    }else{
      handleNexFailedReports()
    }
  },[companyId])

  const handleDamFailedReports = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(process.env.NEXT_PUBLIC_DAMCO_FAILED_REPORTS);
      setDamFailReports(res.data.message)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  const handleNexFailedReports = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(process.env.NEXT_PUBLIC_NEXUS_INFOR_FAILED_REPORTS);
      setNexFailReports(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className='d-flex justify-content-start'>
        <h5>{`${companyId == 1 ? "Damco" : "NexusInfor"} Failed Reports`}</h5>
    </div>
      {isLoading ? (
        <Loader />
      ) : companyId == 1 ? (
        <DamcoFailReports data={damFailReports} />
      ) : (
        <NexusFailedReports data={nexFailReports} />
      )}
    </div>
  )
}

export default FailedReports