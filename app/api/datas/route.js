import { auth } from "@/app/auth";
import ConnectDB from "@/app/DB/ConnectDB";
import Users from "@/app/models/Users";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        // Authenticate user
        const authResult = await auth();
        const user = authResult.user;
        await ConnectDB();
        console.log('Authenticated user:', user.username);

        // Parse the incoming JSON data
        const data = await req.json();
        console.log('Received data:', data.items);
        console.log('Wishlist items:', data.itemsw);  // Debugging line

        // Find the user by username
        const existingUser = await Users.findOne({ username: user.username });

        if (!existingUser) {
            console.log('User not found, redirecting to signup');
            return NextResponse.redirect('/signup'); // Redirect if user does not exist
        }

        // Ensure the products array is initialized
        if (!Array.isArray(existingUser.products)) {
            existingUser.products = [];
        }

        // Add new products
        data.items.forEach(item => {
            existingUser.products.push({
                productId: item.id,
                productTitle: item.title,
                productDescription: item.description,
                productImage: item.image,
                productCategory: item.category,
                productPrice: item.price,
                productQuantity: item.quantity,
            });
        });

        // Ensure the wishlist array is initialized
        if (!Array.isArray(existingUser.wishlist)) {
            existingUser.wishlist = [];
        }

        // Add to wishlist
        if (Array.isArray(data.itemsw)) {  // Check if itemsw is an array
            data.itemsw.forEach(item => {
                existingUser.wishlist.push({
                    productIdw: item.id,
                    productTitlew: item.title,
                    productDescriptionw: item.description,
                    productImagew: item.image,
                    productCategoryw: item.category,
                    productPricew: item.price,
                });
            });
        } else {
            console.log('No wishlist items to add.');
        }

        // Save the updated user data
        const savedUser = await existingUser.save();
        console.log('User data updated successfully:', savedUser);

        return NextResponse.json({ success: true, message: 'User data updated successfully' });

    } catch (error) {
        console.error('Error processing request:', error.message);
        console.error('Stack Trace:', error.stack);
        return NextResponse.json({ success: false, message: 'Failed to process data', error: error.message }, { status: 500 });
    }
}


// //api/datas/route.js
// import { auth } from "@/app/auth";
// import ConnectDB from "@/app/DB/ConnectDB";
// import Users from "@/app/models/Users";
// import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     try {
//         // Authenticate user
//         const authResult = await auth();
//         const user = authResult.user;
//         await ConnectDB();
//         console.log('Authenticated user:', user.username);

//         // Parse the incoming JSON data
//         const data = await req.json();
//         console.log('Received data:', data.items);

//         // Find the user by username
//         const existingUser = await Users.findOne({ username: user.username });

//         if (!existingUser) {
//             console.log('User not found, redirecting to signup');
//             return redirect('/signup'); // Redirect if user does not exist
//         }

//         // Ensure the products array is initialized
//         if (!Array.isArray(existingUser.products)) {
//             existingUser.products = [];
//         }

//         // Add new products
//         data.items.forEach(item => {
//             existingUser.products.push({
//                 productId: item.id,
//                 productTitle: item.title,
//                 productDescription: item.description,
//                 productImage: item.image,
//                 productCategory: item.category,
//                 productPrice: item.price,
//                 productQuantity: item.quantity,
//             });
//         });
//         if (!Array.isArray(existingUser.wishlist)) {
//             existingUser.wishlist = [];
//         }
//         // Add to wishlist
//         data.itemsw.forEach(item => {
//             existingUser.wishlist.push({
//                 productId: item.id,
//                 productTitle: item.title,
//                 productDescription: item.description,
//                 productImage: item.image,
//                 productCategory: item.category,
//                 productPrice: item.price,
//             });
//         });

//         // Save the updated user data
//         const savedUser = await existingUser.save();
//         console.log('User data updated successfully:', savedUser);

//         return NextResponse.json({ success: true, message: 'User data updated successfully' });

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({ success: false, message: 'Failed to process data', error: error.message }, { status: 500 });
//     }
// }
