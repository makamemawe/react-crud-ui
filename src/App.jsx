import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Employee from "./components/Employee";
import { EmployeeList } from "./components/EmployeeList";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/add-employee" element={<Employee />}></Route>
          <Route path="/edit-employee/:id" element={<Employee />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
