import axios from 'axios'
import Main from './main.svelte'

axios.get(`/content${window.locale ? `?locale=${window.locale}` : ''}`)
  .then(response => new Main({
			target: document.getElementById('main'),
			props: {
				defaultLocale: window.locale,
				defaultContent: response.data
			},
			hydrate: true
		}))
