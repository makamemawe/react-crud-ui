// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, listEmployee } from '../services/EmployeeService';

export const EmployeeList = () => {
    
    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();

    useEffect(()=>{
        getAllEmployees();
    }, []);

    function getAllEmployees(){
        listEmployee().then((response)=>{
            setEmployees(response.data);
        }).catch(error =>{
            console.error(error);
        })
    }    
    
     function AddNewEmployee() {
        navigator("/add-employee");
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id){

        deleteEmployee(id).then((response)=>{
            getAllEmployees();
            console.log(response.data);           

        }).catch(error=>{
            console.error(error);
        })
    }
    

  return (
    <div className='container'>
        <h1 className='text-center'>Employee List</h1>
        <button className='btn btn-primary mb-2' onClick={AddNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Id</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.password}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}
                                    style={{marginRight:'10px'}}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        
    </div>
  )
}
