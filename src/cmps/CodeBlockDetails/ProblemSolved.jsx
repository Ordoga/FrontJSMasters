export default function ProblemSolved({ isImageVisible }) {
    return (
        <>
            {isImageVisible && (
                <div className='overlay'>
                    <img src='/problem-solved.png' alt='Overlay' className='overlay-image' />
                </div>
            )}
        </>
    )
}
