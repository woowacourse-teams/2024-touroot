import { renderHook } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { usePostTravelPlan } from "@queries/usePostTravelPlan";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

export const wrapper = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const createTravelPlanRegisterHook = () =>
  renderHook(() => usePostTravelPlan(), {
    wrapper,
  });
