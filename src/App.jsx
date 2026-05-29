import { useEffect, useState } from "react";
import EntryForm from "./components/EntryForm.jsx";
import History from "./components/History.jsx";
import Report from "./components/Report.jsx";

function App() {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("form");

  useEffect(() => {
    const saved = localStorage.getItem("endo_entries_v1");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao ler dados do localStorage", e);
      }
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
    <div className="app-root">
      <main className="app-shell">
        <header className="app-header card">
          <h1 className="app-title">Endo Companion</h1>
          <p className="app-subtitle">
            Diário de sintomas para apoiar sua consulta.
          </p>
        </header>

        <nav className="tab-bar card">
          <button
            type="button"
            className={`tab-button ${
              activeTab === "form" ? "tab-button--active" : ""
            }`}
            onClick={() => setActiveTab("form")}
          >
            Registrar
          </button>
          <button
            type="button"
            className={`tab-button ${
              activeTab === "history" ? "tab-button--active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            Histórico
          </button>
          <button
            type="button"
            className={`tab-button ${
              activeTab === "report" ? "tab-button--active" : ""
            }`}
            onClick={() => setActiveTab("report")}
          >
            Relatório
          </button>
        </nav>

        <section className="content">
          {activeTab === "form" && (
            <div className="card">
              <EntryForm onSave={addEntry} />
            </div>
          )}
          {activeTab === "history" && (
            <div className="card">
              <History entries={entries} />
            </div>
          )}
          {activeTab === "report" && (
            <div className="card">
              <Report entries={entries} />
            </div>
          )}
        </section>

        <footer className="app-footer">
          <small>
            Dados armazenados apenas neste dispositivo. Este app não substitui
            acompanhamento médico.
          </small>
        </footer>
      </main>
    </div>
  );
}

export default App;