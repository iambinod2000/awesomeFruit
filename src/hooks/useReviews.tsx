import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
}

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      // Fetch profiles separately to get user names
      const userIds = [...new Set(reviewsData?.map(r => r.user_id) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name')
        .in('user_id', userIds);

      // Merge the data
      const reviewsWithNames = reviewsData?.map(review => {
        const profile = profilesData?.find(p => p.user_id === review.user_id);
        return {
          ...review,
          user_name: profile 
            ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Anonymous'
            : 'Anonymous'
        };
      });

      setReviews(reviewsWithNames || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: { rating: number; comment: string; user_id: string }) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchReviews();
      toast({
        title: "Success",
        description: "Review submitted successfully"
      });
      return { data, error: null };
    } catch (error) {
      console.error('Error creating review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    createReview,
    refetch: fetchReviews
  };
};
