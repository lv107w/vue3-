let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://httpbin.org/'
} else if (process.env.NODE_ENV === 'prodection') {
  BASE_URL = 'http://httpbin.org/'
} else {
  BASE_URL = 'http://httpbin.org/'
}

export { BASE_URL, TIME_OUT }
