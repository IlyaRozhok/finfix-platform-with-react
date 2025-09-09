
import { useState, useMemo } from "react";
import { ArrowLeft, Search } from "lucide-react";

import { useOnboardingStore } from "../../store/onboarding";
import {
  CURRENCIES,
  formatCurrencyWithFlag,
  POPULAR_CURRENCIES,
} from "../../consts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CurrencyStep() {
  const { prevStep, nextStep, updateData, data } = useOnboardingStore();
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    data.primaryCurrency || ""
  );
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    setError("");
    updateData({ primaryCurrency: value });
  };

  const handleContinue = () => {
    if (!selectedCurrency) {
      setError("Please select a currency to continue.");
      return;
    }

    nextStep();
  };

  const handleBack = () => {
    prevStep();
  };

  // Filter currencies based on search query
  const filteredCurrencies = useMemo(() => {
    if (!searchQuery.trim()) {
      return CURRENCIES;
    }

    const query = searchQuery.toLowerCase();
    return CURRENCIES.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query) ||
        currency.symbol.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Separate popular and other currencies from filtered results
  const popularCurrencies = filteredCurrencies.filter((c) =>
    POPULAR_CURRENCIES.includes(c.code)
  );
  const otherCurrencies = filteredCurrencies.filter(
    (c) => !POPULAR_CURRENCIES.includes(c.code)
  );

  // Get selected currency object for display
  const selectedCurrencyObj = CURRENCIES.find(
    (c) => c.code === selectedCurrency
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Choose your primary currency
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          This sets the default for balances, budgets, and reports.
        </p>
      </div>

      {/* Currency Selection */}
      <div className="space-y-3">
        <label htmlFor="currency-select" className="text-sm font-medium">
          Primary currency
        </label>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search currencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger
            className={`w-full ${error ? "border-destructive" : ""}`}
          >
            <SelectValue placeholder="Select a currency">
              {selectedCurrencyObj
                ? formatCurrencyWithFlag(selectedCurrencyObj)
                : "Select a currency"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {/* Popular currencies first */}
            {popularCurrencies.length > 0 && (
              <>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 bg-background">
                  Popular
                </div>
                {popularCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currency.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-xs text-muted-foreground">
                          {currency.name}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </>
            )}

            {/* Separator */}
            {popularCurrencies.length > 0 && otherCurrencies.length > 0 && (
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t mt-2 sticky top-0 bg-background">
                {searchQuery ? "Search Results" : "All currencies"}
              </div>
            )}

            {/* Other currencies */}
            {otherCurrencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currency.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{currency.code}</span>
                    <span className="text-xs text-muted-foreground">
                      {currency.name}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}

            {/* No results message */}
            {filteredCurrencies.length === 0 && searchQuery && (
              <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                No currencies found for "{searchQuery}"
              </div>
            )}
          </SelectContent>
        </Select>

        {/* Help text or error */}
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            You can change this anytime in Settings.
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 pt-4">
        <button onClick={handleContinue} className="w-full font-medium">
          Continue
        </button>
        <button onClick={handleBack} className="w-full font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
      </div>
    </div>
  );
}
