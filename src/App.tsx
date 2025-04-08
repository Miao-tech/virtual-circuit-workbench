import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import OscilloscopePage from "./pages/OscilloscopePage"; 
import MultimeterPage from "./pages/MultimeterPage";
import ExperimentSelectionPage from "./pages/ExperimentSelectionPage";
import NotFound from "./pages/NotFound";
import UARTController from './components/UARTController';

// Create App component as a proper function component
function App() {
  // Move queryClient inside the component to ensure proper React context
  const [queryClient] = useState(() => new QueryClient());

  const handleDataReceived = (data: Uint8Array) => {
    console.log('Received data:', data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <UARTController onDataReceived={handleDataReceived} />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/oscilloscope" element={<OscilloscopePage />} />
                <Route path="/multimeter" element={<MultimeterPage />} />
                <Route path="/experiments" element={<ExperimentSelectionPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
