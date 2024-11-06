import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();

    return NextResponse.json(
      { data },

      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  }
};
