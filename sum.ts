import { parseArgs, ParseOptions } from "@std/cli/parse-args";
import meta from "./deno.json" with { type: "json" };

function printUsage() {
    console.log("");
    console.log("Usage: sum <number1> <number2> ... <numberN>");
    console.log("Options:");
    console.log("  -h, --help   show this help message");
    console.log("  -v, --version show version number");
}

const options: ParseOptions = {
    boolean: ["boolean", "version"],
    alias: { "help": "h", "version": "v"},
};

const args = parseArgs(Deno.args, options);

if(args.help || (args._.length === 0 && !args.version)) {
    printUsage();
    Deno.exit(0);
} else if (args.version) {
    console.log(meta.version);
    Deno.exit(0);
}

// validate all arguments are numbers
const numbers: number[] = args._.filter((arg) => typeof arg === "number");
if (numbers.length !== args._.length) {
    console.error("ERROR: All arguments must be numbers");
    printUsage();
    Deno.exit(1);
}
// sum up the number arguments
const sum = numbers.reduce((sum, val) => sum + val);

// print the numbers and the total
console.log(`${numbers.join(" + ")} = ${sum}`);

