/**
 * Trim leading and trailing slashes from a given URL pathname
 * @param {string} pathname
 */
export default function cleanPath(pathname = window.location.pathname) {
  return String(pathname).replace(/^\//, '').replace(/\/$/, '');
}
