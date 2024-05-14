"use client"
import Damco from '@/Components/Layouts/Reports/success/Damco';
import NexusInfor from '@/Components/Layouts/Reports/success/NexusInfor';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from '@/Components/Shared/Loader';

const Amends = () => {

  const [damcoData, setDamcoData] = useState([]);
  const [nexusdata, setNexusData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const companyId = useSelector(state => state.value)

  useEffect(() => {
    if (companyId == 1) {
      handleDamcoReports();
    } else {
      handleNexusReports()
    }
  }, [companyId]);

  const handleDamcoReports = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(process.env.NEXT_PUBLIC_DAMCO_SUCCESS_REPORTS);
      setDamcoData(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNexusReports = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(process.env.NEXT_PUBLIC_NEXUS_INFOR_SUCCESS_REPORTS);
      setNexusData(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <div className='d-flex justify-content-start'>
        <h5>{`${companyId == 1 ? "Damco" : "NexusInfor"} Success Reports`}</h5>
    </div>
      {isLoading ? (
        <Loader />
      ) : companyId == 1 ? (
        <Damco data={damcoData} />
      ) : (
        <NexusInfor data={nexusdata} />
      )}
    </>
  )
};

export default Amends;
