import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useCircuit } from '@/contexts/CircuitContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import UARTController, { UARTControllerRef } from './UARTController';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

type MeasurementType = 'dcVoltage' | 'acVoltage' | 'dcCurrent' | 'resistance' | 'continuity';

// 万用表命令定义
const MULTIMETER_COMMANDS = {
  TURN_OFF: [0x01, 0x00, 0x00, 0xFE],
  RESISTANCE: [0x02, 0x00, 0x01, 0xFE],
  CONTINUITY: [0x03, 0x00, 0x02, 0xFE],
  DC_VOLTAGE: [0x04, 0x00, 0x03, 0xFE],
  AC_VOLTAGE: [0x04, 0x00, 0x04, 0xFE],
  DC_CURRENT: [0x06, 0x00, 0x05, 0xFE]
};

const Multimeter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getMeasurement, circuitData, updateCircuitData } = useCircuit();
  const [measureType, setMeasureType] = useState<MeasurementType>('dcVoltage');
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [measuring, setMeasuring] = useState<boolean>(true);
  const [powerOutput, setPowerOutput] = useState<number>(0);
  const uartControllerRef = useRef<UARTControllerRef>(null);

  // 根据测量类型发送对应的串口命令
  const sendCommandForMeasureType = async (type: MeasurementType) => {
    let command: number[];
    let commandName: string;
    switch (type) {
      case 'dcVoltage':
        command = MULTIMETER_COMMANDS.DC_VOLTAGE;
        commandName = "直流电压";
        break;
      case 'acVoltage':
        command = MULTIMETER_COMMANDS.AC_VOLTAGE;
        commandName = "交流电压";
        break;
      case 'dcCurrent':
        command = MULTIMETER_COMMANDS.DC_CURRENT;
        commandName = "直流电流";
        break;
      case 'resistance':
        command = MULTIMETER_COMMANDS.RESISTANCE;
        commandName = "电阻";
        break;
      case 'continuity':
        command = MULTIMETER_COMMANDS.CONTINUITY;
        commandName = "通断";
        break;
      default:
        return;
    }

    if (uartControllerRef.current) {
      try {
        await uartControllerRef.current.sendCommand(command);
      } catch (error) {
        toast({
          title: "错误",
          description: `发送${commandName}命令失败: ${error}`,
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "发送命令",
      description: `切换到${commandName}模式\n命令: ${command.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' ')}`,
    });
  };

  // 停止测量时发送关闭命令
  const handleStopMeasuring = async () => {
    setMeasuring(false);
    if (uartControllerRef.current) {
      try {
        await uartControllerRef.current.sendCommand(MULTIMETER_COMMANDS.TURN_OFF);
      } catch (error) {
        toast({
          title: "错误",
          description: `发送关闭命令失败: ${error}`,
          variant: "destructive",
        });
        return;
      }
    }
    toast({
      title: "发送命令",
      description: `关闭万用表\n命令: ${MULTIMETER_COMMANDS.TURN_OFF.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' ')}`,
    });
  };

  // 开始测量时发送对应档位的命令
  const handleStartMeasuring = async () => {
    setMeasuring(true);
    if (uartControllerRef.current) {
      try {
        await sendCommandForMeasureType(measureType);
      } catch (error) {
        toast({
          title: "错误",
          description: `开始测量失败: ${error}`,
          variant: "destructive",
        });
        return;
      }
    }
    toast({
      title: "开始测量",
      description: `已切换到${measureType}模式`,
    });
  };

  // 切换测量类型时发送对应的命令
  const handleMeasureTypeChange = async (type: MeasurementType) => {
    setMeasureType(type);
    if (measuring) {
      await sendCommandForMeasureType(type);
    } else {
      let command: number[];
      let commandName: string;
      switch (type) {
        case 'dcVoltage':
          command = MULTIMETER_COMMANDS.DC_VOLTAGE;
          commandName = "直流电压";
          break;
        case 'acVoltage':
          command = MULTIMETER_COMMANDS.AC_VOLTAGE;
          commandName = "交流电压";
          break;
        case 'dcCurrent':
          command = MULTIMETER_COMMANDS.DC_CURRENT;
          commandName = "直流电流";
          break;
        case 'resistance':
          command = MULTIMETER_COMMANDS.RESISTANCE;
          commandName = "电阻";
          break;
        case 'continuity':
          command = MULTIMETER_COMMANDS.CONTINUITY;
          commandName = "通断";
          break;
        default:
          return;
      }
      toast({
        title: "切换测量类型",
        description: `切换到${commandName}模式\n命令: ${command.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' ')}`,
      });
    }
  };

  // 处理串口数据接收
  const handleDataReceived = (data: Uint8Array) => {
    // 这里可以处理从万用表接收到的数据
    console.log('Received data from multimeter:', data);
  };

  // 处理电源输出
  const handlePowerOutput = async (voltage: number) => {
    setPowerOutput(voltage);
    let command: number[];
    let description: string;
    switch (voltage) {
      case 0.1:
        command = [0x09, 0x00, 0x01, 0xFE];
        description = "设置电源输出为 0.1V";
        break;
      case 1.0:
        command = [0x09, 0x00, 0x64, 0xFE];
        description = "设置电源输出为 1.0V";
        break;
      case 10.0:
        command = [0x09, 0x03, 0xe8, 0xFE];
        description = "设置电源输出为 10.0V";
        break;
      case 10.1:
        command = [0x09, 0x03, 0xe9, 0xFE];
        description = "设置电源输出为 10.1V";
        break;
      default:
        command = [0x09, 0x00, 0x00, 0xFE];
        description = "关闭电源输出";
    }

    if (uartControllerRef.current) {
      try {
        await uartControllerRef.current.sendCommand(command);
      } catch (error) {
        toast({
          title: "错误",
          description: `设置电源输出失败: ${error}`,
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "发送命令",
      description: `${description}\n命令: ${command.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' ')}`,
    });
  };

  useEffect(() => {
    if (!measuring) return;
    
    const updateReading = () => {
      const baseValue = getMeasurement(measureType);
      const noise = Math.random() * 0.02 * baseValue - 0.01 * baseValue;
      setDisplayValue(baseValue + noise);
    };
    
    updateReading();
    const interval = setInterval(updateReading, 500);
    
    return () => clearInterval(interval);
  }, [measureType, measuring, getMeasurement]);
  
  const formatValue = (value: number): string => {
    if (measureType === 'continuity') {
      return value < 0.1 ? '导通' : '断开';
    } else if (measureType === 'dcVoltage' || measureType === 'acVoltage') {
      return value > 1 ? `${value.toFixed(2)} V` : `${(value * 1000).toFixed(1)} mV`;
    } else if (measureType === 'dcCurrent') {
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
        return 'text-red-500';
      case 'resistance':
        return 'text-green-500';
      case 'continuity':
        return 'text-yellow-500';
      default:
        return 'text-white';
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">数字万用表</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/oscilloscope')}
        >
          切换到示波器
        </Button>
      </div>

      <Card className="instrument-display">
        <CardContent className="p-4">
          <div className="bg-gray-800 h-32 rounded-lg p-4 flex flex-col justify-center items-center border border-gray-700">
            <div className={`text-5xl font-mono ${getDisplayClass()}`}>
              {measuring ? formatValue(displayValue) : '----'}
            </div>
            <div className="text-gray-400 text-sm mt-2">
              测量类型: {
                measureType === 'dcVoltage' ? '直流电压' :
                measureType === 'acVoltage' ? '交流电压' :
                measureType === 'dcCurrent' ? '直流电流' :
                measureType === 'resistance' ? '电阻' : '通断'
              }
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">测量类型</h3>
            <Tabs defaultValue="dc" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="dc">直流</TabsTrigger>
                <TabsTrigger value="ac">交流</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dc" className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={measureType === 'dcVoltage' ? "default" : "secondary"} 
                    className={measureType === 'dcVoltage' ? "bg-blue-600" : ""}
                    onClick={() => handleMeasureTypeChange('dcVoltage')}
                  >
                    电压 V
                  </Button>
                  <Button 
                    variant={measureType === 'dcCurrent' ? "default" : "secondary"} 
                    className={measureType === 'dcCurrent' ? "bg-red-600" : ""}
                    onClick={() => handleMeasureTypeChange('dcCurrent')}
                  >
                    电流 A
                  </Button>
                  <Button 
                    variant={measureType === 'resistance' ? "default" : "secondary"} 
                    className={measureType === 'resistance' ? "bg-green-600" : ""}
                    onClick={() => handleMeasureTypeChange('resistance')}
                  >
                    电阻 Ω
                  </Button>
                  <Button 
                    variant={measureType === 'continuity' ? "default" : "secondary"} 
                    className={measureType === 'continuity' ? "bg-yellow-600" : ""}
                    onClick={() => handleMeasureTypeChange('continuity')}
                  >
                    通断
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="ac" className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={measureType === 'acVoltage' ? "default" : "secondary"} 
                    className={measureType === 'acVoltage' ? "bg-blue-600" : ""}
                    onClick={() => handleMeasureTypeChange('acVoltage')}
                  >
                    电压 V~
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">控制面板</h3>
            <div className="space-y-4">
              <Button 
                variant={measuring ? "destructive" : "default"} 
                className="w-full"
                onClick={measuring ? handleStopMeasuring : handleStartMeasuring}
              >
                {measuring ? "停止" : "开始"}测量
              </Button>
              
              <Button 
                variant="secondary"
                className="w-full"
                onClick={() => setDisplayValue(0)}
              >
                归零
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">直流电源输出</h3>
            <div className="space-y-2">
              <Button 
                variant={powerOutput === 0.1 ? "default" : "secondary"} 
                className="w-full"
                onClick={() => handlePowerOutput(0.1)}
              >
                0.1V
              </Button>
              <Button 
                variant={powerOutput === 1.0 ? "default" : "secondary"} 
                className="w-full"
                onClick={() => handlePowerOutput(1.0)}
              >
                1.0V
              </Button>
              <Button 
                variant={powerOutput === 10.0 ? "default" : "secondary"} 
                className="w-full"
                onClick={() => handlePowerOutput(10.0)}
              >
                10.0V
              </Button>
              <Button 
                variant={powerOutput === 10.1 ? "default" : "secondary"} 
                className="w-full"
                onClick={() => handlePowerOutput(10.1)}
              >
                10.1V
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Multimeter;
