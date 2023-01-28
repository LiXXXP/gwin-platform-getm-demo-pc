import { Request, Response } from '@gwin/networking'

export interface User {
  id: number
  address1: string
  address2: string
  business: string
  country: string
  createAt: string
  customerId: string
  email: string
  entityId: string
}

class UserApi {
  async login(params: any): Promise<Response> {
    const request = new Request<User>({
      url: '/cif/v1/AccountSignIn',
      method: 'post',
      params: params
    })
    return await request.start()
  }

  async getTest(params?: any): Promise<Response> {
    const request = new Request<User>({
      url: '/user/info',
      method: 'get',
      params: params,
      isLoading: true
    })
    return await request.start()
  }

  async postTest(params?: any): Promise<Response> {
    const request = new Request<User>({
      url: '/user/info1',
      params: params,
      isLoading: true
    })
    return await request.start()
  }

  async postTest401(params?: any): Promise<Response> {
    const request = new Request<User>({
      url: '/user/info401',
      params: params,
      isLoading: true
    })
    return await request.start()
  }

  async postTest403(params?: any): Promise<Response> {
    const request = new Request<User>({
      url: '/user/info403',
      params: params,
      isLoading: true
    })
    return await request.start()
  }

  async postTestErrorCode1(params?: any): Promise<Response> {
    const request = new Request<User>({
      url: '/user/infoErrorCode1',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  async postTestErrorCode9(params?: any): Promise<Response> {
    const request = new Request<User>({
      url: '/user/infoErrorCode9',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new UserApi()
