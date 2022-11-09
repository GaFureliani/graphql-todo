import { from } from '@apollo/client'

import { error_toast_link } from 'graphql-links/error-toast-link'
import { auth_link } from 'graphql-links/auth-link'
import { httpLink } from 'graphql-links/http-link'
import { loading_link } from './loading-link'

export const link = from([loading_link, error_toast_link, auth_link, httpLink])
