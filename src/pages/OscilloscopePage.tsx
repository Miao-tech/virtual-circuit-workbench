
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Oscilloscope from "@/components/Oscilloscope";
import { CircuitProvider } from "@/contexts/CircuitContext";
import GuidanceModule from "@/components/GuidanceModule";
import { ArrowLeft, Waveform, GaugeCircle, BookOpen } from "lucide-react";

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
      <div className="page-container">
        {/* 页头 */}
        <header className="glass-effect shadow-md py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                <ArrowLeft className="h-4 w-4" />
                返回主页
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <Waveform className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">虚拟示波器</h1>
            </div>
            <div className="w-20"></div> {/* 占位元素，保持标题居中 */}
          </div>
        </header>
        
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 示波器控制面板 */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl p-1 mb-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-200 dark:border-blue-900">
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 py-3 px-4">
                    <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
                      <Waveform className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      示波器控制面板
                    </h2>
                  </div>
                  <div className="p-4">
                    <Oscilloscope />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右侧实验指导 */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl p-1 mb-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden">
                  <GuidanceModule 
                    steps={oscilloscopeSteps} 
                    currentInstrument="示波器" 
                  />
                </div>
              </div>
              
              {/* 仪器切换按钮 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl p-1">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-blue-200 dark:border-blue-900 p-4">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4" />
                    仪器与实验导航
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/multimeter" className="block">
                      <Button variant="outline" className="w-full border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 flex items-center gap-2 justify-center">
                        <GaugeCircle className="w-4 h-4" />
                        切换到万用表
                      </Button>
                    </Link>
                    <Link to="/experiments">
                      <Button variant="outline" className="w-full border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 flex items-center gap-2 justify-center">
                        <BookOpen className="w-4 h-4" />
                        更多实验
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 页脚 */}
        <footer className="border-t border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} 虚拟电路实验台 | 电子电路学习平台</p>
          </div>
        </footer>
      </div>
    </CircuitProvider>
  );
};

export default OscilloscopePage;
