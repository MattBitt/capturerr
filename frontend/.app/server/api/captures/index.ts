export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const perPage = parseInt((query.perPage as string) || '5', 10)
  const page = parseInt((query.page as string) || '1', 10)
  const filter = (query.filter as string) || ''

  if (perPage >= 50) {
    // Create an artificial delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const data = await getDemoData()

  return {
    total: data.length,
    data: filterDemoData(data, filter, page, perPage),
  }
})

function filterDemoData(
  data: any[],
  filter: string,
  page: number,
  perPage: number,
) {
  const offset = (page - 1) * perPage
  if (!filter) {
    return data.slice(offset, offset + perPage)
  }
  const filterRe = new RegExp(filter, 'i')
  return data
    .filter((item) => {
      return [item.name, item.owner.name, item.category].some((item) =>
        item.match(filterRe),
      )
    })
    .slice(offset, offset + perPage)
}

async function getDemoData() {
  return Promise.resolve([
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
  ])
}
