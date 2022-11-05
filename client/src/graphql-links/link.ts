import { from } from "@apollo/client";

import { relogin_link } from 'graphql-links/relogin-link';
import { error_toast_link } from 'graphql-links/error-toast-link'
import { auth_link } from 'graphql-links/auth-link'
import { httpLink } from 'graphql-links/http-link'

export const link = from([relogin_link, error_toast_link, auth_link, httpLink])
