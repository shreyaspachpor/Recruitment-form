import React from "react";
import DescriptionComponent from "./components/descriptionDepartment";
import UserForm from "./components/userForm";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="glass-container">
        <DescriptionComponent />
        <div className="user-form-wrapper">
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default App;
