"use client";
import { Provider } from "react-redux";
import { store } from "@/GlobalRedux/store";
import Header from "@/components/Header";
import { QueryClientProvider, QueryClient } from "react-query";
import FooterComponent from "@/components/FooterComponent";
import { CheckUserLogInProvider } from "@/Helpers/CheckUserLoginProvider";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <CheckUserLogInProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <FooterComponent />
        </QueryClientProvider>
      </Provider>
    </CheckUserLogInProvider>
  );
};

export default Providers;
