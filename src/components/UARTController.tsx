import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Button } from './ui/button';
import { useToast } from "@/components/ui/use-toast";

interface UARTControllerProps {
  onDataReceived?: (data: Uint8Array) => void;
}

export interface UARTControllerRef {
  sendCommand: (command: number[]) => Promise<void>;
}

const UARTController = forwardRef<UARTControllerRef, UARTControllerProps>(({ onDataReceived }, ref) => {
  const { toast } = useToast();
  const [port, setPort] = useState<SerialPort | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useImperativeHandle(ref, () => ({
    sendCommand: async (command: number[]) => {
      if (!port) {
        toast({
          title: "错误",
          description: "串口未连接，请先连接串口",
          variant: "destructive",
        });
        return;
      }
      
      const writer = port.writable.getWriter();
      try {
        const data = new Uint8Array(command);
        await writer.write(data);
        console.log('Command sent:', command.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' '));
      } catch (error) {
        console.error('Error sending command:', error);
        toast({
          title: "错误",
          description: `发送命令失败: ${error}`,
          variant: "destructive",
        });
      } finally {
        writer.releaseLock();
      }
    }
  }));

  const connectToPort = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      // 检查浏览器是否支持 Web Serial API
      if (!navigator.serial) {
        throw new Error('您的浏览器不支持 Web Serial API，请使用 Chrome 或 Edge 浏览器');
      }

      // 请求串口权限
      const serialPort = await navigator.serial.requestPort();
      
      // 打开串口
      await serialPort.open({
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
      });

      setPort(serialPort);
      setIsConnected(true);
      startReading(serialPort);
      
      toast({
        title: "成功",
        description: "串口连接成功",
      });
    } catch (error) {
      console.error('Error connecting to serial port:', error);
      let errorMessage = '连接串口失败';
      
      if (error instanceof Error) {
        if (error.name === 'NotFoundError') {
          errorMessage = '未找到可用的串口设备';
        } else if (error.name === 'SecurityError') {
          errorMessage = '没有串口访问权限';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "错误",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectFromPort = async () => {
    if (!port) return;
    
    try {
      await port.close();
      setPort(null);
      setIsConnected(false);
      
      toast({
        title: "成功",
        description: "串口已断开连接",
      });
    } catch (error) {
      console.error('Error disconnecting from serial port:', error);
      toast({
        title: "错误",
        description: `断开连接失败: ${error}`,
        variant: "destructive",
      });
    }
  };

  const startReading = async (serialPort: SerialPort) => {
    const reader = serialPort.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (onDataReceived) {
          onDataReceived(value);
        }
      }
    } catch (error) {
      console.error('Error reading from serial port:', error);
      toast({
        title: "错误",
        description: `读取数据失败: ${error}`,
        variant: "destructive",
      });
    } finally {
      reader.releaseLock();
    }
  };

  const turnOffOscilloscope = () => {
    if (port) {
      const writer = port.writable.getWriter();
      writer.write(new Uint8Array([0x07, 0x00, 0x00, 0xFE]));
      writer.releaseLock();
    }
  };

  const startOscilloscope = () => {
    if (port) {
      const writer = port.writable.getWriter();
      writer.write(new Uint8Array([0x08, 0x00, 0x01, 0xFE]));
      writer.releaseLock();
    }
  };

  const turnOnPowerSupply = () => {
    if (port) {
      const writer = port.writable.getWriter();
      writer.write(new Uint8Array([0x09, 0x00, 0x01, 0xFE]));
      writer.releaseLock();
    }
  };

  const turnOffPowerSupply = () => {
    if (port) {
      const writer = port.writable.getWriter();
      writer.write(new Uint8Array([0x09, 0x00, 0x00, 0xFE]));
      writer.releaseLock();
    }
  };

  const setPowerSupplyVoltage = (voltage: number) => {
    if (port) {
      const voltageBytes = Math.round(voltage * 100);
      const highByte = (voltageBytes >> 8) & 0xFF;
      const lowByte = voltageBytes & 0xFF;
      const writer = port.writable.getWriter();
      writer.write(new Uint8Array([0x0A, highByte, lowByte, 0xFE]));
      writer.releaseLock();
    }
  };

  const setPowerSupplyCurrent = (current: number) => {
    if (port) {
      const currentBytes = Math.round(current * 1000);
      const highByte = (currentBytes >> 8) & 0xFF;
      const lowByte = currentBytes & 0xFF;
      const writer = port.writable.getWriter();
      writer.write(new Uint8Array([0x0B, highByte, lowByte, 0xFE]));
      writer.releaseLock();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">串口状态：</span>
        <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
          {isConnected ? '已连接' : '未连接'}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        {!isConnected ? (
          <Button 
            variant="default" 
            size="sm"
            onClick={connectToPort}
            disabled={isConnecting}
          >
            {isConnecting ? "连接中..." : "连接串口"}
          </Button>
        ) : (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={disconnectFromPort}
          >
            断开连接
          </Button>
        )}
      </div>
    </div>
  );
});

UARTController.displayName = 'UARTController';

export default UARTController; 