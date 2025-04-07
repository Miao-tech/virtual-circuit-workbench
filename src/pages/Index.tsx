import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QuickExperiment from "@/components/QuickExperiment";
import CircuitDisplay from "@/components/CircuitDisplay";
import { CircuitProvider } from "@/contexts/CircuitContext";
import GuidanceModule from "@/components/GuidanceModule";
import { Beaker, AudioWaveform, GaugeCircle, Layers, GraduationCap } from "lucide-react";

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
      <div className="page-container">
        <header className="glass-effect shadow-md py-6 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">虚拟电路实验台</h1>
            <p className="text-gray-500 dark:text-gray-400 text-center mt-2">探索电子电路的奥秘</p>
          </div>
        </header>
        
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl p-1 mb-8">
                <Card className="border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 p-2 rounded-lg text-white">
                        <Beaker className="w-5 h-5" />
                      </div>
                      <CardTitle>快速实验</CardTitle>
                    </div>
                    <CardDescription>
                      选择预设实验以快速开始
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <QuickExperiment />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl p-1 mb-8">
                <Card className="border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500 p-2 rounded-lg text-white">
                        <Layers className="w-5 h-5" />
                      </div>
                      <CardTitle>电路实验区</CardTitle>
                    </div>
                    <CardDescription>
                      当前电路的可视化展示
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CircuitDisplay />
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl p-1">
                <Card className="border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-lg text-white">
                        <GaugeCircle className="w-5 h-5" />
                      </div>
                      <CardTitle>仪器控制区</CardTitle>
                    </div>
                    <CardDescription>
                      选择要使用的测量仪器
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Link to="/oscilloscope" className="block">
                        <Card className="card-hover h-full border border-blue-100 dark:border-blue-900 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                          <CardContent className="p-6 flex flex-col items-center">
                            <div className="instrument-icon bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
                              <AudioWaveform className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300">示波器</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                              观察电路中的波形变化
                            </p>
                            <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">使用示波器</Button>
                          </CardContent>
                        </Card>
                      </Link>
                      
                      <Link to="/multimeter" className="block">
                        <Card className="card-hover h-full border border-green-100 dark:border-green-900 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20">
                          <CardContent className="p-6 flex flex-col items-center">
                            <div className="instrument-icon bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300 mb-4">
                              <GaugeCircle className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-lg text-green-700 dark:text-green-300">万用表</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                              测量电压、电流和电阻
                            </p>
                            <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white">使用万用表</Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-indigo-900 rounded-xl p-1">
            <Card className="border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500 p-2 rounded-lg text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <CardTitle>实验指导</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <GuidanceModule steps={mainGuidanceSteps} currentInstrument="虚拟实验台" />
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Link to="/experiments">
              <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-600 dark:text-indigo-300 dark:hover:bg-indigo-900/30">
                浏览更多实验
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"></path></svg>
              </Button>
            </Link>
          </div>
        </div>
        
        <footer className="border-t border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} 虚拟电路实验台 | 电子电路学习平台</p>
            <div className="flex justify-center gap-4 mt-3">
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">关于我们</span>
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">使用指南</span>
              <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">联系方式</span>
            </div>
          </div>
        </footer>
      </div>
    </CircuitProvider>
  );
};

export default Index;
