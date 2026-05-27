import { useState } from "react";

const todayISO = () => new Date().toISOString().slice(0, 10);

function EntryForm({ onSave }) {
  const [date, setDate] = useState(todayISO());
  const [painIntensity, setPainIntensity] = useState(0);
  const [menstruating, setMenstruating] = useState(false);
  const [flow, setFlow] = useState("none"); // none | light | medium | heavy
  const [painLocations, setPainLocations] = useState([]);
  const [symptoms, setSymptoms] = useState({
    bleedingHeavy: false,
    urinary: false,
    bowel: false,
    moodLow: false,
    fatigue: false,
  });
  const [notes, setNotes] = useState("");

  function toggleArrayValue(current, value) {
    if (current.includes(value)) {
      return current.filter((v) => v !== value);
    }
    return [...current, value];
  }

  function handlePainLocationChange(event) {
    const { value } = event.target;
    setPainLocations((prev) => toggleArrayValue(prev, value));
  }

  function handleSymptomChange(event) {
    const { name, checked } = event.target;
    setSymptoms((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  // >>> ESSA FUNÇÃO PRECISA EXISTIR <<<
  function handleSubmit(event) {
    event.preventDefault();

    const entry = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      date,
      painIntensity: Number(painIntensity),
      menstruating,
      flow,
      painLocations,
      symptoms,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onSave(entry);

    // reset básico (mantendo a data de hoje)
    setPainIntensity(0);
    setMenstruating(false);
    setFlow("none");
    setPainLocations([]);
    setSymptoms({
      bleedingHeavy: false,
      urinary: false,
      bowel: false,
      moodLow: false,
      fatigue: false,
    });
    setNotes("");
  }

  return (
    <article>
      <header>
        <h2>Registrar dia</h2>
        <p>Preencha os sintomas principais de hoje.</p>
      </header>

      <form onSubmit={handleSubmit}>
        {/* Data */}
        <label>
          Data
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        {/* Intensidade da dor */}
        <label htmlFor="pain-intensity">
          Intensidade da dor (0–10)
          <input
            id="pain-intensity"
            type="range"
            min="0"
            max="10"
            value={painIntensity}
            onChange={(e) => setPainIntensity(e.target.value)}
          />
          <small>Valor atual: {painIntensity}</small>
        </label>

        {/* Local da dor */}
        <fieldset>
          <legend>Local da dor</legend>
          <label>
            <input
              type="checkbox"
              value="pelvis"
              checked={painLocations.includes("pelvis")}
              onChange={handlePainLocationChange}
            />
            Pelve
          </label>
          <label>
            <input
              type="checkbox"
              value="lower_back"
              checked={painLocations.includes("lower_back")}
              onChange={handlePainLocationChange}
            />
            Lombar
          </label>
          <label>
            <input
              type="checkbox"
              value="abdomen"
              checked={painLocations.includes("abdomen")}
              onChange={handlePainLocationChange}
            />
            Abdômen
          </label>
          <label>
            <input
              type="checkbox"
              value="during_sex"
              checked={painLocations.includes("during_sex")}
              onChange={handlePainLocationChange}
            />
            Durante relação sexual
          </label>
        </fieldset>

        {/* Ciclo menstrual */}
        <fieldset>
          <legend>Ciclo menstrual</legend>
          <label>
            <input
              type="checkbox"
              checked={menstruating}
              onChange={(e) => {
                const checked = e.target.checked;
                setMenstruating(checked);
                if (!checked) {
                  setFlow("none");
                } else if (flow === "none") {
                  setFlow("medium");
                }
              }}
            />
            Estou menstruando hoje
          </label>

          {menstruating && (
            <label>
              Intensidade do fluxo
              <select
                value={flow}
                onChange={(e) => setFlow(e.target.value)}
              >
                <option value="light">Leve</option>
                <option value="medium">Médio</option>
                <option value="heavy">Intenso</option>
              </select>
            </label>
          )}
        </fieldset>

        {/* Sintomas associados */}
        <fieldset>
          <legend>Sintomas associados</legend>
          <label>
            <input
              type="checkbox"
              name="bleedingHeavy"
              checked={symptoms.bleedingHeavy}
              onChange={handleSymptomChange}
            />
            Sangramento intenso
          </label>
          <label>
            <input
              type="checkbox"
              name="urinary"
              checked={symptoms.urinary}
              onChange={handleSymptomChange}
            />
            Sintomas urinários
          </label>
          <label>
            <input
              type="checkbox"
              name="bowel"
              checked={symptoms.bowel}
              onChange={handleSymptomChange}
            />
            Sintomas intestinais
          </label>
          <label>
            <input
              type="checkbox"
              name="moodLow"
              checked={symptoms.moodLow}
              onChange={handleSymptomChange}
            />
            Humor deprimido/ansioso
          </label>
          <label>
            <input
              type="checkbox"
              name="fatigue"
              checked={symptoms.fatigue}
              onChange={handleSymptomChange}
            />
            Fadiga
          </label>
        </fieldset>

        {/* Notas livres */}
        <label>
          Notas do dia
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex.: treino, estresse, mudança de medicação..."
          />
        </label>

        <button type="submit">Salvar dia</button>
      </form>
    </article>
  );
}

export default EntryForm;