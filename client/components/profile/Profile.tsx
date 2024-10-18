import React from 'react'
import UserAvatar from '../common/UserAvatar'


function Profile({ name, image, email} :
    {
        name: string;
        image: string | undefined;
        email: string | undefined;
    }
) {
  return (
    <div className='min-h-screen w-full flex mt-20 justify-center items-start'>
        <div className='p-10 container w-1/2 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:border-slate-700 dark:border dark:shadow-lg dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:via-50% dark:to-slate-950 dark:text-slate-100'>
            <div className='flex py-5 justify-start gap-10 items-center'>
                <div className='font-semibold'>Profile Image:</div>
                <UserAvatar name={name} image={image} />
            </div>

            <div className='flex py-5 justify-start gap-10 items-center'>
                <div className='font-semibold'>Username: </div>
                <div>{name}</div>
            </div>

            <div className='flex py-5 justify-start gap-10 items-center'>
                <div className='font-semibold'>Email: </div>
                <div>{email}</div>
            </div>

            
        </div>
    </div>
  )
}

export default Profile