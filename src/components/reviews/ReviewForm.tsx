import { useState, useEffect } from "react";
import { Star, Clock } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { getSafeErrorMessage, logError } from "@/lib/errorMessages";
import { useRateLimit } from "@/hooks/useRateLimit";

// Zod schema for review validation
const reviewSchema = z.object({
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  reviewText: z.string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be less than 500 characters"),
  orderId: z.string().uuid("Invalid order ID"),
  customerName: z.string().trim().min(1, "Customer name is required").max(100, "Customer name must be less than 100 characters"),
});

interface ReviewFormProps {
  orderId: string;
  customerName: string;
  onSuccess?: () => void;
}

export function ReviewForm({ orderId, customerName, onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Rate limiting: 3 reviews per hour
  const { isLimited, remainingTime, checkLimit, recordAttempt } = useRateLimit({
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    storageKey: `review_rate_limit_${user?.id || 'guest'}`,
  });

  useEffect(() => {
    checkLimit();
    const interval = setInterval(checkLimit, 1000);
    return () => clearInterval(interval);
  }, [checkLimit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Check rate limit
    if (checkLimit()) {
      toast({
        title: "Rate Limited",
        description: `Please wait ${remainingTime} seconds before submitting another review.`,
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    // Validate with Zod schema
    const validationResult = reviewSchema.safeParse({
      rating,
      reviewText: reviewText.trim(),
      orderId,
      customerName: customerName || "Valued Customer",
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      setValidationError(firstError.message);
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    const validatedData = validationResult.data;

    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("reviews").insert({
        user_id: user.id,
        order_id: validatedData.orderId,
        customer_name: validatedData.customerName,
        rating: validatedData.rating,
        review_text: validatedData.reviewText,
      }).select().single();

      if (error) {
        logError("Supabase insert error", error);
        throw error;
      }

      // Send email notification to admins (fire and forget)
      // Now passes only the reviewId - the edge function fetches data securely and verifies ownership
      if (data?.id) {
        supabase.functions.invoke("send-review-notification", {
          body: {
            reviewId: data.id,
          },
        }).then(({ error: notifError }) => {
          if (notifError) {
            logError("Failed to send review notification", notifError);
          }
        });
      }

      // Record successful submission for rate limiting
      recordAttempt();

      toast({
        title: "Review Submitted!",
        description: "Thank you! Your review will appear after approval.",
        variant: "default",
        className: "bg-green-500 text-white border-green-600",
      });

      setReviewText("");
      setRating(5);
      setValidationError(null);
      onSuccess?.();
    } catch (error: any) {
      logError("Submit review", error);
      toast({
        title: "Submission Failed",
        description: getSafeErrorMessage(error, "Failed to submit review"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLimited) {
    return (
      <div className="p-4 rounded-lg border border-warning/20 bg-warning/10 text-center">
        <Clock className="h-8 w-8 mx-auto mb-2 text-warning" />
        <p className="font-medium text-warning">Rate Limited</p>
        <p className="text-sm text-muted-foreground mt-1">
          Please wait {remainingTime} seconds before submitting another review.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={`transition-colors ${star <= (hoverRating || rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                  }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <Textarea
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            setValidationError(null);
          }}
          placeholder="Tell us about your experience (minimum 10 characters)..."
          rows={4}
          maxLength={500}
          required
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground">
            {reviewText.length}/500 characters (min 10)
          </p>
          {validationError && (
            <p className="text-xs text-destructive">{validationError}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={submitting || reviewText.trim().length < 10}>
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
