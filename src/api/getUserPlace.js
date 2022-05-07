import request from '@/utils/request'

// const jsonp = () => {
//   const api = 'http://pv.sohu.com/cityjson?ie=utf-8'
//   const script = document.createElement('script')
//   script.setAttribute('src', api)
//   document.body.appendChild(script)
// }

// jsonp()

export const getUserPlace = (params) => {
  return request(
    '/baidu/location/ip?ak=6hfTZier6XZiLfNseLlf3TqbbfQDntlF',
    'get',
    params
  )
}

export const getUserPlaceWeather = () => {
  return request(
    '/baidu/weather/v1/?district_id=222405&data_type=all&ak=6hfTZier6XZiLfNseLlf3TqbbfQDntlF',
    'get'
  )
}
