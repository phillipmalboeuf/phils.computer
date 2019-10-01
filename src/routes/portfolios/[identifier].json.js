import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const portfolios = await contentful.getEntries({ content_type: 'portfolio', locale, 'fields.identifier': identifier })

  if (portfolios.total) {
    res.end(JSON.stringify({ portfolio: portfolios.items[0] }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ portfolio: undefined }))
  }
}