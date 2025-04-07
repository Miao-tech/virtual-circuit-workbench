
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QuickExperiment from "@/components/QuickExperiment";
import CircuitDisplay from "@/components/CircuitDisplay";
import { CircuitProvider } from "@/contexts/CircuitContext";
import GuidanceModule from "@/components/GuidanceModule";

// 主页实验指导步骤
const mainGuidanceSteps = [
  {
    id: "welcome",
    title: "欢迎",
    content: "欢迎使用虚拟电路实验台。本系统模拟了真实的电子电路实验环境，您可以在这里进行各种电子电路的学习与实验。"
  },
  {
    id: "select-experiment",
    title: "选择实验",
    content: "您可以从左侧的快速实验列表中选择一个预设的实验，或者从仪器控制区域选择一个仪器，开始您的自定义实验。"
  },
  {
    id: "instruments",
    title: "仪器介绍",
    content: "本系统提供了示波器和万用表两种仪器。示波器用于观察电路中的电压波形变化，万用表用于测量电路中的电压、电流和电阻值。"
  }
];

const Index = () => {
  return (
    <CircuitProvider>
      <div className="min-h-screen bg-gray-50">
        {/* 页头 */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">虚拟电路实验台</h1>
          </div>
        </header>
        
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：快速实验入口 */}
            <div className="lg:col-span-1">
              <QuickExperiment />
            </div>
            
            {/* 右侧：虚拟实验台主要区域 */}
            <div className="lg:col-span-2">
              {/* 电路显示区 */}
              <CircuitDisplay />
              
              {/* 仪器控制区 */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>仪器控制区</CardTitle>
                  <CardDescription>
                    选择要使用的测量仪器
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/oscilloscope">
                      <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="20" height="14" rx="2" />
                              <line x1="6" y1="7" x2="18" y2="7" />
                              <line x1="6" y1="11" x2="18" y2="11" />
                              <line x1="6" y1="15" x2="18" y2="15" />
                            </svg>
                          </div>
                          <h3 className="font-medium text-lg">示波器</h3>
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            观察电路中的波形变化
                          </p>
                          <Button className="mt-4 w-full">使用示波器</Button>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    <Link to="/multimeter">
                      <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="12" x2="16" y2="16" />
                            </svg>
                          </div>
                          <h3 className="font-medium text-lg">万用表</h3>
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            测量电压、电流和电阻
                          </p>
                          <Button className="mt-4 w-full">使用万用表</Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* 底部实验指导模块 */}
          <div className="mt-6">
            <GuidanceModule steps={mainGuidanceSteps} currentInstrument="虚拟实验台" />
          </div>
          
          {/* 底部导航 */}
          <div className="mt-8 flex justify-end">
            <Link to="/experiments">
              <Button variant="outline">
                浏览更多实验
              </Button>
            </Link>
          </div>
        </div>
        
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

export default Index;
