function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("pt-BR");
}

function formatPainLocations(painLocations = []) {
  const map = {
    pelvis: "Pelve",
    lower_back: "Lombar",
    abdomen: "Abdômen",
    during_sex: "Durante relação sexual",
  };

  if (!painLocations.length) return "-";

  return painLocations.map((loc) => map[loc] || loc).join(", ");
}

function formatSymptoms(symptoms = {}) {
  const labels = [];

  if (symptoms.bleedingHeavy) labels.push("Sangramento intenso");
  if (symptoms.urinary) labels.push("Sintomas urinários");
  if (symptoms.bowel) labels.push("Sintomas intestinais");
  if (symptoms.moodLow) labels.push("Humor deprimido/ansioso");
  if (symptoms.fatigue) labels.push("Fadiga");

  if (!labels.length) return "-";

  return labels.join(", ");
}

function History({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <section>
        <h2>Histórico</h2>
        <p>Você ainda não registrou nenhum dia.</p>
      </section>
    );
  }

  // copia e ordena por data (mais recente primeiro)
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>Histórico</h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Data</th>
              <th style={thStyle}>Dor (0–10)</th>
              <th style={thStyle}>Menstruação</th>
              <th style={thStyle}>Local da dor</th>
              <th style={thStyle}>Sintomas associados</th>
              <th style={thStyle}>Notas</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry) => (
              <tr key={entry.id}>
                <td style={tdStyle}>{formatDate(entry.date)}</td>
                <td style={tdStyle}>{entry.painIntensity}</td>
                <td style={tdStyle}>
                  {entry.menstruating
                    ? entry.flow === "heavy"
                      ? "Sim (intenso)"
                      : entry.flow === "medium"
                      ? "Sim (médio)"
                      : entry.flow === "light"
                      ? "Sim (leve)"
                      : "Sim"
                    : "Não"}
                </td>
                <td style={tdStyle}>
                  {formatPainLocations(entry.painLocations)}
                </td>
                <td style={tdStyle}>{formatSymptoms(entry.symptoms)}</td>
                <td style={tdStyle}>
                  {entry.notes ? entry.notes : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// estilos simples inline para não depender de CSS externo
const thStyle = {
  borderBottom: "1px solid #ccc",
  padding: "0.5rem",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
  fontWeight: "bold",
  fontSize: "0.9rem",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
  fontSize: "0.9rem",
  verticalAlign: "top",
};

export default History;