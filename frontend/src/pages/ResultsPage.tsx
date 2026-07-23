
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Award, BarChart2, Check, CheckCircle, Clock, FileText, Lightbulb, TrendingUp, Users, X, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockAnalysis = {
  title: "Mobile App for Local Farmers",
  overview: "Your idea for a mobile app connecting local farmers directly to consumers shows strong potential. The farm-to-table movement continues to gain momentum, and digital platforms in this space are still underdeveloped.",
  marketAnalysis: {
    score: 85,
    strengths: [
      "Growing demand for locally-sourced food",
      "Increasing consumer interest in food provenance",
      "Higher margins for farmers who sell direct-to-consumer"
    ],
    challenges: [
      "Requires critical mass of both farmers and consumers",
      "Seasonality of produce may affect year-round engagement",
      "Logistics and delivery infrastructure needs"
    ],
    competition: [
      { name: "FarmersMarket App", similarity: 65, differentiators: "Limited to market schedule, no delivery options" },
      { name: "LocalHarvest", similarity: 55, differentiators: "Web-only platform, less user-friendly for farmers" },
      { name: "FreshDirect", similarity: 40, differentiators: "Not focused exclusively on local farms, includes commercial products" }
    ]
  },
  impactAnalysis: {
    economic: {
      rating: "High",
      description: "Potential to increase profitability for small farms by 20-40% through direct sales."
    },
    social: {
      rating: "Medium-High",
      description: "Strengthens local food systems and community connections between producers and consumers."
    },
    environmental: {
      rating: "Medium",
      description: "Reduced food miles, but delivery logistics need optimization to maximize environmental benefits."
    }
  },
  roadmap: [
    {
      phase: "Research & Validation",
      duration: "1-2 months",
      tasks: [
        "Conduct interviews with 20+ local farmers",
        "Survey 100+ potential consumers",
        "Analyze competitor platforms",
        "Develop initial business model"
      ]
    },
    {
      phase: "MVP Development",
      duration: "3-4 months",
      tasks: [
        "Design user interfaces for both farmer and consumer sides",
        "Develop core functionality (profiles, listings, search, orders)",
        "Implement payment processing",
        "Beta test with small group of farmers and consumers"
      ]
    },
    {
      phase: "Launch & Initial Growth",
      duration: "2-3 months",
      tasks: [
        "Onboard 50 local farmers in target region",
        "Launch marketing campaign to attract initial consumer base",
        "Implement feedback system",
        "Optimize based on initial user feedback"
      ]
    },
    {
      phase: "Expansion",
      duration: "6+ months",
      tasks: [
        "Expand to additional geographical regions",
        "Add delivery/logistics partnerships",
        "Implement subscription options",
        "Develop data analytics for farmers"
      ]
    }
  ]
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const [businessIdea, setBusinessIdea] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    const storedIdea = sessionStorage.getItem("businessIdea");
    if (storedIdea) {
      setBusinessIdea(JSON.parse(storedIdea));
    } else {
      setBusinessIdea({
        title: mockAnalysis.title,
        description: "A mobile application that connects local farmers directly with consumers, allowing farmers to sell their produce directly and consumers to access fresh, local food."
      });
    }
  }, []);

  if (!businessIdea) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <Card className="w-[300px] card-gradient animate-pulse">
          <CardHeader>
            <CardTitle>Loading Analysis</CardTitle>
            <CardDescription>Please wait a moment...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-white mb-4">
              <Lightbulb className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Step 2: Review Analysis</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Business Idea Analysis</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We've analyzed your idea for <span className="font-semibold text-foreground">{businessIdea.title}</span> and prepared a comprehensive assessment to help you move forward.
            </p>
          </div>
          
          <Card className="card-gradient mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Idea Viability Score</span>
                <span className="text-white">{mockAnalysis.marketAnalysis.score}/100</span>
              </CardTitle>
              <CardDescription>
                Based on market demand, competitive landscape, and execution feasibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <Progress value={mockAnalysis.marketAnalysis.score} className="h-3" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="card-gradient rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">Market Potential</h3>
                  <div className="text-2xl font-bold text-white">High</div>
                </div>
                <div className="card-gradient rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">Customer Demand</h3>
                  <div className="text-2xl font-bold text-white">Strong</div>
                </div>
                <div className="card-gradient rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">Competitive Edge</h3>
                  <div className="text-2xl font-bold text-white">Medium</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="market">Market Analysis</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Business Idea Overview</CardTitle>
                  <CardDescription>
                    A comprehensive assessment of your idea
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    <p className="text-muted-foreground">{mockAnalysis.overview}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        Key Strengths
                      </h3>
                      <ul className="space-y-2">
                        {mockAnalysis.marketAnalysis.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <X className="h-5 w-5 text-red-500 mr-2" />
                        Key Challenges
                      </h3>
                      <ul className="space-y-2">
                        {mockAnalysis.marketAnalysis.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start">
                            <div className="h-4 w-4 rounded-full border border-red-500 mr-2 mt-1 shrink-0 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            </div>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="market">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                  <CardDescription>
                    Competitive landscape and market positioning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Similar Businesses & Competitors</h3>
                    <div className="space-y-4">
                      {mockAnalysis.marketAnalysis.competition.map((competitor, i) => (
                        <div key={i} className="border-b border-gray-800 pb-4 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{competitor.name}</h4>
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Similarity:</span>
                              <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full",
                                    competitor.similarity > 70 ? "bg-red-500" : 
                                    competitor.similarity > 50 ? "bg-amber-500" : "bg-green-500"
                                  )}
                                  style={{ width: `${competitor.similarity}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Your differentiators: </span>
                            {competitor.differentiators}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Target Market Insights</h3>
                    <p className="text-muted-foreground mb-4">
                      Based on your description, your primary target audience appears to be:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="card-gradient rounded-lg p-4">
                        <h4 className="font-medium mb-2">Primary Customers</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Health-conscious consumers who value fresh produce</li>
                          <li>• Households within 50 miles of agricultural areas</li>
                          <li>• Regular farmers market shoppers seeking convenience</li>
                        </ul>
                      </div>
                      <div className="card-gradient rounded-lg p-4">
                        <h4 className="font-medium mb-2">Secondary Customers</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Small to medium local restaurants</li>
                          <li>• Specialty food stores seeking local sourcing</li>
                          <li>• Educational institutions with farm-to-school programs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Market Opportunity</h3>
                    <div className="card-gradient rounded-lg p-4">
                      <p className="text-muted-foreground">
                        The direct-to-consumer farm goods market is growing at approximately 15% annually, 
                        with particular acceleration following recent supply chain disruptions. 
                        Your platform addresses key pain points for both farmers (limited sales channels, 
                        low margins through wholesalers) and consumers (limited access to local produce, 
                        lack of transparency), positioning it well for market success with proper execution.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="impact">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Impact Analysis</CardTitle>
                  <CardDescription>
                    The potential economic, social and environmental impact of your venture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="card-gradient rounded-lg p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                          <BarChart2 className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold">Economic Impact</h3>
                      </div>
                      <div className="mb-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                          {mockAnalysis.impactAnalysis.economic.rating}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {mockAnalysis.impactAnalysis.economic.description}
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Additional Benefits:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Creates new revenue streams for small farms</li>
                          <li>• Reduces costs associated with traditional distribution</li>
                          <li>• Enables price transparency and fair pricing</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="card-gradient rounded-lg p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold">Social Impact</h3>
                      </div>
                      <div className="mb-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                          {mockAnalysis.impactAnalysis.social.rating}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {mockAnalysis.impactAnalysis.social.description}
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Additional Benefits:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Promotes food education and transparency</li>
                          <li>• Preserves small-scale farming communities</li>
                          <li>• Enhances access to fresh food in underserved areas</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="card-gradient rounded-lg p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                          <div className="h-5 w-5 text-white">🌱</div>
                        </div>
                        <h3 className="text-lg font-semibold">Environmental Impact</h3>
                      </div>
                      <div className="mb-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                          {mockAnalysis.impactAnalysis.environmental.rating}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {mockAnalysis.impactAnalysis.environmental.description}
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Additional Benefits:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Can incentivize sustainable farming practices</li>
                          <li>• Reduces packaging waste from traditional retail</li>
                          <li>• Platform could include carbon footprint metrics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="roadmap">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Execution Roadmap</CardTitle>
                  <CardDescription>
                    A strategic timeline to transform your idea into reality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pt-2 pb-8">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-700"></div>
                    
                    {/* Timeline points */}
                    <div className="space-y-12">
                      {mockAnalysis.roadmap.map((phase, i) => (
                        <div key={i} className="relative flex">
                          <div className={cn(
                            "timeline-dot",
                            i === 0 && "border-2 border-white"
                          )}>
                            {i === 0 ? (
                              <FileText className="h-5 w-5 text-white" />
                            ) : i === 1 ? (
                              <Lightbulb className="h-5 w-5 text-white" />
                            ) : i === 2 ? (
                              <Plane className="h-5 w-5 text-white" />
                            ) : (
                              <TrendingUp className="h-5 w-5 text-white" />
                            )}
                          </div>
                          
                          <div className="ml-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                              <div>
                                <h3 className="text-lg font-bold">{phase.phase}</h3>
                                <p className="text-sm text-gray-400">{phase.duration}</p>
                              </div>
                              <div className="md:text-right text-xs bg-gray-800 text-white px-3 py-1 rounded-full flex items-center">
                                <Clock className="h-3 w-3 mr-1 inline-block" />
                                {i === 0 ? "Planning" : i === 1 ? "Development" : i === 2 ? "Launch" : "Growth"}
                              </div>
                            </div>
                            
                            <div className="timeline-content">
                              <h4 className="text-sm font-medium mb-3 text-gray-300">Key Milestones</h4>
                              <ul className="space-y-3">
                                {phase.tasks.map((task, j) => (
                                  <li key={j} className="flex items-start group hover:bg-gray-800/30 p-2 rounded-md transition-colors">
                                    <CheckCircle className="h-5 w-5 text-white/50 group-hover:text-white mr-2 mt-0.5 shrink-0" />
                                    <span className="text-sm text-gray-300 group-hover:text-white">{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button 
              className="bg-white hover:bg-white/90 text-black"
              size="lg"
              onClick={() => navigate("/execute")}
            >
              Start Execution
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage;
