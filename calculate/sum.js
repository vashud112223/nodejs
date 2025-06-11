// Modules protects their variables and functions from leaking

// export function Calculate(a,b) {
//     console.log(a+b);
// }
 function Calculate(a,b) {
    console.log(a+b);
}
module.exports = {Calculate};
// module.exports.Calculate = Calculate;