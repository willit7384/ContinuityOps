import EnrollmentClient from "./EnrollmentClient";

export default async function EnrollmentPage() {
  const enrollment = await fetch("http://localhost:5000/api/enrollment", {
    cache: "no-store",
  }).then((res) => res.json());

  return <EnrollmentClient initialEnrollment={enrollment} />;
}
