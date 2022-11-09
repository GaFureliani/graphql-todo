export const environment = () => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

  if (typeof ACCESS_TOKEN_SECRET === 'undefined') {
    throw new Error('Please set the environment variable "ACCESS_TOKEN_SECRET" to some value')
  }

  if (typeof REFRESH_TOKEN_SECRET === 'undefined') {
    throw new Error('Please set the environment variable "REFRESH_TOKEN_SECRET" to some value')
  }

  return {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
  }
}
