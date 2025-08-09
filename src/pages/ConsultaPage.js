import React, { useState } from "react";
import axios from "axios";

const ConsultaPage = () => {
  const [form, setForm] = useState({
    nomeParte: "",
    tipoParte: "",
    cpfCnpj: "",
    comarca: "",
    classeProcessual: ""
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post("http://localhost:4000/api/consulta", form);
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Consulta Processual</h2>
      <form onSubmit={handleSubmit}>
        <input name="nomeParte" placeholder="Nome da Parte" onChange={handleChange} value={form.nomeParte} />
        <input name="tipoParte" placeholder="Tipo Parte" onChange={handleChange} value={form.tipoParte} />
        <input name="cpfCnpj" placeholder="CPF/CNPJ" onChange={handleChange} value={form.cpfCnpj} />
        <input name="comarca" placeholder="Comarca" onChange={handleChange} value={form.comarca} />
        <input name="classeProcessual" placeholder="Classe Processual" onChange={handleChange} value={form.classeProcessual} />
        <button type="submit" disabled={loading}>Consultar</button>
      </form>
      {loading && <div>Consultando...</div>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default ConsultaPage;