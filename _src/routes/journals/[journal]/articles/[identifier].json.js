import contentful from '../../../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier, journal } = params
	const [articles, journals] = await Promise.all([
    contentful.getEntries({ content_type: 'article', locale, 'fields.identifier': identifier }),
    contentful.getEntries({ content_type: 'journal', locale, select: 'fields.title,fields.identifier', 'fields.identifier': journal })
  ])

  if (articles.total) {
    res.end(JSON.stringify({ article: articles.items[0], journal: journals.items[0] }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ article: undefined }))
  }
}