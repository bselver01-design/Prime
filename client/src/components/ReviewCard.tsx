import { Star, CheckCircle2 } from "lucide-react";
import { type Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div 
      className="bg-white/[0.03] border border-white/10 rounded-[16px] p-4 h-full flex flex-col"
      data-testid={`review-card-${review.id}`}
    >
      <div className="flex items-center gap-0.5 mb-3 text-white/85 text-sm tracking-wider">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < (review.rating || 5) ? "fill-current text-[#39d353]" : "text-white/20"}`} 
          />
        ))}
      </div>
      
      <p className="text-white/65 text-sm leading-relaxed mb-4 flex-grow">
        "{review.content}"
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="font-extrabold text-sm" data-testid={`review-name-${review.id}`}>
          {review.name}
        </span>
        {review.tag && (
          <span className="text-[11px] text-white/55 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#39d353]" />
            {review.tag}
          </span>
        )}
      </div>
    </div>
  );
}
