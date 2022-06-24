import { useMutation, useQueryClient } from "react-query";

export const useMutationHook = (queryName, fn) => {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: () => {
      //🚀 can manage the cache  by new data
      queryClient.invalidateQueries(queryName);
    },
  });
};
