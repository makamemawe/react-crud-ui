import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';

const Employee = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const navigator = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
        if(id){
          getEmployee(id).then((response)=>{
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setPassword(response.data.password);
          }).catch(err=>{
            console.error(err);
          })
        }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {       
      const employee = { firstName, lastName, email, password };
      console.log(employee);

      if(id){
        updateEmployee(id, employee).then((response)=>{
          console.log(response.data);
          navigator('/');          
        }).catch(err=>{
          console.error(err);
        });
      }else{
        createEmployee(employee).then((response)=>{
          console.log(response.data);
          navigator("/");
          
        }).catch(err=>{
          console.error(err);
        })
      }
  
    }

  }

  // function validateForm() {
  //   if (!firstName || !lastName || !email || !password) {
  //     alert("All fields are required");
  //     return false;
  //   }
  //   return true;
  // }

  function validateForm(){

    let valid = true;

    const copyErrors = {... errors};

    if (firstName.trim()) {
      copyErrors.firstName = '';      
    }else{
      copyErrors.firstName = 'firstName is required';
      valid = false;
    }

    if (lastName.trim()) {
      copyErrors.lastName = '';      
    }else{
      copyErrors.lastName = 'lastName is required';
      valid = false;
    }

    if (email.trim()) {
      copyErrors.email = '';      
    }else{
      copyErrors.email = 'email is required';
      valid = false;
    }
    
    if (password.trim()) {
      copyErrors.password = '';      
    }else{
      copyErrors.password = 'password is required';
      valid = false;
    }

    setErrors(copyErrors);

    return valid;
  }

  function pageTitle(){
    if(id){
      return <h2 className="text-center mt-3">Update Employee</h2>
    }else{
      return <h2 className="text-center mt-3">Add Employee</h2>
    }
  }

  return (
    <div className='container'>
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 mb-5">
          {pageTitle()}
          <div className="card-body">
            <form className='form'>

              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input type="text"
                  placeholder='Employee First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                  onChange={(e) => setFirstName(e.target.value)} />
                  {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>    

              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input type="text"
                  placeholder='Employee Last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                  onChange={(e) => setLastName(e.target.value)} />
                  {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>    

              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input type="email"
                  placeholder='Employee Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid': ''}`}
                  onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>    

              <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input type="password"
                  placeholder='Employee Password'
                  name='password'
                  value={password}
                  className={`form-control ${errors.password ? 'is-invalid': ''}`}
                  onChange={(e) => setPassword(e.target.value)} />
                  {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
              </div>

              <button className='btn btn-success mb-5' onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
