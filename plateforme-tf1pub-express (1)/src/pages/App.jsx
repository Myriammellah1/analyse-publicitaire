import React, { useState } from 'react';

const historiques = [];

export default function App() {
  const [videoURL, setVideoURL] = useState('');
  const [objectif, setObjectif] = useState('');
  const [cible, setCible] = useState('');
  const [resultat, setResultat] = useState(null);
  const [historique, setHistorique] = useState([]);
  const [benchmark, setBenchmark] = useState(null);

  const analyser = () => {
    const scores = {
      breakthrough: 81,
      response: 90,
      branding: 65
    };

    const nouvelles = {
      videoURL,
      objectif,
      cible,
      ...scores
    };

    const newHistorique = [...historique, nouvelles];
    setHistorique(newHistorique);

    const total = newHistorique.reduce((acc, h) => ({
      breakthrough: acc.breakthrough + h.breakthrough,
      response: acc.response + h.response,
      branding: acc.branding + h.branding
    }), {breakthrough: 0, response: 0, branding: 0});

    const count = newHistorique.length;
    setBenchmark({
      breakthrough: Math.round(total.breakthrough / count),
      response: Math.round(total.response / count),
      branding: Math.round(total.branding / count)
    });

    setResultat(scores);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 700, margin: 'auto' }}>
      <h1 style={{ color: '#002A5C' }}>Analyse Publicitaire - TF1 PUB</h1>
      <input placeholder="Lien vidéo" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10 }} />
      <input placeholder="Objectif" value={objectif} onChange={(e) => setObjectif(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10 }} />
      <input placeholder="Cible" value={cible} onChange={(e) => setCible(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10 }} />
      <button onClick={analyser} style={{ backgroundColor: '#002A5C', color: 'white', padding: 10, border: 'none', width: '100%' }}>
        Analyser
      </button>

      {resultat && (
        <div style={{ marginTop: 20 }}>
          <h2>Résultats</h2>
          <p>Breakthrough : {resultat.breakthrough}%</p>
          <p>Response : {resultat.response}%</p>
          <p>Branding : {resultat.branding}%</p>
          {benchmark && (
            <div>
              <h3>Benchmark (moyenne des campagnes)</h3>
              <p>Breakthrough moyen : {benchmark.breakthrough}%</p>
              <p>Response moyen : {benchmark.response}%</p>
              <p>Branding moyen : {benchmark.branding}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
