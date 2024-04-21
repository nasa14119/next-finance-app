'use server'
type Data = {
  total: number, 
  value: number
}
export const getData = ():Promise<Data> => new Promise((resolve: any): Data => resolve({total: 1800, value: 1300}))
