import Main from './main.svelte'
import { entries } from './clients/contentful'

const locale = localStorage.getItem('locale') || undefined

entries(locale).then(content => new Main({
	target: document.getElementById('main'),
	props: {
		locale,
		content
	}
}))