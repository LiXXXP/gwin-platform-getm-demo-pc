import { Request, Response } from '@gwin/networking'

export class MapInfo {
  async getOrderInfo(params: any): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/WaybillInquiry',
      params: params
    })
    return await request.start()
  }

  async getcCarInfo(params: any): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/WaybillTruckInquiry',
      params: params
    })
    return await request.start()
  }

  async getcCarInfo1(params: any): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/WaybillTruckInquiry1',
      params: params
    })
    return await request.start()
  }

  async getRouteInfo(params: any): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/WaybillTruckTrailInquiry',
      params: params
    })
    return await request.start()
  }

  async getRouteInfo1(params: any): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/WaybillTruckTrailInquiry1',
      params: params
    })
    return await request.start()
  }

  async getLastCarInfo(): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/NewestEnRouteTruckInquiry',
      method: 'post',
      params: {}
    })
    return await request.start()
  }

  async getDashboardCarInfo(): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/EnRouteTruckInquiry',
      method: 'post',
      params: {}
    })
    return await request.start()
  }

  async getCarMonitorInfo(): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/TodayMonitorInquiry',
      method: 'post',
      params: {}
    })
    return await request.start()
  }

  async getCarUnavailableInfo(): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/TodayUnavailableTruckInquiry',
      method: 'post',
      params: {}
    })
    return await request.start()
  }

  async getCarMonthInfo(): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/OneMonthTrendInquiry',
      method: 'post',
      params: {}
    })
    return await request.start()
  }

  async getCarDetailInfo(params: number): Promise<Response> {
    const request = new Request({
      url: '/gwtm/v1/TruckInquiry',
      method: 'post',
      params: {
        waybillTruckId: params
      }
    })
    return await request.start()
  }
}

export default new MapInfo()
