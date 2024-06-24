import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Contract from "components/pdf/Contract";
import { useLocation } from "react-router-dom";

const Viewer = () => {
  const { state } = useLocation();
  return (
    <PDFViewer width="100%" height="1200px">
      <Contract data={state} />
    </PDFViewer>
  );
};

export default Viewer;
