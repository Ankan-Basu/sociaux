import { FC } from "react"

interface IFrenReqProps {
    friendReq: {
        source: string
    } | any
}

const FrenReq: FC<IFrenReqProps> = ({friendReq}) => {
    return (
        <div className='mb-4 shadow-lg rounded-lg p-1 flex gap-1'>
            <img src='ayaka.jpg' className='w-12 h-12 rounded-full' />
            <div className='flex-1 w-100'>
                <div className='p-1 bg-secondary rounded-lg rounded-tl-none h-12 text-ellipsis overflow-hidden'>
                    {

                        friendReq&&
                    <div>{friendReq.source}</div>
                    }
                    
                    <div>fren?</div>
                    
                    </div>
                    <div className='flex justify-between pl-1 pr-2'>
                <span className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                    Accept</span>
                <span className='text-xs font-medium cursor-pointer hover:text-primary active:text-primary2'>
                    Reject</span>
                    </div>
            </div>
        </div>
    )
}

export default FrenReq;