import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employee';

export const listEmployee = () => axios.get(API_URL);

export const createEmployee = (employees) => axios.post(API_URL, employees);

export const getEmployee = (employeesId) => axios.get(`${API_URL}/${employeesId}`);

export const updateEmployee = (employeesId, employee) => axios.put(`${API_URL}/${employeesId}`, employee);

export const deleteEmployee = (employeesId) => axios.delete(`${API_URL}/${employeesId}`);



