import { useNavigate } from 'react-router-dom'

export default function InfoPanel({ name, roomStudentCount, isMentor, handleResetCode }) {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col items-center h-[80vh] justify-between w-[250px] bg-[#1e1e1e] p-4 text-[#f1f1f1] rounded-lg mobile:w-[90vw] mobile:h-[130px] mobile:flex-row'>
            <div className='flex flex-col text-center items-center gap-4 mobile:gap-2'>
                <h1 className='text-2xl font-semibold mobile:text-sm'>{`${name}`}</h1>
                <h1 className='text-2xl mobile:text-xs'>{`Active Students: ${roomStudentCount}`}</h1>
                <h2 className='text-md mobile:text-xs'>{`Role: ${isMentor ? 'Mentor (Read Only)' : 'Student'}`}</h2>
            </div>
            <div className='flex flex-col items-center'>
                <button className='orange-button' onClick={() => navigate('/')}>
                    Back To Lobby
                </button>
                {isMentor && (
                    <button onClick={handleResetCode} className='orange-button'>
                        Reset Code
                    </button>
                )}
            </div>
        </div>
    )
}
