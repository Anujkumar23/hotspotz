"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GetUserfromLocalStorage } from "@/utils";
import { useRouter } from "next/navigation";

export const CheckUserLogInProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const user = GetUserfromLocalStorage();
  if (user) {
    if (user?.email) {
      return children;
    } else {
      router.push("/login");
      return (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      );
    }
  }
};
