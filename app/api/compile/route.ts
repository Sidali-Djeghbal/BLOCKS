import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    // Write the C code to a temporary file
    const filePath = path.join(process.cwd(), 'temp.c');
    await writeFile(filePath, code);

    // Compile the C code
    const { stdout, stderr } = await execAsync(`gcc ${filePath} -o ${path.join(process.cwd(), 'temp.exe')}`);

    // If compilation is successful, run the program
    if (!stderr) {
      try {
        const { stdout: programOutput, stderr: programError } = await execAsync(path.join(process.cwd(), 'temp.exe'));
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
