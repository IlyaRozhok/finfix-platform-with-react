import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Expense, ExpenseTransaction } from "@/features/dashboard/model/types";

interface ThreePieChartProps {
  expenses: Expense[];
  expenseTransactions?: ExpenseTransaction[];
}

// Subtle, muted colors for minimalist glassmorphism design
const COLORS = [
  "rgba(148, 163, 184, 0.4)", // slate gray - very subtle
  "rgba(156, 163, 175, 0.35)", // gray - very subtle
  "rgba(203, 213, 225, 0.3)", // slate light - very subtle
  "rgba(226, 232, 240, 0.25)", // slate lighter - very subtle
  "rgba(241, 245, 249, 0.3)", // slate lightest - very subtle
  "rgba(148, 163, 184, 0.35)", // slate gray variant
  "rgba(156, 163, 175, 0.3)", // gray variant
  "rgba(203, 213, 225, 0.25)", // slate light variant
];

// Individual pie slice component
function PieSlice({
  startAngle,
  endAngle,
  color,
  radius = 3.4,
  height = 0.5,
  name,
  value,
  total,
  delay = 0,
}: {
  startAngle: number;
  endAngle: number;
  color: string;
  radius?: number;
  height?: number;
  name: string;
  value: number;
  total: number;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = React.useState(0);

  // Very slow automatic rotation - even slower for minimalist feel
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Slower rotation

      // Animate appearance with delay
      if (state.clock.elapsedTime > delay) {
        setScale(Math.min(1, scale + 0.015));
      }
    }
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScale(1);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.arc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      depth: height * 0.3, // Thinner for minimalist look
      bevelEnabled: false, // No bevel for cleaner look
      bevelSegments: 0,
      steps: 1,
      bevelSize: 0,
      bevelThickness: 0,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [startAngle, endAngle, radius, height]);

  const percentage = ((value / total) * 100).toFixed(1);

  // Convert rgba string to THREE.Color
  const threeColor = useMemo(() => {
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
      const r = parseInt(rgbaMatch[1]) / 255;
      const g = parseInt(rgbaMatch[2]) / 255;
      const b = parseInt(rgbaMatch[3]) / 255;
      return new THREE.Color(r, g, b);
    }
    return new THREE.Color(color);
  }, [color]);

  const opacity = useMemo(() => {
    const rgbaMatch = color.match(/rgba?\([\d\s,]+,\s*([\d.]+)\)/);
    return rgbaMatch ? parseFloat(rgbaMatch[1]) : 0.3;
  }, [color]);

  return (
    <group scale={scale}>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={threeColor}
          metalness={0.05}
          roughness={0.9}
          transparent={true}
          opacity={opacity}
          emissive={new THREE.Color(0, 0, 0)}
        />
      </mesh>
    </group>
  );
}

// Main 3D Pie Chart component
function PieChart3D({
  data,
}: {
  data: Array<{ name: string; value: number; color: string }>;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <group>
      {/* Subtle lighting for minimalist glassmorphism */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />

      {/* Pie slices */}
      {data.map((item, index) => {
        const angle = (item.value / total) * Math.PI * 2;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        currentAngle += angle;

        return (
          <PieSlice
            key={index}
            startAngle={startAngle}
            endAngle={endAngle}
            color={item.color}
            name={item.name}
            value={item.value}
            total={total}
            delay={index * 0.2} // Staggered appearance animation
          />
        );
      })}

      {/* Legend removed - now using HTML legend below */}
    </group>
  );
}

export function ThreePieChart({
  expenses,
  expenseTransactions,
}: ThreePieChartProps) {
  // Group expenses by category name and sum amounts
  // Prioritize expenseTransactions over expenses
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    // First, use expenseTransactions if available
    if (expenseTransactions && expenseTransactions.length > 0) {
      expenseTransactions.forEach((transaction) => {
        // Check if it's an expense transaction - check both direction and type
        const isExpense = 
          transaction.direction === "expense" || 
          transaction.direction === "outgoing" ||
          (transaction.type && (
            transaction.type.includes("expense") || 
            transaction.type === "category_based"
          ));
        
        if (isExpense) {
          const amount = Math.abs(parseFloat(transaction.amount || "0"));
          if (amount > 0 && !isNaN(amount)) {
            // Use category name if available, otherwise use type or note
            let categoryName = "Uncategorized";
            
            if (transaction.category?.name) {
              categoryName = transaction.category.name;
            } else if (transaction.type) {
              // Format type name nicely
              categoryName = transaction.type
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
            } else if (transaction.note) {
              // Use first few words of note as category
              categoryName = transaction.note.split(" ").slice(0, 2).join(" ") || "Uncategorized";
            }
            
            totals[categoryName] = (totals[categoryName] || 0) + amount;
          }
        }
      });
    }
    
    // Only fall back to expenses if no expenseTransactions data
    if (Object.keys(totals).length === 0 && expenses && expenses.length > 0) {
      expenses.forEach((expense) => {
        if (expense.category) {
          const amount = parseFloat(expense.amount || "0");
          if (amount > 0 && !isNaN(amount)) {
            const categoryName = expense.category.name;
            totals[categoryName] = (totals[categoryName] || 0) + amount;
          }
        }
      });
    }

    return totals;
  }, [expenses, expenseTransactions]);

  const data = Object.entries(categoryTotals)
    .filter(([, total]) => total > 0) // Only include categories with positive values
    .sort(([, a], [, b]) => b - a) // Sort by value descending
    .slice(0, 8) // Take top 8 categories
    .map(([categoryName, total], index) => ({
      name:
        categoryName.length > 15
          ? categoryName.substring(0, 15) + "..."
          : categoryName,
      value: total,
      color: COLORS[index % COLORS.length],
    }));

  // If no data, show placeholder
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 sm:h-64 lg:h-80 text-primary-background/50">
        <div className="text-center px-4">
          <div className="text-xs sm:text-sm mb-2">No expense data available</div>
          <div className="text-xs text-primary-background/40">
            {expenseTransactions && expenseTransactions.length > 0 
              ? "No expense transactions found" 
              : "Add transactions to see the chart"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 sm:h-64 lg:h-80">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <PieChart3D data={data} />
      </Canvas>
    </div>
  );
}
