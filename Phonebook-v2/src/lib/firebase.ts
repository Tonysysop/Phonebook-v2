import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Employee, EmployeeFormData } from '../types/Employee';

const employeesCollection = collection(db, 'employees');

export const getEmployees = async (): Promise<Employee[]> => {
  const snapshot = await getDocs(employeesCollection);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Employee));
};

export const addEmployee = async (employeeData: EmployeeFormData): Promise<string> => {
  const docRef = await addDoc(employeesCollection, employeeData);
  return docRef.id;
};

export const updateEmployee = async (id: string, employeeData: EmployeeFormData): Promise<void> => {
  const employeeDoc = doc(db, 'employees', id);
  await updateDoc(employeeDoc, employeeData);
};

export const deleteEmployee = async (id: string): Promise<void> => {
  const employeeDoc = doc(db, 'employees', id);
  await deleteDoc(employeeDoc);
};
