// @ts-check
import fetch from 'node-fetch'

/**
 * @type {{ query: string; variables: any; }}
 *
*/
// @ts-ignore
export const FETCH = async (option) => {
  return await fetch(process.env.VUE_BASE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      query: option.query,
      variables: option.variables
    })
  })
}