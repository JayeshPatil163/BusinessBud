import { toast } from "@/components/ui/use-toast";
export interface BusinessIdea {
  title: string;
  description: string;
  industry: string;
  targetAudience: string;
  uniqueSelling: string;
}

// Types for the analysis response
export interface AnalysisResponse {
  strengthsWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  marketAnalysis: string;
  competitorAnalysis: string[];
  targetCustomer: {
    demographics: string;
    psychographics: string;
    painPoints: string[];
  };
  roadmap: {
    phase: string;
    tasks: string[];
    timeframe: string;
  }[];
  financialProjections: {
    initialInvestment: string;
    breakevenPoint: string;
    revenueStreams: string[];
  };
}

const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const API_KEY = "AIzaSyBxJUcZOlj9gVOerHd36A7E2Wi4D38uygc";

export const generateBusinessAnalysis = async (idea: BusinessIdea): Promise<AnalysisResponse> => {
  try {
    const prompt = `
    Analyze this business idea in detail and provide a structured response:
    
    Title: ${idea.title}
    Description: ${idea.description}
    Industry: ${idea.industry}
    Target Audience: ${idea.targetAudience}
    Unique Selling Proposition: ${idea.uniqueSelling}
    
    Format your response in clear sections with headings (DO NOT USE NUMBERS like "1. Strengths" - just use "Strengths:" as a heading), and use plain text bullet points with a dash (-) rather than stars or any other special characters.
    
    Include the following sections in your analysis:
    
    Strengths:
    - List at least 3 key strengths of this business idea
    
    Weaknesses:
    - List at least 3 key weaknesses or challenges this business might face
    
    Market Analysis:
    Provide a paragraph about the market size, trends, and opportunities
    
    Competitor Analysis:
    - List at least 3 competitors with brief descriptions of their positioning
    
    Target Customer:
    Demographics: A paragraph about the demographic characteristics of the target customers
    Psychographics: A paragraph about the psychographic traits of the target customers
    Pain Points:
    - List at least 3 pain points that your target customers experience
    
    Implementation Roadmap:
    Phase 1: [Name]
    Timeframe: [e.g., 0-3 months]
    - Task 1
    - Task 2
    - Task 3
    
    Phase 2: [Name]
    Timeframe: [e.g., 4-6 months]
    - Task 1
    - Task 2
    - Task 3
    
    Phase 3: [Name]
    Timeframe: [e.g., 7-12 months]
    - Task 1
    - Task 2
    - Task 3
    
    Financial Projections:
    Initial Investment: [estimated amount]
    Breakeven Point: [estimated timeframe]
    
    Revenue Streams:
    - List at least 3 potential revenue streams for this business
    `;

    // Call the Gemini API
    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate analysis");
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Parse the response into structured data
    const structuredResponse = parseGeminiResponse(generatedText);
    return structuredResponse;
  } catch (error) {
    console.error("Error generating business analysis:", error);
    toast({
      variant: "destructive",
      title: "Analysis failed",
      description: "Unable to generate business analysis. Please try again.",
    });
    throw error;
  }
};

// Improved parsing function with better regex patterns
const parseGeminiResponse = (text: string): AnalysisResponse => {
  console.log("Parsing Gemini response:", text);
  try {
    const strengthsMatch = text.match(/Strengths:[\s\S]*?(?=Weaknesses:|$)/i);
    const weaknessesMatch = text.match(/Weaknesses:[\s\S]*?(?=Market Analysis:|$)/i);
    const marketMatch = text.match(/Market Analysis:[\s\S]*?(?=Competitor Analysis:|$)/i);
    const competitorMatch = text.match(/Competitor Analysis:[\s\S]*?(?=Target Customer:|$)/i);
    const customerMatch = text.match(/Target Customer:[\s\S]*?(?=Implementation Roadmap:|$)/i);
    const roadmapMatch = text.match(/Implementation Roadmap:[\s\S]*?(?=Financial Projections:|$)/i);
    const financialMatch = text.match(/Financial Projections:[\s\S]*?(?=Conclusion|$)/i);

    const customerSection = customerMatch ? customerMatch[0] : "";
    const demographicsMatch = customerSection.match(/Demographics:[\s\S]*?(?=Psychographics:|Pain Points:|$)/i);
    const psychographicsMatch = customerSection.match(/Psychographics:[\s\S]*?(?=Pain Points:|$)/i);
    const painPointsMatch = customerSection.match(/Pain Points:[\s\S]*?(?=\n\n|$)/i);

    // Extract bullet points by looking for lines that start with "- "
    const extractBulletPoints = (text) => {
      if (!text) return [];
      return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith("-"))
        .map(line => line.substring(1).trim())
        .filter(Boolean);
    };

    // Extract strengths and weaknesses
    const strengths = extractBulletPoints(strengthsMatch ? strengthsMatch[0] : "");
    const weaknesses = extractBulletPoints(weaknessesMatch ? weaknessesMatch[0] : "");
    const competitors = extractBulletPoints(competitorMatch ? competitorMatch[0] : "");
    const painPoints = extractBulletPoints(painPointsMatch ? painPointsMatch[0] : "");
    const revenueStreams = extractBulletPoints(financialMatch ? financialMatch[0].match(/Revenue Streams:[\s\S]*?(?=\n\n|$)/i)?.[0] : "");

    // Extract market analysis paragraph
    const marketAnalysis = marketMatch 
      ? marketMatch[0].replace(/Market Analysis:\s*/i, "").trim()
      : "The market shows significant growth potential with increasing demand for innovative solutions in this space.";

    // Extract demographics and psychographics paragraphs
    const demographics = demographicsMatch 
      ? demographicsMatch[0].replace(/Demographics:\s*/i, "").trim()
      : "25-45 year old professionals in urban areas with above-average income";
    
    const psychographics = psychographicsMatch 
      ? psychographicsMatch[0].replace(/Psychographics:\s*/i, "").trim()
      : "Tech-savvy, value convenience and efficiency, willing to try new solutions";

    // Extract roadmap phases
    const roadmapPhases = [];
    if (roadmapMatch) {
      const roadmapSection = roadmapMatch[0];
      const phaseRegex = /Phase\s+\d+:\s+([^\n]+)\s+Timeframe:\s+([^\n]+)([\s\S]*?)(?=Phase\s+\d+:|$)/gi;
      
      let phaseMatch;
      while ((phaseMatch = phaseRegex.exec(roadmapSection)) !== null) {
        const phaseName = phaseMatch[1].trim();
        const timeframe = phaseMatch[2].trim();
        const tasks = extractBulletPoints(phaseMatch[3]);
        
        roadmapPhases.push({
          phase: `Phase ${roadmapPhases.length + 1}: ${phaseName}`,
          tasks: tasks.length > 0 ? tasks : [`Task ${roadmapPhases.length + 1}`],
          timeframe
        });
      }
    }

    // Extract financial projections
    const initialInvestmentMatch = financialMatch 
      ? financialMatch[0].match(/Initial Investment:\s*([^\n]+)/i)
      : null;
    
    const breakevenMatch = financialMatch 
      ? financialMatch[0].match(/Breakeven Point:\s*([^\n]+)/i)
      : null;
    
    const initialInvestment = initialInvestmentMatch 
      ? initialInvestmentMatch[1].trim()
      : "$50,000 - $100,000";
    
    const breakevenPoint = breakevenMatch 
      ? breakevenMatch[1].trim()
      : "12-18 months";

    // Create the structured response
    return {
      strengthsWeaknesses: {
        strengths: strengths.length > 0 ? strengths : [
          "Innovative solution addressing a real market need",
          "Clear target audience identification",
          "Strong unique selling proposition"
        ],
        weaknesses: weaknesses.length > 0 ? weaknesses : [
          "Potential high initial development costs",
          "Market education may be required",
          "Competitive landscape challenges"
        ]
      },
      marketAnalysis: marketAnalysis,
      competitorAnalysis: competitors.length > 0 ? competitors : [
        "Competitor A - Current market leader with traditional approach",
        "Competitor B - Recent entrant with technology focus but limited features",
        "Competitor C - Established player targeting adjacent market segments"
      ],
      targetCustomer: {
        demographics: demographics,
        psychographics: psychographics,
        painPoints: painPoints.length > 0 ? painPoints : [
          "Existing solutions are time-consuming and inefficient",
          "Current market offerings are expensive with poor user experience",
          "Lack of personalized options in available alternatives"
        ]
      },
      roadmap: roadmapPhases.length > 0 ? roadmapPhases : [
        {
          phase: "Phase 1: Foundation",
          tasks: ["Market research and validation", "MVP development", "Initial user testing"],
          timeframe: "0-3 months"
        },
        {
          phase: "Phase 2: Development & Launch",
          tasks: ["Full feature development", "Marketing campaign preparation", "Beta testing and refinement"],
          timeframe: "4-6 months"
        },
        {
          phase: "Phase 3: Growth & Expansion",
          tasks: ["Full market launch", "Customer acquisition campaigns", "Feedback collection and product iteration"],
          timeframe: "7-12 months"
        }
      ],
      financialProjections: {
        initialInvestment: initialInvestment,
        breakevenPoint: breakevenPoint,
        revenueStreams: revenueStreams.length > 0 ? revenueStreams : [
          "Subscription model with tiered pricing",
          "Premium features and add-ons",
          "Enterprise solutions with custom pricing"
        ]
      }
    };
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    
    // Return fallback data if parsing fails
    return {
      strengthsWeaknesses: {
        strengths: [
          "Innovative solution addressing a real market need",
          "Clear target audience identification",
          "Strong unique selling proposition"
        ],
        weaknesses: [
          "Potential high initial development costs",
          "Market education may be required",
          "Competitive landscape challenges"
        ]
      },
      marketAnalysis: "The market shows significant growth potential with increasing demand for innovative solutions in this space.",
      competitorAnalysis: [
        "Competitor A - Current market leader with traditional approach",
        "Competitor B - Recent entrant with technology focus but limited features",
        "Competitor C - Established player targeting adjacent market segments"
      ],
      targetCustomer: {
        demographics: "25-45 year old professionals in urban areas with above-average income",
        psychographics: "Tech-savvy, value convenience and efficiency, willing to try new solutions",
        painPoints: [
          "Existing solutions are time-consuming and inefficient",
          "Current market offerings are expensive with poor user experience",
          "Lack of personalized options in available alternatives"
        ]
      },
      roadmap: [
        {
          phase: "Phase 1: Foundation",
          tasks: ["Market research and validation", "MVP development", "Initial user testing"],
          timeframe: "0-3 months"
        },
        {
          phase: "Phase 2: Development & Launch",
          tasks: ["Full feature development", "Marketing campaign preparation", "Beta testing and refinement"],
          timeframe: "4-6 months"
        },
        {
          phase: "Phase 3: Growth & Expansion",
          tasks: ["Full market launch", "Customer acquisition campaigns", "Feedback collection and product iteration"],
          timeframe: "7-12 months"
        }
      ],
      financialProjections: {
        initialInvestment: "$50,000 - $100,000",
        breakevenPoint: "12-18 months",
        revenueStreams: [
          "Subscription model with tiered pricing",
          "Premium features and add-ons",
          "Enterprise solutions with custom pricing"
        ]
      }
    };
  }
};
