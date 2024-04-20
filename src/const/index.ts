import { SESSION_DATA } from './message'
import type { SESSION_DATA_TYPE } from './message'

export { SESSION_DATA }
export type { SESSION_DATA_TYPE }
import type { Options } from '@/types/index'

export const mockOptions: Options[] = [
  {
    label: '选项1',
    value: '1'
  },
  {
    label: '选项2',
    value: '2',
    children: [
      {
        label: '选项2-1',
        value: '2-1'
      },
      {
        label: '选项2-2',
        value: '2-2'
      }
    ]
  },
  {
    label: '选项3',
    value: '3'
  },
  {
    label: '选项4',
    value: '4'
  },
  {
    label: '选项5',
    value: '5'
  },
  {
    label: '选项6',
    value: '6'
  },
  {
    label: '选项7',
    value: '7'
  },
  {
    label: '选项8',
    value: '8'
  },
  {
    label: '选项9',
    value: '9'
  },
  {
    label: '选项10',
    value: '10'
  },
  {
    label: '选项11',
    value: '11'
  },
  {
    label: '选项12',
    value: '12',
    children: [
      {
        label: '选项12-1',
        value: '12-1'
      },
      {
        label: '选项12-2',
        value: '12-2'
      }
    ]
  },
  {
    label: '选项13',
    value: '13'
  },
  {
    label: '选项14',
    value: '14'
  },
  {
    label: '选项15',
    value: '15'
  },
  {
    label: '选项16',
    value: '16'
  },
  {
    label: '选项17',
    value: '17'
  },
  {
    label: '选项18',
    value: '18'
  },
  {
    label: '选项19',
    value: '19'
  },
  {
    label: '选项20',
    value: '20'
  }
]
