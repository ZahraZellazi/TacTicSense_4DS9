import { useState } from "react";
import { motion } from "framer-motion";
import "./InjuryDuration.css";

export function InjuryDuration() {
  const [formData, setFormData] = useState({
    name: "",
    teamName: "",
    position: "",
    age: "",
    season: "",
    fifaRating: "",
    injury: "",
    severityLevel: "Moderate",
    dateOfInjury: "",
    averageBeforeInjuryRating: "",
  });

  const [prediction, setPrediction] = useState<{
    duration: number;
    confidence: number;
    returnDate: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateReturnDate = (injuryDate: string, durationDays: number) => {
    const date = new Date(injuryDate);
    date.setDate(date.getDate() + durationDays);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Validation des champs obligatoires
      if (!formData.fifaRating || !formData.injury || !formData.dateOfInjury || 
          !formData.season || !formData.averageBeforeInjuryRating) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      // Préparation des données pour l'API
      const requestData = {
        fifa_rating: parseFloat(formData.fifaRating),
        injury: formData.injury,
        severity_level: formData.severityLevel,
        date_of_injury: formData.dateOfInjury,
        season: formData.season,
        average_before_injury_rating: parseFloat(formData.averageBeforeInjuryRating)
      };

      console.log("Envoi de la requête avec les données:", requestData);

      const response = await fetch('http://localhost:5002/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Erreur HTTP: ${response.status}`);
      }
      

      const result = await response.json();

      if (result.status === 'error') {
        throw new Error(result.message || 'Erreur de prédiction');
      }

      console.log("Résultat reçu:", result);
      const durationDays = Math.round(result.predicted_duration);
      
      setPrediction({
        duration: durationDays,
        confidence: result.confidence || 0.9,
        returnDate: calculateReturnDate(formData.dateOfInjury, durationDays)
      });
    } catch (err) {
      console.error("Erreur lors de la prédiction:", err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="injury-duration-page"
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
            Injury <span>Duration</span> Prediction
          </motion.h1>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Predict recovery timelines for injured players based on injury type and player history
          </motion.p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="injury-form"
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
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="16"
                max="45"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="season">Season *</label>
              <input
                type="text"
                id="season"
                name="season"
                value={formData.season}
                onChange={handleChange}
                placeholder="e.g. 2022-2023"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="severityLevel">Severity Level *</label>
              <select
                id="severityLevel"
                name="severityLevel"
                value={formData.severityLevel}
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="dateOfInjury">Date of Injury *</label>
              <input
                type="date"
                id="dateOfInjury"
                name="dateOfInjury"
                value={formData.dateOfInjury}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="averageBeforeInjuryRating">Average Before Injury Rating *</label>
              <input
                type="number"
                id="averageBeforeInjuryRating"
                name="averageBeforeInjuryRating"
                value={formData.averageBeforeInjuryRating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                required
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
              <span>Processing...</span>
            ) : (
              <>
                <span>Predict Injury Duration</span>
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
            <p>Analyzing injury data...</p>
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
            <h3>Prediction Result</h3>
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
              <div className="result-item">
                <span className="result-label">Injury:</span>
                <span className="result-value">{formData.injury}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Severity:</span>
                <span className="result-value">{formData.severityLevel}</span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">Recovery Duration:</span>
                <span className="result-value">
                  {prediction.duration} days
                </span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">Estimated Return Date:</span>
                <span className="result-value">
                  {prediction.returnDate}
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
              Make New Prediction
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}