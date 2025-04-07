
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useCircuit } from "@/contexts/CircuitContext";

const CircuitDisplay = () => {
  const { updateCircuitData, circuitData } = useCircuit();
  const [selectedCircuit, setSelectedCircuit] = useState("rc");
  
  const circuitOptions = [
    { value: "rc", label: "RC电路" },
    { value: "rl", label: "RL电路" },
    { value: "rlc", label: "RLC电路" },
    { value: "diode", label: "二极管电路" },
  ];
  
  // 切换电路类型
  const handleCircuitChange = (value: string) => {
    setSelectedCircuit(value);
    
    // 根据电路类型调整默认波形
    switch (value) {
      case "rc":
        updateCircuitData({ waveType: "square", frequency: 1000 });
        break;
      case "rl":
        updateCircuitData({ waveType: "square", frequency: 500 });
        break;
      case "rlc":
        updateCircuitData({ waveType: "sine", frequency: 1500 });
        break;
      case "diode":
        updateCircuitData({ waveType: "sine", frequency: 800 });
        break;
      default:
        break;
    }
  };
  
  return (
    <Card className="border border-gray-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">电路显示</h3>
          <Select defaultValue={selectedCircuit} onValueChange={handleCircuitChange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="选择电路" />
            </SelectTrigger>
            <SelectContent>
              {circuitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg h-64 flex items-center justify-center">
          {selectedCircuit === "rc" && (
            <svg width="300" height="200" viewBox="0 0 300 200">
              {/* 电源 */}
              <circle cx="30" cy="100" r="5" fill="black" />
              <text x="10" y="120" fontSize="10">+V</text>
              
              {/* 电阻 */}
              <line x1="35" y1="100" x2="90" y2="100" stroke="black" strokeWidth="2" />
              <path d="M90,100 L95,90 L105,110 L115,90 L125,110 L135,90 L145,110 L150,100" stroke="black" strokeWidth="2" fill="none" />
              <text x="110" y="80" fontSize="10">R</text>
              
              {/* 电容 */}
              <line x1="150" y1="100" x2="200" y2="100" stroke="black" strokeWidth="2" />
              <line x1="200" y1="80" x2="200" y2="120" stroke="black" strokeWidth="2" />
              <line x1="220" y1="80" x2="220" y2="120" stroke="black" strokeWidth="2" />
              <text x="200" y="140" fontSize="10">C</text>
              
              {/* 接地 */}
              <line x1="220" y1="100" x2="270" y2="100" stroke="black" strokeWidth="2" />
              <line x1="270" y1="100" x2="270" y2="130" stroke="black" strokeWidth="2" />
              <line x1="255" y1="130" x2="285" y2="130" stroke="black" strokeWidth="2" />
              <line x1="260" y1="140" x2="280" y2="140" stroke="black" strokeWidth="2" />
              <line x1="265" y1="150" x2="275" y2="150" stroke="black" strokeWidth="2" />
            </svg>
          )}
          
          {selectedCircuit === "rl" && (
            <svg width="300" height="200" viewBox="0 0 300 200">
              {/* 电源 */}
              <circle cx="30" cy="100" r="5" fill="black" />
              <text x="10" y="120" fontSize="10">+V</text>
              
              {/* 电阻 */}
              <line x1="35" y1="100" x2="90" y2="100" stroke="black" strokeWidth="2" />
              <path d="M90,100 L95,90 L105,110 L115,90 L125,110 L135,90 L145,110 L150,100" stroke="black" strokeWidth="2" fill="none" />
              <text x="110" y="80" fontSize="10">R</text>
              
              {/* 电感 */}
              <line x1="150" y1="100" x2="190" y2="100" stroke="black" strokeWidth="2" />
              <path d="M190,100 C195,90 205,90 210,100 C215,110 225,110 230,100 C235,90 245,90 250,100" stroke="black" strokeWidth="2" fill="none" />
              <text x="210" y="80" fontSize="10">L</text>
              
              {/* 接地 */}
              <line x1="250" y1="100" x2="270" y2="100" stroke="black" strokeWidth="2" />
              <line x1="270" y1="100" x2="270" y2="130" stroke="black" strokeWidth="2" />
              <line x1="255" y1="130" x2="285" y2="130" stroke="black" strokeWidth="2" />
              <line x1="260" y1="140" x2="280" y2="140" stroke="black" strokeWidth="2" />
              <line x1="265" y1="150" x2="275" y2="150" stroke="black" strokeWidth="2" />
            </svg>
          )}
          
          {selectedCircuit === "rlc" && (
            <svg width="300" height="200" viewBox="0 0 300 200">
              {/* 电源 */}
              <circle cx="30" cy="100" r="5" fill="black" />
              <text x="10" y="120" fontSize="10">+V</text>
              
              {/* 电阻 */}
              <line x1="35" y1="100" x2="60" y2="100" stroke="black" strokeWidth="2" />
              <path d="M60,100 L65,90 L75,110 L85,90 L95,110 L105,90 L115,110 L120,100" stroke="black" strokeWidth="2" fill="none" />
              <text x="80" y="80" fontSize="10">R</text>
              
              {/* 电感 */}
              <line x1="120" y1="100" x2="140" y2="100" stroke="black" strokeWidth="2" />
              <path d="M140,100 C145,90 155,90 160,100 C165,110 175,110 180,100" stroke="black" strokeWidth="2" fill="none" />
              <text x="150" y="80" fontSize="10">L</text>
              
              {/* 电容 */}
              <line x1="180" y1="100" x2="220" y2="100" stroke="black" strokeWidth="2" />
              <line x1="220" y1="80" x2="220" y2="120" stroke="black" strokeWidth="2" />
              <line x1="240" y1="80" x2="240" y2="120" stroke="black" strokeWidth="2" />
              <text x="220" y="140" fontSize="10">C</text>
              
              {/* 接地 */}
              <line x1="240" y1="100" x2="270" y2="100" stroke="black" strokeWidth="2" />
              <line x1="270" y1="100" x2="270" y2="130" stroke="black" strokeWidth="2" />
              <line x1="255" y1="130" x2="285" y2="130" stroke="black" strokeWidth="2" />
              <line x1="260" y1="140" x2="280" y2="140" stroke="black" strokeWidth="2" />
              <line x1="265" y1="150" x2="275" y2="150" stroke="black" strokeWidth="2" />
            </svg>
          )}
          
          {selectedCircuit === "diode" && (
            <svg width="300" height="200" viewBox="0 0 300 200">
              {/* 电源 */}
              <circle cx="30" cy="100" r="5" fill="black" />
              <text x="10" y="120" fontSize="10">+V</text>
              
              {/* 电阻 */}
              <line x1="35" y1="100" x2="90" y2="100" stroke="black" strokeWidth="2" />
              <path d="M90,100 L95,90 L105,110 L115,90 L125,110 L135,90 L145,110 L150,100" stroke="black" strokeWidth="2" fill="none" />
              <text x="110" y="80" fontSize="10">R</text>
              
              {/* 二极管 */}
              <line x1="150" y1="100" x2="190" y2="100" stroke="black" strokeWidth="2" />
              <polygon points="190,100 220,80 220,120" stroke="black" strokeWidth="2" fill="none" />
              <line x1="220" y1="80" x2="220" y2="120" stroke="black" strokeWidth="2" />
              <text x="200" y="70" fontSize="10">D</text>
              
              {/* 接地 */}
              <line x1="220" y1="100" x2="270" y2="100" stroke="black" strokeWidth="2" />
              <line x1="270" y1="100" x2="270" y2="130" stroke="black" strokeWidth="2" />
              <line x1="255" y1="130" x2="285" y2="130" stroke="black" strokeWidth="2" />
              <line x1="260" y1="140" x2="280" y2="140" stroke="black" strokeWidth="2" />
              <line x1="265" y1="150" x2="275" y2="150" stroke="black" strokeWidth="2" />
            </svg>
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          {selectedCircuit === "rc" && "RC电路: 电阻和电容串联的电路，用于时间常数和滤波实验。"}
          {selectedCircuit === "rl" && "RL电路: 电阻和电感串联的电路，用于时间常数和能量存储实验。"}
          {selectedCircuit === "rlc" && "RLC电路: 电阻、电感和电容串联的谐振电路，用于谐振频率实验。"}
          {selectedCircuit === "diode" && "二极管电路: 包含二极管的整流电路，用于学习单向导电特性。"}
        </div>
      </CardContent>
    </Card>
  );
};

export default CircuitDisplay;
