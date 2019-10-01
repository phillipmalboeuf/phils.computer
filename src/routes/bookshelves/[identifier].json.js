import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const bookshelves = await contentful.getEntries({ content_type: 'bookshelf', locale, 'fields.identifier': identifier })

  if (bookshelves.total) {
    res.end(JSON.stringify({ bookshelf: bookshelves.items[0] }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ bookshelf: undefined }))
  }
}