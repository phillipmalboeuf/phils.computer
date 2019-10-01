<script>
  export let type
  export let name
  export let value = ''
  export let label
  export let placeholder
  export let optional
  export let options
  export let max
</script>

<style>
  label {
    font-size: calc(var(--rythm)/1.42);
    line-height: 1;
    font-weight: bold;
    text-align: left;
    
    display: block;
    margin-bottom: calc(var(--rythm)/3);
  }

  input,
  textarea,
  select {
    position: relative;

    font-size: calc(var(--rythm)/1.333);
    font-weight: normal;
    color: var(--black);
    background-color: var(--ash);
    border: 2px solid var(--white);
    border-radius: var(--radius);

    width: 100%;
    padding: calc(var(--rythm)/1.333) calc(var(--rythm)/1.5);
    margin-bottom: calc(var(--rythm)/1.333);
  }

  input:active,
  textarea:active,
  select:active {
    top: 1px;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    background-color: var(--white);
    border-color: var(--kelly);
  }

  select { cursor: pointer; }
</style>

{#if label}
<label for={name}>{label}{optional ? ' (Optional)' : ''}</label>
{/if}
{#if type === 'select'}
<select name={name} id={name} bind:value={value}>
  {#each options as option}
  <option value={option.value} disabled={option.disabled}>{option.label}</option>
  {/each}
</select>
{:else if type === 'textarea'}
<textarea name={name} id={name} rows={5} max-length={max} placeholder={placeholder} required={!optional} bind:value={value} />
{:else if type === 'email'}
<input type='email' name={name} id={name} placeholder={placeholder} required={!optional} bind:value={value} />
{:else}
<input name={name} id={name} placeholder={placeholder} required={!optional} bind:value={value} />
{/if}