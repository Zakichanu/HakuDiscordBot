function arrayEquals(a: any, b: any): boolean {
    return a.length === b.length && a.every((val: any, index: number) => val === b[index]);
}


export default { arrayEquals };