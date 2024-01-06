/**
 * Returns a page ready to be served when paginating.
 * @param baseUrl The url whom the parameters will be appended.
 * This will be used for referencing the next or previous page.
 * @param data The queried data.
 * The data should be an array or an object full with information otherwise we throw it as it is.
 * @param pages Number of pages to be generated.
 * Data will be segmented into a number of pages given.
 * @param limit Number of items per page.
 * The limit consists on the number of elements each page will segment.
 */
export function generatePagination(
  baseUrl: string,
  data: unknown,
  pages: number = 0,
  limit: number = 1
): Page {
  if (limit < 0 || pages < 0) throw new Error('Cant accept negative values')

  const start = (pages - 1) * limit
  const end = pages * limit

  const res: Page = {
    total: pages,
    current: 0,
    length: limit,
    next: null,
    prev: null,
    data: data
  }

  if (data instanceof Array) {
    if (end < data.length) {
      res.next.page = pages + 1
      res.next.url = `${baseUrl}/?page=${res.next.page}&limit=${limit}`
    }

    if (start > 0) {
      res.prev.page = pages < 1 ? pages : pages - 1
      res.prev.url = `${baseUrl}/?page=${res.prev.page}&limit=${limit}`
    }

    res.data = data.slice(start, end)
  }

  if (data instanceof Object) {
    if (end < Object.keys(data).length) {
      res.next.page = pages + 1
      res.next.url = `${baseUrl}/?page=${res.next.page}&limit=${limit}`
    }

    if (start > 0) {
      res.prev.page = pages < 1 ? pages : pages - 1
      res.prev.url = `${baseUrl}/?page=${res.prev.page}&limit=${limit}`
    }

    res.data = Object.fromEntries(Object.entries(data).slice(start, end))
  }

  return res
}

/* the old method used to get data from the request.
export function generateURL(req: Request, page: number, limit: number) {
  const protocol = req.protocol
  const subdomain = req.get('host')
  const domain = req.originalUrl

  return new URL(
    `${protocol}://${subdomain}.${domain}/?page=${page}&limit=${limit}`
  )
}
*/

export interface Page {
  total: number
  current: number
  length: number
  next: {
    page: number
    url: string
  }
  prev: {
    page: number
    url: string
  }
  data: unknown
}
