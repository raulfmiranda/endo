function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("pt-BR");
}

function calculateStats(entries) {
  if (!entries || entries.length === 0) {
    return null;
  }

  const totalDays = entries.length;

  const painValues = entries.map((e) => Number(e.painIntensity || 0));
  const sumPain = painValues.reduce((acc, val) => acc + val, 0);
  const avgPain = painValues.length ? sumPain / painValues.length : 0;

  const highPainDays = entries.filter((e) => Number(e.painIntensity) >= 7);
  const highPainCount = highPainDays.length;

  const menstruatingDays = entries.filter((e) => e.menstruating);
  const menstruatingCount = menstruatingDays.length;

  const highPainDuringMenses = menstruatingDays.filter(
    (e) => Number(e.painIntensity) >= 7
  );
  const highPainDuringMensesCount = highPainDuringMenses.length;

  const startDate = entries.reduce((min, e) =>
    !min || new Date(e.date) < new Date(min.date) ? e : min
  );
  const endDate = entries.reduce((max, e) =>
    !max || new Date(e.date) > new Date(max.date) ? e : max
  );

  return {
    totalDays,
    avgPain,
    highPainCount,
    menstruatingCount,
    highPainDuringMensesCount,
    startDate: startDate?.date,
    endDate: endDate?.date,
  };
}

function buildReportText(entries, stats) {
  if (!stats) {
    return "Ainda não há dados suficientes para gerar um relatório.";
  }

  const {
    totalDays,
    avgPain,
    highPainCount,
    menstruatingCount,
    highPainDuringMensesCount,
    startDate,
    endDate,
  } = stats;

  const lines = [];

  lines.push("RELATÓRIO DE SINTOMAS – ENDOMETRIOSE");
  lines.push("------------------------------------");
  lines.push(
    `Período analisado: ${formatDate(startDate)} a ${formatDate(endDate)}`
  );
  lines.push(`Total de dias registrados: ${totalDays}`);
  lines.push("");
  lines.push("DOR");
  lines.push(`- Intensidade média de dor (0–10): ${avgPain.toFixed(1)}`);
  lines.push(`- Dias com dor forte (≥ 7/10): ${highPainCount}`);
  lines.push("");
  lines.push("CICLO MENSTRUAL");
  lines.push(`- Dias menstruando registrados: ${menstruatingCount}`);
  lines.push(
    `- Dias com dor forte durante a menstruação (≥ 7/10): ${highPainDuringMensesCount}`
  );
  lines.push("");
  lines.push(
    "Observação: este relatório foi gerado automaticamente a partir do diário de sintomas."
  );
  lines.push(
    "Use estas informações como apoio à consulta, junto com sua descrição em detalhes para o(a) médico(a)."
  );

  return lines.join("\n");
}

function Report({ entries }) {
  const stats = calculateStats(entries || []);
  const reportText = buildReportText(entries || [], stats);

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>Relatório para consulta</h2>

      {!stats ? (
        <p>Registre alguns dias de sintomas para gerar um relatório.</p>
      ) : (
        <>
          {/* Resumo rápido em tela */}
          <ul>
            <li>
              Período: {formatDate(stats.startDate)} a{" "}
              {formatDate(stats.endDate)}
            </li>
            <li>Total de dias registrados: {stats.totalDays}</li>
            <li>
              Dor média (0–10): {stats.avgPain.toFixed(1)}
            </li>
            <li>
              Dias com dor forte (≥ 7/10): {stats.highPainCount}
            </li>
            <li>
              Dias menstruando: {stats.menstruatingCount}
            </li>
            <li>
              Dias com dor forte durante menstruação:{" "}
              {stats.highPainDuringMensesCount}
            </li>
          </ul>

          {/* Texto pronto para copiar/colar ou imprimir */}
          <label htmlFor="report-text">
            Texto para copiar/colar (por exemplo, em um documento para levar à
            consulta):
          </label>
          <br />
          <textarea
            id="report-text"
            readOnly
            rows={10}
            style={{ width: "100%", maxWidth: "600px", marginTop: "0.5rem" }}
            value={reportText}
          />
        </>
      )}
    </section>
  );
}

export default Report;