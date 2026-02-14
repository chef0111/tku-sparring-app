import { Edit } from 'lucide-react';
import { Header } from '../../header';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';

export const TournamentViewerLoading = () => {
  return (
    <div className="flex h-full flex-col">
      <Header
        title={
          <h1 className="hover:text-black dark:hover:text-white">
            Tournaments
          </h1>
        }
        action={<Skeleton className="h-6 w-32" />}
      >
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-1 size-4" />
            Edit Tournament
          </Button>
        </div>
      </Header>

      <div className="flex-1 overflow-auto p-6">
        <div className="mt-36 flex w-full flex-col items-center justify-center">
          <Spinner size="xl" variant="foreground" />
          <p className="text-muted-foreground mt-4 text-lg font-semibold">
            Loading tournament...
          </p>
        </div>
      </div>
    </div>
  );
};
