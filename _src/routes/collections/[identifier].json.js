import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const collections = await contentful.getEntries({ content_type: 'collection', locale, 'fields.identifier': identifier })

  if (collections.total) {
    res.end(JSON.stringify({ collection: collections.items[0] }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ collection: undefined }))
  }
}