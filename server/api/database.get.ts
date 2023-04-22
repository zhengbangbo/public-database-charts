import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function queryDatabase() {
  // https://developers.notion.com/reference/post-database-query
  const response = await notion.databases.query({ database_id: '75dc1174b0394f04acde30a004683f68' })

  return response
}

async function queryDatabaseBy(tags: string[] | string) {
  if (!Array.isArray(tags))
    tags = [tags]

  const response = await notion.databases.query({
    database_id: '75dc1174b0394f04acde30a004683f68',
    filter: {
      and: tags.map(
        tag => ({
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        }),
      ),
    },
  })

  return response
}

async function queryNotion(tags: string[] | string | undefined) {
  if (!tags)
    return queryDatabase()
  return queryDatabaseBy(tags)
}

export default defineEventHandler(async (event) => {
  const { tags } = getQuery(event)
  const response = await queryNotion(tags as string[] | string | undefined)
  return {
    code: 200,
    message: 'ok',
    length: response.results.length,
    data: response.results,
  }
})
