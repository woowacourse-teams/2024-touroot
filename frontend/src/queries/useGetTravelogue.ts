import { useQuery } from "@tanstack/react-query";

import { Travelogue } from "@type/domain/travelogue";

import { getTravelogue } from "@apis/travelogue";

export const useGetTravelogue = (id: string) => {
  return useQuery<Travelogue>({
    queryKey: [`travelogues/${id}`],
    queryFn: () => getTravelogue(id),
  });
};
