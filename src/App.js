import React, { useState } from "react";
import SunCalc from "suncalc";

const moonPhases = [
  { name: "New Moon", icon: "🌑" },
  { name: "Waxing Crescent", icon: "🌒" },
  { name: "First Quarter", icon: "🌓" },
  { name: "Waxing Gibbous", icon: "🌔" },
  { name: "Full Moon", icon: "🌕" },
  { name: "Waning Gibbous", icon: "🌖" },
  { name: "Last Quarter", icon: "🌗" },
  { name: "Waning Crescent", icon: "🌘" },
];

function getMoonPhase(date) {
  const illumination = SunCalc.getMoonIllumination(date);
  const phase = illumination.phase; // value between 0-1

  if (phase === 0) return moonPhases[0];
  if (phase < 0.25) return moonPhases[1];
  if (phase === 0.25) return moonPhases[2];
  if (phase < 0.5) return moonPhases[3];
  if (phase === 0.5) return moonPhases[4];
  if (phase < 0.75) return moonPhases[5];
  if (phase === 0.75) return moonPhases[6];
  if (phase < 1) return moonPhases[7];
  return moonPhases[0]; // fallback
}

function App() {
  const [showNextDays, setShowNextDays] = useState(false);

  const today = new Date();
  const todayPhase = getMoonPhase(today);

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i + 1);
    return { date, phase: getMoonPhase(date) };
  });

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h1>🌙 Moon Phase Tracker</h1>

      <h2>Today ({today.toDateString()})</h2>
      <div style={{ fontSize: "80px" }}>{todayPhase.icon}</div>
      <p>{todayPhase.name}</p>

      <button
        onClick={() => setShowNextDays(!showNextDays)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {showNextDays ? "Hide Next 7 Days" : "Next 7 Days"}
      </button>

      {showNextDays && (
        <div style={{ marginTop: "30px" }}>
          <h2>Next 7 Days</h2>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {next7Days.map((d, i) => (
              <div
                key={i}
                style={{
                  margin: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  width: "120px",
                }}
              >
                <div style={{ fontSize: "50px" }}>{d.phase.icon}</div>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  {d.phase.name}
                </p>
                <small>{d.date.toDateString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
