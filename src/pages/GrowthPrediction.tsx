import { useState } from "react";
import { motion } from "framer-motion";
import "./GrowthPrediction.css";

interface FormData {
  Age: string;
  Potential: string;
  Physical_Positioning: string;
  Number_of_playstyles: string;
  Composure: string;
  Strength: string;
  Reactions: string;
  Overall_rating: string;
}

interface PredictionResult {
  predicted_growth: number;
  confidence?: number;
  growth_category?: string;
  input_data?: {
    [key: string]: number;
  };
}

export function GrowthPrediction() {
  const [formData, setFormData] = useState<FormData>({
    Age: '',
    Potential: '',
    Physical_Positioning: '',
    Number_of_playstyles: '',
    Composure: '',
    Strength: '',
    Reactions: '',
    Overall_rating: '',
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = {
        Age: Number(formData.Age),
        Potential: Number(formData.Potential),
        Physical_Positioning: Number(formData.Physical_Positioning),
        Number_of_playstyles: Number(formData.Number_of_playstyles),
        Composure: Number(formData.Composure),
        Strength: Number(formData.Strength),
        Reactions: Number(formData.Reactions),
        Overall_rating: Number(formData.Overall_rating),
      };

      const response = await fetch("http://localhost:5002/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: PredictionResult = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Prediction failed.");
      }

      setPrediction({
        ...result,
        input_data: payload
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const fields: [keyof FormData, string][] = [
    ["Age", "Age"],
    ["Potential", "Potential"],
    ["Physical_Positioning", "Physical / Positioning"],
    ["Number_of_playstyles", "Number of Playstyles"],
    ["Composure", "Composure"],
    ["Strength", "Strength"],
    ["Reactions", "Reactions"],
    ["Overall_rating", "Overall Rating"],
  ];

  const getGrowthCategory = (growth: number) => {
    if (growth > 15) return "Exceptional Growth";
    if (growth > 10) return "High Growth";
    if (growth > 5) return "Moderate Growth";
    if (growth > 0) return "Slight Growth";
    if (growth === 0) return "No Growth";
    return "Potential Decline";
  };

  return (
    <motion.div
      className="growth-page"
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
            Growth <span>Prediction</span>
          </motion.h1>
          <motion.p className="section-subtitle" transition={{ delay: 0.2 }}>
            Predict a player's future development using key performance stats
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="growth-form"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="form-grid">
            {fields.map(([name, label]) => (
              <motion.div 
                key={name} 
                className="form-group" 
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor={name}>{label}</label>
                <input
                  type="number"
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  step="any"
                  min="0"
                />
              </motion.div>
            ))}
          </div>

          <button 
            className="submit-button" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner" />
            ) : (
              "Predict Growth"
            )}
          </button>
        </motion.form>

        {isLoading && (
          <div className="loading-container">
            <div className="spinner" />
          </div>
        )}

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {prediction && (
          <motion.div 
            className="result-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Prediction Results</h3>
            
            <div className="result-grid">
              <div className="highlight-card">
                <span className="highlight-label">Predicted Growth</span>
                <span className="highlight-value">
                  {prediction.predicted_growth.toFixed(1)}%
                  {prediction.predicted_growth > 0 ? (
                    <span className="trend-up improvement"></span>
                  ) : prediction.predicted_growth < 0 ? (
                    <span className="trend-down decline"></span>
                  ) : null}
                </span>
                <span className="highlight-label">
                  {getGrowthCategory(prediction.predicted_growth)}
                </span>
              </div>

              {prediction.confidence && (
                <div className="result-card">
                  <div className="result-item">
                    <span className="result-label">Confidence</span>
                    <span className="result-value">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              {prediction.input_data && Object.entries(prediction.input_data).map(([key, value]) => (
                <div className="result-card" key={key}>
                  <div className="result-item">
                    <span className="result-label">
                      {key.replace(/_/g, ' ').replace(/(^|\s)\S/g, l => l.toUpperCase())}
                    </span>
                    <span className="result-value">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}