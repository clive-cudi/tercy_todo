import React, { Dispatch, SetStateAction } from "react";

export interface loadingCtxTypes {
    status: boolean
}

export interface loadingCtx_Props {
    isLoading: loadingCtxTypes,
    setIsLoading: Dispatch<SetStateAction<loadingCtxTypes>>
}

export const LoadingCtxDefaultProps: loadingCtxTypes = {
    status: false
}

export const LoadingCtx = React.createContext<loadingCtx_Props | null>({isLoading: {...LoadingCtxDefaultProps}, setIsLoading: ()=>{}});