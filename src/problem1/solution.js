/** NOTE:
 * The task description said "Input: n - any integer". 
 * But to able to get the total, we assume the input need to be positive or 0.
**/


// Approach A: Traditional for loop (Iterative)
var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Approach B: Using Array.forEach
var sum_to_n_b = function(n) {
    let sum = 0;
    Array.from({ length: n }, (_, i) => i + 1).forEach((num) => {
        sum += num;
    });
    return sum;
};

// Approach C: Using Array.reduce
var sum_to_n_c = function(n) {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);
};

// Another approach: Formula-based solution (Mathematical approach)
var sum_to_n_using_formula = function(n) {
    return (n * (n + 1)) / 2;
};

// Another approach: Recursive solution
var sum_to_n_using_recursive = function(n) {
    if (n === 0) return 0;
    return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))

console.log(sum_to_n_using_formula(5))
console.log(sum_to_n_using_recursive(5))
