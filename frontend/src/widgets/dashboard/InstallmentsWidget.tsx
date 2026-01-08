import React from "react";
import { Installment } from "@/features/dashboard/model/types";

interface InstallmentsWidgetProps {
  installments: Installment[];
}

export function InstallmentsWidget({ installments }: InstallmentsWidgetProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-white/10 shadow-lg">
      <h3 className="text-base sm:text-lg font-semibold text-primary-background mb-3 sm:mb-4">Installments</h3>
      <div className="space-y-2 sm:space-y-3">
        {installments.length === 0 ? (
          <p className="text-disable text-xs sm:text-sm">No installments found</p>
        ) : (
          installments.slice(0, 5).map((installment) => (
            <div key={installment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-primary-background text-sm sm:text-base truncate">{installment.description}</p>
                <p className="text-xs sm:text-sm text-disable">
                  {installment.monthlyPayment} / month • {installment.totalPayments} payments
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-semibold text-primary-background text-sm sm:text-base">
                  {installment.totalAmount.toLocaleString()}
                </p>
                <p className="text-xs text-disable/80">
                  {new Date(installment.startDate).toLocaleDateString()} - {new Date(installment.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {installments.length > 5 && (
        <p className="text-xs sm:text-sm text-disable mt-2 sm:mt-3 text-center">
          And {installments.length - 5} more...
        </p>
      )}
    </div>
  );
}

