import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import "../css/userForm.css";

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
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;
    setIsSubmitting(true);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbznHFY1HPhLDAH3I_d091WVjc81jE52chsEMRKv6sq315Jg939bmL698Sd1hDwVev0O/exec";
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
          mode: "no-cors",
        })
          .then((response) => response.text())
          .then((result) => {
            setSubmissionStatus(
              "Success! Your application has been submitted."
            );
            setIsSubmitting(false);
            console.log("Success:", result);
          })
          .catch((error) => {
            setSubmissionStatus(
              "Error! There was an issue submitting your application."
            );
            setIsSubmitting(false);
            console.error("Error:", error);
          });
      };
      reader.readAsDataURL(formValues.resume);
    } else {
      fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
        .then((response) => response.text())
        .then((result) => {
          setSubmissionStatus("Success! Your application has been submitted.");
          setIsSubmitting(false);
          console.log("Success:", result);
        })
        .catch((error) => {
          setSubmissionStatus(
            "Error! There was an issue submitting your application."
          );
          setIsSubmitting(false);
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
    setSubmissionStatus("");
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <Typography variant="h4" className="user-form-title" gutterBottom>
          Recruitment Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email ID"
                variant="outlined"
                fullWidth
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Roll No"
                variant="outlined"
                fullWidth
                name="rollNo"
                value={formValues.rollNo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
                  required
                />
              </Button>
              {formValues.resume && (
                <Typography className="uploaded-file-name">
                  {formValues.resume.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="GitHub ID"
                variant="outlined"
                fullWidth
                name="githubId"
                value={formValues.githubId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className="user-form-submit-btn"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="error"
                type="reset"
                fullWidth
                className="user-form-reset-btn"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
          {submissionStatus && (
            <Typography
              variant="h6"
              color="primary"
              className="submission-status"
            >
              {submissionStatus}
            </Typography>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
