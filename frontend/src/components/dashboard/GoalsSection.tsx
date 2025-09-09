import { Target, Calendar, CheckCircle } from "lucide-react";

interface GoalsSectionProps {
  data: any;
  showSensitiveData: boolean;
  formatCurrency: (amount: number) => string;
}

export default function GoalsSection({
  showSensitiveData,
  formatCurrency,
}: GoalsSectionProps) {
  const goals = [
    {
      id: 1,
      title: "Emergency Fund",
      target: 10000,
      current: 8500,
      deadline: "2024-12-31",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Vacation Fund",
      target: 3000,
      current: 1200,
      deadline: "2024-06-15",
      priority: "medium",
      status: "in-progress",
    },
    {
      id: 3,
      title: "New Car Down Payment",
      target: 8000,
      current: 0,
      deadline: "2025-03-01",
      priority: "low",
      status: "not-started",
    },
    {
      id: 4,
      title: "Credit Card Payoff",
      target: 5000,
      current: 5000,
      deadline: "2024-04-01",
      priority: "high",
      status: "completed",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "not-started":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Goals Overview */}
      <div className="rounded-lg border bg-white shadow-sm p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Financial Goals</span>
          </h3>
          <p className="text-sm text-gray-600">
            Track your progress towards financial milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">1</div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">$21,000</div>
            <div className="text-sm text-gray-600">Total Target</div>
          </div>
        </div>
      </div>

      {/* Individual Goals */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const isCompleted = goal.status === "completed";

          return (
            <div
              key={goal.id}
              className="rounded-lg border bg-white shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold">{goal.title}</h4>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        goal.priority
                      )}`}
                    >
                      {goal.priority.charAt(0).toUpperCase() +
                        goal.priority.slice(1)}{" "}
                      Priority
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        goal.status
                      )}`}
                    >
                      {goal.status
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {showSensitiveData ? formatCurrency(goal.current) : "••••"}
                  </div>
                  <div className="text-sm text-gray-500">
                    of{" "}
                    {showSensitiveData ? formatCurrency(goal.target) : "••••"}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      isCompleted ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Goal Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Target Amount:</span>
                  <div className="font-medium">
                    {showSensitiveData ? formatCurrency(goal.target) : "••••"}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Remaining:</span>
                  <div className="font-medium">
                    {showSensitiveData
                      ? formatCurrency(goal.target - goal.current)
                      : "••••"}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Deadline:</span>
                  <div className="font-medium flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!isCompleted && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                      Add Contribution
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
                      Edit Goal
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create New Goal */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Create New Goal
        </h3>
        <p className="text-gray-600 mb-4">
          Set a new financial target to work towards
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
          Add Goal
        </button>
      </div>
    </div>
  );
}
