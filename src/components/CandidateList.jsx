import React from "react";

export default function CandidateList({ candidates }) {
  return (
    <div className="mt-6 space-y-4 px-5">
      <h1 className="font-bold">Front End Developer</h1>
      <div className="border flex flex-col gap-6 rounded-lg border-gray-300">
        <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-white m-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 ">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="h-4 w-4 " />
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
                {candidates.map((candidates) => (
                  <tr
                    key={candidates.id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" className="h-4 w-4" />
                    </td>
                    <td className="px-4 py-3">{candidates.name}</td>
                    <td className="px-4 py-3">{candidates.email}</td>
                    <td className="px-4 py-3">{candidates.phone}</td>
                    <td className="px-4 py-3">{candidates.dob}</td>
                    <td className="px-4 py-3">{candidates.domicile}</td>
                    <td className="px-4 py-3">{candidates.gender}</td>
                    <td className="px-4 py-3 text-blue-600 underline">
                      <a
                        href={candidates.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {candidates.linkedin}
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
