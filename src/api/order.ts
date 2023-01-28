import { Request, Response } from '@gwin/networking'

class OrderApi {
  async getOrderList(params: any): Promise<Response> {
    const request = new Request({
      url: '/orderList',
      params: params
    })
    return await request.start()
  }
}

export default new OrderApi()
