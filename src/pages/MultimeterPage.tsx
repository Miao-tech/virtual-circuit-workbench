import React from 'react';
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
    content: "万用表有多种测量模式，包括直流电压、交流电压、直流电流、交流电流、电阻测量和通断测试。选择正确的测量模式对于获得准确的测量结果至关重要。"
  },
  {
    id: "precaution",
    title: "测量注意事项",
    content: "进行电流测量时，万用表需要串联到电路中；进行电压测量时，万用表需要并联到被测电路上；进行电阻测量时，被测元件需要脱离电路；进行通断测试时，确保电路已断电。"
  },
  {
    id: "task",
    title: "实验任务",
    content: "选择不同的测量模式，测量电路中的电压、电流和电阻值。比较直流和交流测量值的区别，并使用通断档测试电路的连通性。"
  }
];

const MultimeterPage: React.FC = () => {
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

        {/* 主要内容 */}
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：实验指导 */}
            <div className="lg:col-span-1">
              <GuidanceModule steps={multimeterSteps} currentInstrument="万用表" />
            </div>

            {/* 右侧：仪器和电路显示 */}
            <div className="lg:col-span-2 space-y-6">
              <Multimeter />
              <CircuitDisplay />
            </div>
          </div>
        </main>
      </div>
    </CircuitProvider>
  );
};

export default MultimeterPage;
