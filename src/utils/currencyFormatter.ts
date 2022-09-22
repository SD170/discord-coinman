export const usdFormatter = new Intl.NumberFormat('en-US', {
    notation:"compact",
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers.
    //minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});
