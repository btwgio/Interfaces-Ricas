export function quadradocomFor(arr: number[]): number[] {
    const resultado: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        resultado.push(arr[i] * arr[i]);
    }
    return resultado;
}

export function quadradocomForEach(arr: number[]): number[] {
    const resultado: number[] = [];
    arr.forEach(num => {
        resultado.push(num * num);
    });
    return resultado;
}