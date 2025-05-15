import { type NextRequest, NextResponse } from "next/server"

// This is the API route that will connect to your FastAPI backend
export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the request
    const searchParams = request.nextUrl.searchParams

    // Build the query parameters for the FastAPI backend
    const params = new URLSearchParams()

    // Add all search parameters to the FastAPI request
    if (searchParams.has("category")) {
      params.append("category", searchParams.get("category")!)
    }

    if (searchParams.has("calories")) {
      params.append("calories", searchParams.get("calories")!)
    }

    if (searchParams.has("fat")) {
      params.append("fat", searchParams.get("fat")!)
    }

    if (searchParams.has("saturated_fat")) {
      params.append("saturated_fat", searchParams.get("saturated_fat")!)
    }

    if (searchParams.has("cholesterol")) {
      params.append("cholesterol", searchParams.get("cholesterol")!)
    }

    if (searchParams.has("sodium")) {
      params.append("sodium", searchParams.get("sodium")!)
    }

    if (searchParams.has("carbohydrates")) {
      params.append("carbohydrates", searchParams.get("carbohydrates")!)
    }

    if (searchParams.has("fiber")) {
      params.append("fiber", searchParams.get("fiber")!)
    }

    if (searchParams.has("sugar")) {
      params.append("sugar", searchParams.get("sugar")!)
    }

    if (searchParams.has("protein")) {
      params.append("protein", searchParams.get("protein")!)
    }

    // Replace with your actual FastAPI endpoint
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${FASTAPI_URL}/api/food-recommendations?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching food recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch food recommendations" }, { status: 500 })
  }
}