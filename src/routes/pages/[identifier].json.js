import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const pages = await contentful.getEntries({ content_type: 'page', locale, include: 2, 'fields.identifier': identifier })

  if (pages.total) {
    res.end(JSON.stringify({ page: pages.items[0] }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ page: undefined }))
  }
}