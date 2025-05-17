// PostInjury.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import "./PostInjury.css";

export function PostInjury() {
  const [formData, setFormData] = useState({
    name: "",
    teamName: "",
    age: "",
    fifaRating: "",
    injury: "",
    missedMatches: "",
    match1Rating: "",
    match2Rating: "",
    match3Rating: "",
    totalBeforeInjuryGD: "",
    match1Result: "Win",
    match2Result: "Win"
  });

  const [prediction, setPrediction] = useState<{
    performance: string;
    improvement: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const injuryTypes = [
    "Knee injury", "Hamstring strain", "Shoulder injury",
    "Groin injury", "Calf injury", "Ankle injury",
    "Cruciate ligament tear", "Groin problems", "Hip injury",
    "Hand injury", "Hamstring injury", "Bruised ribs", "Knock",
    "Muscle injury", "Muscle fatigue", "Foot injury", "Virus",
    "Coronavirus", "Inner ligament injury", "Knee problems", "Ill",
    "Calf problems", "Ill & knock", "Metatarsal fracture",
    "Concussion", "Outer ligament problems", "Thigh problems",
    "Unknown injury", "Groin surgery", "Achilles tendon problems"
  ];

  const matchResults = ["Win", "Draw", "Loss"];

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
      const requiredFields = [
        'fifaRating', 'injury', 'age', 'missedMatches',
        'match1Rating', 'match2Rating', 'match3Rating',
        'totalBeforeInjuryGD'
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Prepare request data
      const requestData = {
        Match3_before_injury_Player_rating: parseFloat(formData.match3Rating),
        Match2_before_injury_Player_rating: parseFloat(formData.match2Rating),
        Match1_before_injury_Player_rating: parseFloat(formData.match1Rating),
        Total_Before_Injury_GD: parseFloat(formData.totalBeforeInjuryGD),
        Match1_before_injury_Result: formData.match1Result,
        Injury: formData.injury,
        Match2_before_injury_Result: formData.match2Result,
        Age: parseFloat(formData.age),
        Missed_Matches: parseFloat(formData.missedMatches),
        FIFA_rating: parseFloat(formData.fifaRating)
      };

      const response = await fetch('http://localhost:5002/predict-post-injury', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Prediction failed');
      }

      setPrediction({
        performance: result.predicted_performance,
        improvement: result.improvement
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="post-injury-page"
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
          <h1 className="section-title">
            Post-Injury <span>Performance</span> Prediction
          </h1>
          <p className="section-subtitle">
            Predict player performance after injury based on pre-injury statistics
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="post-injury-form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="form-grid">
            {/* Player Information */}
            <div className="form-group">
              <label htmlFor="name">Player Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Lionel Messi"
              />
            </div>

            <div className="form-group">
              <label htmlFor="teamName">Team Name</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="e.g. Paris Saint-Germain"
              />
            </div>

            <div className="form-group">
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
                placeholder="e.g. 34"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fifaRating">FIFA Rating *</label>
              <input
                type="number"
                id="fifaRating"
                name="fifaRating"
                value={formData.fifaRating}
                onChange={handleChange}
                min="0"
                max="100"
                required
                placeholder="e.g. 93"
              />
            </div>

            {/* Injury Information */}
            <div className="form-group">
              <label htmlFor="injury">Injury Type *</label>
              <select
                id="injury"
                name="injury"
                value={formData.injury}
                onChange={handleChange}
                required
              >
                <option value="">Select an injury type</option>
                {injuryTypes.map((injury, index) => (
                  <option key={index} value={injury}>{injury}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="missedMatches">Missed Matches *</label>
              <input
                type="number"
                id="missedMatches"
                name="missedMatches"
                value={formData.missedMatches}
                onChange={handleChange}
                min="0"
                max="50"
                required
                placeholder="e.g. 5"
              />
            </div>

            {/* Pre-Injury Performance */}
            <div className="form-group">
              <label htmlFor="match1Rating">Match 1 Rating *</label>
              <input
                type="number"
                id="match1Rating"
                name="match1Rating"
                value={formData.match1Rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                required
                placeholder="e.g. 7.5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="match1Result">Match 1 Result *</label>
              <select
                id="match1Result"
                name="match1Result"
                value={formData.match1Result}
                onChange={handleChange}
                required
              >
                {matchResults.map((result, index) => (
                  <option key={index} value={result}>{result}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="match2Rating">Match 2 Rating *</label>
              <input
                type="number"
                id="match2Rating"
                name="match2Rating"
                value={formData.match2Rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                required
                placeholder="e.g. 8.2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="match2Result">Match 2 Result *</label>
              <select
                id="match2Result"
                name="match2Result"
                value={formData.match2Result}
                onChange={handleChange}
                required
              >
                {matchResults.map((result, index) => (
                  <option key={index} value={result}>{result}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="match3Rating">Match 3 Rating *</label>
              <input
                type="number"
                id="match3Rating"
                name="match3Rating"
                value={formData.match3Rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                required
                placeholder="e.g. 6.8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalBeforeInjuryGD">Total GD Before Injury *</label>
              <input
                type="number"
                id="totalBeforeInjuryGD"
                name="totalBeforeInjuryGD"
                value={formData.totalBeforeInjuryGD}
                onChange={handleChange}
                step="0.1"
                required
                placeholder="e.g. 2.5"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Predict Performance'
            )}
          </button>
        </motion.form>

        {/* Results Section */}
        {isLoading && (
          <div className="result-section loading">
            <div className="spinner"></div>
            <p>Analyzing performance data...</p>
          </div>
        )}

        {error && (
          <div className="result-section error">
            <h3>Error</h3>
            <p>{error}</p>
            <button 
              className="retry-btn"
              onClick={() => setError(null)}
            >
              Try Again
            </button>
          </div>
        )}

        {prediction && (
          <motion.div 
            className="result-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Prediction Result</h3>
            <div className={`result-card ${prediction.improvement ? 'improved' : 'declined'}`}>
              {formData.name && (
                <div className="result-item">
                  <span>Player:</span>
                  <span>{formData.name}</span>
                </div>
              )}
              {formData.teamName && (
                <div className="result-item">
                  <span>Team:</span>
                  <span>{formData.teamName}</span>
                </div>
              )}
              <div className="result-item">
                <span>Injury:</span>
                <span>{formData.injury}</span>
              </div>
              <div className="result-item">
                <span>Missed Matches:</span>
                <span>{formData.missedMatches}</span>
              </div>
              <div className="result-item highlight">
                <span>Predicted Performance:</span>
                <span>{prediction.performance}</span>
              </div>
              <div className="result-item highlight">
                <span>Trend:</span>
                <span className={prediction.improvement ? 'improvement' : 'decline'}>
                  {prediction.improvement ? 'Improvement Expected' : 'Decline Expected'}
                  {prediction.improvement ? (
                    <span className="trend-icon">↑</span>
                  ) : (
                    <span className="trend-icon">↓</span>
                  )}
                </span>
              </div>
            </div>
            <button 
              className="new-prediction-btn"
              onClick={() => {
                setPrediction(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              New Prediction
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}