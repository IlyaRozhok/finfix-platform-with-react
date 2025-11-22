import React from "react";
import { Installment } from "@/features/dashboard/model/types";

interface InstallmentsWidgetProps {
  installments: Installment[];
}

export function InstallmentsWidget({ installments }: InstallmentsWidgetProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Installments</h3>
      <div className="space-y-3">
        {installments.length === 0 ? (
          <p className="text-white/70 text-sm">No installments found</p>
        ) : (
          installments.slice(0, 5).map((installment) => (
            <div key={installment.id} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="flex-1">
                <p className="font-medium text-white">{installment.description}</p>
                <p className="text-sm text-white/70">
                  {installment.monthlyPayment} / month • {installment.totalPayments} payments
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">
                  {parseFloat(installment.totalAmount).toLocaleString()}
                </p>
                <p className="text-xs text-white/60">
                  {new Date(installment.startDate).toLocaleDateString()} - {new Date(installment.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {installments.length > 5 && (
        <p className="text-sm text-white/70 mt-3 text-center">
          And {installments.length - 5} more...
        </p>
      )}
    </div>
  );
}

