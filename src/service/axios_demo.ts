import axios from 'axios'

axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'lv',
      age: 22
    }
  })
  .then((res) => {
    console.log(res.data)
  })
