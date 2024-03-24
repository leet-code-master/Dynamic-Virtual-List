interface MESSAGE_TYPE {
  type: string
  content: string
}
export interface SESSION_DATA_TYPE {
  role: 'user' | 'admin'
  message: MESSAGE_TYPE[]
}

export const SESSION_DATA: SESSION_DATA_TYPE[] = [
  {
    role: 'user',
    message: [
      {
        type: 'text',
        content: '这是一段文本'
      },
      {
        type: 'button',
        content: '确定'
      },
      {
        type: 'default',
        content: 'default'
      }
    ]
  },
  {
    role: 'admin',
    message: [
      {
        type: 'text',
        content: '这是admin的文本'
      },
      {
        type: 'button',
        content: 'admin确定'
      },
      {
        type: 'default',
        content: 'admin default'
      }
    ]
  }
]
