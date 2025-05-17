import { useState } from "react";
import { motion } from "framer-motion";
import "./MarketValue.css";

interface FormData {
  age: string;
  position: string;
  overall_rating: string;
  club_tier: string;
  potential: string;
  reactions: string;
  composure: string;
  total_defending: string;
  play_styles: string;
  years_since_joined: string;
  best_overall: string;
  wage: string;
  team_contract: string;
  growth: string;
  att_position: string;
}

interface PredictionResult {
  predicted_market_value: number;
  currency: string;
}

export function MarketValue() {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    position: '',
    overall_rating: '',
    club_tier: 'Mid',
    potential: '',
    reactions: '',
    composure: '',
    total_defending: '',
    play_styles: 'Technical',
    years_since_joined: '',
    best_overall: '',
    wage: '',
    team_contract: '3 years',
    growth: '',
    att_position: 'Center'
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  const clubTiers = ["Top", "Mid", "Low"];
  const playStyles = ["Technical", "Physical", "Balanced", "Unknown"];
  const attPositions = ["Center", "Wide", "Free Role", "Unknown"];
  const teamContracts = ["1 year", "2 years", "3 years", "4+ years", "Unknown"];

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
      // Validate required fields
      if (!formData.age || !formData.position || !formData.overall_rating) {
        throw new Error("Please fill all required fields (Age, Position, Overall Rating)");
      }

      // Prepare payload with proper types
      const payload = {
        age: Number(formData.age),
        position: formData.position,
        overall_rating: Number(formData.overall_rating),
        club_tier: formData.club_tier,
        potential: formData.potential ? Number(formData.potential) : 0,
        reactions: formData.reactions ? Number(formData.reactions) : 0,
        composure: formData.composure ? Number(formData.composure) : 0,
        total_defending: formData.total_defending ? Number(formData.total_defending) : 0,
        play_styles: formData.play_styles,
        years_since_joined: formData.years_since_joined ? Number(formData.years_since_joined) : 0,
        best_overall: formData.best_overall ? Number(formData.best_overall) : 0,
        wage: formData.wage ? Number(formData.wage) : 0,
        team_contract: formData.team_contract,
        growth: formData.growth ? Number(formData.growth) : 0,
        att_position: formData.att_position
      };

      const response = await fetch("http://localhost:5002/predict_market_value", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  const renderInput = (label: string, name: keyof FormData, type = "text", required = false) => (
    <motion.div className="form-group" whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
      <label htmlFor={name}>{label}{required ? " *" : ""}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "1" : undefined}
      />
    </motion.div>
  );

  const renderSelect = (label: string, name: keyof FormData, options: string[], required = false) => (
    <motion.div className="form-group" whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
      <label htmlFor={name}>{label}{required ? " *" : ""}</label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </motion.div>
  );

  return (
    <motion.div
      className="market-value-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div
          className="header-section"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 className="section-title" whileHover={{ scale: 1.02 }}>
            Market <span>Value</span> Prediction
          </motion.h1>
          <motion.p className="section-subtitle">
            Predict a player's market value using key attributes
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="prediction-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="form-grid">
            {/* Row 1 */}
            {renderInput("Age", "age", "number", true)}
            {renderSelect("Position", "position", positions, true)}
            {renderInput("Overall Rating", "overall_rating", "number", true)}
            
            {/* Row 2 */}
            {renderSelect("Club Tier", "club_tier", clubTiers)}
            {renderInput("Potential", "potential", "number")}
            {renderInput("Reactions", "reactions", "number")}
            
            {/* Row 3 */}
            {renderInput("Composure", "composure", "number")}
            {renderInput("Total Defending", "total_defending", "number")}
            {renderSelect("Play Styles", "play_styles", playStyles)}
            
            {/* Row 4 */}
            {renderInput("Years Since Joined", "years_since_joined", "number")}
            {renderInput("Best Overall", "best_overall", "number")}
            {renderInput("Wage (€)", "wage", "number")}
            
            {/* Row 5 */}
            {renderSelect("Team Contract", "team_contract", teamContracts)}
            {renderInput("Growth", "growth", "number")}
            {renderSelect("Attacking Position", "att_position", attPositions)}

            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span>Predicting...</span>
                  <div className="spinner"></div>
                </>
              ) : (
                <>
                  <span>Predict Value</span>
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {isLoading && (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="spinner"></div>
            <p>Calculating market value...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Try Again</button>
          </motion.div>
        )}

        {prediction && (
          <motion.div
            className="result-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Prediction Results</h3>
            <div className="result-card">
              <div className="result-item highlight">
                <span className="result-label">Predicted Market Value:</span>
                <span className="result-value">
                  {prediction.currency} {prediction.predicted_market_value.toLocaleString()}
                </span>
              </div>
              <button
                className="new-prediction-btn"
                onClick={() => {
                  setPrediction(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Analyze Another Player
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}