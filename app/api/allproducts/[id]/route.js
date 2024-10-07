import ConnectDB from '@/app/DB/ConnectDB';
import Allproducts from '@/app/models/Allproducts';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await ConnectDB();

    let productData = await Allproducts.findOne(
      { 'products._id': id }, 
        { 'products.$': 1 } 
    );

    if (!productData || productData.products.length === 0) {
      return NextResponse.json({ productData: null }, { status: 404 });
    }
    const product = productData.products[0];

    return NextResponse.json({ productData: product });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching product', error }, {
      status: 500,
    });
  }
}
