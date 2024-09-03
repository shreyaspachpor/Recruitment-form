import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
  Box,
  Stack,
} from "@mui/material";
import "./userForm.css";

const branches = [
  "Artificial Intelligence and Data Science",
  "Computer and Communication",
  "Computer Science",
  "Computer Science and Business Systems",
  "Electronics and Computer",
  "Electronics and Telecommunication",
  "Electronics and VLSI",
  "Information Technology",
  "Mechanical",
  "Robotics & AI",
];
const departments = [
  "Embedded Coding",
  "MATLAB & Image Processing",
  "Mechanical",
  "Electronics",
  "Creative & Management",
];
const years = ["FY"];

const UserForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    rollNo: "",
    branch: "",
    year: "FY",
    department: "",
    resume: null,
    githubId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormValues({
      ...formValues,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const scriptURL = "https://script.google.com/macros/library/d/1mqGo2RqTbHNao0l0JhEgGgNuU6n3XT8XjQrc2ioXEAlk4_wtYZ0Js9zj/2"

    const formData = new FormData();
    formData.append("fullName", formValues.fullName);
    formData.append("phoneNumber", formValues.phoneNumber);
    formData.append("email", formValues.email);
    formData.append("rollNo", formValues.rollNo);
    formData.append("branch", formValues.branch);
    formData.append("year", formValues.year);
    formData.append("department", formValues.department);
    formData.append("githubId", formValues.githubId);

    if (formValues.resume) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Resume = reader.result.split(",")[1];
        formData.append("resume", base64Resume);
        formData.append("resumeName", formValues.resume.name);
        formData.append("mimeType", formValues.resume.type);

        fetch(scriptURL, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((result) => {
            console.log("Success:", result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      reader.readAsDataURL(formValues.resume);
    } else {
      fetch(scriptURL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleReset = () => {
    setFormValues({
      fullName: "",
      phoneNumber: "",
      email: "",
      rollNo: "",
      branch: "",
      year: "FY",
      department: "",
      resume: null,
      githubId: "",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        className="form-container"
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h4" className="user-form-title" gutterBottom>
          Recruitment Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} className="user-form-stack">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email ID"
              variant="outlined"
              fullWidth
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Roll No"
              variant="outlined"
              fullWidth
              name="rollNo"
              value={formValues.rollNo}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                name="branch"
                value={formValues.branch}
                label="Branch"
                onChange={handleChange}
                required
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                name="year"
                value={formValues.year}
                label="Year"
                onChange={handleChange}
                disabled={true}
                required
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={formValues.department}
                label="Department"
                onChange={handleChange}
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              className="user-form-upload-btn"
            >
              Upload Resume
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {formValues.resume && (
              <Typography className="uploaded-file-name">
                {formValues.resume.name}
              </Typography>
            )}
            <TextField
              label="GitHub ID"
              variant="outlined"
              fullWidth
              name="githubId"
              value={formValues.githubId}
              onChange={handleChange}
              required
            />
            <Box display="flex" gap="2rem">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="user-form-submit-btn"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                type="reset"
                className="user-form-reset-btn"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default UserForm;
