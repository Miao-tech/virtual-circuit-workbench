
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CircuitProvider } from "@/contexts/CircuitContext";
import { useCircuit } from "@/contexts/CircuitContext";

// 实验类型定义
type Experiment = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "初级" | "中级" | "高级";
  instrument: "oscilloscope" | "multimeter" | "both";
  circuit: string;
  imageUrl: string;
};

// 实验列表
const experiments: Experiment[] = [
  {
    id: "exp-1",
    title: "RC电路时间常数测定",
    description: "通过观察RC电路充放电过程，测量电容充放电的时间常数。",
    category: "基础电路",
    level: "初级",
    instrument: "oscilloscope",
    circuit: "rc",
    imageUrl: "https://placeholder.com/300x200"
  },
  {
    id: "exp-2",
    title: "RLC串联谐振电路",
    description: "测定RLC串联谐振电路的谐振频率和品质因数，观察谐振曲线。",
    category: "谐振电路",
    level: "中级", 
    instrument: "oscilloscope",
    circuit: "rlc",
    imageUrl: "https://placeholder.com/300x200"
  },
  {
    id: "exp-3",
    title: "二极管特性曲线测定",
    description: "测定二极管的伏安特性曲线，了解二极管的单向导电特性。",
    category: "半导体器件",
    level: "中级",
    instrument: "both",
    circuit: "diode",
    imageUrl: "https://placeholder.com/300x200"
  },
  {
    id: "exp-4",
    title: "电阻的测量",
    description: "使用万用表测量不同电阻值，了解测量误差和精度。",
    category: "基础电路",
    level: "初级",
    instrument: "multimeter",
    circuit: "rc",
    imageUrl: "https://placeholder.com/300x200"
  },
  {
    id: "exp-5",
    title: "交流电桥测量电感",
    description: "使用交流电桥法测量未知电感值。",
    category: "测量技术",
    level: "高级",
    instrument: "both",
    circuit: "rl",
    imageUrl: "https://placeholder.com/300x200"
  },
  {
    id: "exp-6",
    title: "低通滤波器频率响应",
    description: "测量RC低通滤波器的幅频特性，确定截止频率。",
    category: "滤波电路",
    level: "中级",
    instrument: "oscilloscope",
    circuit: "rc",
    imageUrl: "https://placeholder.com/300x200"
  },
];

// 实验选择组件
const ExperimentSelector = () => {
  const [category, setCategory] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const navigate = useNavigate();
  const { updateCircuitData } = useCircuit();
  
  // 过滤实验
  const filteredExperiments = experiments.filter(exp => {
    const matchCategory = category === "all" || exp.category === category;
    const matchLevel = level === "all" || exp.level === level;
    const matchSearch = exp.title.toLowerCase().includes(searchText.toLowerCase()) ||
                        exp.description.toLowerCase().includes(searchText.toLowerCase());
    
    return matchCategory && matchLevel && matchSearch;
  });
  
  // 获取所有可用的类别
  const categories = ["all", ...Array.from(new Set(experiments.map(exp => exp.category)))];
  
  // 获取所有难度级别
  const levels = ["all", "初级", "中级", "高级"];
  
  // 启动实验
  const startExperiment = () => {
    if (!selectedExperiment) return;
    
    // 更新电路数据
    updateCircuitData({
      waveType: selectedExperiment.circuit === "rc" || selectedExperiment.circuit === "rl" ? "square" : "sine",
      frequency: 1000
    });
    
    // 导航到相应的仪器页面
    if (selectedExperiment.instrument === "oscilloscope") {
      navigate("/oscilloscope");
    } else if (selectedExperiment.instrument === "multimeter") {
      navigate("/multimeter");
    } else {
      // 对于both的情况，默认导航到示波器
      navigate("/oscilloscope");
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和列表 */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>实验筛选</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">搜索实验</label>
                  <Input 
                    type="text" 
                    placeholder="输入关键词..." 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">实验类别</label>
                  <Select defaultValue={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择类别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类别</SelectItem>
                      {categories.slice(1).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">难度级别</label>
                  <Select defaultValue={level} onValueChange={setLevel}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择难度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有难度</SelectItem>
                      {levels.slice(1).map(lvl => (
                        <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>实验列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredExperiments.length > 0 ? (
                  filteredExperiments.map(exp => (
                    <div 
                      key={exp.id} 
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedExperiment?.id === exp.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedExperiment(exp)}
                    >
                      <h4 className="font-medium">{exp.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{exp.level}</span>
                        <span className="text-xs text-gray-500">
                          {exp.instrument === "oscilloscope" ? "示波器" : 
                           exp.instrument === "multimeter" ? "万用表" : "多种仪器"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-gray-500">
                    未找到匹配的实验
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 右侧：实验预览 */}
        <div className="lg:col-span-2">
          {selectedExperiment ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedExperiment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">概述</TabsTrigger>
                    <TabsTrigger value="equipment">设备</TabsTrigger>
                    <TabsTrigger value="procedure">实验步骤</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="p-4">
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-gray-500">实验电路示意图</div>
                      </div>
                      
                      <h3 className="font-semibold">实验描述</h3>
                      <p>{selectedExperiment.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">实验类别</h4>
                          <p>{selectedExperiment.category}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">难度级别</h4>
                          <p>{selectedExperiment.level}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="equipment" className="p-4">
                    <h3 className="font-semibold mb-3">所需设备</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {selectedExperiment.instrument === "oscilloscope" || selectedExperiment.instrument === "both" ? (
                        <li>示波器：用于观察电路中的波形变化</li>
                      ) : null}
                      {selectedExperiment.instrument === "multimeter" || selectedExperiment.instrument === "both" ? (
                        <li>万用表：用于测量电压、电流和电阻值</li>
                      ) : null}
                      {selectedExperiment.circuit === "rc" && <li>RC电路：包含电阻和电容</li>}
                      {selectedExperiment.circuit === "rl" && <li>RL电路：包含电阻和电感</li>}
                      {selectedExperiment.circuit === "rlc" && <li>RLC电路：包含电阻、电感和电容</li>}
                      {selectedExperiment.circuit === "diode" && <li>二极管电路：包含二极管和电阻</li>}
                    </ul>
                    
                    <h3 className="font-semibold mt-4 mb-3">设备参数</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">电源</h4>
                        <p>±10V 直流电源</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">信号源</h4>
                        <p>10Hz-10kHz 可调</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="procedure" className="p-4">
                    <h3 className="font-semibold mb-3">实验步骤</h3>
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>连接电路，按照实验电路图正确连接元件</li>
                      <li>调整电源和信号源参数</li>
                      <li>进行必要的测量和数据记录</li>
                      <li>分析测量数据，得出实验结论</li>
                    </ol>
                    
                    <h3 className="font-semibold mt-4 mb-3">预期结果</h3>
                    <p>通过本实验，学生将能够理解{selectedExperiment.category}的基本原理，掌握相关的测量技术，并能够分析实验数据得出有效结论。</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedExperiment(null)}>
                  返回列表
                </Button>
                <Button onClick={startExperiment}>
                  开始实验
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md p-8">
                <h2 className="text-xl font-bold mb-4">选择实验</h2>
                <p className="text-gray-500 mb-6">
                  从左侧列表中选择一个实验以查看详情和开始实验。
                </p>
                <div className="flex justify-center">
                  <Link to="/">
                    <Button variant="outline">
                      返回主页
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExperimentSelectionPage = () => {
  return (
    <CircuitProvider>
      <div className="min-h-screen bg-gray-50">
        {/* 页头 */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <Link to="/">
              <Button variant="outline" size="sm">
                返回主页
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">实验选择</h1>
            <div className="w-20"></div> {/* 占位元素，保持标题居中 */}
          </div>
        </header>
        
        <ExperimentSelector />
        
        {/* 页脚 */}
        <footer className="bg-gray-100 border-t mt-10 p-4">
          <div className="container mx-auto text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} 虚拟电路实验台 | 电子电路学习平台
          </div>
        </footer>
      </div>
    </CircuitProvider>
  );
};

export default ExperimentSelectionPage;
