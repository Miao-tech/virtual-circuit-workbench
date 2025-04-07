
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCircuit } from '@/contexts/CircuitContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Oscilloscope = () => {
  const { generateWaveData, circuitData, updateCircuitData } = useCircuit();
  const [timeBase, setTimeBase] = useState<number>(1);
  const [verticalScale, setVerticalScale] = useState<number>(1);
  const [trigger, setTrigger] = useState<number>(0);
  const [wavePath, setWavePath] = useState<string>("");
  const [running, setRunning] = useState<boolean>(true);
  
  const SVG_WIDTH = 600;
  const SVG_HEIGHT = 400;
  
  useEffect(() => {
    if (!running) return;
    
    const updateWave = () => {
      const data = generateWaveData(timeBase, verticalScale);
      
      // 创建SVG路径
      let path = `M ${data[0].x * (SVG_WIDTH / 10)},${SVG_HEIGHT / 2 - data[0].y * (SVG_HEIGHT / 2 * 0.8)} `;
      data.forEach(point => {
        path += `L ${point.x * (SVG_WIDTH / 10)},${SVG_HEIGHT / 2 - point.y * (SVG_HEIGHT / 2 * 0.8)} `;
      });
      
      setWavePath(path);
    };
    
    updateWave();
    const interval = setInterval(updateWave, 100);
    
    return () => clearInterval(interval);
  }, [timeBase, verticalScale, running, circuitData, generateWaveData]);
  
  return (
    <div className="flex flex-col gap-4">
      <Card className="instrument-display">
        <CardContent className="p-4">
          <div className="oscilloscope-grid bg-black w-full h-[400px] rounded-lg relative">
            {/* 水平和垂直刻度线 */}
            <div className="grid grid-cols-10 h-full absolute top-0 left-0 w-full">
              {[...Array(11)].map((_, i) => (
                <div key={`v-${i}`} className="border-r border-instrument-grid opacity-50 h-full"></div>
              ))}
            </div>
            <div className="grid grid-rows-8 w-full absolute top-0 left-0 h-full">
              {[...Array(9)].map((_, i) => (
                <div key={`h-${i}`} className="border-b border-instrument-grid opacity-50 w-full"></div>
              ))}
            </div>
            
            {/* 波形 */}
            <svg width="100%" height="100%" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} preserveAspectRatio="none">
              <path d={wavePath} className="oscilloscope-wave animate-pulse-wave" />
              <line
                x1="0"
                y1={SVG_HEIGHT / 2 - trigger * (SVG_HEIGHT / 2 * 0.8)}
                x2={SVG_WIDTH}
                y2={SVG_HEIGHT / 2 - trigger * (SVG_HEIGHT / 2 * 0.8)}
                stroke="#ff0000"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </svg>
            
            {/* 显示设置 */}
            <div className="absolute bottom-2 right-2 text-xs text-instrument-grid">
              <div>时基: {timeBase} ms/div</div>
              <div>灵敏度: {verticalScale} V/div</div>
              <div>频率: {circuitData.frequency} Hz</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-3 gap-4">
        {/* 时基控制 */}
        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">时基控制</h3>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs">{timeBase} ms/div</span>
                <Slider
                  defaultValue={[1]}
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={[timeBase]}
                  onValueChange={(value) => setTimeBase(value[0])}
                  className="my-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 灵敏度控制 */}
        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">灵敏度控制</h3>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs">{verticalScale} V/div</span>
                <Slider
                  defaultValue={[1]}
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[verticalScale]}
                  onValueChange={(value) => setVerticalScale(value[0])}
                  className="my-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 触发控制 */}
        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">触发控制</h3>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs">电平: {trigger.toFixed(2)} V</span>
                <Slider
                  defaultValue={[0]}
                  min={-5}
                  max={5}
                  step={0.1}
                  value={[trigger]}
                  onValueChange={(value) => setTrigger(value[0])}
                  className="my-2"
                />
              </div>
              
              <Button 
                variant={running ? "destructive" : "default"} 
                size="sm" 
                className="w-full"
                onClick={() => setRunning(!running)}
              >
                {running ? "停止" : "运行"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 波形设置 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">波形类型</h3>
            <Select 
              defaultValue={circuitData.waveType} 
              onValueChange={(value) => updateCircuitData({ waveType: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择波形类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sine">正弦波</SelectItem>
                <SelectItem value="square">方波</SelectItem>
                <SelectItem value="triangle">三角波</SelectItem>
                <SelectItem value="sawtooth">锯齿波</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card className="instrument-control">
          <CardContent className="p-4">
            <h3 className="text-center mb-2">频率调整</h3>
            <div className="text-center">
              <span className="text-xs">{circuitData.frequency} Hz</span>
              <Slider
                defaultValue={[1000]}
                min={10}
                max={2000}
                step={10}
                value={[circuitData.frequency]}
                onValueChange={(value) => updateCircuitData({ frequency: value[0] })}
                className="my-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Oscilloscope;
