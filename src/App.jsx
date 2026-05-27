import { useState, useEffect } from "react";
import EntryForm from "./components/EntryForm";
import History from "./components/History";
import Report from "./components/Report";

function App() {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("form"); // form | history | report

  useEffect(() => {
    const saved = localStorage.getItem("endo_entries_v1");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("endo_entries_v1", JSON.stringify(entries));
  }, [entries]);

  function addEntry(entry) {
    setEntries((prev) => [...prev, entry]);
    setActiveTab("history");
  }

  return (
    <main className="container">
      <header>
        <h1>Endo Companion</h1>
        <p className="contrast">
          Diário simples de sintomas para apoiar sua consulta sobre endometriose.
        </p>
      </header>

      <nav>
        <ul>
          <li>
            <button
              className={activeTab === "form" ? "secondary" : "outline"}
              type="button"
              onClick={() => setActiveTab("form")}
            >
              Registrar dia
            </button>
          </li>
          <li>
            <button
              className={activeTab === "history" ? "secondary" : "outline"}
              type="button"
              onClick={() => setActiveTab("history")}
            >
              Histórico
            </button>
          </li>
          <li>
            <button
              className={activeTab === "report" ? "secondary" : "outline"}
              type="button"
              onClick={() => setActiveTab("report")}
            >
              Relatório
            </button>
          </li>
        </ul>
      </nav>

      {/* layout mobile-first: tudo empilhado; 
          no futuro você pode colocar grid só para telas grandes */}
      <section>
        {activeTab === "form" && <EntryForm onSave={addEntry} />}
        {activeTab === "history" && <History entries={entries} />}
        {activeTab === "report" && <Report entries={entries} />}
      </section>

      <footer>
        <small>
          Dados armazenados apenas neste dispositivo (localStorage). Este app não
          substitui acompanhamento médico.
        </small>
      </footer>
    </main>
  );
}

export default App;