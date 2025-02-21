import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    // Write the C code to a temporary file in the OS temp directory
    const tempDir = process.env.TEMP || '/tmp';
    const filePath = path.join(tempDir, 'temp.c');
    const outputPath = path.join(tempDir, 'temp.exe');
    await writeFile(filePath, code);

    // Check if GCC is installed
    try {
      await execAsync('gcc --version');
    } catch (error) {
      return NextResponse.json({
        success: false,
        output: 'GCC compiler is not installed. Please install GCC to compile C code.'
      });
    }

    // Compile the C code
    const { stdout, stderr } = await execAsync(`gcc ${filePath} -o ${outputPath}`);

    // If compilation is successful, run the program
    if (!stderr) {
      try {
        const { stdout: programOutput, stderr: programError } = await execAsync(outputPath);
        return NextResponse.json({
          success: true,
          output: `Compilation successful!\nProgram output:\n${programOutput || 'No output'}${programError ? `\nErrors:\n${programError}` : ''}`
        });
      } catch (runError) {
        return NextResponse.json({
          success: false,
          output: `Program execution error: ${runError instanceof Error ? runError.message : 'Unknown error'}`
        });
      }
    }

    // Return compilation error if any
    return NextResponse.json({
      success: false,
      output: `Compilation error:\n${stderr}`
    });

  } catch (error) {
    // Return error as JSON
    return NextResponse.json({
      success: false,
      output: `Compilation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
