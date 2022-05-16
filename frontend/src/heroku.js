function fetchAbsolute(fetch, base_url) {
    return (url, ...params) => {
      if (url.startsWith('/')) return fetch(base_url + url, ...params)
      else return fetch(url, ...params);
    }
  }
  
  const fetch = fetchAbsolute(origFetch, 'http://localhost');