
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

type Step = {
  id: string;
  title: string;
  content: string;
};

type GuidanceProps = {
  steps: Step[];
  currentInstrument: string;
};

const GuidanceModule = ({ steps, currentInstrument }: GuidanceProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 pb-3 pt-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-amber-500 dark:text-amber-400 w-5 h-5" />
          <CardTitle className="text-lg font-medium text-indigo-800 dark:text-indigo-300">
            {currentInstrument} 实验指导
          </CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 p-0 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800"
        >
          {isExpanded ? '−' : '+'}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <Tabs defaultValue={steps[0].id} value={steps[currentStepIndex].id} className="w-full">
            <TabsList className="mb-4 grid grid-cols-3 gap-2 bg-indigo-50 dark:bg-indigo-900/30 p-1">
              {steps.map((step, index) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  onClick={() => setCurrentStepIndex(index)}
                  className={`
                    transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800
                    data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-200
                    data-[state=active]:shadow-sm text-gray-700 dark:text-gray-300
                  `}
                >
                  {index + 1}. {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-lg p-4 min-h-[140px]">
              {steps.map((step) => (
                <TabsContent 
                  key={step.id} 
                  value={step.id} 
                  className="text-gray-700 dark:text-gray-200 leading-relaxed"
                >
                  <p>{step.content}</p>
                </TabsContent>
              ))}
            </div>
          
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStepIndex === 0}
                className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                上一步
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={currentStepIndex === steps.length - 1}
                className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
              >
                下一步
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default GuidanceModule;
