export interface Employee {
    id: string;
    name: string
    email: string;
    extension: string;
    department: string;
    role: string;
    floor: string;
    avatar?: string;
  }
  
 export type EmployeeFormData = Omit<Employee, "id">;
