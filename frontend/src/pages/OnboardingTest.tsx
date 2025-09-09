import { useState } from "react";

export default function OnboardingTest() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-4xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Onboarding Test - Step {step}
        </h1>
        <p className="text-gray-600 mb-6">
          This is a simple test to verify React 19 compatibility.
        </p>
        <button
          onClick={() => setStep(step + 1)}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
