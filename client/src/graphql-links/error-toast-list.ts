import { onError } from "@apollo/client/link/error";
import {toast} from 'react-toastify'
export const error_toast_link = onError(({ graphQLErrors, operation, forward })=>{
  if(graphQLErrors){
    for (let e of graphQLErrors){
      toast.error(e.message)    
    }
  }

  return forward(operation)
})