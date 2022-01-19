import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { server } from './mocks/server'
import App from './App'

test('fetched question', async () => {
  render(<App />)

  jest.spyOn(window.HTMLMediaElement.prototype, 'play')

  const buffQuestion = await screen.findByText('what year did Italy win the last world cup?')
  expect(buffQuestion).toBeInTheDocument()
})

test('displays error alert on server error', () => {
  server.resetHandlers(
    rest.get('http://demo8702738.mockable.io/2', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<App />)

  const buffQuestion = screen.queryByText('what year did Italy win the last world cup?')
  expect(buffQuestion).not.toBeInTheDocument()
})
