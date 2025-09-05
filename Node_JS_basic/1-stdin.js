process.stdout.write("Welcome to Holberton School, what is your name? ");
process.stdin.on ("data", function(input)
{
const name = input.toString().trim();

console.log("Your name is: "+ name);
process.exit();
});
process.on("exit", function() {
  console.log("This important software is now closing");
});
