import React from 'react'

const About = () => {
  return (
    <div className=''>
      <div className='flex flex-col md:flex-row bg-[#dcedfc] justify-center items-center p-4 md:px-6 '>
        <div className='md:px-6 mb-4 md:mb-0'>
          <h1 className='font-bold text-xl sm:text-2xl text-center sm:text-start mb-1 md:mb-2 '>About Us</h1>
          <p className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio ad voluptates animi perspiciatis, veritatis vero temporibus magni. Similique consequuntur possimus ex voluptates veniam? Consectetur accusamus magnam explicabo laborum quasi dignissimos.</p>
        </div>
        <div className=''>
          <img src="https://media.istockphoto.com/id/1346125184/photo/group-of-successful-multiethnic-business-team.jpg?s=612x612&w=0&k=20&c=5FHgRQZSZed536rHji6w8o5Hco9JVMRe8bpgTa69hE8=" alt=" no image found" />
        </div>
      </div>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center p-4 md:px-6 '>
          <div className='md:ml-6'>
            <img src="https://media.istockphoto.com/id/1373240838/photo/positive-team-motivation.jpg?s=612x612&w=0&k=20&c=zyLDqvjxYDV0nhKf7laXUcOer5ZW-FH864I9k6LXgjI=" alt=""  />
          </div>
          <div className='md:px-6 mt-4 md:mt-0'>
            <h1 className='font-bold text-xl sm:text-2xl text-center sm:text-start mb-1 md:mb-2 '>Our MIssion: Helping Millions of Organsiation Grow Better</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto nemo corporis molestiae officiis quae a porro? Numquam, iure voluptatum magni modi nesciunt asperiores consequatur suscipit, quis similique exercitationem porro fugiat?</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-center items-center p-4 md:px-6 md:mb-6'>
          <div className='md:px-6 mb-4 md:mb-0'>
            <h1 className='font-bold text-xl sm:text-2xl text-center sm:text-start mb-1 md:mb-2 '>Our Story</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque dolore laboriosam inventore, id, impedit quasi autem nesciunt illum minima non nobis eveniet reiciendis officia voluptatibus accusantium deserunt perspiciatis ipsum ex. Lorem ipsum dolor sit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut temporibus necessitatibus consectetur quasi? Molestiae maiores praesentium explicabo enim veniam consequuntur delectus suscipit exercitationem vitae nisi, vel sunt eos itaque? Perferendis.</p>
          </div>
          <div>
            <img src="https://techcrunch.com/wp-content/uploads/2021/08/Yamini-Rangan-Brian-Halligan-.jpg?w=798" alt="" />
          </div>
        </div>
      </div>
      <div className='bg-[#dcedfc] py-4 md:pb-[4rem]'>
        <h1 className='text-center text-xl md:text-2xl font-bold text-[mehroon] mb-4 '>Hubspot By The Numbers</h1>
        <div className='flex flex-col md:flex-row mx-auto justify-center items-center gap-8'>
          <div className='bg-white w-[200px] h-[210px] rounded-md border border-gray-200 shadow-lg px-2 md:px-6 '>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqIdL_lBgXixJYTsrsi7hYrIhrco_CcVgt05ZipMVQRHzb3avAjp3Pp_mgsP_XMpgS580&usqp=CAU" alt="no avatr" className='object-contain' />
            <h4 className='font-bold '>12 Global Offices</h4>
            <span className='flex justify-center text-[#4089ab] font-bold underline decoration-2 decoration-indigo-900 cursor-pointer'>Learn More</span>
          </div>
          <div className='bg-white w-[200px] h-[210px] rounded-md border border-gray-200 shadow-lg px-2 md:px-6 '>
            <img src="https://www.thirdwunder.com/wp-content/uploads/2023/11/2022_Design_Icon_ThreePortraits-1-TW-4_3-800x600.png" alt="no avatr" className='object-contain w-[152px] h-[152px] ' />
            <h4 className='font-bold '>7,600+ Employees</h4>
            <span className='flex justify-center text-[#4089ab] font-bold underline decoration-2 decoration-indigo-900 cursor-pointer'>Learn More</span>
          </div>
          <div className='bg-white w-[200px] h-[210px] rounded-md border border-gray-200 shadow-lg px-2 md:px-6 '>
            <img src="https://cdn.dribbble.com/users/1129235/screenshots/3127245/2-gif.gif" alt="no avatr" className='object-contain w-[152px] h-[152px] ' />
            <h4 className='font-bold '>20500+ Customers</h4>
            <span className='flex justify-center text-[#4089ab] font-bold underline decoration-2 decoration-indigo-900 cursor-pointer'>Learn More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About