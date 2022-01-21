export default () => /* css */ `
  :host {
    --m-color-white: rgb(255, 255, 255);
    --m-color-primary: rgb(20 20 20);
    --m-color-primary-light: rgb(40 40 40);
    --m-color-primary-lighter: rgb(55 55 55);
    --m-color-primary-lightest: rgb(70 70 70);
    --m-color-shadow: rgb(50 50 50 / 20%);

    --m-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--m-color-primary-lighter);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--m-color-primary-lightest);
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  [part=aside-button] {
    display: inline-block;
    background: var(--m-color-primary);
    color: var(--m-color-white);
    border: none;
    box-shadow: 0 0.5rem 0.5rem var(--m-color-shadow);
    border-radius: 0.25rem;
    font-size: 0.825rem;
    font-family: var(--m-font-family);
    overflow: hidden;
    cursor: pointer;
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    padding: 0.5rem 0.75rem;
  }

  [part=aside-button]:hover {
    background: var(--m-color-primary-light);
  }

  [part=aside-button]:active {
    background: var(--m-color-primary-lighter);
  }

  [part=aside-overlay] {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 2rem);
    width: 100%;
    max-width: calc(100vw - 2rem);
    background: var(--m-color-primary);
    box-shadow: 0 0.5rem 0.5rem var(--m-color-shadow);
    font-family: var(--m-font-family);
    border-radius: 0.25rem;
    overflow-y: auto;
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    margin-top: 1rem;
  }

  @media (min-width: 420px) {
    [part=aside-overlay] {
      width: unset;
      min-width: 16rem;
    }
  }

  [part=aside-overlay] > *,
  [part=aside-overlay] button {
    display: flex;
    align-items: center;
    height: 3rem;
    flex-shrink: 0;
    background: transparent;
    color: var(--m-color-white);
    font-size: 0.825rem;
    text-align: left;
    border: none;
    cursor: pointer;
    position: relative;
    padding: 0 1rem;
  }

  @media (min-width: 420px) {
    [part=aside-overlay] > *,
    [part=aside-overlay] button {
      height: 3.5rem;
    }
  }

  [part=aside-overlay] button:not(:last-child) {
    border-bottom: 1px solid var(--m-color-primary-light);
  }

  [part=aside-overlay] button:hover {
    background: var(--m-color-primary-light);
  }

  [part=aside-overlay] button:active {
    background: var(--m-color-primary-lighter);
  }

  [part=aside-overlay] button.active:before {
    content: '';
    width: 0.25rem;
    height: 100%;
    background: rgb(150 150 150);
    position: absolute;
    left: 0;
    top: 0;
  }

  [part=aside-overlay] button.active {
    color: var(--m-color-white);
  }

  slot {
    display: none;
    visibility: hidden;
  }
`
