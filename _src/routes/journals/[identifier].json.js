import contentful from '../../clients/contentful'

export async function get({ locale, params }, res) {
  const { identifier } = params
	const journals = await contentful.getEntries({ content_type: 'journal', locale, 'fields.identifier': identifier })

  if (journals.total) {
    res.end(JSON.stringify({ journal: journals.items[0] }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ journal: undefined }))
  }
}