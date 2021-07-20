export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export interface ISelectProp {
    onChange: (value: string) => void
}
