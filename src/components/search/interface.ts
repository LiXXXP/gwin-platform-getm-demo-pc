export interface SearchButtonProps {
  type: string
  label: string
  prop: string
}

export interface FormProps {
  status: number | any
  title: string
  [key: string]: string | number
}

export interface OptionInfo {
  label: string
  value: number | string
}

export interface SearchProps {
  type: string
  lable: string
  placeholder: string
  value: string | number
  show: boolean
  point: string
  option?: OptionInfo[]
}

// table interface
export interface DataParams {
  orderNo: string
  id: number
  orderTime: string
  goodsName: string
  status: number
  amount: string
  goodsStatus: number
  userName: string
}

export interface PageProps {
  count: number
  pageNum: number
  pageSize: number
  orderBy: string
  returnCount: boolean
}

export interface ColumnParams {
  label: string
  prop: string
  align: string
  width?: number
  custom: string
}

export interface TableOperateProps {
  id: number
  label: string
  prop: string
  type: string
  isBack: boolean
}
