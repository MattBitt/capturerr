const captures = [
  {
    id: '1',
    text: 'Went to Rouses earlier',
    user_id: '2',
    slug: 'went-to-rouses-earlier',
    created_at: '2023-11-08T20:00:00.000Z',
    updated_at: '2023-11-08T20:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '2',
    text: 'Leftover Thai Beef curry for dinner',
    user_id: '2',
    slug: 'leftover-thai-beef-curry-for-dinner',
    created_at: '2023-11-08T21:00:00.000Z',
    updated_at: '2023-11-08T21:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '3',
    text: 'Going downtown for an interview tomorrow morning.',
    user_id: '2',
    slug: 'going-downtown-for-an-interview-tomorrow-morning',
    created_at: '2023-11-08T20:00:00.000Z',
    updated_at: '2023-11-08T20:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '4',
    text: 'Have the day off tomorrow.',
    user_id: '3',
    slug: 'have-the-day-off-tomorrow',
    created_at: '2023-11-08T20:00:00.000Z',
    updated_at: '2023-11-08T20:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '5',
    text: 'Job interview went well. Fingers crossed!',
    user_id: '2',
    slug: 'job-interview-went-well-fingers-crossed',
    created_at: '2023-11-08T20:00:00.000Z',
    updated_at: '2023-11-08T20:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '6',
    text: 'Making salmon, primavera vegetables, and buttnut squash ravioli for dinner.',
    user_id: '3',
    slug: 'making-salmon-primavera-vegetables-and-buttnut-squash-ravioli-for-dinner',
    created_at: '2023-11-09T14:00:00.000Z',
    updated_at: '2023-11-09T14:00:00.000Z',
    deleted_at: null,
  },
]

export default defineEventHandler(async (event) => {
  // Pass in the event object so we can parse out the body
  const slug = event.context.params.slug
  console.log('slug', slug)
  var data = captures.filter((obj) => {
    return obj.slug === slug
  })
  if (!data) {
    return null
  }
  return { data }
})
