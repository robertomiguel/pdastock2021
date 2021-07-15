export const formatNumber = (num: any) => {
    const n = num ? num * 1 : 0
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
