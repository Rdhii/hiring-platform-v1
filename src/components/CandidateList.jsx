import React from 'react';

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

export default function CandidateList() {
  return (
    <div className="mt-6 space-y-4 px-5">
      <h1 className="font-bold">Front End Developer</h1>
      <div className="border flex flex-col gap-6 py-44 rounded-lg border-gray-300">
        <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-white m-6">
            <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 ">
                <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                    <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="h-4 w-4" />
                    </th>
                    <th className="px-4 py-3">Nama Lengkap</th>
                    <th className="px-4 py-3">Email Address</th>
                    <th className="px-4 py-3">Phone Numbers</th>
                    <th className="px-4 py-3">Date of Birth</th>
                    <th className="px-4 py-3">Domicile</th>
                    <th className="px-4 py-3">Gender</th>
                    <th className="px-4 py-3">Link LinkedIn</th>
                </tr>
                </thead>
                <tbody>
                {candidates.map((c) => (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">
                        <input type="checkbox" className="h-4 w-4" />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">{c.dob}</td>
                    <td className="px-4 py-3">{c.domicile}</td>
                    <td className="px-4 py-3">{c.gender}</td>
                    <td className="px-4 py-3 text-blue-600 underline">
                        <a href={c.linkedin} target="_blank" rel="noreferrer">
                        {c.linkedin}
                        </a>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      </div>

    </div>
  );
}