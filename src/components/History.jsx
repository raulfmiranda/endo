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

  if (!painLocations.length) return "—";

  return painLocations.map((loc) => map[loc] || loc).join(", ");
}

function formatSymptoms(symptoms = {}) {
  const labels = [];

  if (symptoms.bleedingHeavy) labels.push("Sangramento intenso");
  if (symptoms.urinary) labels.push("Sintomas urinários");
  if (symptoms.bowel) labels.push("Sintomas intestinais");
  if (symptoms.moodLow) labels.push("Humor deprimido/ansioso");
  if (symptoms.fatigue) labels.push("Fadiga");

  if (!labels.length) return "—";

  return labels.join(", ");
}

function getPainLevel(value) {
  const v = Number(value || 0);
  if (v >= 7) return "high";
  if (v >= 4) return "medium";
  if (v > 0) return "low";
  return "none";
}

function History({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <section className="history">
        <h2 className="section-title">Histórico</h2>
        <p className="section-empty">
          Nenhum dia registrado ainda. Use a aba <strong>Registrar</strong> para
          começar.
        </p>
      </section>
    );
  }

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="history">
      <h2 className="section-title">Histórico</h2>
      <p className="section-description">
        Visão geral dos dias registrados, com intensidade de dor e sintomas.
      </p>

      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Dor (0–10)</th>
              <th>Menstruação</th>
              <th>Local da dor</th>
              <th>Sintomas associados</th>
              <th>Notas</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((entry) => (
              <tr key={entry.id}>
                <td data-label="Data">{formatDate(entry.date)}</td>

                <td data-label="Dor (0–10)">
                  <span
                    className={`pill pill--pain-${getPainLevel(
                      entry.painIntensity
                    )}`}
                  >
                    {entry.painIntensity}
                  </span>
                </td>

                <td data-label="Menstruação">
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

                <td data-label="Local da dor">
                  {formatPainLocations(entry.painLocations)}
                </td>

                <td data-label="Sintomas associados">
                  {formatSymptoms(entry.symptoms)}
                </td>

                <td data-label="Notas" className="history-notes-cell">
                  {entry.notes ? entry.notes : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default History;