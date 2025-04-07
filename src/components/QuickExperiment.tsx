
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCircuit } from "@/contexts/CircuitContext";

type ExperimentOption = {
  id: string;
  title: string;
  description: string;
  circuit: string;
  instrument: 'oscilloscope' | 'multimeter';
  waveType: 'sine' | 'square' | 'triangle' | 'sawtooth';
  frequency: number;
};

const experiments: ExperimentOption[] = [
  {
    id: "rc-oscilloscope",
    title: "RC电路时间常数测量",
    description: "使用示波器观察RC电路的充放电过程，测量时间常数",
    circuit: "rc",
    instrument: "oscilloscope",
    waveType: "square",
    frequency: 500
  },
  {
    id: "rlc-resonance",
    title: "RLC谐振频率测定",
    description: "使用示波器观察RLC电路的频率响应，确定谐振频率",
    circuit: "rlc",
    instrument: "oscilloscope",
    waveType: "sine",
    frequency: 1500
  },
  {
    id: "diode-rectifier",
    title: "二极管整流特性测量",
    description: "使用万用表测量二极管电路的直流电压输出",
    circuit: "diode",
    instrument: "multimeter",
    waveType: "sine",
    frequency: 800
  },
  {
    id: "rl-inductance",
    title: "电感测量实验",
    description: "使用交流电路和万用表测量未知电感值",
    circuit: "rl",
    instrument: "multimeter",
    waveType: "sine",
    frequency: 1000
  },
];

const QuickExperiment = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<string>("");
  const navigate = useNavigate();
  const { updateCircuitData } = useCircuit();
  
  const handleStartExperiment = () => {
    const experiment = experiments.find(exp => exp.id === selectedExperiment);
    if (!experiment) return;
    
    // 更新电路数据
    updateCircuitData({
      waveType: experiment.waveType,
      frequency: experiment.frequency
    });
    
    // 导航到相应的页面
    navigate(`/${experiment.instrument}`);
  };
  
  return (
    <Card>
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-center">快速实验选择</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <RadioGroup value={selectedExperiment} onValueChange={setSelectedExperiment}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiments.map((experiment) => (
              <div key={experiment.id} className="flex items-start space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={experiment.id} id={experiment.id} />
                <div className="grid gap-1.5">
                  <Label htmlFor={experiment.id} className="font-medium">
                    {experiment.title}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {experiment.description}
                  </p>
                  <div className="text-xs text-gray-400">
                    使用设备: {experiment.instrument === 'oscilloscope' ? '示波器' : '万用表'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
        
        <div className="flex justify-center mt-6">
          <Button 
            onClick={handleStartExperiment}
            disabled={!selectedExperiment}
            className="w-40"
          >
            开始实验
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickExperiment;
