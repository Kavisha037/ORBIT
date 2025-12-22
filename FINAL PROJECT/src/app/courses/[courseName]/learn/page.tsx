'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { pythonCourseData, type CourseData as PythonCourseData, type Topic } from '@/lib/python-course-data';
import { javaCourseData, type CourseData as JavaCourseData } from '@/lib/java-course-data';
import { htmlCourseData, type CourseData as HtmlCourseData } from '@/lib/html-course-data';
import { ArrowLeft, Youtube, Menu } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CourseData = PythonCourseData | JavaCourseData | HtmlCourseData;

const courseDataMap: { [key: string]: CourseData | {title: string, description: string, topics: Topic[]} } = {
    python: pythonCourseData,
    java: javaCourseData,
    html: htmlCourseData,
};

const VideoPlayer = ({ videoUrl, onClose }: { videoUrl: string, onClose: () => void }) => {
    if (!videoUrl) return null;
  
    const videoId = new URL(videoUrl).searchParams.get('v');
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <Dialog open={!!videoUrl} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="max-w-4xl p-0 border-0">
            <div className="aspect-video">
                <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </DialogContent>
      </Dialog>
    );
};

const TopicSidebar = ({ topics, selectedTopic, onSelectTopic, courseTitle }: { topics: Topic[], selectedTopic: Topic, onSelectTopic: (topic: Topic) => void, courseTitle: string }) => {
    return (
        <ScrollArea className="h-full pr-4">
            <nav className="space-y-1">
                <h2 className="px-4 pt-2 pb-2 text-lg font-semibold tracking-tight">{courseTitle} Tutorial</h2>
                {topics.map((topic) => (
                    <Button
                        key={topic.id}
                        variant="ghost"
                        className={cn(
                            'w-full justify-start',
                            selectedTopic.id === topic.id && 'bg-accent text-accent-foreground'
                        )}
                        onClick={() => onSelectTopic(topic)}
                    >
                        {topic.title}
                    </Button>
                ))}
            </nav>
        </ScrollArea>
    );
};

const TopicContent = ({ topic, onVideoSelect }: { topic: Topic, onVideoSelect: (url: string) => void }) => {
    const courseData = courseDataMap[useParams().courseName as string] as CourseData;
    
    return (
        <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">{topic.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="prose prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: topic.notes }} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="practice">
                 <Card>
                    <CardHeader>
                        <CardTitle>Practice Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topic.practiceQuestions.length > 0 ? (
                            <ul className="space-y-4">
                                {topic.practiceQuestions.map((q, i) => (
                                    <li key={i} className="p-4 bg-background/50 rounded-lg">{q}</li>
                                ))}
                            </ul>
                        ): (
                            <p>No practice questions for this topic yet.</p>
                        )}
                    </CardContent>
                 </Card>
            </TabsContent>
            <TabsContent value="videos">
                {'youtubeSuggestions' in courseData && courseData.youtubeSuggestions && <YoutubeSuggestions videos={courseData.youtubeSuggestions} onVideoSelect={onVideoSelect} />}
            </TabsContent>
        </Tabs>
    );
};


const YoutubeSuggestions = ({ videos, onVideoSelect }: { videos: { title: string, url: string }[], onVideoSelect: (url: string) => void }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <Youtube className="h-6 w-6 text-red-500" />
                    Suggested YouTube Videos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => {
                        const videoId = new URL(video.url).searchParams.get('v');
                        const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '';
                        return (
                            <button key={video.title} onClick={() => onVideoSelect(video.url)} className="block group text-left">
                                <Card className="overflow-hidden h-full">
                                    <div className="aspect-video overflow-hidden">
                                        {thumbnailUrl && <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />}
                                    </div>
                                    <CardContent className="p-4">
                                        <p className="font-semibold line-clamp-2">{video.title}</p>
                                    </CardContent>
                                </Card>
                            </button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};


export default function LearnPage() {
    const params = useParams();
    const courseName = typeof params.courseName === 'string' ? params.courseName.toLowerCase() : '';
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [playingVideoUrl, setPlayingVideoUrl] = useState<string>('');
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    useEffect(() => {
        if(courseName && courseDataMap[courseName]) {
            const data = courseDataMap[courseName] as CourseData;
            setCourseData(data);
            setSelectedTopic(data.topics[0]);
        }
    }, [courseName]);
    
    const handleSelectTopic = (topic: Topic) => {
        setSelectedTopic(topic);
        setIsSheetOpen(false); // Close sheet on topic selection
    }

    if (!courseData || !selectedTopic) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <p>Loading course...</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
                <div className='flex items-center gap-4'>
                    <Link href={`/courses/${courseName}`} passHref>
                        <Button asChild variant="outline" size="icon" className="h-8 w-8">
                            <span><ArrowLeft className="h-4 w-4" /></span>
                        </Button>
                    </Link>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-primary">{courseData.title}</h1>
                </div>
                 <div className="flex items-center gap-2">
                    <p className="text-muted-foreground hidden md:block">{courseData.description}</p>
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-3/4">
                             <TopicSidebar
                                topics={courseData.topics}
                                selectedTopic={selectedTopic}
                                onSelectTopic={handleSelectTopic}
                                courseTitle={courseData.title}
                            />
                        </SheetContent>
                    </Sheet>
                 </div>
            </header>

            <div className="grid md:grid-cols-[250px_1fr] gap-8 p-4 md:p-8">
                <aside className="hidden md:block sticky top-20 h-[calc(100vh-8rem)]">
                    <TopicSidebar
                        topics={courseData.topics}
                        selectedTopic={selectedTopic}
                        onSelectTopic={handleSelectTopic}
                        courseTitle={courseData.title}
                    />
                </aside>
                <main className="space-y-8">
                    <TopicContent topic={selectedTopic} onVideoSelect={setPlayingVideoUrl} />
                </main>
            </div>
            <VideoPlayer videoUrl={playingVideoUrl} onClose={() => setPlayingVideoUrl('')} />
        </div>
    );
}
