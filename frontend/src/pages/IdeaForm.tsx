
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { generateBusinessAnalysis } from "@/services/geminiService";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  industry: z.string().min(3, {
    message: "Industry must be at least 3 characters.",
  }),
  targetAudience: z.string().min(10, {
    message: "Target audience description must be at least 10 characters.",
  }),
  uniqueSelling: z.string().min(10, {
    message: "Unique selling proposition must be at least 10 characters.",
  }),
});

const IdeaForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      industry: "",
      targetAudience: "",
      uniqueSelling: "",
    },
  });

  // Remove the duplicate handleSubmit function and use formSubmit
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const industry = formData.get("industry") as string;
      const targetAudience = formData.get("targetAudience") as string;
      const uniqueSelling = formData.get("uniqueSelling") as string;

      const businessIdea = {
        title,
        description,
        industry,
        targetAudience,
        uniqueSelling
      };

      // Show loading toast
      toast({
        title: "Analyzing your idea...",
        description: "This may take a moment.",
      });

      // Generate analysis using Gemini API
      const analysis = await generateBusinessAnalysis(businessIdea);
      
      // Store both the idea and analysis in sessionStorage
      sessionStorage.setItem("businessIdea", JSON.stringify(businessIdea));
      sessionStorage.setItem("businessAnalysis", JSON.stringify(analysis));
      
      // Show success toast and redirect
      toast({
        title: "Analysis complete!",
        description: "Redirecting to results...",
      });
      
      // Navigate to analysis page
      navigate("/analysis");
    } catch (error) {
      console.error("Error submitting idea:", error);
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navbar />
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-venture-light dark:bg-venture-accent/20 text-venture-accent mb-4">
              <Lightbulb className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Step 1: Share Your Idea</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Bring Your Vision to Life
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Describe your business idea in detail to receive a comprehensive
              analysis and roadmap for execution.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={formSubmit}
              className="space-y-8 animate-fade-in"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. AI-Powered Tutoring Platform" {...field} />
                    </FormControl>
                    <FormDescription>
                      What is the name of your business idea?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your business idea in detail"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed explanation of your business idea,
                      including the problem it solves and the solution it
                      offers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Education, Healthcare, Finance"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Which industry does your business idea belong to?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your ideal customer"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Who is your ideal customer? Describe their demographics,
                      needs, and pain points.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uniqueSelling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Selling Proposition</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What makes your idea different?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What makes your business idea unique and different from
                      existing solutions?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit" className="w-full bg-venture-accent hover:bg-venture-accent/90 text-white">
                {isSubmitting && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Analyze My Idea
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IdeaForm;
