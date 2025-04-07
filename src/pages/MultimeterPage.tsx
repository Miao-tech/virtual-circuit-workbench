
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Multimeter from "@/components/Multimeter";
import CircuitDisplay from "@/components/CircuitDisplay";
import { CircuitProvider } from "@/contexts/CircuitContext";
import GuidanceModule from "@/components/GuidanceModule";

// 万用表实验指导步骤
const multimeterSteps = [
  {
    id: "intro",
    title: "万用表介绍",
    content: "万用表是一种多功能测量仪器，可以测量电压、电流、电阻等多种电气参数。"
  },
  {
    id: "mode-selection",
    title: "测量模式",
    content: "万用表有多种测量模式，包括直流电压、交流电压、直流电流、交流电流和电阻测量。选择正确的测量模式对于获得准确的测量结果至关重要。"
  },
  {
    id: "precaution",
    title: "测量注意事项",
    content: "进行电流测量时，万用表需要串联到电路中；进行电压测量时，万用表需要并联到被测电路上；进行电阻测量时，被测元件需要脱离电路。"
  },
  {
    id: "task",
    title: "实验任务",
    content: "选择不同的测量模式，测量电路中的电压、电流和电阻值。比较直流和交流测量值的区别。"
  }
];

const MultimeterPage = () => {
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
            <h1 className="text-2xl font-bold">虚拟万用表</h1>
            <div className="w-20"></div> {/* 占位元素，保持标题居中 */}
          </div>
        </header>
        
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：万用表和电路显示 */}
            <div className="lg:col-span-2 space-y-6">
              <Multimeter />
              <CircuitDisplay />
            </div>
            
            {/* 右侧：实验指导 */}
            <div className="lg:col-span-1">
              <GuidanceModule 
                steps={multimeterSteps} 
                currentInstrument="万用表" 
              />
              
              {/* 仪器切换按钮 */}
              <div className="mt-6 flex flex-col gap-4">
                <h3 className="font-medium">切换仪器</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/oscilloscope">
                    <Button variant="outline" className="w-full">
                      切换到示波器
                    </Button>
                  </Link>
                  <Link to="/experiments">
                    <Button variant="outline" className="w-full">
                      更多实验
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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

export default MultimeterPage;
