import React from "react";
import { Typography } from "@mui/material";
import "../css/descriptionDepartment.css";

const DescriptionComponent = () => {
  return (
    <div className="description-container">
      <Typography variant="h4" align="center" className="description-title" gutterBottom>
        Departments We Offer
      </Typography>
      <Typography variant="body1" className="description-text">
      We mainly have five departments in TKR that are:<br />
      1. Mechanical <br />
      2. MATLAB and Image Processing <br />
      3. Embedded Coding <br />
      4. Electronics <br />
      5. Creative and Management
      </Typography>
    </div>
  );
};

export default DescriptionComponent;
