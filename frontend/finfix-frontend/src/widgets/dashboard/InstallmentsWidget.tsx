import React from "react";
import { Installment } from "@/features/dashboard/model/types";

interface InstallmentsWidgetProps {
  installments: Installment[];
}

export function InstallmentsWidget({ installments }: InstallmentsWidgetProps) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Installments</h3>
      <div className="space-y-3">
        {installments.length === 0 ? (
          <p className="text-gray-500 text-sm">No installments found</p>
        ) : (
          installments.slice(0, 5).map((installment) => (
            <div key={installment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{installment.description}</p>
                <p className="text-sm text-gray-600">
                  {installment.monthlyPayment} / month • {installment.totalPayments} payments
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {parseFloat(installment.totalAmount).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(installment.startDate).toLocaleDateString()} - {new Date(installment.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {installments.length > 5 && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          And {installments.length - 5} more...
        </p>
      )}
    </div>
  );
}

