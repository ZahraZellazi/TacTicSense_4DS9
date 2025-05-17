import { useState } from "react";
import { motion } from "framer-motion";
import "./MarketValue.css";

export function MarketValue() {
  const [formData, setFormData] = useState({
    name: "",
    teamName: "",
    position: "",
    age: "",
    releaseClause: "",
    potential: "",
    overallRating: "",
    bestOverall: "",
    wage: "",
    yearsSinceJoined: "",
    teamContract: "",
    growth: "",
    attPosition: "",
    reactions: "",
    totalDefending: "",
    playStyles: "",
    composure: "",
    weight: "",
  });

  const [prediction, setPrediction] = useState<{
    predicted_market_value: number;
    currency: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      if (!formData.overallRating || !formData.position || !formData.age || !formData.teamName) {
        throw new Error("Please fill all required fields");
      }

      const clubTier = formData.teamName.toLowerCase().includes("real") ||
        formData.teamName.toLowerCase().includes("barcelona") ||
        formData.teamName.toLowerCase().includes("man city") ||
        formData.teamName.toLowerCase().includes("bayern") ? "Top" : "Mid";

      const requestData = {
        age: parseInt(formData.age),
        position: formData.position,
        overall_rating: parseInt(formData.overallRating),
        club_tier: clubTier,
        ...formData // you may want to clean/convert numeric fields depending on your backend expectations
      };

      const response = await fetch("http://localhost:5002/predict_market_value", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch prediction");
      }

      const result = await response.json();
      setPrediction(result);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (label: string, name: keyof typeof formData, type = "text", required = false) => (
    <motion.div className="form-group" whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
      <label htmlFor={name}>{label}{required ? " *" : ""}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
      />
    </motion.div>
  );

  return (
    <motion.div className="player-attributes-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="container">
        <motion.div className="header-section" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.h1 className="section-title" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            Market <span>Value</span> Prediction
          </motion.h1>
          <motion.p className="section-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            Analyze player attributes to predict market value
          </motion.p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="player-form" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="form-grid">
            {renderInput("Player Name", "name")}
            {renderInput("Team Name", "teamName", "text", true)}

            <motion.div className="form-group" whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <label htmlFor="position">Position *</label>
              <select id="position" name="position" value={formData.position} onChange={handleChange} required>
                <option value="">Select position</option>
                {positions.map((pos, i) => (
                  <option key={i} value={pos}>{pos}</option>
                ))}
              </select>
            </motion.div>

            {renderInput("Age", "age", "number", true)}
            {renderInput("Overall Rating", "overallRating", "number", true)}
            {renderInput("Release Clause", "releaseClause")}
            {renderInput("Potential", "potential")}
            {renderInput("Best Overall", "bestOverall")}
            {renderInput("Wage", "wage")}
            {renderInput("Years Since Joined", "yearsSinceJoined")}
            {renderInput("Team Contract", "teamContract")}
            {renderInput("Growth", "growth")}
            {renderInput("Attacking Position", "attPosition")}
            {renderInput("Reactions", "reactions")}
            {renderInput("Total Defending", "totalDefending")}
            {renderInput("Play Styles", "playStyles")}
            {renderInput("Composure", "composure")}
            {renderInput("Weight", "weight")}

            <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} disabled={isLoading}>
              {isLoading ? <span>Analyzing...</span> : <>
                <span>Analyze Player</span>
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </>}
            </motion.button>
          </div>
        </motion.form>

        {isLoading && (
          <motion.div className="result-section loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="loading-spinner"></div>
            <p>Analyzing player attributes...</p>
          </motion.div>
        )}

        {error && (
          <motion.div className="result-section error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>Error</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => setError(null)}>Try Again</button>
          </motion.div>
        )}

        {prediction && (
          <motion.div className="result-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3>Analysis Results</h3>
            <div className="result-card">
              {formData.name && <div className="result-item"><span className="result-label">Player:</span><span className="result-value">{formData.name}</span></div>}
              {formData.teamName && <div className="result-item"><span className="result-label">Team:</span><span className="result-value">{formData.teamName}</span></div>}
              <div className="result-item"><span className="result-label">Position:</span><span className="result-value">{formData.position}</span></div>
              <div className="result-item"><span className="result-label">Age:</span><span className="result-value">{formData.age}</span></div>
              <div className="result-item"><span className="result-label">Rating:</span><span className="result-value">{formData.overallRating}</span></div>
              <div className="result-item highlight">
                <span className="result-label">Estimated Market Value:</span>
                <span className="result-value">{prediction.currency} {prediction.predicted_market_value.toLocaleString()}</span>
              </div>
            </div>
            <button className="new-prediction-btn" onClick={() => {
              setPrediction(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>Analyze Another Player</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
