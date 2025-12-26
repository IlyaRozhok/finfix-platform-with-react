import { MonoAccount } from "../api";

interface AccountCardProps {
  account: MonoAccount;
  isSelected: boolean;
  onClick: () => void;
}

const CURRENCY_SYMBOLS: Record<number, string> = {
  980: "₴", // UAH
  840: "$", // USD
  978: "€", // EUR
};

const CURRENCY_NAMES: Record<number, string> = {
  980: "UAH",
  840: "USD",
  978: "EUR",
};

const formatAmount = (amount: number, currencyCode: number): string => {
  const symbol = CURRENCY_SYMBOLS[currencyCode] || "";
  const formatted = Math.abs(amount / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
};

export const AccountCard = ({
  account,
  isSelected,
  onClick,
}: AccountCardProps) => {
  const currencyName =
    CURRENCY_NAMES[account.currencyCode] || `Code ${account.currencyCode}`;

  return (
    <button
      onClick={onClick}
      className={`
                w-full text-left p-6 rounded-2xl border transition-all duration-200
                ${
                  isSelected
                    ? "bg-white/20 backdrop-blur-md border-white/40 shadow-xl"
                    : "bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 hover:border-white/30"
                }
            `}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">
              {account.type}
            </div>
            <div className="text-xs text-gray-500 mt-1">{currencyName}</div>
          </div>
          {account.maskedPan && account.maskedPan.length > 0 && (
            <div className="text-xs text-gray-400 font-mono">
              {account.maskedPan[0]}
            </div>
          )}
        </div>

        <div className="pt-2">
          <div className="text-2xl font-bold text-primary-background">
            {formatAmount(account.balance, account.currencyCode)}
          </div>
          {account.creditLimit > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              Credit limit:{" "}
              {formatAmount(account.creditLimit, account.currencyCode)}
            </div>
          )}
        </div>

        {account.iban && (
          <div className="text-xs text-gray-500 font-mono truncate">
            {account.iban}
          </div>
        )}
      </div>
    </button>
  );
};
