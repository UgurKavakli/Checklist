import { useState } from "react";

const phases = [
  {
    id: "cumartesi",
    label: "CUMARTESİ — Ön Hazırlık",
    color: "#7C6AFF",
    items: [
      { id: "c1", time: "Öğlen", task: "Tüm buz stoğunu teslim al, stok noktasına yerleştir" },
      { id: "c2", time: "Akşam", task: "Stok noktasındaki buzun durumunu kontrol et" },
      { id: "c3", time: "Gece", task: "Tuvalet stoklarını say ve hazırla (sabun, kağıt, dezenfektan)" },
    ],
  },
  {
    id: "sabah",
    label: "SABAH — Kurulum",
    color: "#FF6B35",
    items: [
      { id: "s1", time: "09:00", task: "Alana gel, genel durum kontrolü" },
      { id: "s2", time: "09:30", task: "Elektrik / sigorta testi" },
      { id: "s3", time: "10:00", task: "Stok noktasından ilk buz transferi — bar koordinatörüyle birlikte" },
      { id: "s4", time: "11:00", task: "Tuvalet stoklarını yerleştir, yedekleri sakla" },
      { id: "s5", time: "11:30", task: "Çöp bidonlarını konuşlandır" },
      { id: "s6", time: "13:00", task: "Güvenlik görevlileriyle brifing" },
      { id: "s7", time: "13:30", task: "Son tur: elektrik, tuvalet, çöp bidonları" },
      { id: "s8", time: "13:50", task: "10 dk mola — su iç, bir şeyler ye" },
    ],
  },
  {
    id: "parti",
    label: "PARTİ — 14:00",
    color: "#00C896",
    items: [
      { id: "p1", time: "14:00", task: "Kapılar açıldı — ilk tur" },
      { id: "p2", time: "15:30", task: "Tuvalet turu #1" },
      { id: "p3", time: "16:00", task: "Bar koordinatöründen buz durum mesajı al" },
      { id: "p4", time: "17:00", task: "Tuvalet turu #2 + çöp turu" },
      { id: "p5", time: "17:30", task: "Buz değerlendirmesi — ikmal gerekiyor mu?" },
      { id: "p6", time: "18:30", task: "Tuvalet turu #3 + çöp turu" },
      { id: "p7", time: "19:00", task: "🧊 BUZ İKMALİ — stok noktasına git, taze buz getir (~25 dk)" },
      { id: "p8", time: "19:30", task: "Alana dön, durum kontrolü" },
      { id: "p9", time: "20:30", task: "Tuvalet turu #4" },
      { id: "p10", time: "20:30–21:00", task: "☕ ZORUNLU MOLA — 30 dk" },
      { id: "p11", time: "22:00", task: "Tuvalet turu #5 + çöp turu" },
      { id: "p12", time: "22:30", task: "Bar koordinatörüyle son buz değerlendirmesi" },
      { id: "p13", time: "23:00", task: "Kapanış hazırlığı — güvenlikle koordinasyon" },
    ],
  },
  {
    id: "kapanis",
    label: "KAPANIŞ — 00:00",
    color: "#FF3B6B",
    items: [
      { id: "k1", time: "23:30", task: "Güvenliğe sinyal: misafir çıkışı başlasın" },
      { id: "k2", time: "23:45", task: "Çöp son turu" },
      { id: "k3", time: "00:00", task: "Kapılar kapandı" },
      { id: "k4", time: "00:15", task: "Elektrik kontrolü" },
      { id: "k5", time: "00:30", task: "Mal sahibiyle alan teslim turu" },
    ],
  },
];

export default function OpsChecklist() {
  const allItems = phases.flatMap((p) => p.items);
  const [checked, setChecked] = useState({});
  const [activePhase, setActivePhase] = useState("sabah");

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalDone = allItems.filter((i) => checked[i.id]).length;
  const pct = Math.round((totalDone / allItems.length) * 100);

  const currentPhase = phases.find((p) => p.id === activePhase);
  const phaseDone = currentPhase.items.filter((i) => checked[i.id]).length;
  const phaseTotal = currentPhase.items.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#F0EEF8",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      maxWidth: 480,
      margin: "0 auto",
      padding: "0 0 80px",
    }}>
      {/* Header */}
      <div style={{
        padding: "28px 20px 20px",
        borderBottom: "1px solid #1E1E2E",
        position: "sticky",
        top: 0,
        background: "#0A0A0F",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#7C6AFF", marginBottom: 4, textTransform: "uppercase" }}>
              Orb Dükkan Açılış Partisi
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
              OPS CHECKLIST
            </div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>21 Haziran 2026 · 14:00–00:00</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#7C6AFF", lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{totalDone}/{allItems.length}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: 14,
          height: 3,
          background: "#1E1E2E",
          borderRadius: 99,
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #7C6AFF, #00C896)",
            borderRadius: 99,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Phase tabs */}
      <div style={{
        display: "flex",
        gap: 0,
        padding: "12px 20px",
        overflowX: "auto",
        scrollbarWidth: "none",
        borderBottom: "1px solid #1E1E2E",
      }}>
        {phases.map((phase) => {
          const done = phase.items.filter((i) => checked[i.id]).length;
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              style={{
                flex: "none",
                padding: "6px 14px",
                marginRight: 8,
                borderRadius: 6,
                border: `1px solid ${isActive ? phase.color : "#1E1E2E"}`,
                background: isActive ? phase.color + "22" : "transparent",
                color: isActive ? phase.color : "#555",
                fontSize: 11,
                letterSpacing: 1,
                cursor: "pointer",
                fontFamily: "inherit",
                textTransform: "uppercase",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {phase.label.split("—")[0].trim()}
              {done > 0 && (
                <span style={{
                  marginLeft: 6,
                  background: phase.color,
                  color: "#000",
                  borderRadius: 99,
                  padding: "1px 5px",
                  fontSize: 9,
                  fontWeight: 700,
                }}>
                  {done}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Phase header */}
      <div style={{
        padding: "16px 20px 8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ fontSize: 12, color: currentPhase.color, letterSpacing: 2, textTransform: "uppercase" }}>
          {currentPhase.label}
        </div>
        <div style={{ fontSize: 11, color: "#444" }}>
          {phaseDone}/{phaseTotal}
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: "0 20px" }}>
        {currentPhase.items.map((item, idx) => {
          const done = checked[item.id];
          const isBreak = item.task.includes("MOLA") || item.task.includes("mola");
          const isIkmal = item.task.includes("İKMAL") || item.task.includes("buz getir");
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{
                display: "flex",
                gap: 14,
                padding: "14px 0",
                borderBottom: idx < currentPhase.items.length - 1 ? "1px solid #141420" : "none",
                cursor: "pointer",
                opacity: done ? 0.45 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {/* Checkbox */}
              <div style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                border: `2px solid ${done ? currentPhase.color : "#2A2A3E"}`,
                background: done ? currentPhase.color : "transparent",
                flexShrink: 0,
                marginTop: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {done && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 11,
                  color: isBreak ? "#FFB800" : isIkmal ? "#00C896" : currentPhase.color,
                  marginBottom: 3,
                  letterSpacing: 1,
                }}>
                  {item.time}
                </div>
                <div style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: done ? "#444" : "#E0DDF0",
                  textDecoration: done ? "line-through" : "none",
                }}>
                  {item.task}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom nav hint */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        padding: "12px 20px",
        background: "#0A0A0F",
        borderTop: "1px solid #1E1E2E",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <button
          onClick={() => {
            const idx = phases.findIndex((p) => p.id === activePhase);
            if (idx > 0) setActivePhase(phases[idx - 1].id);
          }}
          style={{
            padding: "8px 20px",
            background: "transparent",
            border: "1px solid #1E1E2E",
            color: "#555",
            borderRadius: 8,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ← Önceki
        </button>
        <div style={{ fontSize: 11, color: "#333", alignSelf: "center" }}>
          {phases.findIndex((p) => p.id === activePhase) + 1} / {phases.length}
        </div>
        <button
          onClick={() => {
            const idx = phases.findIndex((p) => p.id === activePhase);
            if (idx < phases.length - 1) setActivePhase(phases[idx + 1].id);
          }}
          style={{
            padding: "8px 20px",
            background: "transparent",
            border: "1px solid #1E1E2E",
            color: "#555",
            borderRadius: 8,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
}
