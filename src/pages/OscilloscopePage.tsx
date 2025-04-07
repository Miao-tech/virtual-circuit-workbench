
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Oscilloscope from "@/components/Oscilloscope";
import { CircuitProvider } from "@/contexts/CircuitContext";
import GuidanceModule from "@/components/GuidanceModule";

// 示波器实验指导步骤
const oscilloscopeSteps = [
  {
    id: "intro",
    title: "示波器介绍",
    content: "示波器是一种测量仪器，可以显示电信号随时间变化的波形。它是研究电路动态特性的重要工具。"
  },
  {
    id: "parameters",
    title: "参数控制",
    content: "示波器主要有三个控制参数：时基（控制水平时间轴的刻度），灵敏度（控制垂直电压轴的刻度）和触发电平（控制波形触发的电压阈值）。"
  },
  {
    id: "reading",
    title: "波形读取",
    content: "通过观察波形，可以测量波形的幅值、频率、周期和相位等参数。水平方向代表时间，垂直方向代表电压。"
  },
  {
    id: "task",
    title: "实验任务",
    content: "调整时基和灵敏度控制旋钮，使波形清晰显示在屏幕中央。然后测量波形的幅值和频率。"
  }
];

const OscilloscopePage = () => {
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
            <h1 className="text-2xl font-bold">虚拟示波器</h1>
            <div className="w-20"></div> {/* 占位元素，保持标题居中 */}
          </div>
        </header>
        
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 示波器控制面板 */}
            <div className="lg:col-span-2">
              <Oscilloscope />
            </div>
            
            {/* 右侧实验指导 */}
            <div className="lg:col-span-1">
              <GuidanceModule 
                steps={oscilloscopeSteps} 
                currentInstrument="示波器" 
              />
              
              {/* 仪器切换按钮 */}
              <div className="mt-6 flex flex-col gap-4">
                <h3 className="font-medium">切换仪器</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/multimeter">
                    <Button variant="outline" className="w-full">
                      切换到万用表
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

export default OscilloscopePage;
