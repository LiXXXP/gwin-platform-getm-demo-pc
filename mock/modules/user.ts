import { MockMethod } from 'vite-plugin-mock'

const userMock: MockMethod[] = [
  {
    url: '/user/info401',
    method: 'post',
    statusCode: 401,
    response: {}
  },
  {
    url: '/user/info403',
    method: 'post',
    statusCode: 403,
    response: {}
  },
  {
    url: '/user/infoErrorCode1',
    method: 'post',
    response: {
      body: {},
      status: {
        appName: 'web-component-networking',
        duration: '10',
        errorCode: '1',
        memo: '',
        replyCode: '',
        replyText: 'ErrorCode1 ReplyText',
        success: false
      }
    }
  },
  {
    url: '/user/infoErrorCode9',
    method: 'post',
    response: {
      body: {},
      status: {
        appName: 'web-component-networking',
        duration: '10',
        errorCode: '9',
        memo: '',
        replyCode: '',
        replyText: 'ErrorCode9 ReplyText',
        success: false
      }
    }
  },
  // get user info
  {
    url: '/user/info',
    method: 'get',
    response: {
      body: {
        id: 0,
        address1: '光华路soho2',
        address2: '',
        business: 'demo',
        country: '中国',
        createAt: '2021-11-11T10:01:23.170Z',
        customerId: '1000001',
        email: 'wanyakun@vip.qq.com',
        entityId: '1000001'
      },
      status: {
        appName: 'web-component-networking',
        duration: '10',
        errorCode: '',
        memo: '',
        replyCode: '',
        replyText: '',
        success: true
      }
    }
  },
  {
    url: '/user/info1',
    method: 'post',
    response: {
      body: {
        id: 0,
        address1: '光华路soho2',
        address2: '',
        business: 'demo',
        country: '中国',
        createAt: '2021-11-11T10:01:23.170Z',
        customerId: '1000001',
        email: 'wanyakun@vip.qq.com',
        entityId: '1000001'
      },
      status: {
        appName: 'web-component-networking',
        duration: '10',
        errorCode: '',
        memo: '',
        replyCode: '',
        replyText: '',
        success: true
      }
    }
  }
]

export default userMock
