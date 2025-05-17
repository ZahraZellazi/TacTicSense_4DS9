import { useState } from "react";
import { motion } from "framer-motion";
import "./MarketValue.css"; // You'll need to create this CSS file

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
    potential: number;
    growth: number;
    value: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const positions = [
    "GK", "CB", "LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM", 
    "LM", "RM", "LW", "RW", "CF", "ST"
  ];

  const playStyles = [
    "Tiki-Taka", "Counter Attack", "Long Ball", "Park the Bus",
    "Gegenpress", "Wing Play", "Direct Play", "Possession Game"
  ];

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
      // Validation
      if (!formData.overallRating || !formData.potential || !formData.age) {
        throw new Error("Please fill all required fields");
      }

      // Prepare data for API
      const requestData = {
        age: parseInt(formData.age),
        overall_rating: parseInt(formData.overallRating),
        potential: parseInt(formData.potential),
        best_overall: parseInt(formData.bestOverall),
        wage: parseInt(formData.wage),
        release_clause: parseInt(formData.releaseClause),
        years_since_joined: parseInt(formData.yearsSinceJoined),
        growth: parseInt(formData.growth),
        att_position: formData.attPosition,
        reactions: parseInt(formData.reactions),
        total_defending: parseInt(formData.totalDefending),
        play_styles: formData.playStyles,
        composure: parseInt(formData.composure),
        weight: parseInt(formData.weight)
      };

      console.log("Sending request with data:", requestData);

      // Mock API response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock prediction result
      setPrediction({
        potential: Math.round(parseInt(formData.potential) * 1.1),
        growth: Math.round(parseInt(formData.growth) * 1.2),
        value: Math.round(parseInt(formData.releaseClause) * 0.9)
      });
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="player-attributes-page"
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
          <motion.h1 
            className="section-title"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Market <span>Value</span> Prediction
          </motion.h1>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Analyze player attributes to predict market value
          </motion.p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="player-form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="form-grid">
            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="name">Player Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="teamName">Team Name</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="position">Position</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">Select position</option>
                {positions.map((pos, index) => (
                  <option key={index} value={pos}>{pos}</option>
                ))}
              </select>
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="16"
                max="45"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="overallRating">Overall Rating *</label>
              <input
                type="number"
                id="overallRating"
                name="overallRating"
                value={formData.overallRating}
                onChange={handleChange}
                min="0"
                max="100"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="potential">Potential *</label>
              <input
                type="number"
                id="potential"
                name="potential"
                value={formData.potential}
                onChange={handleChange}
                min="0"
                max="100"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="bestOverall">Best Overall</label>
              <input
                type="number"
                id="bestOverall"
                name="bestOverall"
                value={formData.bestOverall}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="releaseClause">Release Clause (€)</label>
              <input
                type="number"
                id="releaseClause"
                name="releaseClause"
                value={formData.releaseClause}
                onChange={handleChange}
                min="0"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="wage">Wage (€/week)</label>
              <input
                type="number"
                id="wage"
                name="wage"
                value={formData.wage}
                onChange={handleChange}
                min="0"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="yearsSinceJoined">Years Since Joined</label>
              <input
                type="number"
                id="yearsSinceJoined"
                name="yearsSinceJoined"
                value={formData.yearsSinceJoined}
                onChange={handleChange}
                min="0"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="teamContract">Team & Contract</label>
              <input
                type="text"
                id="teamContract"
                name="teamContract"
                value={formData.teamContract}
                onChange={handleChange}
                placeholder="e.g. Real Madrid (2025)"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="growth">Growth</label>
              <input
                type="number"
                id="growth"
                name="growth"
                value={formData.growth}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="attPosition">Attacking Position</label>
              <input
                type="number"
                id="attPosition"
                name="attPosition"
                value={formData.attPosition}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="reactions">Reactions</label>
              <input
                type="number"
                id="reactions"
                name="reactions"
                value={formData.reactions}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="totalDefending">Total Defending</label>
              <input
                type="number"
                id="totalDefending"
                name="totalDefending"
                value={formData.totalDefending}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="playStyles">Play Style</label>
              <select
                id="playStyles"
                name="playStyles"
                value={formData.playStyles}
                onChange={handleChange}
              >
                <option value="">Select play style</option>
                {playStyles.map((style, index) => (
                  <option key={index} value={style}>{style}</option>
                ))}
              </select>
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="composure">Composure</label>
              <input
                type="number"
                id="composure"
                name="composure"
                value={formData.composure}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="40"
                max="120"
              />
            </motion.div>
          </div>

          <motion.button 
            type="submit" 
            className="submit-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <span>Analyze Player</span>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Results Section */}
        {isLoading && (
          <motion.div 
            className="result-section loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="loading-spinner"></div>
            <p>Analyzing player attributes...</p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            className="result-section error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>Error</h3>
            <p>{error}</p>
            <button 
              className="retry-btn"
              onClick={() => setError(null)}
            >
              Try Again
            </button>
          </motion.div>
        )}

        {prediction && (
          <motion.div 
            className="result-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Analysis Results</h3>
            <div className="result-card">
              {formData.name && (
                <div className="result-item">
                  <span className="result-label">Player:</span>
                  <span className="result-value">{formData.name}</span>
                </div>
              )}
              {formData.teamName && (
                <div className="result-item">
                  <span className="result-label">Team:</span>
                  <span className="result-value">{formData.teamName}</span>
                </div>
              )}
              <div className="result-item highlight">
                <span className="result-label">Adjusted Potential:</span>
                <span className="result-value">
                  {prediction.potential}
                </span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">Projected Growth:</span>
                <span className="result-value">
                  {prediction.growth}%
                </span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">Estimated Market Value:</span>
                <span className="result-value">
                  €{prediction.value.toLocaleString()}
                </span>
              </div>
              <div className="result-item">
                <span className="result-label">Current Rating:</span>
                <span className="result-value">{formData.overallRating}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Base Potential:</span>
                <span className="result-value">{formData.potential}</span>
              </div>
            </div>
            
            <button 
              className="new-prediction-btn"
              onClick={() => {
                setPrediction(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Analyze Another Player
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}