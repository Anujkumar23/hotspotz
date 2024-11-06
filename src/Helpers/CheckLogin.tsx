"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { GetUserfromLocalStorage } from "@/utils";
import { useRouter } from "next/navigation";

export const CheckLogin: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const user = GetUserfromLocalStorage();

  if (user) {
    if (!user?.email) {
      return children;
    } else {
      router.push("/");
      return (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      );
    }
  }
};
