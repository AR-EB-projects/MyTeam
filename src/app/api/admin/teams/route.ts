import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const teams = await prisma.club.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error("Teams fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, imageUrl, imagePublicId } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 }
      );
    }

    if (!slug || !slug.trim()) {
      return NextResponse.json(
        { error: "Team slug is required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingTeam = await prisma.club.findUnique({
      where: { slug },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: "Team with this slug already exists" },
        { status: 409 }
      );
    }

    // Create new team
    const team = await prisma.club.create({
      data: {
        name: name.trim(),
        slug: slug.trim(),
        imageUrl: imageUrl || null,
        imagePublicId: imagePublicId || null,
      },
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("Create team error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
