import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const queryClient = new QueryClient();

export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
