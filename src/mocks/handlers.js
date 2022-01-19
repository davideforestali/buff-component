import { rest } from 'msw';

export const handlers = [
  rest.get('http://demo8702738.mockable.io/2', (req, res, ctx) => {
    return res(
      ctx.json({data: {
          author: {
            first_name: 'Jon',
            last_name: 'Snow',
            photo: ['www.photo1.com', 'www.photo2.com'],
          },
          question: 'what year did Italy win the last world cup?',
          answers: [
            { id: 1, title: '2002', correct: false },
            { id: 2, title: '1998', correct: false },
            { id: 3, title: '2006', correct: true }
          ]
        }}
      )
    )
  })
]
