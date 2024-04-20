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
  indeterminate?: boolean
  parent?: OptionsNode
  children?: OptionsNode[]
}
