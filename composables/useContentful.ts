import { createClient } from 'contentful'

export const useContentful = () => {
  const config = useRuntimeConfig()
  
  const client = createClient({
    space: config.contentfulSpaceId || '',
    accessToken: config.contentfulAccessToken || '',
  })

  const getEntries = async (contentType: string, query?: any) => {
    try {
      const response = await client.getEntries({
        content_type: contentType,
        ...query,
      })
      return response.items
    } catch (error) {
      console.error('Error fetching Contentful entries:', error)
      throw error
    }
  }

  const getEntry = async (entryId: string) => {
    try {
      const response = await client.getEntry(entryId)
      return response
    } catch (error) {
      console.error('Error fetching Contentful entry:', error)
      throw error
    }
  }

  const getEntriesBySlug = async (contentType: string, slug: string) => {
    try {
      const response = await client.getEntries({
        content_type: contentType,
        'fields.slug': slug,
        limit: 1,
      })
      return response.items[0] || null
    } catch (error) {
      console.error('Error fetching Contentful entry by slug:', error)
      throw error
    }
  }

  return {
    client,
    getEntries,
    getEntry,
    getEntriesBySlug,
  }
}


