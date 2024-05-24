import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Contract from "components/pdf/Contract";

const Viewer = () => {
  return (
    <PDFViewer width="100%" height="1200px">
      <Contract />
    </PDFViewer>
  );
};

export default Viewer;
