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

export default defineEventHandler(async (event) => {
  const response = await queryVue3UIComponentsLibrary()
  return {
    code: 200,
    message: 'ok',
    length: response.results.length,
    data: response.results,
  }
})
