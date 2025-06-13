'use client';

import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DeveloperCard({ developer }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card border-border rounded-xl">
      <CardHeader className="p-0">
        <div className="relative min-h-[130px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {developer.image ? (
            <Image
              src={developer.image}
              alt={`${developer.name}'s profile`}
              fill
              priority
              className="object-cover object-center w-full h-full"
              style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <span className="text-4xl font-bold text-primary">
                {developer.name?.charAt(0) || ''}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
          <div className="absolute bottom-4 left-4 text-white z-10">
            <h3 className="text-xl font-bold mb-0">{developer.name}</h3>
            <p className="text-sm opacity-90">{developer.title}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className=" space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {developer.bio}
        </p>
        <div>
          <h4 className="text-xs font-semibold mb-1 text-foreground uppercase tracking-wide">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {developer.skills?.slice(0, 5).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs px-2 py-1 rounded">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        {(developer.github || developer.linkedin) && (
          <div className="flex gap-2 pt-2">
            {developer.github && (
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub profile of ${developer.name}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {developer.linkedin && (
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${developer.name}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-[#e8f4fd] dark:hover:bg-[#0a66c2]/20 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
        {Array.isArray(developer.projects) && developer.projects.length > 0 && (
          <div className="pt-3 border-t border-border">
            <h4 className="text-xs font-semibold mb-2 text-foreground uppercase tracking-wide">Projects</h4>
            <ul className="space-y-1">
              {developer.projects.map((project, idx) => (
                <li key={project.url || project.name || idx} className="flex items-start gap-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    {project.name}
                    <ExternalLink className="h-3 w-3 inline" />
                  </a>
                  {project.description && (
                    <span className="text-xs text-muted-foreground ml-2">{project.description}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
