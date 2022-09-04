import React, { useContext } from "react";
import {
  LoadingCtx,
  loadingCtx_Props,
  LoadingCtxDefaultProps,
} from "../../context";

export function useLoading() {
  const { isLoading, setIsLoading } = useContext(
    LoadingCtx
  ) as loadingCtx_Props;

  function toggleLoading(exception?: boolean) {
    if (exception !== undefined) {
      setIsLoading({
        status: exception,
      });

      console.log("isLoading: Exception\n", isLoading);
      return { isLoading };
    } else {
      if (isLoading.status === false) {
        setIsLoading({
          status: true,
        });
      } else {
        setIsLoading({
          status: false,
        });
      }

      console.log("isLoading\n", isLoading);

      return { isLoading };
    }
    // if (isLoading.status === false) {
    //         setIsLoading({
    //             status: true
    //         });
    //     } else {
    //         setIsLoading({
    //             status: false
    //         });
    //     }

    //     return {isLoading}
  }

  return {
    isLoading,
    toggleLoading,
  };
}
