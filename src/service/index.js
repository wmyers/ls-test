export const timer = (client) => {
  return {
    addCounter() {
      return client.post();
    },
    editCounter() {
      return client.patch();
    },
    deleteCounter() {
      return client.delete();
    }
  }
};