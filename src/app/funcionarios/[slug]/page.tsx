import { api } from "~/trpc/server";
import type { SlugParams } from "~/shared/types/slug-param";
import { EmployeeDetails } from "~/features/employee-details";

interface Props {
  params: Promise<SlugParams>;
}

export default async function EmployeePage({ params }: Props) {
  const { slug } = await params;
  const employee = await api.employees.getOne({ slug });

  return <EmployeeDetails employee={employee} />;
}
