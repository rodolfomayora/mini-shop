import { rest } from 'msw';
// import { http, HttpResponse } from 'msw';

export const handlers = [
  rest.get('https://example.com', (_, rest, ctx) => {
    return rest(ctx.json({ message: 'test' }));
  }),
  rest.post('https://example.com', async (req, res, ctx) => {
    
    const info = await req.json();

    return res(
      ctx.status(201),
      ctx.json({ ...info }),
    );
  }),
  // rest.get('https://fakestoreapi.com/products', (_, res, ctx) => {
    
  //   return res(
  //     ctx.json([
  //       {
  //         "id": 2,
  //         "title": "Mens Casual Premium Slim Fit T-Shirts ",
  //         "price": 22.3,
  //         "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //         "category": "men's clothing",
  //         "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //         "rating": {
  //           "rate": 4.1,
  //           "count": 259
  //         }
  //       }
  //     ])
  //   );
  // }),
];

//  export const handlers = [ // global handlers (happy paths)
  // http.post('https://fakestoreapi.com/products', async (info) => {

  //   new HttpResponse(JSON.stringify([
  //     {
  //       "id": 2,
  //       "title": "Mens Casual Premium Slim Fit T-Shirts ",
  //       "price": 22.3,
  //       "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //       "category": "men's clothing",
  //       "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //       "rating": {
  //         "rate": 4.1,
  //         "count": 259
  //       }
  //     },
  //   ]))
  // }),

// ];