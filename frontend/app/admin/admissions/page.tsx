import AdmissionsClient from "./AdmissionsClient";

export default async function AdmissionsPage() {
  const admissions = await fetch("http://localhost:5000/api/admissions", {
    cache: "no-store",
  }).then((res) => res.json());

  return <AdmissionsClient initialAdmissions={admissions} />;
}
