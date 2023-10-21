export class NoHaveCreditsError extends Error {
  constructor() {
    super('Do not have credits for this transaction.')
  }
}
