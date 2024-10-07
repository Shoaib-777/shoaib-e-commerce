import ConnectDB from '@/app/DB/ConnectDB';
import Allproducts from '@/app/models/Allproducts';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await ConnectDB();

    // Try to find the product by the 'id' field
    let productData = await Allproducts.findOne(
      { 'products.id': id },
      { 'products.$': 1 } // Return only the matched product in the products array
    );

    // If not found by 'id', try to find by '_id'
    if (!productData || productData.products.length === 0) {
      productData = await Allproducts.findOne(
        { 'products._id': id }, // Check for the '_id' field
        { 'products.$': 1 }
      );
    }

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
