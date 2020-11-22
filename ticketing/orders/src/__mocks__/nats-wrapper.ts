export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation((...params: any[]) => {
      const [, , callback] = params;
      callback();
    }),
  },
};
