
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowRightIcon, Check, X, Users, TrendingUp, Zap, Target, BadgeCheck, BarChart3, Clock } from "lucide-react";
import { type AnalysisResponse } from "@/services/geminiService";

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [businessIdea, setBusinessIdea] = useState<any>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    // Load business idea and analysis from session storage
    const loadData = () => {
      try {
        const ideaData = sessionStorage.getItem("businessIdea");
        const analysisData = sessionStorage.getItem("businessAnalysis");
        
        if (!ideaData) {
          toast({
            variant: "destructive",
            title: "No idea found",
            description: "Please submit an idea first.",
          });
          navigate("/start");
          return;
        }
        
        setBusinessIdea(JSON.parse(ideaData));
        
        if (analysisData) {
          setAnalysis(JSON.parse(analysisData));
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: "Please try again.",
        });
        navigate("/start");
      }
    };
    
    loadData();
  }, [navigate]);

  const handleContinue = () => {
    navigate("/results");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-lg font-medium">Analyzing your idea...</p>
        </div>
      </div>
    );
  }

  if (!businessIdea || !analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-center p-8 rounded-lg">
          <p className="text-xl mb-4">No analysis data found</p>
          <Button onClick={() => navigate("/start")} className="bg-white text-black hover:bg-gray-200">
            Submit an idea
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-white mb-4">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Analysis Complete</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Business Idea Analysis
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              We've analyzed your {businessIdea.industry} business concept "{businessIdea.title}" 
              and identified key insights to help you move forward.
            </p>
          </div>

          <div className="space-y-12">
            {/* Strengths & Weaknesses */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BadgeCheck className="w-6 h-6 mr-2 text-green-500" />
                Strengths & Weaknesses Analysis
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-5">
                  <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    {analysis.strengthsWeaknesses.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-1">
                          <Check className="w-3 h-3 text-green-500" />
                        </span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-5">
                  <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center">
                    <X className="w-5 h-5 mr-2" />
                    Weaknesses
                  </h3>
                  <ul className="space-y-3">
                    {analysis.strengthsWeaknesses.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mr-3 mt-1">
                          <X className="w-3 h-3 text-red-500" />
                        </span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
                Market Analysis
              </h2>
              <p className="text-gray-300 leading-relaxed">{analysis.marketAnalysis}</p>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Competitors</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {analysis.competitorAnalysis.map((competitor, idx) => (
                    <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                      <p>{competitor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Customer */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-purple-500" />
                Target Customer Profile
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Demographics</h3>
                  <p className="text-gray-300">{analysis.targetCustomer.demographics}</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Psychographics</h3>
                  <p className="text-gray-300">{analysis.targetCustomer.psychographics}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Pain Points</h3>
                  <ul className="space-y-3">
                    {analysis.targetCustomer.painPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
                          <Target className="w-3 h-3 text-purple-500" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-400" />
                Implementation Roadmap
              </h2>
              
              <div className="relative mb-8">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700 z-0"></div>
                
                {/* Phase markers */}
                <div className="space-y-10 relative">
                  {analysis.roadmap.map((phase, idx) => (
                    <div key={idx} className={`relative z-10 pl-16 ${idx === currentPhase ? 'opacity-100' : 'opacity-70'}`}>
                      {/* Marker */}
                      <div 
                        className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center 
                          ${idx === currentPhase 
                            ? 'bg-blue-500 border-2 border-blue-400 ring-4 ring-blue-500/20'
                            : idx < currentPhase 
                              ? 'bg-green-500' 
                              : 'bg-gray-700'}`}
                        onClick={() => setCurrentPhase(idx)}
                      >
                        {idx < currentPhase ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white font-bold">{idx + 1}</span>
                        )}
                      </div>
                      
                      <div className={`border rounded-lg p-5 transition-all ${
                        idx === currentPhase 
                          ? 'bg-gray-800 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                          : 'bg-gray-800/70 border-gray-700'
                      }`}>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold">{phase.phase}</h3>
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                            {phase.timeframe}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {phase.tasks.map((task, taskIdx) => (
                            <li key={taskIdx} className="flex items-start">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                              </span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Projections */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-green-500" />
                Financial Projections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Initial Investment</h3>
                  <p className="text-2xl font-bold text-green-400">{analysis.financialProjections.initialInvestment}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Breakeven Point</h3>
                  <p className="text-2xl font-bold text-blue-400">{analysis.financialProjections.breakevenPoint}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Revenue Streams</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {analysis.financialProjections.revenueStreams.map((stream, idx) => (
                    <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                      <p>{stream}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleContinue}
                className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg"
              >
                Continue to Detailed Roadmap
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalysisPage;
