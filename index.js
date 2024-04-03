const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv")
dotenv.config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Summarize this lecture to me in 10 important bullet points:
  COS 217: Introduction to Programming Systems
  Assembly Language
  Part 1
  “Under the hood”
  Context of this Lecture
  C Language
  Assembly Language
  Machine Language
  2
  Agenda
  Language Levels
  Architecture
  Assembly Language: Performing Arithmetic
  Assembly Language: Load/Store and Defining Global Data
  3
  High-Level Languages
  Characteristics
  •Portable (to varying degrees)
  •Complex
  • One statement can do a lot of work –
  good ratio of functionality to code size
  •Human readable
  • Structured: if(), for(), while(), etc.
  • Variable names can hide details of
  where data is stored (stack, heap, etc.)
  • Type system allows compiler to check
  usage details without burdening reader
  4
  int collatz(int n)
  {
   int count = 0;
   while (n > 1) {
   count++;
   if (n & 1)
   n = 3 * n + 1;
   else
   n /= 2;
   }
   return count;
  }
  Machine Languages
  Characteristics
  •Not portable (hardware-specific)
  •Simple
  • Each instruction does a
  simple task – poor ratio of
  functionality to code size
  •Not human readable
  • Not structured
  • Requires lots of effort!
  • Requires tool support
  5
  0000 0000 0000 0000 0000 0000 0000 0000
  0000 0000 0000 0000 0000 0000 0000 0000
  9222 9120 1121 A120 1121 A121 7211 0000
  0000 0001 0002 0003 0004 0005 0006 0007
  0008 0009 000A 000B 000C 000D 000E 000F
  0000 0000 0000 FE10 FACE CAFE ACED CEDE
  1234 5678 9ABC DEF0 0000 0000 F00D 0000
  0000 0000 EEEE 1111 EEEE 1111 0000 0000
  B1B2 F1F5 0000 0000 0000 0000 0000 0000
  Assembly Languages
  Characteristics
  •Not portable
  • Each assembly language instruction
  maps to one machine instruction
  •Simple
  • Each instruction does a simple task
  •Human readable
  (In the same sense that Polish is
  human readable … if you know Polish.)
  6
  ands wzr, w0, #1
  beq else
  b endif
  else:
  endif:
  asr w0, w0, 1
  add w2, w0, w0
  add w0, w0, w2
  add w0, w0, 1
  add w1, w1, #1
  loop:
  cmp w0, 1
  ble endloop
  b loop
  endloop:
  mov w1, 0
  Why Learn Assembly Language?
  Knowing assembly language helps you:
  •Write faster code
  • In assembly language
  • Potentially even in a high-level language!
  •Write safer code
  • Understanding mechanism of potential security problems helps you avoid them –
  even in high-level languages
  •Understand what’s happening “under the hood”
  • Someone needs to develop future computer systems
  • Maybe that will be you!
  •Become more comfortable with levels of abstraction
  • Become a better programmer at all language levels!
  7
  Why Learn ARM Assembly Lang?
  Why learn ARMv8 (a.k.a. AARCH64 or A64) assembly language?
  Pros
  •ARM is the most widely used processor architecture in the world
  (in your phone, in your Mac, in your Chromebook, in Armlab,
  in internet-of-things devices)
  •ARM has a modern and (relatively) elegant instruction set,
  compared to the expansive but ugly x86-64 instruction set
  Cons
  •x86-64 still has a huge presence in desktop/laptop/cloud (for now?)
  8
  Lectures vs. Precepts
  Lectures Precepts
  Study partial programs Study complete programs
  Begin with simple constructs;
  proceed to complex ones
  Begin with small programs;
  proceed to large ones
  Emphasis on reading code Emphasis on writing code
  Approach to studying assembly language:
  9
  Agenda
  Language Levels
  Architecture
  Assembly Language: Performing Arithmetic
  Assembly Language: Load/Store and Defining Global Data
  10
  John von Neumann (1903-1957)
  In computing
  • Stored program computers
  • Cellular automata, self-replication,
  • Game theory
  • mergesort
  Other interests
  • Mathematics, statistics, game theory
  • Nuclear physics
  Princeton connection
  • Princeton University & IAS, 1930-1957
  • https://paw.princeton.edu/article/early-history-computing-princeton
  Known for the “Von Neumann architecture”
  • In which (machine-language) programs are just data in memory
  • a.k.a. “Princeton architecture” – contrast to the now-mostly-obsolete “Harvard architecture”
  11
  Von Neumann Architecture
  RAM
  Control
  Unit
  CPU
  Registers
  Data bus
  ALU
  Instructions (encoded within words)
  are fetched from RAM
  Control unit interprets instructions:
  • to shuffle data between registers
  and RAM
  • to move data from registers to ALU
  (arithmetic+logic unit) where
  operations are performed
  12
  Von Neumann Architecture
  13
  Registers
  Small amount of storage on the CPU
  •Top of the “storage hierarchy”
  •Very {small, expensive, fast}
  ALU instructions operate on registers
  RAM
  Control
  Unit
  CPU
  Registers
  Data bus
  ALU
  ALU Arithmetic Example
  14
  ALU
  src1 src2
  dest
  operation ALU flags
  RAM
  Control
  Unit
  CPU
  Registers
  Data bus
  ALU
  Von Neumann Architecture
  RAM (Random Access Memory)
  Conceptually: large array of bytes
  (gigabytes+ in modern machines)
  •Contains data
   (program variables, structs, arrays)
  •and the program itself in machine code!
  Instructions are fetched from RAM
  15
  RAM
  Control
  Unit
  CPU
  Registers
  Data bus
  ALU
  16
  Time to reminisce about old TOYs
  Thinking back to COS 126,
  how did you feel about TOY?
  A. Loved it!
  B. Wasn't a fan.
  C. I placed out, so I have no idea
  what you're talking about.
  Yuri Shirota
  Time to reminisce about old TOYs
  17 https://introcs.cs.princeton.edu/java/62toy/
  Registers and RAM
  Typical pattern:
  •Load data from RAM to registers
  •Manipulate data in registers
  •Store data from registers to RAM
  On AARCH64, this pattern is enforced
  •“Manipulation” instructions can only access registers
  •This is known as a load-store architecture
  (as opposed to “register-memory” architectures)
  •Characteristic of “RISC” (Reduced Instruction Set Computer) vs.
  18 “CISC” (Complex Instruction Set Computer) architectures, e.g. x86
  Registers (ARM-64 architecture)
  19
  x0 w0
  63 31 0
  x1 w1
  …
  x29 (FP) w29
  x30 (LR) w30
  xzr (all zeros) wzr
  sp (stack pointer)
  pc (program counter)
  nzcv pstate
  General-Purpose 64-bit Registers
  X0 ... X30
  •Scratch space for instructions, parameter passing to/from functions,
  return address for function calls, etc.
  •Some have special roles defined in hardware (e.g. X30)
  or defined by software convention (e.g. X29)
  •Also available as 32-bit versions: W0 ... W30
  XZR
  •On read: all zeros
  •On write: data thrown away
  •Also available as 32-bit version: WZR
  20
  SP Register
  Special-purpose register…
  •SP (Stack Pointer):
  Contains address of top (low memory address)
  of current function’s stack frame
  Allows use of the STACK section of memory
  (See Assembly Language: Function Calls lecture later)
  (inactive)
  (current)
  …
  SP
  stack frames
  low address
  high address
  21
  PC Register
  Special-purpose register…
  •PC (Program Counter)
  •Stores the location of the next instruction
  •Address (in TEXT section) of machine-language instruction to be executed next
  •Value changed:
  •Automatically to implement sequential control flow (increment by 4 bytes)
  •By branch instructions to implement selection, repetition
  PC
  TEXT section
  22
  PSTATE Register
  Special-purpose register…
  •Contains condition flags:
   n (Negative), z (Zero), c (Carry), v (oVerflow)
  •Affected by compare (cmp) instruction
  •And many others, if requested
  •Used by conditional branch instructions
  • beq, bne, blo, bhi, ble, bge, …
  •(See Assembly Language: Part 2 lecture)
  23
  nzcv (rest of pstate)
  Agenda
  Language Levels
  Architecture
  Assembly Language: Performing Arithmetic
  Assembly Language: Load/Store and Defining Global Data
  24
  ALU Arithmetic Example
  25
  ALU
  src1 src2
  dest
  operation ALU flags
  RAM
  Control
  Unit
  CPU
  Registers
  Data bus
  ALU
  Instruction Format
  Many instructions have this format:
  •name: mnemonic name of the instruction (add, sub, mul, and, etc.)
  •s: if present, specifies that condition flags should be Set
  •dest and src1,src2 are x registers: 64-bit operation
  •dest and src1,src2 are w registers: 32-bit operation
  •No mixing and matching between x and w registers
  •src2 may be a constant (“immediate” value) instead of a register
  name{,s} dest, src1, src2
  name{,s} dest, src1, immed
  26
  ALU
  src1 src2
  dest
  operation ALU PSTATE
  64-bit Arithmetic
  27
  static long length;
  static long width;
  static long perim;
  ...
  perim =
   (length + width) * 2;
  Assume that…
  •there’s a good reason for having variables
  with file scope, process duration
  •length held in x1
  •width held in x2
  •perim held in x3
  We’ll see later how to make this happen
  C code:
  add x3, x1, x2
  lsl x3, x3, 1
  Assembly code: Recall use of left
  shift by 1 bit to
  multiply by 2
  More Arithmetic
  static long x;
  static long y;
  static long z;
  ...
  z = x
  - y;
  z = x * y;
  z = x / y;
  z = x & y;
  z = x | y;
  z = x ^ y;
  z = x >> y;
  sub x3, x1, x2
  mul x3, x1, x2
  sdiv x3, x1, x2
  and x3, x1, x2
  orr x3, x1, x2
  eor x3, x1, x2
  asr x3, x1, x2
  28
  Assume that… •x held in x1 •y held in x2 •z held in x3
  Assembly code:
  Not xor
  !
  More Arithmetic: Shortcuts
  static long x;
  static long y;
  static long z;
  ...
  z = x;
  z = -x;
  mov x3, x1
  neg x3, x1
  29
  orr x3, xzr, x1
  sub x3, xzr, x1
  These are actually
  assembler shortcuts
  for instructions with
  XZR!
  Assume that…
  •x held in x1
  •y held in x2
  •z held in x3
  Assembly code:
  Signed vs Unsigned?
  static long x;
  static unsigned long y;
  ...
  x++;
  y--;
  add x1, x1, 1
  sub x2, x2, 1
  30
  Mostly the same algorithms, same instructions!
  •Can set different condition flags in PSTATE
  •But some exceptions…
  Assume that…
  •x held in x1
  •y held in x2
  Assembly code:
  Signed vs Unsigned: Exceptions
  sdiv x1, x1, 17
  udiv x2, x2, 42
  asr x1, x1, 1
  lsr x2, x2, 2
  31
  static long x;
  static unsigned long y;
  ...
  x /= 17;
  y /= 42;
  x >>= 1;
  y >>= 2;
  Assume that…
  •x held in x1
  •y held in x2
  Assembly code:
  “Arithmetic” right shift
  (shift in sign bit on left)
  vs. “logical” right shift
  (shift in zeros on left)
  32-bit Arithmetic using “w” registers
  32
  static int length;
  static int width;
  static int perim;
  ...
  perim =
   (length + width) * 2;
  Assume that…
  •length held in w1
  •width held in w2
  •perim held in w3
  C code:
  add w3, w1, w2
  lsl w3, w3, 1
  Assembly code:
  8- and 16-bit Arithmetic?
  static char x;
  static short y;
  ...
  x++;
  y--;
  33
  No specialized arithmetic instructions
  •Use “w” registers
  •Specialized “load” and “store” instructions for transfer of
  shorter data types from / to memory – we’ll see these later
  •Corresponds to C language semantics: all arithmetic is
  implicitly done on (at least) ints
  Agenda
  Language Levels
  Architecture
  Assembly Language: Performing Arithmetic
  Assembly Language: Load/Store and Defining Global Data
  34
  Loads and Stores
  Most basic way to load (from RAM) and store (to RAM):
  •dest and src are registers!
  •The addresses (src for ldr, dest for str) must be x-flavored
  •Other operands (dest for ldr, src for str) can be x-flavored or w-flavored
  •Contents of registers in [brackets] must be memory addresses
  •Every memory access is through a “pointer”!
  35
  ldr dest, [src]
  str src, [dest]
  Signed vs Unsigned, 8- and 16-bit
  ldrb dest, [src]
  ldrh dest, [src]
  strb src, [dest]
  strh src, [dest]
  ldrsb dest, [src]
  ldrsh dest, [src]
  ldrsw dest, [src]
  36
  Special instructions for reading/writing Bytes (8 bit) and shorts (“Half-words”: 16 bit)
  •See appendix of these slides for information on ordering:
  little-endian vs. big-endian
  Special instructions for signed reads
  •“Sign-extend” byte, half-word, or word to 32 or 64 bits
  Loads and Stores
  Most basic way to load (from RAM) and store (to RAM):
  •dest and src are registers!
  • The addresses (src for ldr, dest for str) must be x-flavored
  • Other operands (dest for ldr, src for str) can be x-flavored or w-flavored
  •Contents of registers in [brackets] must be memory addresses
  •Every memory access is through a “pointer”!
  •How to get correct memory address into register?
  •Depends on whether data is on stack (local variables),
  heap (dynamically-allocated memory), or global / static
  •For today, we’ll look only at the global / static case
  37
  ldr dest, [src]
  str src, [dest]
  Our First Full Program*
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  38
  * Sorry, I know by convention it should be “Hello, World!”. You’ll see that in precept.
  Memory sections
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  39
  Sections (Stack/heap are different!)
  .rodata: read-only
  .data: read-write
  .bss: read-write (initialized to 0)
  .text: read-only, program code
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Variable definitions
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  40
  Declaring data
  “Labels” for locations in memory
  .word: 32-bit int and initial value
  See appendix for variables in other sections, with other types.
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  main()
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  41
  Global visibility
  .global: Declare “main” to be a
  globally-visible label
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Make a “pointer”
  .section .data
  length: .word 1
  width: .word 2
  perim
  : .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  42
  Generating addresses
  adr: put address of
  a label in a register
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main() {
  perim
  =
   (length + width) * 2;
   return 0; }
  Loads and Stores
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  43
  Load and store
  Use x0 as a “pointer” to load
  from and store to memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Return
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  45
  Return a value
  ret: return to the caller, with
  register 0* holding the return value
  * w0 for int, x0 for long
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  46
  x0
  w1
  w2
  1
  2
  0
  length
  width
  perim
  Registers
  Memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  1
  x0
  w1
  w2
  1
  2
  0
  length
  width
  perim
  Registers Memory
  47
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Registers
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  48
  1
  x0
  w1
  w2
  1
  2
  0
  length
  width
  perim
  Registers Memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Registers
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  49
  1
  2
  x0
  w1
  w2
  1
  2
  0
  length
  width
  perim
  Registers Memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Registers
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  50
  3
  2
  x0
  w1
  w2
  1
  2
  0
  length
  width
  perim
  Registers Memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Registers
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  51
  6
  2
  x0
  w1
  w2
  1
  2
  0
  length
  width
  perim
  Registers Memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Registers
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  52
  6
  2
  x0
  w1
  w2
  1
  2
  0
  length
  width
  perim
  Registers Memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Registers
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  53
  6
  2
  x0
  w1
  w2
  1
  2
  6
  length
  width
  perim
  Registers Memory
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Registers
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  54
  Return value
  Passed back in register w0
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Trace
  .section .data
  length: .word 1
  width: .word 2
  perim: .word 0
  .section .text
  .global main
  main:
  adr x0, length
  ldr w1, [x0]
  adr x0, width
  ldr w2, [x0]
  add w1, w1, w2
  lsl w1, w1, 1
  adr x0, perim
  str w1, [x0]
  mov w0, 0
  ret
  55
  Return to caller
  ret instruction
  static int length = 1;
  static int width = 2;
  static int perim = 0;
  int main()
  {
  perim =
   (length + width) * 2;
   return 0;
  }
  Summary
  Language levels
  The basics of computer architecture
  • Enough to understand AARCH64 assembly language
  The basics of AARCH64 assembly language
  • Instructions to perform arithmetic
  • Instructions to define global data and perform data transfer
  To learn more
  • Study more assembly language examples
  • Chapters 2-5 of Pyeatt and Ughetta book
  • Study compiler-generated assembly language code (though it will be challenging!)
  • gcc217 –S somefile.c
  56
  DEFINING DATA:
  OTHER SECTIONS AND SIZES
  Appendix 1
  57
  Defining Data: DATA Section 1
  static char c = 'a';
  static short s = 12;
  static int i = 345;
  static long l = 6789;
  .section ".data"
  c:
   .byte 'a'
  s:
   .short 12
  i:
   .word 345
  l:
   .quad 6789
  Notes:
  .section directive
   (to announce DATA section)
  label definition
   (marks a spot in RAM)
  .byte directive (1 byte)
  .short directive (2 bytes)
  .word directive (4 bytes)
  .quad directive (8 bytes) 58
  Defining Data: DATA Section 2
  char c = 'a';
  short s = 12;
  int i = 345;
  long l = 6789;
  .section ".data"
   .global c
  c: .byte 'a'
   .global s
  s: .short 12
   .global i
  i: .word 345
   .global l
  l: .quad 6789
  Notes:
  Can place label on same line
   as next instruction
   or directive
  .global directive can also apply
   to variables, not just functions
  59
  Defining Data: BSS Section
  static char c;
  static short s;
  static int i;
  static long l;
  .section ".bss"
  c:
   .skip 1
  s:
   .skip 2
  i:
   .skip 4
  l:
   .skip 8
  Notes:
  .section directive
   (to announce BSS section)
  .skip directive
   (to specify number of bytes)
  60
  Defining Data: RODATA Section
  …
  …"hello\n"…;
  …
  .section ".rodata"
  helloLabel:
   .string "hello\n"
  Notes:
  .section directive (to announce RODATA section)
  .string directive
  61
  BYTE ORDER:
  BIG-ENDIAN VS LITTLE-ENDIAN
  Appendix 2
  62
  Byte Order
  AARCH64 is a little endian architecture
  • Least significant byte of multi-byte entity
  is stored at lowest memory address
  •
  “Little end goes first”
  Some other systems use big endian
  • Most significant byte of multi-byte entity
  is stored at lowest memory address
  •
  “Big end goes first”
  00000101
  00000000
  00000000
  00000000
  1000
  1001
  1002
  1003
  The int 5 at address 1000:
  00000000
  00000000
  00000000
  00000101
  1000
  1001
  1002
  1003
  The int 5 at address 1000:
  63
  Byte Order Example 1
  Byte 0: ff
  Byte 1: 77
  Byte 2: 33
  Byte 3: 00
  #include <stdio.h>
  int main(void)
  { unsigned int i = 0x003377ff;
   unsigned char *p;
   int j;
   p = (unsigned char *)&i;
   for (j = 0; j < 4; j++)
   printf("Byte %d: %2x\n", j, p[j]);
  }
  Output on a
  little-endian
  machine
  Byte 0: 00
  Byte 1: 33
  Byte 2: 77
  Byte 3: ff
  Output on a
  big-endian
  machine
  64
  Byte Order Example 2
  .section ".data"
  foo: .word 7
   .section ".text” .global “main”
  main:
  adr x0, foo
  ldrb w0, [x0]
  ret
  Note:
  Flawed code; uses “b”
  instructions to load from
  a four-byte memory area
  What would be the value
  returned from w0 if
  AARCH64 were big endian?
  AARCH64 is little endian,
  so what will be the value
  returned from w0?
  65`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();