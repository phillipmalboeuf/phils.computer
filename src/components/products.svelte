<script>
  import { rrulestr } from 'rrule'
  import axios from 'axios'

  import { date, money } from '../helpers/formatters'

  import A from './a'
  import Flex from './flex'
  import Input from './input'
  import Button from './button'
  import Overlay from './overlay'
  import Document from './document'

  export let products = []

  let email
  let description
  let requested_for

  let mailto = 'mailto:phil@phils.computer'

  function checkout(product) {
    axios.post(`checkout.json`, {
      email,
      description,
      items: [{
        title: product.fields.title,
        price: product.fields.price,
        requested_for: new Date(requested_for),
        quantity: product.fields.defaultQuantity
      }]
    })
      .then(response => {
        Stripe('pk_live_niIW7v45HHTJdq8aZ9Q4LlCp0097fV4QqH').redirectToCheckout({
          sessionId: response.data.id
        })
      })
  }
</script>

<style>
  article {
    padding: calc(var(--rythm)*1.333);
    border: 1px solid var(--white);
    border-radius: var(--radius);
  }

  h4 {
    margin-bottom: calc(var(--rythm)/2);
  }
</style>

{#each products as product (product.sys.id)}
<article>
  <Flex spaced>
    <div><h4>{product.fields.title}</h4></div>
    <small>{product.fields.getInTouch ? 'tbd' : money(product.fields.price, 'CAD')} / {product.fields.type}</small>
  </Flex>
  <p>{product.fields.excerpt}</p>
  {#if product.fields.getInTouch}
  <Button to={mailto} external>{product.fields.cta || 'Get in Touch'}</Button>
  {:else}
  <Overlay button={product.fields.cta || 'Add to Cart'}>
    <h4>{product.fields.cta || 'Add to Cart'}</h4>
    <Document body={product.fields.description} />

    <form on:submit|preventDefault={()=> checkout(product)}>
    
      <Input bind:value={email} type='email' name='email' label='Your email address' placeholder='you@your.tld' />
      <Input bind:value={description} type='textarea' name='description' label='Provide upfront details here' placeholder='Describe your project, problem, idea...' max={280} />
      <Input bind:value={requested_for} type='select' name='requested_for' label='Choose a booking datetime' options={
        [{
          label: 'Let me pick a time',
          value: 'Let me pick a time'
        }, ...rrulestr(product.fields.datesRules).all().map(dt => ({
          label: date(dt),
          value: dt.toISOString(),
          disabled: product.fields.excludedDates && product.fields.excludedDates.map(excluded => new Date(excluded)).includes(dt)
        }))]} />

      <Button submit>Request – {money(product.fields.price * product.fields.defaultQuantity, 'CAD')}</Button>
    </form>
    
    <A to='https://stripe.com' external><img src='https://images.ctfassets.net/igsltvx7i8jl/7GahQXpXJMRYmTpHPII20V/8d5e5c2ad08258602de6e29a3b40f34e/powered_by_stripe.svg' alt='Powered by Stripe' /></A>
  </Overlay>
  {/if}
</article>
{/each}
