export interface Options {
  label: string
  value: string
  children?: Options[]
}

export interface OptionsNode {
  label: string
  value: string
  checked: boolean
  level: number
  isActive?: boolean
  parent?: OptionsNode
  children?: OptionsNode[]
}
