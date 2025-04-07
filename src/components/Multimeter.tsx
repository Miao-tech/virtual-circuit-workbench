
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useCircuit } from '@/contexts/CircuitContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type MeasurementType = 'dcVoltage' | 'acVoltage' | 'dcCurrent' | 'acCurrent' | 'resistance';

const Multimeter = () => {
  const { getMeasurement, circuitData } = useCircuit();
  const [measureType, setMeasureType] = useState<MeasurementType>('dcVoltage');
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [measuring, setMeasuring] = useState<boolean>(true);
  
  useEffect(() => {
    if (!measuring) return;
    
    const updateReading = () => {
      // 添加一些随机噪声使测量看起来更真实
      const baseValue = getMeasurement(measureType);
      const noise = Math.random() * 0.02 * baseValue - 0.01 * baseValue;
      setDisplayValue(baseValue + noise);
    };
    
    updateReading();
    const interval = setInterval(updateReading, 500);
    
    return () => clearInterval(interval);
  }, [measureType, measuring, getMeasurement]);
  
  const formatValue = (value: number): string => {
    if (measureType === 'dcVoltage' || measureType === 'acVoltage') {
      return value > 1 ? `${value.toFixed(2)} V` : `${(value * 1000).toFixed(1)} mV`;
    } else if (measureType === 'dcCurrent' || measureType === 'acCurrent') {
      return value > 0.1 ? `${value.toFixed(3)} A` : `${(value * 1000).toFixed(1)} mA`;
    } else {
      return value > 1000 ? `${(value / 1000).toFixed(2)} kΩ` : `${value.toFixed(1)} Ω`;
    }
  };
  
  const getDisplayClass = () => {
    switch (measureType) {
      case 'dcVoltage':
      case 'acVoltage':
        return 'text-blue-500';
      case 'dcCurrent':
      case 'acCurrent':
        return 'text-red-500';
      case 'resistance':
        return 'text-green-500';
      default:
        return 'text-white';
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-gray-900 border-4 border-gray-700 rounded-xl shadow-lg">
        <CardContent className="p-6">
          {/* 显示屏 */}
          <div className="bg-gray-800 h-32 mb-6 rounded-lg p-4 flex flex-col justify-center items-center border border-gray-700">
            <div className={`text-5xl font-mono ${getDisplayClass()}`}>
              {measuring ? formatValue(displayValue) : '----'}
            </div>
            <div className="text-gray-400 text-sm mt-2">
              测量类型: {
                measureType === 'dcVoltage' ? '直流电压' :
                measureType === 'acVoltage' ? '交流电压' :
                measureType === 'dcCurrent' ? '直流电流' :
                measureType === 'acCurrent' ? '交流电流' : '电阻'
              }
            </div>
          </div>
          
          {/* 测量类型选择 */}
          <Tabs defaultValue="dc" className="mb-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="dc">直流</TabsTrigger>
              <TabsTrigger value="ac">交流</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dc" className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={measureType === 'dcVoltage' ? "default" : "secondary"} 
                  className={measureType === 'dcVoltage' ? "bg-blue-600" : ""}
                  onClick={() => setMeasureType('dcVoltage')}
                >
                  电压 V
                </Button>
                <Button 
                  variant={measureType === 'dcCurrent' ? "default" : "secondary"} 
                  className={measureType === 'dcCurrent' ? "bg-red-600" : ""}
                  onClick={() => setMeasureType('dcCurrent')}
                >
                  电流 A
                </Button>
                <Button 
                  variant={measureType === 'resistance' ? "default" : "secondary"} 
                  className={measureType === 'resistance' ? "bg-green-600" : ""}
                  onClick={() => setMeasureType('resistance')}
                >
                  电阻 Ω
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="ac" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={measureType === 'acVoltage' ? "default" : "secondary"} 
                  className={measureType === 'acVoltage' ? "bg-blue-600" : ""}
                  onClick={() => setMeasureType('acVoltage')}
                >
                  电压 V~
                </Button>
                <Button 
                  variant={measureType === 'acCurrent' ? "default" : "secondary"} 
                  className={measureType === 'acCurrent' ? "bg-red-600" : ""}
                  onClick={() => setMeasureType('acCurrent')}
                >
                  电流 A~
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* 控制按钮 */}
          <div className="flex justify-between mt-4">
            <Button 
              variant={measuring ? "destructive" : "outline"} 
              onClick={() => setMeasuring(!measuring)}
            >
              {measuring ? "停止" : "开始"}测量
            </Button>
            
            <Button 
              variant="secondary"
              onClick={() => setDisplayValue(0)}
            >
              归零
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Multimeter;
