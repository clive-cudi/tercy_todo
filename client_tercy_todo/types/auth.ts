export type loginDataTypes = {
    message: string,
    user_token: {
      user: {
        email?: string
        userName?: string
        password?: string
      } | null
      token: string | null
      error: {
        status: boolean | null
        message: string | null
        code: string | null
      }
    }
  }