"use client"
import React, { useState } from "react";

const Progress = () => {
  const [step, setStep] = useState(1); // current step (1-3)

  const steps = [1, 2, 3];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Progress Circle */}
      <div className="relative w-40 h-40">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>

        {/* Progress arc (use conic-gradient for progress) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(#3b82f6 ${step * 120}deg, #e5e7eb 0deg)`,
          }}
        ></div>

        {/* Inner circle */}
        <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-gray-700">
            Step {step}
          </span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex gap-6 mt-6">
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold 
              ${s <= step ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Progress;
