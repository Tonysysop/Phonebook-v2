export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    extension: string;
    department: string;
    role: string;
    floor: string;
    avatar?: string;
  }
  
  export interface EmployeeFormData extends Omit<Employee, 'id'> {}