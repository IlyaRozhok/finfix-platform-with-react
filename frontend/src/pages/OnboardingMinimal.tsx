import { useState } from "react";

export default function OnboardingMinimal() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "currency">(
    "welcome"
  );
  const [currency, setCurrency] = useState<string>("");
  const [error, setError] = useState<string>("");

  const progress = currentStep === "welcome" ? 0 : 33;

  const handleNext = () => {
    if (currentStep === "welcome") {
      setCurrentStep("currency");
    } else if (currentStep === "currency") {
      if (!currency) {
        setError("Please select a currency to continue.");
        return;
      }
      console.log("Onboarding completed with currency:", currency);
      alert(`Onboarding completed! Selected currency: ${currency}`);
    }
  };

  const handleBack = () => {
    if (currentStep === "currency") {
      setCurrentStep("welcome");
    }
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setError("");
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "calc(100vh - 4rem)",
    backgroundColor: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "32rem",
    backgroundColor: "white",
    borderRadius: "2rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
  };

  const progressBarStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#e2e8f0",
    borderRadius: "9999px",
    height: "0.5rem",
  };

  const progressFillStyle: React.CSSProperties = {
    backgroundColor: "#0f172a",
    height: "0.5rem",
    borderRadius: "9999px",
    transition: "width 0.3s ease-in-out",
    width: `${progress}%`,
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "3rem",
    fontSize: "1rem",
    fontWeight: "500",
    backgroundColor: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#1e293b",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    height: "2.5rem",
    padding: "0.5rem 0.75rem",
    border: error ? "1px solid #ef4444" : "1px solid #d1d5db",
    borderRadius: "0.375rem",
    backgroundColor: "white",
    fontSize: "0.875rem",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* Progress Bar - Only show for steps after welcome */}
          {currentStep !== "welcome" && (
            <div style={{ padding: "1.5rem 2rem 1rem 2rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.875rem",
                    color: "#6b7280",
                  }}
                >
                  <span>Step 1 of 1</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div style={progressBarStyle}>
                  <div style={progressFillStyle}></div>
                </div>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {currentStep === "welcome" && (
              <div
                style={{
                  maxWidth: "28rem",
                  margin: "0 auto",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "1.875rem",
                      fontWeight: "bold",
                      color: "#111827",
                    }}
                  >
                    Welcome to FinFix
                  </h1>
                  <h2 style={{ fontSize: "1.25rem", color: "#6b7280" }}>
                    Let's set up your money in minutes.
                  </h2>
                  <p style={{ color: "#6b7280", lineHeight: "1.625" }}>
                    We'll ask a few quick questions to personalize your
                    dashboard. You can edit everything later.
                  </p>
                </div>
                <div style={{ paddingTop: "1rem" }}>
                  <button
                    onClick={handleNext}
                    onMouseEnter={(e) =>
                      Object.assign(e.currentTarget.style, buttonHoverStyle)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.currentTarget.style, buttonStyle)
                    }
                    style={buttonStyle}
                  >
                    Get started
                  </button>
                </div>
              </div>
            )}

            {currentStep === "currency" && (
              <div
                style={{ maxWidth: "28rem", margin: "0 auto", width: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    textAlign: "center",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "1.875rem",
                      fontWeight: "bold",
                      color: "#111827",
                    }}
                  >
                    Choose your primary currency
                  </h1>
                  <p style={{ color: "#6b7280", lineHeight: "1.625" }}>
                    This sets the default for balances, budgets, and reports.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      htmlFor="currency"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#374151",
                        display: "block",
                      }}
                    >
                      Primary currency
                    </label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      style={selectStyle}
                    >
                      <option value="">
                        Select a currency (e.g., UAH — Ukrainian Hryvnia)
                      </option>
                      <option value="USD">USD — US Dollar ($)</option>
                      <option value="EUR">EUR — Euro (€)</option>
                      <option value="UAH">UAH — Ukrainian Hryvnia (₴)</option>
                      <option value="GBP">GBP — British Pound (£)</option>
                      <option value="JPY">JPY — Japanese Yen (¥)</option>
                      <option value="CAD">CAD — Canadian Dollar (C$)</option>
                      <option value="AUD">AUD — Australian Dollar (A$)</option>
                      <option value="CHF">CHF — Swiss Franc (CHF)</option>
                      <option value="CNY">CNY — Chinese Yuan (¥)</option>
                      <option value="INR">INR — Indian Rupee (₹)</option>
                      <option value="BRL">BRL — Brazilian Real (R$)</option>
                      <option value="RUB">RUB — Russian Ruble (₽)</option>
                      <option value="KRW">KRW — South Korean Won (₩)</option>
                      <option value="MXN">MXN — Mexican Peso ($)</option>
                      <option value="SGD">SGD — Singapore Dollar (S$)</option>
                    </select>
                    {error && (
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#ef4444",
                          marginTop: "0.25rem",
                        }}
                      >
                        {error}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "1rem",
                  }}
                >
                  <button
                    onClick={handleBack}
                    style={{
                      padding: "0 2rem",
                      height: "3rem",
                      fontSize: "1rem",
                      fontWeight: "500",
                      border: "1px solid #d1d5db",
                      color: "#374151",
                      backgroundColor: "white",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    onMouseEnter={(e) =>
                      Object.assign(e.currentTarget.style, buttonHoverStyle)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.currentTarget.style, buttonStyle)
                    }
                    style={buttonStyle}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
