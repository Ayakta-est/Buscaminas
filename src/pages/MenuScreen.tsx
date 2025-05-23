// src/minesweeper/pages/MenuScreen.tsx
import React, { useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

interface MenuScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Buscaminas</h1>

      <div style={styles.section}>
        <label style={styles.label}>Dificultad:</label>
        <select
          style={styles.select}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          <option value="easy">Fácil</option>
          <option value="medium">Medio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>

      <button style={styles.button} onClick={() => onStartGame(difficulty)}>
        Jugar
      </button>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Puntuaciones</h2>
        <p style={styles.placeholder}>No hay puntuaciones aún</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    gap: "1.5rem",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  label: {
    fontSize: "1.2rem",
  },
  select: {
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem 2rem",
    fontSize: "1.2rem",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  subtitle: {
    fontSize: "1.5rem",
  },
  placeholder: {
    fontStyle: "italic",
    color: "#777",
  },
};

export default MenuScreen;
