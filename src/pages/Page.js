/**
 * @typedef {Object} PageOptions
 * @property {string} path - The path of the page.
 * @property {string} [heading] - The heading of the page. Defaults to the path if not provided.
 * @property {ExpressHandler} [get] - The get controller for the page.
 * @property {ExpressHandler} [post] - The post controller for the page.
 * @property {ValidationChain[]} [schema] - The schema for the page. Defaults to an empty array if not provided.
 */

/**
 * @class
 * Represents a page in the application.
 */
export default class Page {
  /**
   * @param {PageOptions} options
   */
  constructor({ heading, get, post, schema, path }) {
    this.path = path;
    this.heading = heading || this.path;
    this.schema = schema || [];
    this.get = get;
    this.post = post;
  }
}
