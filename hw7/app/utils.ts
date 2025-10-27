await import("./lazy.ts").then()

export function myFunc1(): number {
    return 1;
}

export async function myFunc2() {
    return 2;
}

export function myFunc3(): number {
    return 3;
}