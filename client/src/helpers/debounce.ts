export const debounce = <T>(func: (args: T) => void, timeout = 300) => {
  let id: number | null = null
  return (args: T) => {
    if(id) clearTimeout(id)
    id = setTimeout(() => {
      func(args)
    }, timeout)
  }
}