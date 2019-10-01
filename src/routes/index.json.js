import contentful from '../clients/contentful'

export async function get({ locale }, res) {
  const page = (await contentful.getEntries({ content_type: 'page', locale, include: 2, 'fields.identifier': 'home' })).items[0]

  res.end(JSON.stringify({ page }))
}