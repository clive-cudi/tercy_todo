import { useState } from "react"
import { LoadingCtx, loadingCtxTypes, LoadingCtxDefaultProps } from "../../context"

export const LoadingCtxProvider = ({children}: any) => {
    const [isLoading, setIsLoading] = useState<loadingCtxTypes>(LoadingCtxDefaultProps);

    return (
        <LoadingCtx.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoadingCtx.Provider>
    )
}