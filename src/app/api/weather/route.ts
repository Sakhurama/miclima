import { NextRequest, NextResponse } from "next/server";

//localhost:3000/api/weather
export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");
  let url = "";
  if (address) {
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      address +
      "&appid=" +
      "16351421b23864b507137e35b07d7d9d" +
      "&lang=es";
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=16351421b23864b507137e35b07d7d9d&lang=es`;
  }
  console.log(url);
  const res = await fetch(url);

  const data = await res.json();
  return NextResponse.json({ data });
};