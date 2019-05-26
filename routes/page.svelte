<script>
  import { rich } from '../helpers/formatters'
  import { content } from '../stores/content'

  export let id
  $: page = $content.pages.items.find(page => page.fields.identifier === id)
</script>

{@html rich(page.fields.body)}