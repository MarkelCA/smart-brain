import Tilty from 'react-tilty'
import './Logo.css'
import brain from './brain.svg'
const Logo = () => {
    return (
    <Tilty className="tilty w-32 h-32 bg-green-800 m-8" max={45} glare scale={1.05} maxGlare={0.5}>
            <img className='w-full h-full p-4' src={brain} alt="smart-brain-logo" />
     </Tilty>
    )
}

export default Logo;
