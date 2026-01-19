"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

type Enrollment = {
  id: string;
  studentName: string;
  program: string;
};

export default function EnrollmentClient({
  initialEnrollment,
}: {
  initialEnrollment: Enrollment[];
}) {
  const { data, isLoading, error } = useQuery<Enrollment[]>({
    queryKey: ["enrollment"],
    initialData: initialEnrollment,
    queryFn: () => api.get<Enrollment[]>("/api/enrollment"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading enrollment</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Enrollment</h1>
      {data?.map((e) => (
        <div key={e.id} className="p-3 bg-white rounded shadow mb-2">
          <div className="font-bold">{e.studentName}</div>
          <div className="text-gray-500">{e.program}</div>
        </div>
      ))}
    </div>
  );
}
