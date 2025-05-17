import { useState } from "react";
import { motion } from "framer-motion";
import "./BestPosition.css";

export function BestPosition() {
  const [formData, setFormData] = useState({
    Att_position: "",
    Total_defending: "",
    Finishing: "",
    Sliding_tackle: "",
    Standing_tackle: "",
    Defensive_awareness: "",
    Crossing: "",
    Interceptions: "",
    Dribbling: "",
    Long_shots: "",
    Defending_Pace: "",
    Total_skill: "",
    Total_attacking: "",
    Volleys: "",
    Curve: "",
    Total_movement: "",
    Penalties: "",
    Heading_accuracy: "",
    Skill_moves: "",
    Acceleration: ""
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const positionFullNames: Record<string, string> = {
    'GK': 'Goalkeeper',
    'CB': 'Center Back',
    'LB': 'Left Back', 
    'RB': 'Right Back',
    'LWB': 'Left Wing Back',
    'RWB': 'Right Wing Back',
    'CDM': 'Defensive Midfielder',
    'CM': 'Central Midfielder',
    'CAM': 'Attacking Midfielder',
    'LM': 'Left Midfielder',
    'RM': 'Right Midfielder',
    'LW': 'Left Winger',
    'RW': 'Right Winger',
    'CF': 'Center Forward',
    'ST': 'Striker'
  };

  const positionDescriptions: Record<string, string> = {
    'GK': 'Specializes in preventing goals with exceptional reflexes and positioning',
    'CB': 'Strong defensive players who excel in aerial duels and tackles',
    'LB': 'Defenders who support both defense and attack on the left flank',
    'RB': 'Defenders who support both defense and attack on the right flank',
    'LWB': 'Offensive-minded left defenders in systems with three center backs',
    'RWB': 'Offensive-minded right defenders in systems with three center backs',
    'CDM': 'Defensive specialists who protect the backline and distribute play',
    'CM': 'Box-to-box players who contribute to both defense and attack',
    'CAM': 'Creative playmakers who operate between midfield and attack',
    'LM': 'Wide midfielders who provide crosses and support on the left',
    'RM': 'Wide midfielders who provide crosses and support on the right',
    'LW': 'Attacking players who cut inside from the left wing',
    'RW': 'Attacking players who cut inside from the right wing',
    'CF': 'Versatile forwards who can both score and create chances',
    'ST': 'Pure goalscorers who lead the attacking line'
  };

  const positionKeyAttributes: Record<string, string[]> = {
    'GK': ['Reflexes', 'Positioning', 'Handling', 'Jumping', 'Kicking'],
    'CB': ['Strength', 'Heading', 'Tackling', 'Positioning', 'Aggression'],
    'LB': ['Stamina', 'Crossing', 'Tackling', 'Pace', 'Positioning'],
    'RB': ['Stamina', 'Crossing', 'Tackling', 'Pace', 'Positioning'],
    'LWB': ['Stamina', 'Crossing', 'Dribbling', 'Pace', 'Positioning'],
    'RWB': ['Stamina', 'Crossing', 'Dribbling', 'Pace', 'Positioning'],
    'CDM': ['Tackling', 'Positioning', 'Passing', 'Strength', 'Vision'],
    'CM': ['Passing', 'Stamina', 'Shooting', 'Dribbling', 'Vision'],
    'CAM': ['Vision', 'Passing', 'Dribbling', 'Shooting', 'Creativity'],
    'LM': ['Crossing', 'Pace', 'Stamina', 'Dribbling', 'Positioning'],
    'RM': ['Crossing', 'Pace', 'Stamina', 'Dribbling', 'Positioning'],
    'LW': ['Dribbling', 'Pace', 'Finishing', 'Cut Inside', 'Creativity'],
    'RW': ['Dribbling', 'Pace', 'Finishing', 'Cut Inside', 'Creativity'],
    'CF': ['Finishing', 'Positioning', 'Strength', 'Passing', 'Vision'],
    'ST': ['Finishing', 'Positioning', 'Heading', 'Strength', 'Composure']
  };

  const positionExamples: Record<string, string[]> = {
    'GK': ['Manuel Neuer', 'Thibaut Courtois', 'Alisson Becker'],
    'CB': ['Virgil van Dijk', 'Sergio Ramos', 'Rúben Dias'],
    'LB': ['Andrew Robertson', 'Jordi Alba', 'Theo Hernández'],
    'RB': ['Trent Alexander-Arnold', 'Kyle Walker', 'Achraf Hakimi'],
    'LWB': ['Alphonso Davies', 'Marcos Alonso', 'Ben Chilwell'],
    'RWB': ['Reece James', 'Juan Cuadrado', 'Jesús Navas'],
    'CDM': ['N\'Golo Kanté', 'Casemiro', 'Joshua Kimmich'],
    'CM': ['Kevin De Bruyne', 'Luka Modrić', 'Frenkie de Jong'],
    'CAM': ['Bruno Fernandes', 'Thomas Müller', 'Martin Ødegaard'],
    'LM': ['Raheem Sterling', 'Leroy Sané', 'Jack Grealish'],
    'RM': ['Mohamed Salah', 'Riyad Mahrez', 'Federico Chiesa'],
    'LW': ['Neymar', 'Sadio Mané', 'Vinicius Junior'],
    'RW': ['Lionel Messi', 'Jadon Sancho', 'Bukayo Saka'],
    'CF': ['Karim Benzema', 'Roberto Firmino', 'João Félix'],
    'ST': ['Robert Lewandowski', 'Erling Haaland', 'Harry Kane']
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const missingFields = Object.keys(formData).filter(
        key => !formData[key as keyof typeof formData]
      );
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill all fields: ${missingFields.join(', ')}`);
      }

      const requestData = {
        Att_position: parseFloat(formData.Att_position),
        Total_defending: parseFloat(formData.Total_defending),
        Finishing: parseFloat(formData.Finishing),
        Sliding_tackle: parseFloat(formData.Sliding_tackle),
        Standing_tackle: parseFloat(formData.Standing_tackle),
        Defensive_awareness: parseFloat(formData.Defensive_awareness),
        Crossing: parseFloat(formData.Crossing),
        Interceptions: parseFloat(formData.Interceptions),
        Dribbling: parseFloat(formData.Dribbling),
        Long_shots: parseFloat(formData.Long_shots),
        Defending_Pace: parseFloat(formData.Defending_Pace),
        Total_skill: parseFloat(formData.Total_skill),
        Total_attacking: parseFloat(formData.Total_attacking),
        Volleys: parseFloat(formData.Volleys),
        Curve: parseFloat(formData.Curve),
        Total_movement: parseFloat(formData.Total_movement),
        Penalties: parseFloat(formData.Penalties),
        Heading_accuracy: parseFloat(formData.Heading_accuracy),
        Skill_moves: parseFloat(formData.Skill_moves),
        Acceleration: parseFloat(formData.Acceleration)
      };

      const response = await fetch('http://localhost:5001/predict-best-position', {
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

      setPrediction(result.predicted_position);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="best-position-page"
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
          <div className="title-container">
            <h1 className="section-title">
              <span className="title-gradient">Optimal Position</span> Predictor
            </h1>
            <div className="title-underline"></div>
          </div>
          <p className="section-subtitle">
            Enter player attributes to discover their ideal position on the pitch
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          className="best-position-form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="form-header">
            <h2>Player Attributes</h2>
            <p>Rate each attribute from 0-100 (Skill Moves: 1-5)</p>
          </div>

          <div className="form-grid">
            {/* Attack Attributes Section */}
            <div className="form-section">
              <h3 className="form-section-title">Attacking Skills</h3>
              
              <div className="form-group">
                <label htmlFor="Att_position">Attacking Position</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Att_position"
                    name="Att_position"
                    value={formData.Att_position}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Att_position || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Finishing">Finishing</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Finishing"
                    name="Finishing"
                    value={formData.Finishing}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Finishing || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Crossing">Crossing</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Crossing"
                    name="Crossing"
                    value={formData.Crossing}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Crossing || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Dribbling">Dribbling</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Dribbling"
                    name="Dribbling"
                    value={formData.Dribbling}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Dribbling || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Long_shots">Long Shots</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Long_shots"
                    name="Long_shots"
                    value={formData.Long_shots}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Long_shots || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Volleys">Volleys</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Volleys"
                    name="Volleys"
                    value={formData.Volleys}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Volleys || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Penalties">Penalties</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Penalties"
                    name="Penalties"
                    value={formData.Penalties}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Penalties || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Heading_accuracy">Heading Accuracy</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Heading_accuracy"
                    name="Heading_accuracy"
                    value={formData.Heading_accuracy}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Heading_accuracy || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Total_attacking">Total Attacking</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Total_attacking"
                    name="Total_attacking"
                    value={formData.Total_attacking}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Total_attacking || '0'}</span>
                </div>
              </div>
            </div>

            {/* Defense Attributes Section */}
            <div className="form-section">
              <h3 className="form-section-title">Defensive Skills</h3>
              
              <div className="form-group">
                <label htmlFor="Total_defending">Total Defending</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Total_defending"
                    name="Total_defending"
                    value={formData.Total_defending}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Total_defending || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Sliding_tackle">Sliding Tackle</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Sliding_tackle"
                    name="Sliding_tackle"
                    value={formData.Sliding_tackle}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Sliding_tackle || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Standing_tackle">Standing Tackle</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Standing_tackle"
                    name="Standing_tackle"
                    value={formData.Standing_tackle}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Standing_tackle || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Defensive_awareness">Defensive Awareness</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Defensive_awareness"
                    name="Defensive_awareness"
                    value={formData.Defensive_awareness}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Defensive_awareness || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Interceptions">Interceptions</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Interceptions"
                    name="Interceptions"
                    value={formData.Interceptions}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Interceptions || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Defending_Pace">Defending Pace</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Defending_Pace"
                    name="Defending_Pace"
                    value={formData.Defending_Pace}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Defending_Pace || '0'}</span>
                </div>
              </div>
            </div>

            {/* Physical & Technical Attributes Section */}
            <div className="form-section">
              <h3 className="form-section-title">Physical & Technical</h3>
              
              <div className="form-group">
                <label htmlFor="Total_skill">Total Skill</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Total_skill"
                    name="Total_skill"
                    value={formData.Total_skill}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Total_skill || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Curve">Curve</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Curve"
                    name="Curve"
                    value={formData.Curve}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Curve || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Total_movement">Total Movement</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Total_movement"
                    name="Total_movement"
                    value={formData.Total_movement}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Total_movement || '0'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Skill_moves">Skill Moves (1-5)</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Skill_moves"
                    name="Skill_moves"
                    value={formData.Skill_moves}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    step="1"
                    required
                  />
                  <span className="value-display">{formData.Skill_moves || '1'}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Acceleration">Acceleration</label>
                <div className="input-container">
                  <input
                    type="range"
                    id="Acceleration"
                    name="Acceleration"
                    value={formData.Acceleration}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="value-display">{formData.Acceleration || '0'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                'Predict Optimal Position'
              )}
            </button>
          </div>
        </motion.form>

        {/* Results Section */}
        {isLoading && (
          <div className="result-section loading">
            <div className="loading-content">
              <div className="loading-spinner">
                <div className="football-loader"></div>
              </div>
              <h3>Analyzing Player Attributes</h3>
              <p>Calculating the optimal position based on your inputs...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="result-section error">
            <div className="error-icon">⚠️</div>
            <h3>Prediction Error</h3>
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
            className="result-section success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="result-header">
              <div className="position-badge">
                {prediction}
              </div>
              <h3>Optimal Position</h3>
              <h2>{positionFullNames[prediction] || prediction}</h2>
            </div>

            <div className="result-content">
              <div className="position-description">
                <p>{positionDescriptions[prediction] || 'This position is ideal for the player based on their attributes.'}</p>
              </div>

              <div className="position-details">
                <div className="detail-card">
                  <h4>Key Attributes</h4>
                  <ul>
                    {positionKeyAttributes[prediction]?.map((attr, index) => (
                      <li key={index}>{attr}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h4>Similar Players</h4>
                  <ul>
                    {positionExamples[prediction]?.map((player, index) => (
                      <li key={index}>{player}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="result-footer">
              <button 
                className="new-prediction-btn"
                onClick={() => {
                  setPrediction(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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