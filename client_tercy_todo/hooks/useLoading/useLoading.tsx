import React, { useContext } from "react";
import { LoadingCtx, loadingCtx_Props, LoadingCtxDefaultProps } from "../../context";

export function useLoading() {
    const { isLoading, setIsLoading} = useContext(LoadingCtx) as loadingCtx_Props;

    function toggleLoading() {
        if (isLoading.status === false) {
            setIsLoading({
                status: true
            });
        } else {
            setIsLoading({
                status: false
            })
        }

        return {isLoading}
    };


    return {
        toggleLoading
    }
}