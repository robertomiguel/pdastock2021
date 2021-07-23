export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export interface ISelectProp {
    defaultValue?: any
    onChange: (value: string) => void
}
