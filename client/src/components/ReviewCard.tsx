import { Star, CheckCircle2 } from "lucide-react";
import { type Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#121522] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col">
      <div className="flex items-center gap-1 mb-4 text-primary">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < (review.rating || 5) ? "fill-current" : "text-muted-foreground/30"}`} 
          />
        ))}
      </div>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
        "{review.content}"
      </p>
      
      <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
        <span className="font-semibold text-white text-sm">{review.name}</span>
        {review.tag && (
          <div className="flex items-center gap-1.5 text-xs text-primary/80 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {review.tag}
          </div>
        )}
      </div>
    </div>
  );
}
