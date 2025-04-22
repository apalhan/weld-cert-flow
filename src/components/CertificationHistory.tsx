
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { toast } from '@/components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';

interface CertificationSurvey {
  id: string;
  trainee_name: string;
  area_examined: string;
  certification_type: string;
  beginning_date: string;
  created_at: string;
  trainer_initials: string;
  trainee_initials: string;
}

const CertificationHistory = () => {
  const [surveys, setSurveys] = useState<CertificationSurvey[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSurvey, setSelectedSurvey] = useState<CertificationSurvey | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuth();
  const itemsPerPage = 5;

  useEffect(() => {
    if (user) {
      fetchSurveys();
    }
  }, [user, currentPage]);

  const fetchSurveys = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get total count for pagination
      const { count, error: countError } = await supabase
        .from('certification_surveys')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id);

      if (countError) throw countError;

      // Calculate total pages
      const totalItems = count || 0;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));

      // Fetch paginated results
      const { data, error } = await supabase
        .from('certification_surveys')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (error) throw error;
      setSurveys(data || []);
    } catch (error) {
      toast.error('Failed to load certification history', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (survey: CertificationSurvey) => {
    setSelectedSurvey(survey);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <Card className="p-6 w-full max-w-5xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">Certification History</h2>
          <p className="text-industrial-600">View your past certification submissions</p>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading certification history...</div>
        ) : surveys.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-industrial-600">No certification records found.</p>
            <p className="text-industrial-500 mt-2">
              Start a new certification process to see records here.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trainee Name</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Date Started</TableHead>
                  <TableHead className="hidden md:table-cell">Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {surveys.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell className="font-medium">{survey.trainee_name}</TableCell>
                    <TableCell>{survey.area_examined}</TableCell>
                    <TableCell>
                      <span className="capitalize">{survey.certification_type}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(survey.beginning_date)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatTimeAgo(survey.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(survey)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    {currentPage === 1 ? (
                      <Button
                        variant="outline"
                        size="icon"
                        disabled
                        className="cursor-not-allowed opacity-50"
                      >
                        <span className="sr-only">Previous page</span>
                        <span className="h-4 w-4">←</span>
                      </Button>
                    ) : (
                      <PaginationPrevious 
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      />
                    )}
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    {currentPage === totalPages ? (
                      <Button
                        variant="outline"
                        size="icon"
                        disabled
                        className="cursor-not-allowed opacity-50"
                      >
                        <span className="sr-only">Next page</span>
                        <span className="h-4 w-4">→</span>
                      </Button>
                    ) : (
                      <PaginationNext 
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Certification Details</DialogTitle>
            <DialogDescription>
              Full details of the certification submission
            </DialogDescription>
          </DialogHeader>
          {selectedSurvey && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Trainee Name:</div>
                <div>{selectedSurvey.trainee_name}</div>
                
                <div className="font-semibold">Area Examined:</div>
                <div>{selectedSurvey.area_examined}</div>
                
                <div className="font-semibold">Certification Type:</div>
                <div className="capitalize">{selectedSurvey.certification_type}</div>
                
                <div className="font-semibold">Beginning Date:</div>
                <div>{formatDate(selectedSurvey.beginning_date)}</div>
                
                <div className="font-semibold">Trainer Initials:</div>
                <div>{selectedSurvey.trainer_initials}</div>
                
                <div className="font-semibold">Trainee Initials:</div>
                <div>{selectedSurvey.trainee_initials}</div>
                
                <div className="font-semibold">Submitted:</div>
                <div>{formatDate(selectedSurvey.created_at)}</div>
              </div>
              <DialogClose asChild>
                <Button className="w-full mt-4">Close</Button>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CertificationHistory;
