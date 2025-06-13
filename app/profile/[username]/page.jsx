'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardLayout } from '@/components/card-layout';
import { DeveloperCard } from '@/components/developer-card';
import { UserCard } from '@/components/user-card';
// import { ThemeToggle } from '@/components/theme-toggle';
import { useLocalStorage } from '@/hooks/use-local-storage';
// import { UserCardData } from '@/lib/types';
import { developerData } from '@/lib/mock-data';
import { Plus, Users, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  const [userCards, setUserCards] = useLocalStorage('user-cards', []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // const handleEditCard = (card) => {
  //   router.push(`/edit/${card.id}`);
  // };

  // const handleDeleteCard = (id) => {
  //   setUserCards(userCards.filter(card => card.id !== id));
  // };

  const handleCreateCard = () => {
    router.push('/resume');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading cards...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-3 min-h-screen bg-background">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Developer Resume Cards Section */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Developer Resumes</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Explore profiles of talented developers showcasing their skills, experience, and expertise 
            in modern web development technologies.
          </p>
          
          <CardLayout>
            {developerData.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </CardLayout>
        </section>

        {/* User-Generated Cards Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plus className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Your Cards</h2>
            </div>
            <Button 
              onClick={handleCreateCard}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Card</span>
            </Button>
          </div>
          
          <p className="text-muted-foreground max-w-2xl">
            Create and manage your own custom cards. Add your information, skills, and showcase 
            your unique profile to the community.
          </p>

          {userCards.length > 0 ? (
            <CardLayout>
              {userCards.map((card) => (
                <UserCard
                  key={card.id}
                  card={card}
                  onEdit={() => handleEditCard(card)}
                  onDelete={() => handleDeleteCard(card.id)}
                />
              ))}
            </CardLayout>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No cards yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first card to get started
              </p>
              <Button onClick={handleCreateCard}>
                Create Your First Card
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}