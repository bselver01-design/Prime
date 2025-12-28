import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      const res = await fetch(api.faqs.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return api.faqs.list.responses[200].parse(await res.json());
    },
  });
}
