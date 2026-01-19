"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

type Admission = {
  id: string;
  studentName: string;
  status: string;
};

export default function AdmissionsClient({
  initialAdmissions,
}: {
  initialAdmissions: Admission[];
}) {
  const { data, isLoading, error } = useQuery<Admission[]>({
    queryKey: ["admissions"],
    initialData: initialAdmissions,
    queryFn: () => api.get<Admission[]>("/api/admissions"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading admissions</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admissions</h1>
      {data?.map((a) => (
        <div key={a.id} className="p-3 bg-white rounded shadow mb-2">
          <div className="font-bold">{a.studentName}</div>
          <div className="text-gray-500">{a.status}</div>
        </div>
      ))}
    </div>
  );
}
