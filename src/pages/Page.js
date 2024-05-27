export default class Page {
  constructor({ path, heading, controller, schema, locales }) {
    this.path = path;
    this.heading = heading || this.path;
    this.controller = controller;
    this.schema = schema || [];
    this.locales = locales || {};
  }
}
