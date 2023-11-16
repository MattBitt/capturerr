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
      return [item.username, item.location, item.position].some((item) =>
        item.match(filterRe),
      )
    })
    .slice(offset, offset + perPage)
}

async function getDemoData() {
  return Promise.resolve([
    {
      id: 1,
      name: 'Admin',
      username: 'admin',
      email: 'admin@bittfurst.xyz',
      hashed_password: 'testhash',
      created_at: '2023-11-08T18:00:00.000Z',
      updated_at: '2023-11-08T18:00:00.000Z',
      deleted_at: null,
      role: 'admin',
      initials: 'AB',
      status: 'available',
      location: 'New York, NY',
      position: 'Administator',
      completed: 58,
      bio: 'This is a nice user description that we can use as demo content.',
      socialProfiles: [
        {
          name: 'Facebook',
          icon: 'fa6-brands:facebook-f',
          url: 'https://facebook.com',
        },
        {
          name: 'Twitter',
          icon: 'fa6-brands:twitter',
          url: 'https://twitter.com',
        },
        {
          name: 'Linkedin',
          icon: 'fa6-brands:linkedin-in',
          url: 'https://linkedin.com',
        },
        {
          name: 'Github',
          icon: 'fa6-brands:github',
          url: 'https://github.com',
        },
      ],
    },
    {
      id: 2,
      name: 'Matt',
      username: 'matt',
      email: 'matt@bittfurst.xyz',
      hashed_password: 'testhash',
      created_at: '2023-11-08T18:00:00.000Z',
      updated_at: '2023-11-08T18:00:00.000Z',
      deleted_at: null,
      role: 'user',
      initials: 'MB',
      status: 'available',
      location: 'London, UK',
      position: 'Mobile Developer',
      completed: 49,
      bio: 'This is a nice user description that we can use as demo content.',
      picture: '/img/avatars/1.svg',
      socialProfiles: [
        {
          name: 'Facebook',
          icon: 'fa6-brands:facebook-f',
          url: 'https://facebook.com',
        },
        {
          name: 'Twitter',
          icon: 'fa6-brands:twitter',
          url: 'https://twitter.com',
        },
        {
          name: 'Linkedin',
          icon: 'fa6-brands:linkedin-in',
          url: 'https://linkedin.com',
        },
        {
          name: 'Github',
          icon: 'fa6-brands:github',
          url: 'https://github.com',
        },
      ],
    },
    {
      id: 3,
      name: 'Lindsay',
      username: 'lindsay',
      email: 'lindsay@bittfurst.xyz',
      hashed_password: 'testhash',
      created_at: '2023-11-08T18:00:00.000Z',
      updated_at: '2023-11-08T18:00:00.000Z',
      deleted_at: null,
      position: 'Backend Developer',
      initials: 'LF',
      role: 'user',
      picture: '/img/avatars/2.svg',

      socialProfiles: [
        {
          name: 'Facebook',
          icon: 'fa6-brands:facebook-f',
          url: 'https://facebook.com',
        },
        {
          name: 'Twitter',
          icon: 'fa6-brands:twitter',
          url: 'https://twitter.com',
        },
        {
          name: 'Linkedin',
          icon: 'fa6-brands:linkedin-in',
          url: 'https://linkedin.com',
        },
        {
          name: 'Github',
          icon: 'fa6-brands:github',
          url: 'https://github.com',
        },
      ],
    },
  ])
}
