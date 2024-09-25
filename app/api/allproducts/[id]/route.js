//api/allproducts/[id]/route.js
import ConnectDB from '@/app/DB/ConnectDB';
import Allproducts from '@/app/models/Allproducts';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await ConnectDB();

    // Fetch the product by ID in the nested array
    const productData = await Allproducts.findOne(
      { 'products.id': id },
      { 'products.$': 1 } // Return only the matched product in the products array
    );

    if (!productData || productData.products.length === 0) {
      return NextResponse.json({ productData: null }, { status: 404 });
    }

    // Extract the product from the array
    const product = productData.products[0];

    return NextResponse.json({ productData: product });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching product', error }, {
      status: 500,
    });
  }
}