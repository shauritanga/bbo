import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BallTriangle, DNA } from "react-loader-spinner";
import { Notification, toaster } from "rsuite";

function ActivationPage() {
  const [activationStatus, setActivationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    const token = queryParams.get("token");

    if (email && token) {
      fetch(
        `http://localhost:5001/api/v1/auth/activate?email=${email}&token=${token}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Activation failed");
          }
        })
        .then((data) => {
          setActivationStatus("success");
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setActivationStatus("error");
        });
    }
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#007bff",
        height: "100vh",
      }}
    >
      {activationStatus === "success" && (
        <>
          <p style={{ color: "green", fontSize: "24px" }}>Your account has been activated!, redirecting ...</p>
          <BallTriangle
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </>
      )}
      {activationStatus === "error" && (
        <p>Error activating your account: {errorMessage}</p>
      )}
      {activationStatus === null && <p>Activating your account...</p>}
    </div>
  );
}

export default ActivationPage;
