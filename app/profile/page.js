import { auth, signOut } from '../auth';
import Link from 'next/link';
import WishlistViewProfile from '../component/WishlistViewProfile';
import OrderDetails from '../component/OrderDetails';
import { MdLogout } from "react-icons/md";



export const dynamic = 'force-dynamic';

const Profile = async () => {
    let user;
    try {
        const authResult = await auth();
        user = authResult.user;
    } catch (error) {
        console.error('Error during authentication:', error);
        return (
            <div>
                <h2 className='font-bold text-3xl text-center mt-4 mb-4'>
                 Please Login First and try again.
                </h2>
                <Link href={'/login'}>
                    <h2 className='text-red-600 hover:underline cursor-pointer text-center font-bold text-3xl'>
                        Login Here
                    </h2>
                </Link>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <h2 className='font-bold text-3xl text-center mt-4 mb-4'>
                    No Profile Found
                </h2>
                <Link href={'/login'}>
                    <h2 className='text-red-600 hover:underline cursor-pointer text-center font-bold text-3xl'>
                        Login Here
                    </h2>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-100">
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-12 max-w-4xl w-full">
                <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="flex flex-col items-center mb-6 md:mb-0">
                        <img className="w-[150px] h-[150px] rounded-full object-cover border-4 border-blue-500" src={user.img || 'https://www.shutterstock.com/shutterstock/photos/1153673752/display_1500/stock-vector-profile-placeholder-image-gray-silhouette-no-photo-1153673752.jpg'} alt="User Image"/>
                        <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.username}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex-1">
                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Order History</h3>
                            <ul>
                                <OrderDetails/>
                            </ul>
                        </div>
                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Wishlist</h3>
                            <WishlistViewProfile/>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center md:text-left">Settings</h3>
                            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button> */}
                        </div>
                        <div className='mt-4 flex justify-center items-center md:justify-start'>
                            <form action={async () => {
                                        "use server"
                                        await signOut();}}>
                            <button className="bg-red-500 text-white font-semibold px-7 py-2 rounded hover:bg-red-800">Logout <MdLogout className='inline w-5 h-5 mb-[3px] rotate-180'/></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Profile;
// <div>
//     <div className='text-3xl font-bold'>
//         {user.email}
//     </div>
//     <form
//         action={async () => {
//                 "use server"
//                 await signOut();}}>
//         <button className='border border-black text-center'>
//             Logout
//         </button>
//     </form>
// </div>
