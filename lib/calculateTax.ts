function calculateTax(grossEarnings: number): number {
    let tax = 0;

    if (grossEarnings <= 100000) {
        tax = 0;
    } else if (grossEarnings <= 141667) {
        tax = 0.06 * grossEarnings - 6000;
    } else if (grossEarnings <= 183333) {
        tax = 0.12 * grossEarnings - 14500;
    } else if (grossEarnings <= 225000) {
        tax = 0.18 * grossEarnings - 25500;
    } else if (grossEarnings <= 266667) {
        tax = 0.24 * grossEarnings - 39000;
    } else if (grossEarnings <= 308333) {
        tax = 0.30 * grossEarnings - 55000;
    } else {
        tax = 0.36 * grossEarnings - 73500;
    }

    return tax;
}
 export default calculateTax;