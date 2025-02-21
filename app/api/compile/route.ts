import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    // Create temporary file paths
    const tempDir = path.join(process.cwd(), 'temp');
    const sourceFile = path.join(tempDir, 'temp.c');
    const outputFile = path.join(tempDir, 'temp.exe');

    // Write the code to a temporary file
    await writeFile(sourceFile, code);

    try {
      // Compile the code using local gcc
      await execAsync(`gcc "${sourceFile}" -o "${outputFile}"`);
      
      // Run the compiled program
      const { stdout, stderr } = await execAsync(outputFile);
      
      return NextResponse.json({
        success: true,
        output: `Compilation successful!\nProgram output:\n${stdout || 'No output'}${stderr ? `\nErrors:\n${stderr}` : ''}`
      });
    } catch (execError: any) {
      return NextResponse.json({
        success: false,
        output: `Compilation error: ${execError.stderr || execError.message}`
      }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      output: `Compilation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}