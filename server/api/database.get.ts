import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function queryDatabase() {
  // https://developers.notion.com/reference/post-database-query
  const response = await notion.databases.query({ database_id: '75dc1174b0394f04acde30a004683f68' })

  return response
}

async function queryUIComponentsLibrary(and: string) {
  const response = await notion.databases.query({
    database_id: '75dc1174b0394f04acde30a004683f68',
    filter: {
      and: [{
        property: 'Tags',
        multi_select: {
          contains: 'UI',
        },
      }, {
        property: 'Tags',
        multi_select: {
          contains: and,
        },
      }],
    },
  })

  return response
}

async function queryVue3UIComponentsLibrary() {
  return queryUIComponentsLibrary('Vue 3')
}

async function queryVue2UIComponentsLibrary() {
  return queryUIComponentsLibrary('Vue 2')
}

async function queryReactUIComponentsLibrary() {
  return queryUIComponentsLibrary('React')
}

async function queryNotion(query: Object) {
  switch (query.q) {
    case 'vue3':
      return queryVue3UIComponentsLibrary()
    case 'vue2':
      return queryVue2UIComponentsLibrary()
    case 'react':
      return queryReactUIComponentsLibrary()
    default:
      return queryDatabase()
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const response = await queryNotion(query)
  return {
    code: 200,
    message: 'ok',
    length: response.results.length,
    data: response.results,
  }
})
