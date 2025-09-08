import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function LoginPage() {
  // маленький локальный стейт — показать индикатор «Redirecting…»
  const [redirecting, setRedirecting] = useState(false);

  const startGoogle = () => {
    setRedirecting(true);
    // самый простой вариант: отдать управление бэку
    // у тебя в Nest обычно есть GET /api/auth/google (redirect -> Google)
    // сюда лучше сходить абсолютным URL, а не через прокси
    const url = `${API_BASE}/api/auth/google`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      {/* Карточка */}
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow">
        <div className="p-6 space-y-6">
          {/* Лого + заголовок */}
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-lg bg-black text-white grid place-items-center">
              <span className="text-sm font-semibold">FF</span>
            </div>
            <h1 className="text-xl font-semibold leading-tight">
              Sign in to FinFix
            </h1>
            <p className="text-sm text-gray-600">
              Track expenses, incomes and debts in one place.
            </p>
          </div>

          {/* Кнопка Google — показываю, как собирать кнопку из утилит */}
          <button
            type="button"
            onClick={startGoogle}
            disabled={redirecting}
            className="
              w-full inline-flex items-center justify-center gap-2
              rounded-lg border border-gray-300 bg-white
              px-4 py-2.5 text-sm font-medium text-gray-800
              shadow-sm
              hover:bg-gray-50
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-black
              disabled:opacity-60
            "
            aria-label="Continue with Google"
          >
            <GoogleIcon className="h-5 w-5" />
            {redirecting ? "Redirecting…" : "Continue with Google"}
          </button>

          {/* Дополнительный текст/ссылка */}
          <p className="text-xs text-gray-500">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

// Очень маленькая иконка Google SVG (без внешних файлов)
function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.8S8.9 5.7 12 5.7c1.8 0 3 .7 3.7 1.3l2.5-2.4C16.8 3.2 14.6 2.3 12 2.3 6.9 2.3 2.7 6.6 2.7 11.7S6.9 21 12 21c7 0 9.3-4.9 9.3-7.5 0-.5-.1-1-.2-1.3H12z"
      />
    </svg>
  );
}
