import React from 'react'
import NavbarManage from '../components/NavbarManage'
import EmptyManage from '../components/EmptyManage'
import CandidateList from '../components/CandidateList'

export default function ManagePage() {

  const candidatesData = [];

  return (
    <div>
        <NavbarManage />
        {candidatesData.length === 0 ? <EmptyManage /> : <CandidateList />}
    </div>
  )
}
