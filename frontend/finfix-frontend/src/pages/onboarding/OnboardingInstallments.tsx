import { OnboardingStep } from "@/features/onboarding/model/types";
import { OnboardingFrame } from "@/widgets/onboarding";
import { Button } from "@/shared/ui";
import { useMemo, useEffect, useState } from "react";
import { InstallmentRow } from "@/features/onboarding/ui/InstallmentRow";

import { useAuth } from "@/app/providers/AuthProvider";
import { Installment } from "@/features/onboarding/model/types";

export const OnboardingInstallments = () => {
  const { user } = useAuth();
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Load existing installments on component mount
  useEffect(() => {
    const loadInstallments = async () => {
      if (user?.id) {
        try {
          //   const data = await fetchInstallments(user.id);
          // Transform backend data to frontend format
          //   const transformedInstallments: Installment[] = data.map(
          //     (inst: any) => ({
          //       id: inst.id || crypto.randomUUID(),
          //       description: inst.description || "",
          //       startDate: inst.startDate || "",
          //       totalAmount: inst.totalAmount || "",
          //       totalPayments: inst.totalPayments?.toString() || "",
          //     })
          //   );
          //   setInstallments(transformedInstallments);
        } catch (error) {
          console.error("Error loading installments:", error);
          setInstallments([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadInstallments();
  }, [user?.id]);

  const handleUpdate = (id: string, key: string, value: string) => {
    setInstallments((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, [key]: value } : inst))
    );
    setHasChanges(true);
  };

  const handleAdd = () => {
    setInstallments((prev) => [
      ...prev,
      {
        id: `temp-${crypto.randomUUID()}`,
        description: "",
        startDate: "",
        totalAmount: "",
        totalPayments: "",
      },
    ]);
    setHasChanges(true);
  };

  const handleRemove = async (id: string) => {
    const isExisting = !id.startsWith("temp-");

    if (isExisting && user?.id) {
      try {
        // await deleteInstallment(id);
      } catch (error) {
        console.error("Error deleting installment:", error);
      }
    }

    setInstallments((prev) => prev.filter((inst) => inst.id !== id));
    setHasChanges(true);
  };

  const widgetData = {
    title: "Installments",
    body: `Add your installment purchases (if any). You can skip this step.`,
    step: OnboardingStep.INSTALLMENTS,
  };

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
          {isLoading ? (
            <div className="text-center text-slate-300 py-8">
              Loading installments...
            </div>
          ) : (
            <>
              <div className="custom-scroll max-h-[50vh] md:max-h-72 overflow-y-auto pr-2 pb-">
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
                  <span className="ml-2 font-semibold">
                    {total.toFixed(2)} UAH
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </OnboardingFrame>
    </div>
  );
};
