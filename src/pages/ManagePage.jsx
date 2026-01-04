import NavbarManage from '../components/admin/NavbarManage'
import EmptyManage from '../components/admin/EmptyManage'
import CandidateList from '../components/admin/CandidateList'

export default function ManagePage() {

  const candidates = [
  {
    id: 1,
    name: 'Aurelie Yukiko',
    email: 'aurelieyukiko@yahoo.com',
    phone: '082120098766',
    dob: '30 January 2001',
    domicile: 'Jakarta',
    gender: 'Female',
    linkedin: 'https://www.linkedin.com/in/user-a',
  },
  {
    id: 2,
    name: 'Ditoyo Hendyawan',
    email: 'ditoyohendyawan@yahoo.com',
    phone: '081184180678',
    dob: '30 January 2001',
    domicile: 'Jakarta',
    gender: 'Male',
    linkedin: 'https://www.linkedin.com/in/user-b',
  },
];

  return (
    <div>
        <NavbarManage />
        {candidates.length === 0 ? (<EmptyManage />) : (<CandidateList candidates={candidates} />)}
    </div>
  )
}
