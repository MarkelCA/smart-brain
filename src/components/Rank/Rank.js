import './Rank.css'

const Rank = ({ rank, name, position }) => {
    return (
        <div id="rank">
            <p id='rank-text' className='text-white text-xl'>{name}, your current Rank is {rank}</p>
            <p id='rank-value' className='text-pink-500 text-3xl'>#{position}</p>
        </div>
    )
}

export default Rank
