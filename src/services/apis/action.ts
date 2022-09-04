import request from '../request'

export function getBookList() {
  return request.get('optimize/area/roadNet/relationship')
}

export function getBookDetail(id: number) {
  return request.post('books/getBookDetail', {
    id
  })
}
