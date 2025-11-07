import { OnboardingStep, Installment } from "@/features/onboarding/model/types";
import { OnboardingFrame } from "@/widgets/onboarding";
import { Button } from "@/shared/ui";
import { useMemo, useEffect } from "react";
import { InstallmentRow } from "@/features/onboarding/ui/InstallmentRow";
import { useOnboarding } from "@/features/onboarding/model/store";
import { fetchInstallments } from "@/features/onboarding/api";
import { useAuth } from "@/app/providers/AuthProvider";

export const OnboardingInstallments = () => {
  const {
    data,
    addInstallment,
    updateInstallment,
    removeInstallment,
    setInstallments,
  } = useOnboarding();
  const { user } = useAuth();

  useEffect(() => {
    const loadInstallments = async () => {
      const currentInstallments = data.installments || [];
      if (user?.id && currentInstallments.length === 0) {
        try {
          const backendInstallments = await fetchInstallments(user.id);
          if (backendInstallments && backendInstallments.length > 0) {
            const transformedInstallments: Installment[] =
              backendInstallments.map(
                (inst: {
                  id: string;
                  description: string;
                  startDate: string;
                  totalAmount: number;
                  totalPayments: number;
                }) => ({
                  id: inst.id,
                  description: inst.description || "",
                  startDate: inst.startDate,
                  totalAmount: String(inst.totalAmount),
                  totalPayments: String(inst.totalPayments),
                })
              );
            setInstallments(transformedInstallments);
          }
        } catch (error) {
          console.error("Failed to fetch installments:", error);
        }
      }
    };

    loadInstallments();
  }, [user?.id, data.installments, setInstallments]);

  const handleUpdate = (id: string, key: string, value: string) => {
    updateInstallment(id, key as keyof Installment, value);
  };

  const handleAdd = () => {
    addInstallment();
  };

  const handleRemove = (id: string) => {
    removeInstallment(id);
  };

  const widgetData = {
    title: "Installments",
    body: `Add your installment purchases (if any). You can skip this step.`,
    step: OnboardingStep.INSTALLMENTS,
  };

  const installments = useMemo(
    () => data.installments || [],
    [data.installments]
  );
  const total = useMemo(() => {
    return installments.reduce(
      (sum, inst) => sum + (Number(inst.totalAmount) || 0),
      0
    );
  }, [installments]);

  return (
    <div className="flex justify-center item-center">
      <OnboardingFrame {...widgetData}>
        <div className="mt-4 space-y-3">
          <div className="custom-scroll max-h-[50vh] md:max-h-72 overflow-y-auto pr-2 pb-4 space-y-3">
            {installments.map((inst) => (
              <InstallmentRow
                key={inst.id}
                row={inst}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-1">
            <Button
              variant="ghost"
              onClick={handleAdd}
              className="w-full sm:w-auto"
            >
              + Add installment
            </Button>
            <div className="text-sm text-slate-300 text-right">
              Total estimation:
              <span className="ml-2 font-semibold">{total.toFixed(2)} UAH</span>
            </div>
          </div>
        </div>
      </OnboardingFrame>
    </div>
  );
};
