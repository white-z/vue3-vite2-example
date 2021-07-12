import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/mock/hello',
    method: 'get',
    timeout: Math.floor(Math.random() * 1000 + 1001),
    response: ():MockMethod['response'] => {
      return {
        code: 1,
        data: 'Hello, Mock.js',
      };
    },
  },
  {
    url: '/mock/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'Mock.js POST',
      },
    },
  },
  {
    url: '/mock/rawHello',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
] as MockMethod[];
