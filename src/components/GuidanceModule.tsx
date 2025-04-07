
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <Card className="border-t-4 border-t-blue-500 shadow-lg">
      <CardHeader className="bg-gray-50 pb-2 pt-3 px-4 flex justify-between items-center">
        <CardTitle className="text-lg">
          {currentInstrument} 实验指导
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 p-0"
        >
          {isExpanded ? '−' : '+'}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="p-4">
          <Tabs defaultValue={steps[0].id} value={steps[currentStepIndex].id}>
            <TabsList className="mb-4 grid grid-cols-3 gap-2">
              {steps.map((step, index) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  onClick={() => setCurrentStepIndex(index)}
                  className={index === currentStepIndex ? "bg-blue-100" : ""}
                >
                  {index + 1}. {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {steps.map((step) => (
              <TabsContent key={step.id} value={step.id} className="p-2">
                <div className="prose max-w-none">
                  <p>{step.content}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStepIndex === 0}
            >
              上一步
            </Button>
            <Button 
              onClick={nextStep} 
              disabled={currentStepIndex === steps.length - 1}
            >
              下一步
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default GuidanceModule;
