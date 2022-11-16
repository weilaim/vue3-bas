import { MockMethod } from 'vite-plugin-mock';
const apis :MockMethod[] = [
    {
      url: '/api/test',
      method: 'get',
      response: () => {
        return {
          code: 200,
          message: 'ok-is-you need',
          data: {
            meesage:"abc"
          },
        }
      },
    },
]

export default apis;