import React, { useState } from "react";

const App = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (height === "" || weight === "") {
      alert("Please enter both height and weight!");
      return;
    }

    const heightInMeters = height / 100; // convert cm to meters
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setMessage("You are underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setMessage("You have a normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setMessage("You are overweight");
    } else {
      setMessage("You are obese");
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>BMI Calculator</h2>

      <form onSubmit={calculateBMI}>
        <div>
          <label>Height (cm): </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Weight (kg): </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <button type="submit">Calculate BMI</button>
          <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
            Reset
          </button>
        </div>
      </form>

      {bmi && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your BMI: {bmi}</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default App;

/*

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '=== Cloning BMI React project ==='
                git branch: 'main', url: 'https://github.com/Immanuelj15/bmi.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '=== Installing npm dependencies ==='
                bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
            }
        }

        stage('Build') {
            steps {
                echo '=== Building React project ==='
                bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
            }
        }
    }

    post {
        success {
            echo "✅ BMI React project built successfully!"
        }
        failure {
            echo "❌ Build failed! Check the Jenkins console for errors."
        }
    }
}  */
