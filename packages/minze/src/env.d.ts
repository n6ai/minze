export declare global {
  const __VERSION__: string

  interface Document {
    // Experimental View Transitions API
    startViewTransition?: (callback: () => Promise<any> | any) => void
  }
}
