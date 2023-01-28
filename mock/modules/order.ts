import { MockMethod } from 'vite-plugin-mock'

const orderMock: MockMethod[] = [
  {
    url: '/orderList',
    method: 'post',
    statusCode: 200,
    response: {
      body: {
        dataList: [
          {
            orderNo: '20211123180000002',
            id: 0,
            orderTime: '2021-11-23 18:00:00',
            goodsName: '沙石',
            status: 2,
            amount: '￥10000.00',
            goodsStatus: 2,
            userName: '张强',
            count: 10,
            unit: '吨',
            remark: '无',
            weight: 10,
            price: '1000.00'
          },
          {
            orderNo: '20211123124000001',
            id: 1,
            orderTime: '2021-11-23 18:00:00',
            goodsName: '混泥土',
            status: 1,
            count: 20,
            amount: '￥20000.00',
            goodsStatus: 1,
            userName: '张强',
            unit: '吨',
            remark: '无',
            weight: 15,
            price: '1000.00'
          },
          {
            orderNo: '20211123124000003',
            id: 2,
            orderTime: '2021-11-23 18:00:00',
            goodsName: '沙石',
            status: 2,
            amount: '￥10000.00',
            goodsStatus: 2,
            userName: '张强',
            count: 10,
            unit: '吨',
            remark: '无',
            weight: 10,
            price: '1000.00'
          },
          {
            orderNo: '20211123124000004',
            id: 3,
            orderTime: '2021-11-21 19:00:00',
            goodsName: '混泥土',
            status: 1,
            amount: '￥10000.00',
            goodsStatus: 1,
            userName: '张强',
            count: 10,
            unit: '吨',
            remark: '无',
            weight: 15,
            price: '1000.00'
          },
          {
            orderNo: '20211123124000005',
            id: 4,
            orderTime: '2021-11-29 11:00:00',
            goodsName: '沙石',
            status: 1,
            amount: '￥10000.00',
            goodsStatus: 1,
            userName: '张强',
            count: 10,
            unit: '吨',
            remark: '无',
            weight: 10,
            price: '1000.00'
          }
        ],
        page: {
          count: 5,
          orderBy: 'string',
          pageNum: 1,
          pageSize: 15,
          returnCount: true
        }
      },
      status: {
        appName: 'string',
        duration: 0,
        errorCode: 'string',
        memo: 'string',
        replyCode: 'string',
        replyText: 'string',
        success: true
      }
    }
  }
]

export default orderMock
