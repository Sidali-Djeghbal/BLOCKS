import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        output: 'Compilation error: API key not configured. Please set the RAPIDAPI_KEY environment variable.'
      }, { status: 500 });
    }

    // Use Judge0 API for compilation and execution
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code: code,
        language_id: 4, // ID for C (gcc 9.2.0)
        stdin: '',
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to compile code: ${errorData}`);
    }

    const { token } = await response.json();

    // Wait for the submission to be processed
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get the submission result
    const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    });

    if (!resultResponse.ok) {
      const errorData = await resultResponse.text();
      throw new Error(`Failed to get compilation result: ${errorData}`);
    }

    const result = await resultResponse.json();

    if (result.status.id === 3) { // Accepted
      return NextResponse.json({
        success: true,
        output: `Compilation successful!\nProgram output:\n${result.stdout || 'No output'}${result.stderr ? `\nErrors:\n${result.stderr}` : ''}`
      });
    } else {
      return NextResponse.json({
        success: false,
        output: result.compile_output || result.stderr || 'Compilation failed'
      });
    }

  } catch (error) {
    // Return error as JSON
    return NextResponse.json({
      success: false,
      output: `Compilation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}