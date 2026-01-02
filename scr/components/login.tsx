'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Icons } from './icons';
import { GOURAV_USER, KAVISHA_USER } from '@/lib/dummy-data';
import type { UserData } from '@/lib/types';

interface LoginProps {
  onLoginSuccess: (user: UserData) => void;
  onBack: () => void;
}

export default function Login({ onLoginSuccess, onBack }: LoginProps) {
  const { toast } = useToast();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      let user: UserData | null = null;

      if (id === 'Skillflow2025' && password === 'Gourav@123') {
        user = GOURAV_USER;
      } else if (id === 'Skillflow2025' && password === 'Kavisha@123') {
        user = KAVISHA_USER;
      }

      if (user) {
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${user.name}!`,
          duration: 2000,
        });
        onLoginSuccess(user);
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid ID or password.',
          duration: 2000,
        });
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login to ORBIT</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                type="text"
                placeholder="Your ID"
                value={id}
                onChange={e => setId(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" disabled={isSubmitting}>
             <Icons.logo className="mr-2 h-4 w-4" /> Google
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <Button variant="link" className="p-0 h-auto">Sign Up</Button>
          </p>
          <Button variant="link" onClick={onBack} className="text-sm">
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
