export const nastWrapper = {
  client: {
    publish: (subject: string, data: string, callback: () => void) => {
      callback();
    }
  }
}