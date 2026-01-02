'use client';

import type { ProgressInsightsOutput } from '@/ai/flows/generate-progress-insights';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Target, Book, BrainCircuit, BarChart, TrendingUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from './ui/badge';


interface SubjectInsightsProps {
  insights: ProgressInsightsOutput;
}

const InsightCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex gap-4">
        <div className="text-primary mt-1">{icon}</div>
        <div>
            <h4 className="font-semibold">{title}</h4>
            <div className="text-muted-foreground text-sm">{children}</div>
        </div>
    </div>
);

export default function SubjectInsights({ insights }: SubjectInsightsProps) {
  const chartData = [
      { subject: 'Academics', value: 60, fullMark: 100 },
      { subject: 'Skills', value: 40, fullMark: 100 },
      { subject: 'Focus', value: 75, fullMark: 100 },
      { subject: 'Consistency', value: 80, fullMark: 100 },
      { subject: 'Accuracy', value: 55, fullMark: 100 },
  ];


  return (
    <Card className="glass-card glowing-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            AI-Powered Subject Insights
        </CardTitle>
        <CardDescription>{insights.overallSummary}</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6 items-center">
        
        <div className="space-y-6">
            {insights.weakTopics.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-destructive" /> 
                    Areas to Focus On
                </h3>
                <div className="space-y-2">
                  {insights.weakTopics.map((topic, index) => (
                    <div key={index} className="p-3 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
                      <p className="font-semibold">{topic.subject}: {topic.topic}</p>
                      <p className="text-sm text-muted-foreground">{topic.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Your AI Recommendations
                </h3>
                <div className="space-y-4">
                     <InsightCard icon={<BarChart />} title="Time Allocation">
                        <p>{insights.recommendations.timeAllocation}</p>
                    </InsightCard>
                    <InsightCard icon={<Book />} title="Next Steps">
                        <p>Academics: <Badge variant="secondary">{insights.recommendations.nextAcademicTopic}</Badge></p>
                         <p className='mt-1'>Skills: <Badge variant="secondary">{insights.recommendations.nextSkillTask}</Badge></p>
                    </InsightCard>
                </div>
            </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Student" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
      </CardContent>
    </Card>
  );
}
