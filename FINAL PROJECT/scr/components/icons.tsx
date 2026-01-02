import type { LucideProps } from 'lucide-react';
import { Code2, Film, PenTool, Flame, ShieldCheck, Trophy, Wind, Sparkles, Bot } from 'lucide-react';

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 7.00017C10 7.00017 14.166 7.00017 15.5 7.00017C18.5 7.00017 20 9.00004 20 11C20 13 18.5 15 15.5 15H8.5C5.5 15 4 17 4 19C4 21 5.5 23 8.5 23C11.5 23 13 21 13 19" />
    </svg>
  ),
  coding: Code2,
  design: PenTool,
  video: Film,
  streak: Flame,
  level: ShieldCheck,
  achievement: Trophy,
  wind: Wind,
  sparkles: Sparkles,
  bot: Bot
};

export const SKILL_ICON_MAP: { [key: string]: React.FC<LucideProps> } = {
    'Coding': Icons.coding,
    'Design': Icons.design,
    'Video Editing': Icons.video,
};
