import React from 'react';

interface SkillPillProps {
  skill: string;
}

export default function SkillPill({ skill }: SkillPillProps) {
  return (
    <span className="px-3 py-1 text-sm border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300">
      {skill}
    </span>
  );
}
