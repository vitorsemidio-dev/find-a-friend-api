export class OrgAlreadyExistsError extends Error {
  constructor(msg = 'Org already exists') {
    super(msg)
  }
}
