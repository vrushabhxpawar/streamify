
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../src/lib/api";

const useAuthuser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  return { isLoading : authUser.isLoading, authUser : authUser.data?.user}
}

export default useAuthuser;
