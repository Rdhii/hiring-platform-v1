import React from 'react'
import NavbarManage from '../components/NavbarManage'
import EmptyManage from '../components/EmptyManage'
import CandidateList from '../components/CandidateList'

export default function ManagePage() {
  return (
    <div>
        <NavbarManage />
        <CandidateList />
    </div>
  )
}
