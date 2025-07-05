import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Square, RotateCcw } from "lucide-react";

export default function GyroCompass() {
  const [currentHeading, setCurrentHeading] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [inputValue, setInputValue] = useState("0");
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Generate degree markings
  const generateDegreeMarkings = () => {
    const markings = [];
    for (let i = 0; i < 360; i += 5) {
      const isMajor = i % 10 === 0;
      const isVeryMajor = i % 30 === 0;
      const angle = i * (Math.PI / 180);
      const radius = 155;
      const x = Math.sin(angle) * radius;
      const y = -Math.cos(angle) * radius;
      
      markings.push(
        <div
          key={i}
          className={`absolute ${isVeryMajor ? 'major-marking' : isMajor ? 'medium-marking' : 'minor-marking'} bg-slate-700`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${x}px, ${y}px) translate(-50%, 0) rotate(${i}deg)`,
          }}
        />
      );
    }
    return markings;
  };

  // Generate degree numbers for outer ring
  const generateDegreeNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 360; i += 10) {
      const angle = i;
      const radius = 175;
      const x = Math.sin((angle * Math.PI) / 180) * radius;
      const y = -Math.cos((angle * Math.PI) / 180) * radius;
      
      numbers.push(
        <div
          key={i}
          className="absolute text-xs font-bold text-slate-700"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          }}
        >
          {i.toString().padStart(3, '0')}
        </div>
      );
    }
    return numbers;
  };

  // Update heading
  const updateHeading = (newHeading: number) => {
    const normalizedHeading = ((newHeading % 360) + 360) % 360;
    setCurrentHeading(normalizedHeading);
    setInputValue(normalizedHeading.toString());
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      updateHeading(numValue);
    }
  };

  // Handle preset heading
  const setPresetHeading = (heading: number) => {
    updateHeading(heading);
  };

  // Toggle auto rotation
  const toggleAutoRotate = () => {
    if (isAutoRotating) {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
      setIsAutoRotating(false);
    } else {
      setIsAutoRotating(true);
      autoRotateRef.current = setInterval(() => {
        setCurrentHeading(prev => {
          const newHeading = (prev + 1) % 360;
          setInputValue(newHeading.toString());
          return newHeading;
        });
      }, 100);
    }
  };

  // Reset heading
  const resetHeading = () => {
    if (isAutoRotating) {
      toggleAutoRotate();
    }
    updateHeading(0);
  };

  // Cleanup auto rotation on unmount
  useEffect(() => {
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">KELVIN HUGHES</h1>
          <p className="text-slate-300 text-lg">Gyro Compass Simulator</p>
        </div>
        
        {/* Main Compass Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          
          {/* Compass Housing */}
          <div className="relative">
            <div className="compass-housing rounded-full p-8 w-96 h-96 flex items-center justify-center">
              
              {/* Outer Degree Ring */}
              <div className="absolute inset-4 rounded-full border-4 border-slate-600">
                {/* Degree Markings */}
                <div className="relative w-full h-full">
                  {generateDegreeMarkings()}
                </div>
                
                {/* Degree Numbers - Full 360 degree scale */}
                <div className="absolute inset-0">
                  {generateDegreeNumbers()}
                </div>
              </div>
              
              {/* Rotating Compass Dial */}
              <div 
                className="compass-dial rounded-full w-72 h-72 relative transition-transform duration-1000 ease-out"
                style={{ transform: `rotate(${-currentHeading}deg)` }}
              >
                
                {/* Cardinal Directions */}
                <div className="absolute inset-0">
                  {/* North */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">N</div>
                  </div>
                  {/* East */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">E</div>
                  </div>
                  {/* South */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">S</div>
                  </div>
                  {/* West */}
                  <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">W</div>
                  </div>
                </div>
                
                {/* Inner Numbers (simple 1-9 pattern like original) */}
                <div className="absolute inset-0">
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-slate-800 font-mono text-lg font-bold">1</div>
                  <div className="absolute top-16 right-12 transform text-slate-800 font-mono text-lg font-bold">2</div>
                  <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-slate-800 font-mono text-lg font-bold">3</div>
                  <div className="absolute bottom-16 right-12 transform text-slate-800 font-mono text-lg font-bold">4</div>
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-slate-800 font-mono text-lg font-bold">5</div>
                  <div className="absolute bottom-16 left-12 transform text-slate-800 font-mono text-lg font-bold">6</div>
                  <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-slate-800 font-mono text-lg font-bold">7</div>
                  <div className="absolute top-16 left-12 transform text-slate-800 font-mono text-lg font-bold">8</div>
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-slate-800 font-mono text-lg font-bold">9</div>
                </div>
                
                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-800 rounded-full border-4 border-slate-600"></div>
              </div>
              
              {/* Fixed Bow Pointer/Needle */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="compass-needle w-1 h-12 animate-needle-pulse"></div>
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-red-600 mx-auto"></div>
              </div>
              
            </div>
            
            {/* Status Indicators */}
            <div className="absolute bottom-4 left-8 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-mono">RUN</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white text-xs font-mono">SYNC</span>
              </div>
            </div>
          </div>
          
          {/* Control Panel */}
          <Card className="control-panel w-full max-w-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Navigation Controls</h3>
              
              {/* Current Heading Display */}
              <div className="heading-display rounded-lg p-4 mb-6 text-center font-mono">
                <div className="text-xs text-green-300 mb-1">CURRENT HEADING</div>
                <div className="text-3xl font-bold">{currentHeading.toString().padStart(3, '0')}°</div>
                <div className="text-xs text-green-300 mt-1">TRUE</div>
              </div>
              
              {/* Heading Input */}
              <div className="mb-6">
                <label className="block text-slate-700 font-semibold mb-2">Set Heading</label>
                <div className="flex items-center space-x-3">
                  <Slider
                    value={[currentHeading]}
                    onValueChange={(value) => updateHeading(value[0])}
                    max={359}
                    step={1}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min="0"
                    max="359"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-16 text-center font-mono text-sm"
                  />
                </div>
              </div>
              
              {/* Preset Headings */}
              <div className="mb-6">
                <label className="block text-slate-700 font-semibold mb-3">Quick Set</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setPresetHeading(0)}
                    className="bg-slate-600 hover:bg-slate-700 text-white"
                  >
                    N (0°)
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setPresetHeading(90)}
                    className="bg-slate-600 hover:bg-slate-700 text-white"
                  >
                    E (90°)
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setPresetHeading(180)}
                    className="bg-slate-600 hover:bg-slate-700 text-white"
                  >
                    S (180°)
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setPresetHeading(270)}
                    className="bg-slate-600 hover:bg-slate-700 text-white"
                  >
                    W (270°)
                  </Button>
                </div>
              </div>
              
              {/* Simulation Controls */}
              <div className="border-t border-slate-300 pt-4">
                <label className="block text-slate-700 font-semibold mb-3">Simulation</label>
                <div className="flex space-x-2">
                  <Button 
                    onClick={toggleAutoRotate}
                    className={`flex-1 text-sm font-semibold ${
                      isAutoRotating 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isAutoRotating ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Stop Auto
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Auto Rotate
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={resetHeading}
                    variant="secondary"
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Footer Info */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p className="mb-2">Professional Maritime Navigation Simulator</p>
          <p>Fixed bow pointer • Rotating compass dial • Authentic Kelvin Hughes styling</p>
        </div>
        
      </div>
    </div>
  );
}
