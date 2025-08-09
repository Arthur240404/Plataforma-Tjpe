import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/status")
      .then(res => setStatus(res.data))
      .catch(() => setStatus({ status: "offline" }));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>Status do Backend: {status ? status.status : "carregando..."}</div>
      <div>Última atualização: {status ? status.timestamp : ""}</div>
    </div>
  );
};

export default DashboardPage;