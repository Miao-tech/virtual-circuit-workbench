import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义电路数据类型
type CircuitData = {
  voltagePoints: number[];
  currentPoints: number[];
  frequency: number;
  amplitude: number;
  waveType: 'sine' | 'square' | 'triangle' | 'sawtooth';
};

// 定义上下文类型
type CircuitContextType = {
  circuitData: CircuitData;
  updateCircuitData: (data: Partial<CircuitData>) => void;
  generateWaveData: (timeBase: number, verticalScale: number) => { x: number, y: number }[];
  getMeasurement: (type: 'dcVoltage' | 'acVoltage' | 'dcCurrent' | 'acCurrent' | 'resistance' | 'continuity') => number;
};

// 创建上下文
const CircuitContext = createContext<CircuitContextType | undefined>(undefined);

// 上下文提供者组件
export const CircuitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [circuitData, setCircuitData] = useState<CircuitData>({
    voltagePoints: Array(100).fill(0).map((_, i) => 5 * Math.sin(i * 0.1)),
    currentPoints: Array(100).fill(0).map((_, i) => 0.5 * Math.sin(i * 0.1)),
    frequency: 1000, // Hz
    amplitude: 5, // V
    waveType: 'sine',
  });

  const updateCircuitData = (data: Partial<CircuitData>) => {
    setCircuitData(prev => ({ ...prev, ...data }));
  };

  const generateWaveData = (timeBase: number, verticalScale: number): { x: number, y: number }[] => {
    const points: { x: number, y: number }[] = [];
    const samples = 200;
    
    for (let i = 0; i < samples; i++) {
      const x = i / (samples / 10) * timeBase; // 时间轴
      let y = 0;
      
      // 根据波形类型生成不同波形
      switch (circuitData.waveType) {
        case 'sine':
          y = circuitData.amplitude * Math.sin(2 * Math.PI * circuitData.frequency * x / 1000) / verticalScale;
          break;
        case 'square':
          y = circuitData.amplitude * (Math.sin(2 * Math.PI * circuitData.frequency * x / 1000) > 0 ? 1 : -1) / verticalScale;
          break;
        case 'triangle':
          y = circuitData.amplitude * (2 * Math.abs((x * circuitData.frequency / 1000) % 1 - 0.5) - 0.5) / verticalScale;
          break;
        case 'sawtooth':
          y = circuitData.amplitude * ((x * circuitData.frequency / 500) % 1 - 0.5) / verticalScale;
          break;
      }

      points.push({ x, y });
    }
    
    return points;
  };

  const getMeasurement = (type: 'dcVoltage' | 'acVoltage' | 'dcCurrent' | 'acCurrent' | 'resistance' | 'continuity'): number => {
    switch (type) {
      case 'dcVoltage':
        return circuitData.amplitude * 0.95; // 直流电压
      case 'acVoltage':
        return circuitData.amplitude * 0.707; // 交流电压有效值
      case 'dcCurrent':
        return circuitData.amplitude / 10; // 直流电流
      case 'acCurrent':
        return circuitData.amplitude / 10 * 0.707; // 交流电流有效值
      case 'resistance':
        return 1000; // 电阻值
      case 'continuity':
        return Math.random() < 0.5 ? 0.05 : 1; // 随机返回导通或断开状态
      default:
        return 0;
    }
  };

  return (
    <CircuitContext.Provider value={{ 
      circuitData, 
      updateCircuitData,
      generateWaveData,
      getMeasurement
    }}>
      {children}
    </CircuitContext.Provider>
  );
};

// 自定义Hook使用上下文
export const useCircuit = () => {
  const context = useContext(CircuitContext);
  if (context === undefined) {
    throw new Error('useCircuit must be used within a CircuitProvider');
  }
  return context;
};
