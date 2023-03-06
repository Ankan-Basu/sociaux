export default function NotifItem() {
    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img src='ayaka.jpg' className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div className='p-1 bg-secondary rounded-lg rounded-tl-none h-12 text-ellipsis overflow-hidden'>
                    Do text clipping
                    </div>
                <div className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>Mark as read</div>
            </div>
        </div>
    )
}