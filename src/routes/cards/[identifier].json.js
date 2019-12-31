import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const cards = await contentful.getEntries({ content_type: 'card', locale, 'fields.identifier': identifier })

  if (cards.total) {
    res.end(JSON.stringify({ card: cards.items[0] }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ card: undefined }))
  }
}