const timers = (client) => {
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

export default (client) => {
  return {
    timers: timers(client)
  }
}

