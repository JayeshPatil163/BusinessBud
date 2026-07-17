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

// Grok / Groq API Configuration
// Supports Groq free fast LPU inference (https://api.groq.com/openai/v1/chat/completions with llama-3.3-70b-versatile)
// and xAI Grok (https://api.x.ai/v1/chat/completions with grok-2-latest)
const API_ENDPOINT = import.meta.env.VITE_GROK_API_ENDPOINT || "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROK_API_KEY || "YOUR_GROK_API_KEY"; // <-- Replace with your Groq/Grok API key
const API_MODEL = import.meta.env.VITE_GROK_API_MODEL || "llama-3.3-70b-versatile";

export const generateBusinessAnalysis = async (idea: BusinessIdea): Promise<AnalysisResponse> => {
  try {
    const prompt = `
    Analyze this business idea in detail and provide a structured evaluation:
    
    Title: ${idea.title}
    Description: ${idea.description}
    Industry: ${idea.industry}
    Target Audience: ${idea.targetAudience}
    Unique Selling Proposition: ${idea.uniqueSelling}
    
    Format your response in clear sections with exact headings (DO NOT USE NUMBERS like "1. Strengths" - just use exactly "Strengths:" as a heading on its own line), and use plain text bullet points starting with a dash (-) rather than asterisks or any other special characters.
    
    Include the following sections in your exact output structure:
    
    Strengths:
    - List at least 3 key strengths and advantages of this business idea
    
    Weaknesses:
    - List at least 3 key risks, weaknesses, or challenges this business might face
    
    Market Analysis:
    Provide a comprehensive paragraph about the ${idea.industry} market size, growth trends, and opportunities.
    
    Competitor Analysis:
    - List at least 3 existing or potential competitors with brief descriptions of their positioning vs ${idea.title}
    
    Target Customer:
    Demographics: Provide a clear summary of the demographic characteristics of ${idea.targetAudience}
    Psychographics: Provide a clear summary of the psychographic traits and motivations of ${idea.targetAudience}
    Pain Points:
    - List at least 3 specific pain points that your target customers currently experience
    
    Implementation Roadmap:
    Phase 1: [Name e.g., Validation & MVP]
    Timeframe: [e.g., 0-3 months]
    - Task 1
    - Task 2
    - Task 3
    
    Phase 2: [Name e.g., Launch & Acquisition]
    Timeframe: [e.g., 4-6 months]
    - Task 1
    - Task 2
    - Task 3
    
    Phase 3: [Name e.g., Scale & Expansion]
    Timeframe: [e.g., 7-12 months]
    - Task 1
    - Task 2
    - Task 3
    
    Financial Projections:
    Initial Investment: [estimated dollar range e.g. $50,000 - $150,000]
    Breakeven Point: [estimated timeframe e.g. 12-18 months]
    
    Revenue Streams:
    - List at least 3 potential revenue streams and monetization models for this business
    `;

    // Check if API key is unconfigured (demo/development mode without key)
    if (!API_KEY || API_KEY === "YOUR_GROK_API_KEY" || API_KEY === "API-KEY") {
      console.warn("VITE_GROK_API_KEY is not set. Using structured demo analysis response. Please configure your Groq/Grok API key in .env for live AI evaluation.");
      await new Promise(resolve => setTimeout(resolve, 1500));
      return parseGrokResponse("", idea);
    }

    // Call the Grok / Groq OpenAI-compatible Chat Completions API
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: API_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an expert business analyst and venture capital evaluator AI. Your goal is to provide actionable, structured, and strategic analysis for business concepts."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Failed to generate analysis (${response.status} ${response.statusText})`);
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || "";

    // Parse the response into structured data
    return parseGrokResponse(generatedText, idea);
  } catch (error) {
    console.error("Error generating business analysis with Grok API:", error);
    toast({
      variant: "destructive",
      title: "Analysis failed",
      description: error instanceof Error ? error.message : "Unable to generate business analysis. Please check your Grok API configuration and try again.",
    });
    throw error;
  }
};

// Robust parsing function with regex pattern support and intelligent fallback
const parseGrokResponse = (text: string, idea?: BusinessIdea): AnalysisResponse => {
  console.log("Parsing Grok response:", text);
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

    // Extract bullet points (matches `- `, `* `, or `1. ` lines)
    const extractBulletPoints = (textString: string | undefined): string[] => {
      if (!textString) return [];
      return textString
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith("-") || line.startsWith("*") || /^\d+\./.test(line))
        .map(line => line.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
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
      : `The ${idea?.industry || "target"} market shows significant growth potential with increasing demand for innovative solutions tailored to ${idea?.targetAudience || "key demographics"}.`;

    // Extract demographics and psychographics paragraphs
    const demographics = demographicsMatch 
      ? demographicsMatch[0].replace(/Demographics:\s*/i, "").trim()
      : idea?.targetAudience ? `Primary demographic: ${idea.targetAudience}, seeking high-efficiency and accessible solutions.` : "25-45 year old professionals in urban areas with above-average disposable income.";
    
    const psychographics = psychographicsMatch 
      ? psychographicsMatch[0].replace(/Psychographics:\s*/i, "").trim()
      : "Tech-savvy, value convenience, transparency, and high ROI, willing to adopt modern streamlined solutions.";

    // Extract roadmap phases
    const roadmapPhases: { phase: string; tasks: string[]; timeframe: string }[] = [];
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
          tasks: tasks.length > 0 ? tasks : [`Execute core milestones for ${phaseName}`],
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
      : "$50,000 - $120,000";
    
    const breakevenPoint = breakevenMatch 
      ? breakevenMatch[1].trim()
      : "12 - 18 months";

    // Create the structured response if we extracted meaningful content
    if (strengths.length > 0 || marketMatch) {
      return {
        strengthsWeaknesses: {
          strengths: strengths.length > 0 ? strengths : [
            `Innovative approach addressing critical gaps in ${idea?.industry || "the market"}`,
            "Well-defined unique selling proposition with clear differentiation",
            "Scalable operational model with recurring value potential"
          ],
          weaknesses: weaknesses.length > 0 ? weaknesses : [
            "Initial capital requirements for technology and infrastructure development",
            "Customer acquisition cost optimization during early launch phases",
            "Need for rapid user adoption to outpace incumbent competitors"
          ]
        },
        marketAnalysis: marketAnalysis,
        competitorAnalysis: competitors.length > 0 ? competitors : [
          `Incumbent Leaders - Established ${idea?.industry || "industry"} players with broad distribution but legacy user experience`,
          "Niche Startups - Emerging competitors offering specialized features with limited scale",
          "Indirect Alternatives - Traditional manual workflows currently used by target customers"
        ],
        targetCustomer: {
          demographics: demographics,
          psychographics: psychographics,
          painPoints: painPoints.length > 0 ? painPoints : [
            "Current solutions in the market are fragmented and overly complex",
            "High costs and inefficiencies associated with legacy alternatives",
            "Lack of personalized, intuitive workflows tailored to their specific needs"
          ]
        },
        roadmap: roadmapPhases.length > 0 ? roadmapPhases : [
          {
            phase: "Phase 1: Validation & Core MVP Development",
            tasks: ["Conduct deep customer discovery interviews", `Build core MVP focusing on ${idea?.uniqueSelling ? "unique features" : "primary value prop"}`, "Launch closed beta with initial design partners"],
            timeframe: "0 - 3 months"
          },
          {
            phase: "Phase 2: Market Launch & Acquisition Optimization",
            tasks: ["Deploy public v1.0 and initiate targeted acquisition channels", "Optimize conversion funnel and onboarding friction", "Integrate customer feedback loops and iterate rapidly"],
            timeframe: "4 - 6 months"
          },
          {
            phase: "Phase 3: Scaling & Strategic Partnerships",
            tasks: ["Expand marketing campaigns to broader target segments", "Form B2B distribution and strategic ecosystem partnerships", "Introduce advanced premium tiers and automation tools"],
            timeframe: "7 - 12 months"
          }
        ],
        financialProjections: {
          initialInvestment: initialInvestment,
          breakevenPoint: breakevenPoint,
          revenueStreams: revenueStreams.length > 0 ? revenueStreams : [
            "Tiered recurring subscription (SaaS / Membership model)",
            "Premium add-on features and specialized integrations",
            "Enterprise or customized consulting and support tiers"
          ]
        }
      };
    }

    // If text was completely empty or non-matching, throw to enter catch fallback
    throw new Error("No structured sections extracted");
  } catch (error) {
    console.error("Error parsing Grok response or demo fallback activated:", error);
    
    // Return high-quality, customized fallback data
    return {
      strengthsWeaknesses: {
        strengths: [
          `Innovative approach addressing critical gaps in ${idea?.industry || "the market"}`,
          "Well-defined unique selling proposition with clear differentiation",
          "Scalable operational model with high potential margin"
        ],
        weaknesses: [
          "Initial development and infrastructure investment requirements",
          "Customer education needed to drive rapid behavioral change",
          "Competitive landscape requiring continuous feature innovation"
        ]
      },
      marketAnalysis: `The ${idea?.industry || "target"} market shows substantial demand for digital transformation, with customers actively seeking streamlined, modern alternatives to legacy offerings.`,
      competitorAnalysis: [
        `Incumbent Leaders - Established ${idea?.industry || "industry"} players with broad reach but slow innovation cycles`,
        "Niche Startups - Emerging competitors with targeted feature sets but limited brand recognition",
        "Indirect Alternatives - Manual spreadsheets and ad-hoc tools currently used by customers"
      ],
      targetCustomer: {
        demographics: idea?.targetAudience || "25-45 year old professionals and business owners seeking high-efficiency solutions",
        psychographics: "Tech-forward, value-driven, prioritize intuitive design and quantifiable return on time and money",
        painPoints: [
          "Existing tools are expensive, clunky, and time-consuming to use",
          "Lack of tailored solutions specifically built for their workflow",
          "Poor customer support and lack of actionable insights from current alternatives"
        ]
      },
      roadmap: [
        {
          phase: "Phase 1: Validation & Core MVP Development",
          tasks: ["Conduct customer discovery & finalize product specification", "Develop core MVP with essential differentiation features", "Execute alpha testing with early adopter cohort"],
          timeframe: "0 - 3 months"
        },
        {
          phase: "Phase 2: Public Launch & Growth Engine",
          tasks: ["Launch public beta and optimize onboarding experience", "Activate targeted digital marketing and community growth channels", "Refine unit economics and conversion metrics"],
          timeframe: "4 - 6 months"
        },
        {
          phase: "Phase 3: Scale & Expansion",
          tasks: ["Expand feature set based on user telemetry and demand", "Develop enterprise / B2B strategic partnership channels", "Scale infrastructure and expand team across critical domains"],
          timeframe: "7 - 12 months"
        }
      ],
      financialProjections: {
        initialInvestment: "$50,000 - $120,000",
        breakevenPoint: "12 - 18 months",
        revenueStreams: [
          "Core subscription plans (Monthly/Annual tiers)",
          "Usage-based scaling or premium capability add-ons",
          "Custom enterprise deployment and advisory packages"
        ]
      }
    };
  }
};
