
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, CheckCircle, Clock, FileText, Lightbulb, LineChart, List, Rocket, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';





// Mock tasks data
const tasks = [
  { id: 1, name: "Set up business entity (LLC)", category: "Legal", completed: true, dueDate: "2025-04-15" },
  { id: 2, name: "Register domain name", category: "Setup", completed: true, dueDate: "2025-04-17" },
  { id: 3, name: "Create initial wireframes", category: "Product", completed: false, dueDate: "2025-04-20" },
  { id: 4, name: "Interview 5 potential users", category: "Research", completed: false, dueDate: "2025-04-25" },
  { id: 5, name: "Outline technical requirements", category: "Product", completed: false, dueDate: "2025-04-27" },
  { id: 6, name: "Research payment processors", category: "Finance", completed: false, dueDate: "2025-05-01" },
  { id: 7, name: "Draft privacy policy", category: "Legal", completed: false, dueDate: "2025-05-05" },
  { id: 8, name: "Create logo and brand guidelines", category: "Marketing", completed: false, dueDate: "2025-05-10" },
];

// Mock investors data
const investord = [
  {
    name: "Sprout Ventures",
    focus: "AgTech, Food Supply Chain",
    stage: "Seed, Series A",
    investmentRange: "$250K - $2M",
    portfolio: ["FarmLink", "HarvestHub", "GreenGrowth"],
    match: 92
  },
  {
    name: "Local Food Fund",
    focus: "Sustainable Food Systems",
    stage: "Pre-seed, Seed",
    investmentRange: "$50K - $500K",
    portfolio: ["FreshRoute", "Urban Harvest", "EcoEats"],
    match: 87
  },
  {
    name: "Digital Harvest Capital",
    focus: "Food Tech, Marketplaces",
    stage: "Seed, Series A",
    investmentRange: "$500K - $3M",
    portfolio: ["FarmDirect", "LocalTable", "ProducePro"],
    match: 81
  },
  {
    name: "Sustainable Future Fund",
    focus: "Climate Tech, Sustainability",
    stage: "Seed",
    investmentRange: "$100K - $1M",
    portfolio: ["GreenCart", "EcoLogistics", "CleanHarvest"],
    match: 74
  }
];

const ExecutionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tasks");
  const [taskList, setTaskList] = useState(tasks);
  const [investors, setInvestors] = useState<{ id: string; firstName: string; lastName: string; email: string; phone?: string; industryInterests?: string[]; investmentScale?: string; isActive?: boolean; createdAt?: string; }[]>([]);
 
  
  const [revenueData, setRevenueData] = useState([]);
  const [showRevenueForm, setShowRevenueForm] = useState(false);
  const [newRevenueEntry, setNewRevenueEntry] = useState({
    month: '',
    revenue: '',
    goalRevenue: ''
  });

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    category: 'Product',
    dueDate: '',
    completed: false
  });

  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    targetAmt: '',
    equityOffered: '',
    minInvestmentAmt: '',
    businessPlan: '',
    financialProjection: '',
    marketAnalysis: '',
    riskFactor: '',
    startDate: '',
    endDate: ''
  });

  const handleSubmit = async () => {
    try {
        const campaignData = {
            title: newCampaign.title,
            description: newCampaign.description,
            targetAmount: newCampaign.targetAmt,
            equity: newCampaign.equityOffered,
            minimumInvestment: newCampaign.minInvestmentAmt,
            businessPlan: newCampaign.businessPlan,
            financialProjections: newCampaign.financialProjection,
            //image: formData.image,
            marketAnalysis: newCampaign.marketAnalysis,
            riskFactors: newCampaign.riskFactor
          };
      
          // Send campaign data to the campaign API endpoint
          const res = await axios.post('http://localhost:3000/campaigns', campaignData);
          
          if (res && res.data) {
            console.log("Campaign created:", res.data);
  }
        } catch (error) {
          console.error('Error creating campaign:', error);
        }
  };

  let res = null;
  let backendCampaigns = null;

  useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      res = await axios.get('http://localhost:3000/campaigns/');

      if (res && res.data) {
        // Map the backend response to match our Campaign interface if needed
        // This assumes the backend data structure matches or can be mapped to our interface
        backendCampaigns = (Array.isArray(res.data) ? res.data : []).map((item: any) => ({
          id: item.id || item._id || String(Math.random()),
          title: item.title || 'Untitled Campaign',
          targetAmt: item.targetAmount || 0,
          equityOffered: item.equity || 0,
          description: item.description || 'No description available',
          businessPlan: item.businessPlan || 'No business plan available',
          financialProjection: item.financialProjections || 'No financial projections available',
          marketAnalysis: item.marketAnalysis || 'No market analysis available',
          riskFactor: item.riskFactors || 'No risk factors available',
          startDate: item.startDate || new Date().toISOString(),
          raised: Math.random() * 100, // Random raised amount for demo
          endDate: item.endDate || new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
          //image: imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
        }));

        console.log('Mapped campaigns:', backendCampaigns);
        setCampaigns(backendCampaigns);
        console.log('Campaigns loaded:', backendCampaigns.length);
      } else {
        console.log('No campaigns data received');
        // Keep using mock data if no data is returned
      }
    } catch (err) {
      console.log('Error fetching campaigns:', err);
      // Keep using mock data if fetch fails
    }
  };

  fetchCampaigns();
})
  
  

  const [growthData, setGrowthData] = useState([
    { month: 'Jan', progress: 10, target: 15 },
    { month: 'Feb', progress: 23, target: 25 },
    { month: 'Mar', progress: 35, target: 35 },
    { month: 'Apr', progress: 48, target: 45 },
    { month: 'May', progress: 62, target: 55 },
    { month: 'Jun', progress: 70, target: 65 },
    { month: 'Jul', progress: 85, target: 75 },
    { month: 'Aug', progress: 92, target: 85 },
  ]);


  const [projectMilestones, setProjectMilestones] = useState([
    { id: 1, name: "Business Setup", start: "Jan", end: "Feb", progress: 100 },
    { id: 2, name: "MVP Development", start: "Feb", end: "May", progress: 75 },
    { id: 3, name: "User Testing", start: "Apr", end: "Jun", progress: 45 },
    { id: 4, name: "Initial Marketing", start: "May", end: "Jul", progress: 20 },
    { id: 5, name: "Investor Pitching", start: "Jul", end: "Aug", progress: 0 }
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [taskProgress, setTaskProgress] = useState(0);


  const completeTask = (taskId: number) => {
    // Toggle task completion status
    const updatedTaskList = taskList.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    // Update the task list
    setTaskList(updatedTaskList);
    
    // Calculate the new completed tasks percentage
    const newCompletedCount = updatedTaskList.filter(task => task.completed).length;
    const completedPercentage = (newCompletedCount / updatedTaskList.length) * 100;
    
    // Update milestone progress based on tasks
    // We'll assume current tasks are part of the MVP Development milestone (id: 2)
    const updatedMilestones = projectMilestones.map(milestone => {
      if (milestone.id === 2) { // MVP Development
        return {
          ...milestone,
          progress: Math.min(Math.round(completedPercentage), 100)
        };
      }
      return milestone;
    });
    
    // Update milestones state
    setProjectMilestones(updatedMilestones);
  };

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get<{ id: string; firstName: string; lastName: string; email: string; phone?: string; industryInterests?: string[]; investmentScale?: string; isActive?: boolean; createdAt?: string; }[]>('http://localhost:3000/investors/');
        setInvestors(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvestors();
  }, []);


  
  const completedTasksCount = taskList.filter(task => task.completed).length;
  const progress = (completedTasksCount / taskList.length) * 100;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-venture-primary">
            Progress: {payload[0].value}%
          </p>
          <p className="text-sm text-venture-accent">
            Target: {payload[1].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const handleRevenueSubmit = (e) => {
    e.preventDefault();
    
    // Convert revenue values to numbers
    const revenue = parseFloat(newRevenueEntry.revenue);
    const goalRevenue = parseFloat(newRevenueEntry.goalRevenue);
    
    // Create new entry
    const newEntry = {
      month: newRevenueEntry.month,
      revenue,
      goalRevenue
    };
    
    // Add to revenue data array
    // Note: In a real application, this would be sent to the backend to store in a database
    const updatedRevenueData = [...revenueData, newEntry];
    
    // Calculate growth percentages for each entry
    const dataWithGrowth = calculateGrowthPercentages(updatedRevenueData);
    
    // Update state
    setRevenueData(dataWithGrowth);
    
    // Reset form
    setNewRevenueEntry({ month: '', revenue: '', goalRevenue: '' });
    setShowRevenueForm(false);
  };
  
  // Function to calculate growth percentages
  const calculateGrowthPercentages = (data) => {
    if (data.length <= 1) return data;
    
    return data.map((entry, index) => {
      if (index === 0) {
        // First entry has no previous month to compare with
        return { ...entry, growth: 0 };
      }
      
      const prevRevenue = data[index - 1].revenue;
      const currentRevenue = entry.revenue;
      
      // Calculate growth percentage: ((Current - Previous) / Previous) * 100
      const growth = prevRevenue > 0 
        ? ((currentRevenue - prevRevenue) / prevRevenue) * 100 
        : 0;
      
      return { ...entry, growth: parseFloat(growth.toFixed(2)) };
    });
  };
  
  // Add these functions to handle form input changes
  const handleRevenueInputChange = (e) => {
    const { name, value } = e.target;
    setNewRevenueEntry(prev => ({ ...prev, [name]: value }));
  };
  
  // This function would be used to integrate with a backend API
  // Comment it out as it's for future implementation
  /* 
  const fetchRevenueData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/revenue-data/');
      const dataWithGrowth = calculateGrowthPercentages(response.data);
      setRevenueData(dataWithGrowth);
    } catch (err) {
      console.error('Error fetching revenue data:', err);
    }
  };
  
  // Call this in useEffect if you implement backend integration
  useEffect(() => {
    fetchRevenueData();
  }, []);
  */

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  
  // Add this function to handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    
    // Create a new task with an ID
    const taskId = taskList.length > 0 ? Math.max(...taskList.map(task => task.id)) + 1 : 1;
    const task = {
      ...newTask,
      id: taskId
    };
    
    // Add the new task to the list
    setTaskList([...taskList, task]);
    
    // Reset form and hide it
    setNewTask({
      name: '',
      category: 'Product',
      dueDate: '',
      completed: false
    });
    setShowAddTaskForm(false);
  };

  const openTaskProgressModal = (task) => {
    setSelectedTask(task);
    setTaskProgress(task.completed ? 100 : 0);
  };
  
  // Add this function to handle task progress update
  const updateTaskProgress = () => {
    const updatedTaskList = taskList.map(task => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          completed: taskProgress === 100
        };
      }
      return task;
    });
    
    // Calculate the new completed tasks percentage
    const newCompletedCount = updatedTaskList.filter(task => task.completed).length;
    const completedPercentage = (newCompletedCount / updatedTaskList.length) * 100;
    
    // Update milestone progress based on tasks
    // We'll assume current tasks are part of the MVP Development milestone (id: 2)
    const updatedMilestones = projectMilestones.map(milestone => {
      if (milestone.id === 2) { // MVP Development
        return {
          ...milestone,
          progress: Math.min(Math.round(completedPercentage), 100)
        };
      }
      return milestone;
    });
    
    // Update states
    setTaskList(updatedTaskList);
    setProjectMilestones(updatedMilestones);
    setSelectedTask(null);
  };

  // useEffect(() => {
  //   const completedTaskPercentage = (completedTasksCount / taskList.length) * 100;
    
  //   // Update the last month's progress in the growth data
  //   const updatedGrowthData = [...growthData];
  //   const currentMonthIndex = growthData.length - 1;
    
  //   // Ensure we don't go out of bounds
  //   if (currentMonthIndex >= 0) {
  //     updatedGrowthData[currentMonthIndex] = {
  //       ...updatedGrowthData[currentMonthIndex],
  //       progress: Math.round(completedTaskPercentage)
  //     };
      
  //     // Update progress in state (you'll need to convert growthData to a state variable)
  //     setGrowthData(updatedGrowthData);
  //   }
  // }, [completedTasksCount, taskList.length]);

  useEffect(() => {
    const completedTaskPercentage = (completedTasksCount / taskList.length) * 100;
    
    // Update the current month's progress in the growth data
    // We'll assume the current month is the last month in the chart
    const updatedGrowthData = [...growthData];
    const currentMonthIndex = growthData.length - 1; // April (index 3)
    
    if (currentMonthIndex >= 0) {
      updatedGrowthData[currentMonthIndex] = {
        ...updatedGrowthData[currentMonthIndex],
        progress: Math.round(completedTaskPercentage)
      };
      
      // Also update progress for past months based on milestone data
      // Update Jan-Mar progress based on the milestone progress values
      for (let i = 0; i < currentMonthIndex; i++) {
        // Calculate which milestone this month belongs to
        const monthToMilestone = {
          'Jan': 1, // Business Setup
          'Feb': 2, // MVP Development (starting)
          'Mar': 2, // MVP Development (continuing)
        };
        
        const monthName = updatedGrowthData[i].month;
        const milestoneId = monthToMilestone[monthName];
        
        if (milestoneId) {
          const milestone = projectMilestones.find(m => m.id === milestoneId);
          if (milestone) {
            updatedGrowthData[i] = {
              ...updatedGrowthData[i],
              progress: milestone.progress
            };
          }
        }
      }
      
      setGrowthData(updatedGrowthData);
    }
  }, [completedTasksCount, taskList.length, projectMilestones]);



  // Add these handler functions with your other handler functions
const handleCampaignInputChange = (e) => {
  const { name, value } = e.target;
  setNewCampaign(prev => ({ ...prev, [name]: value }));
};

const handleCampaignSubmit = (e) => {
  e.preventDefault();
  
  // Create a new campaign with an ID
  const campaignId = campaigns.length > 0 ? Math.max(...campaigns.map(camp => camp.id)) + 1 : 1;
  const campaign = {
    ...newCampaign,
    id: campaignId,
    createdAt: new Date().toISOString(),
    raised: 0, // Start with 0 funds raised
    backers: 0, // Start with 0 backers
    status: 'active'
  };
  
  // Add the new campaign to the list
  setCampaigns([...campaigns, campaign]);
  
  // Reset form and hide it
  setNewCampaign({
    title: '',
    description: '',
    targetAmt: '',
    equityOffered: '',
    minInvestmentAmt: '',
    businessPlan: '',
    financialProjection: '',
    marketAnalysis: '',
    riskFactor: '',
    startDate: '',
    endDate: ''
  });
  setShowCampaignForm(false);
};

const viewCampaignDetails = (campaign) => {
  setSelectedCampaign(campaign);
};
const closeCampaignDetails = () => {
  setSelectedCampaign(null);
};



  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-venture-light dark:bg-venture-accent/20 text-venture-accent mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Step 3: Execute Your Plan</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Execution Dashboard</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Track your progress, manage tasks, and watch your business grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-gradient animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{Math.round(progress)}%</div>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {completedTasksCount} of {taskList.length} tasks completed
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient animate-fade-in" style={{ animationDelay: "150ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Time Remaining</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <Clock className="h-10 w-10 text-venture-primary mr-4" />
                <div>
                  <div className="text-3xl font-bold mb-1">24 days</div>
                  <p className="text-sm text-muted-foreground">Until next milestone</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Potential Funding</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <Users className="h-10 w-10 text-venture-accent mr-4" />
                <div>
                  <div className="text-3xl font-bold mb-1">4</div>
                  <p className="text-sm text-muted-foreground">Matched investors</p>
                </div>
              </CardContent>
            </Card>
          </div>
          


          <Card className="card-gradient animate-fade-in mb-8" style={{ animationDelay: "250ms" }}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Project Growth Map</CardTitle>
                  <CardDescription>Visualize your progress and upcoming milestones</CardDescription>
                </div>
                <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-venture-primary mr-1"></div>
                    <span className="text-xs text-muted-foreground">Progress</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-venture-accent mr-1"></div>
                    <span className="text-xs text-muted-foreground">Target</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={growthData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={(props) => <CustomTooltip {...props} />} />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#targetGradient)" 
                      name="Target"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="#9b87f5" 
                      strokeWidth={3}
                      fill="url(#progressGradient)" 
                      name="Actual Progress"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Project Timeline</h3>
                <div className="space-y-4">
                  {projectMilestones.map((milestone) => (
                    <div key={milestone.id} className="relative">
                      <div className="flex items-center mb-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                          milestone.progress === 100 
                            ? 'bg-venture-primary/20 text-venture-primary' 
                            : milestone.progress > 0 
                              ? 'bg-venture-accent/20 text-venture-accent' 
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {milestone.progress === 100 ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-xs">{milestone.id}</span>
                          )}
                        </div>
                        <h4 className="font-medium">{milestone.name}</h4>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {milestone.start} - {milestone.end}
                        </div>
                      </div>
                      <div className="ml-8 flex items-center">
                        <Progress value={milestone.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground ml-2 w-8 text-right">
                          {milestone.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>



          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in" style={{ animationDelay: "250ms" }}>
            <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-6">
              <TabsTrigger value="tasks" className="flex items-center">
                <List className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Revenue Growth Tracking
              </TabsTrigger>
              <TabsTrigger value="funding" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Funding
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>
                    Track and complete tasks to move your business forward
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Current Tasks</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowAddTaskForm(prev => !prev)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>

{showAddTaskForm && (
  <div className="mb-4 p-4 border rounded-lg bg-background/50 mt-4">
    <h4 className="font-medium mb-3">Add New Task</h4>
    <form onSubmit={handleTaskSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">Task Name</label>
        <input 
          type="text" 
          name="name" 
          value={newTask.name} 
          onChange={handleTaskInputChange}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
          placeholder="Enter task name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <select 
          name="category" 
          value={newTask.category} 
          onChange={handleTaskInputChange}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
          required
        >
          <option value="Legal">Legal</option>
          <option value="Setup">Setup</option>
          <option value="Product">Product</option>
          <option value="Research">Research</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Due Date</label>
        <input 
          type="date" 
          name="dueDate" 
          value={newTask.dueDate} 
          onChange={handleTaskInputChange}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
          required
        />
      </div>
      
      <div className="md:col-span-2 flex justify-end">
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => setShowAddTaskForm(false)}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-venture-primary hover:bg-venture-primary/90 text-white"
        >
          Save Task
        </Button>
      </div>
    </form>
  </div>
)}
                      </div>
                      <div className="space-y-3">
                      {taskList.map((task) => (
  <div 
    key={task.id} 
    className="flex items-start p-3 rounded-lg border border-border hover:bg-background/50 transition-colors cursor-pointer"
    onClick={() => openTaskProgressModal(task)}
  >
    <Checkbox 
      checked={task.completed} 
      onCheckedChange={() => completeTask(task.id)}
      className="mt-1 mr-3"
      onClick={(e) => e.stopPropagation()} // Prevent the card click from triggering
    />
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.name}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="bg-venture-light dark:bg-venture-accent/10 px-2 py-0.5 rounded-full mr-2">
            {task.category}
          </span>
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </div>
))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Categories</h3>
                      <div className="space-y-3">
                        {['Legal', 'Setup', 'Product', 'Research', 'Finance', 'Marketing'].map((category) => {
                          const categoryTasks = taskList.filter(task => task.category === category);
                          const categoryCompleted = categoryTasks.filter(task => task.completed).length;
                          const categoryProgress = categoryTasks.length > 0 
                            ? (categoryCompleted / categoryTasks.length) * 100 
                            : 0;
                            
                          return (
                            <div key={category} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{category}</span>
                                <span className="text-xs text-muted-foreground">
                                  {categoryCompleted}/{categoryTasks.length}
                                </span>
                              </div>
                              <Progress value={categoryProgress} className="h-1.5" />
                            </div>
                          );
                        })}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <h3 className="font-semibold mb-4">Next Milestones</h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>In 24 days</span>
                          </div>
                          <h4 className="font-medium">Complete MVP Design</h4>
                          <div className="text-xs text-muted-foreground mt-1">5 tasks remaining</div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>In 45 days</span>
                          </div>
                          <h4 className="font-medium">Initial User Testing</h4>
                          <div className="text-xs text-muted-foreground mt-1">8 tasks remaining</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Task Progress Modal - Add this at the bottom of your component before the final closing </div> */}
{selectedTask && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-background rounded-lg p-6 w-full max-w-md">
      <h3 className="font-semibold mb-4">Update Task Progress</h3>
      <p className="mb-4">{selectedTask.name}</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Progress: {taskProgress}%</span>
          {taskProgress === 100 && (
            <span className="text-sm text-venture-primary">Completed</span>
          )}
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="25" 
          value={taskProgress} 
          onChange={(e) => setTaskProgress(Number(e.target.value))}
          className="w-full h-2 bg-venture-light rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Not Started</span>
          <span>In Progress</span>
          <span>Complete</span>
        </div>
      </div>
      
      <div className="flex justify-end mt-6 space-x-2">
        <Button 
          variant="outline" 
          onClick={() => setSelectedTask(null)}
        >
          Cancel
        </Button>
        <Button 
          className="bg-venture-primary hover:bg-venture-primary/90 text-white"
          onClick={updateTaskProgress}
        >
          Save Progress
        </Button>
      </div>
    </div>
  </div>
)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Project Calendar</CardTitle>
                  <CardDescription>
                    View and manage your schedule and important dates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Calendar Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      We're working on implementing a full-featured calendar to help you manage your project timeline.
                    </p>
                    <Button variant="outline">Notify Me When Ready</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="growth">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Business Growth Tracking</CardTitle>
                  <CardDescription>
                    Monitor your progress and key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>

                <div>
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold">Revenue Growth vs Goals</h3>
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => setShowRevenueForm(prev => !prev)}
    >
      {showRevenueForm ? 'Cancel' : 'Add Revenue Data'}
    </Button>
  </div>
  
  {showRevenueForm && (
    <div className="mb-4 p-4 border rounded-lg bg-background/50">
      <h4 className="font-medium mb-3">Add New Revenue Entry</h4>
      <form onSubmit={handleRevenueSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Month</label>
          <select 
            name="month" 
            value={newRevenueEntry.month} 
            onChange={handleRevenueInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            required
          >
            <option value="">Select Month</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Actual Revenue</label>
          <input 
            type="number" 
            name="revenue" 
            value={newRevenueEntry.revenue} 
            onChange={handleRevenueInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="₹ 0.00"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Goal Revenue</label>
          <input 
            type="number" 
            name="goalRevenue" 
            value={newRevenueEntry.goalRevenue} 
            onChange={handleRevenueInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="₹ 0.00"
            required
          />
        </div>
        
        <div className="md:col-span-3 flex justify-end">
          <Button 
            type="submit" 
            className="bg-venture-accent hover:bg-venture-accent/90 text-white"
          >
            Save Revenue Data
          </Button>
        </div>
      </form>
    </div>
  )}
  
  <div className="h-80 border rounded-lg p-4">
    {revenueData.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={revenueData}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-background border rounded-md p-3 shadow-md">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-venture-primary">
                    Revenue: ₹{payload[0].value.toLocaleString()}
                  </p>
                  <p className="text-sm text-venture-accent">
                    Goal: ₹{payload[1].value.toLocaleString()}
                  </p>
                  {payload[0].payload.growth !== undefined && (
                    <p className={`text-sm ${payload[0].payload.growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      Growth: {payload[0].payload.growth}%
                    </p>
                  )}
                </div>
              );
            }
            return null;
          }} />
          <Area 
            type="monotone" 
            dataKey="goalRevenue" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="#8B5CF620" 
            name="Goal Revenue"
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#9b87f5" 
            strokeWidth={3}
            fill="#9b87f540" 
            name="Actual Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    ) : (
      // Show this when no revenue data is available
      <div className="h-full flex flex-col items-center justify-center text-center">
        <LineChart className="h-12 w-12 text-muted-foreground mb-2" />
        <h4 className="font-medium mb-1">No Revenue Data Yet</h4>
        <p className="text-muted-foreground text-sm mb-4 max-w-md">
          Add your monthly revenue and goals to start tracking your business growth.
        </p>
        <Button 
          onClick={() => setShowRevenueForm(true)}
          className="bg-venture-accent hover:bg-venture-accent/90 text-white"
        >
          Add Revenue Data
        </Button>
      </div>
    )}
  </div>
  
  {revenueData.length > 0 && (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">Revenue History</h4>
        <Button variant="outline" size="sm" onClick={() => setRevenueData([])}>
          Reset Data
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Month</th>
              <th className="text-right p-2">Revenue</th>
              <th className="text-right p-2">Goal</th>
              <th className="text-right p-2">Growth</th>
              <th className="text-right p-2">Performance</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((entry, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{entry.month}</td>
                <td className="text-right p-2">₹{entry.revenue.toLocaleString()}</td>
                <td className="text-right p-2">₹{entry.goalRevenue.toLocaleString()}</td>
                <td className={`text-right p-2 ${entry.growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {entry.growth}%
                </td>
                <td className="text-right p-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    entry.revenue >= entry.goalRevenue 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : entry.revenue >= entry.goalRevenue * 0.8
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {entry.revenue >= entry.goalRevenue 
                      ? 'Exceeding' 
                      : entry.revenue >= entry.goalRevenue * 0.8
                        ? 'On Track'
                        : 'Below Target'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>


                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="funding">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Investor Matching</CardTitle>
                  <CardDescription>
                    Connect with investors interested in ventures like yours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-4">Top Matching Investors</h3>
                    <div className="space-y-4">
                      {investors.map((investor, i) => (
                        <div key={i} className="border rounded-lg overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="bg-venture-light dark:bg-venture-accent/10 p-4 md:w-1/4 flex flex-col justify-center items-center text-center">
                              <div className="text-2xl font-bold text-venture-accent mb-1">{investord[i%4].match}%</div>
                              <div className="text-sm text-muted-foreground">Match</div>
                            </div>
                            <div className="p-4 flex-1">
                              <h4 className="font-medium text-lg mb-2">{investor.firstName}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                <div>
                                  <span className="font-medium text-muted-foreground">Focus: </span>
                                  {investor.industryInterests}
                                </div>
                                <div>
                                  <span className="font-medium text-muted-foreground">Stage: </span>
                                  {investord[i%4].stage}
                                </div>
                                <div>
                                  <span className="font-medium text-muted-foreground">Investment: </span>
                                  {investord[i%4].investmentRange}
                                </div>
                                <div>
                                  <span className="font-medium text-muted-foreground">Notable Investments: </span>
                                  {investord[i%4].portfolio.join(", ")}
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <Button variant="outline" size="sm">
                                  View Profile
                                </Button>
                                <Button className="ml-2 bg-venture-accent hover:bg-venture-accent/90 text-white" size="sm">
                                  Shedule meeting
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Prepare for Funding</h3>
                    <div className="card-gradient rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-7 h-7 rounded-full bg-venture-light dark:bg-venture-accent/20 flex items-center justify-center mr-3 shrink-0">
                            <span className="font-medium text-venture-accent">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Create a Pitch Deck</h4>
                            <p className="text-sm text-muted-foreground">
                              Develop a compelling presentation that explains your business vision, market opportunity, and growth plan.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-7 h-7 rounded-full bg-venture-light dark:bg-venture-accent/20 flex items-center justify-center mr-3 shrink-0">
                            <span className="font-medium text-venture-accent">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Prepare Financial Projections</h4>
                            <p className="text-sm text-muted-foreground">
                              Create detailed financial forecasts showing revenue growth, expenses, and funding requirements.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-7 h-7 rounded-full bg-venture-light dark:bg-venture-accent/20 flex items-center justify-center mr-3 shrink-0">
                            <span className="font-medium text-venture-accent">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Develop a Prototype or MVP</h4>
                            <p className="text-sm text-muted-foreground">
                              Investors want to see tangible progress. Complete your MVP to demonstrate traction.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button className="bg-venture-primary hover:bg-venture-primary/90">
                          Start Pitch Preparation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Add this section inside the TabsContent with value="funding" before the closing CardContent tag */}
<div className="mt-8">
  <h3 className="font-semibold mb-4">Funding Campaigns</h3>
  <div className="flex justify-end mb-4">
    <Button 
      className="bg-venture-primary hover:bg-venture-primary/90 text-white"
      onClick={() => setShowCampaignForm(prev => !prev)}
    >
      Create Funding Campaign
    </Button>
  </div>
  
  {showCampaignForm && (
    <div className="mb-6 p-4 border rounded-lg bg-background/50">
      <h4 className="font-medium mb-3">Create New Funding Campaign</h4>
      <form onSubmit={handleCampaignSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Title</label>
          <input 
            type="text" 
            name="title" 
            value={newCampaign.title} 
            onChange={handleCampaignInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Enter campaign title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Amount (₹)</label>
          <input 
            type="number" 
            name="targetAmt" 
            value={newCampaign.targetAmt} 
            onChange={handleCampaignInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Enter target amount"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Equity Offered (%)</label>
          <input 
            type="number" 
            name="equityOffered" 
            value={newCampaign.equityOffered} 
            onChange={handleCampaignInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Enter equity percentage"
            min="0"
            max="100"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Minimum Investment (₹)</label>
          <input 
            type="number" 
            name="minInvestmentAmt" 
            value={newCampaign.minInvestmentAmt} 
            onChange={handleCampaignInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Enter minimum investment"
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            name="description" 
            value={newCampaign.description} 
            onChange={handleCampaignInputChange}
            rows="3"
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Enter campaign description"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Business Plan</label>
          <textarea 
            name="businessPlan" 
            value={newCampaign.businessPlan} 
            onChange={handleCampaignInputChange}
            rows="3"
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Outline your business plan"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Financial Projection</label>
          <textarea 
            name="financialProjection" 
            value={newCampaign.financialProjection} 
            onChange={handleCampaignInputChange}
            rows="3"
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Describe financial projections"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Market Analysis</label>
          <textarea 
            name="marketAnalysis" 
            value={newCampaign.marketAnalysis} 
            onChange={handleCampaignInputChange}
            rows="3"
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="Provide market analysis"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Risk Factors</label>
          <textarea 
            name="riskFactor" 
            value={newCampaign.riskFactor} 
            onChange={handleCampaignInputChange}
            rows="3"
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            placeholder="List potential risk factors"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <input 
            type="date" 
            name="startDate" 
            value={newCampaign.startDate} 
            onChange={handleCampaignInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <input 
            type="date" 
            name="endDate" 
            value={newCampaign.endDate} 
            onChange={handleCampaignInputChange}
            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
            required
          />
        </div>
        
        <div className="md:col-span-2 flex justify-end">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => setShowCampaignForm(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-venture-primary hover:bg-venture-primary/90 text-white"
            onClick={() => handleSubmit()}
          >
            Launch Campaign
          </Button>
        </div>
      </form>
    </div>
  )}
  
  {/* Campaign Cards */}
  {campaigns.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {campaigns.map(campaign => (
        <div 
          key={campaign.id} 
          className="border rounded-lg overflow-hidden cursor-pointer hover:border-venture-accent transition-colors"
          onClick={() => viewCampaignDetails(campaign)}
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-lg">{campaign.title}</h4>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                campaign.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                campaign.status === 'ended' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
              }`}>
                {campaign.status === 'active' ? 'Active' : 
                 campaign.status === 'ended' ? 'Ended' : 'Pending'}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {campaign.description}
            </p>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>₹{campaign.raised.toLocaleString()} raised</span>
                <span>₹{parseInt(campaign.targetAmt).toLocaleString()} goal</span>
              </div>
              <Progress 
                value={(campaign.raised / parseInt(campaign.targetAmt)) * 100} 
                className="h-2" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Equity Offered: </span>
                {campaign.equityOffered}%
              </div>
              <div>
                <span className="font-medium">Min Investment: </span>
                ₹{parseInt(campaign.minInvestmentAmt).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Backers: </span>
                {campaign.backers}
              </div>
              <div>
                <span className="font-medium">Closes: </span>
                {new Date(campaign.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 border rounded-lg">
      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
      <h4 className="font-medium mb-1">No Active Campaigns</h4>
      <p className="text-muted-foreground text-sm mb-4">
        Create your first funding campaign to attract investors.
      </p>
      <Button 
        onClick={() => setShowCampaignForm(true)}
        className="bg-venture-primary hover:bg-venture-primary/90 text-white"
      >
        Create Campaign
      </Button>
    </div>
  )}
</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExecutionPage;
