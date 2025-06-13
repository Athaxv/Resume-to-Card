'use client';

import React from 'react';
import Image from 'next/image';
// import { UserCardData } from '@/lib/types';
import { Edit, Trash2, Calendar, MapPin, Mail, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

// interface UserCardProps {
//   card: UserCardData;
//   onEdit: () => void;
//   onDelete: () => void;
// }

export function UserCard({ card, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete();
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card border-border">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {card.image ? (
            <Image
              src={card.image}
              alt={`${card.name}'s profile`}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {card.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold mb-1">{card.name}</h3>
            <p className="text-sm opacity-90">{card.title}</p>
          </div>
          <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" onClick={onEdit} className="h-8 w-8">
              <Edit className="h-3 w-3" />
              <span className="sr-only">Edit card</span>
            </Button>
            <Button size="icon" variant="destructive" onClick={handleDelete} className="h-8 w-8">
              <Trash2 className="h-3 w-3" />
              <span className="sr-only">Delete card</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{card.experience} years</span>
          </div>
          {card.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{card.location}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {card.bio}
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {card.skills.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {card.email && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={`mailto:${card.email}`} className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span className="sr-only">Email {card.name}</span>
                    </a>
                  </Button>
                )}
                {card.website && (
                  <Button size="sm" variant="outline" asChild>
                    <a 
                      href={card.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="sr-only">Visit {card.name}'s website</span>
                    </a>
                  </Button>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(card.createdAt))} ago
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}