import Tilty from 'react-tilty'
import './Logo.css'
import brain from './brain.svg'
const Logo = () => {
    return (
        <div id="main-logo"  className='flex justify-center'>
            <Tilty className="tilty w-40 h-40 bg-green-800 m-8" max={45} glare scale={1.05} maxGlare={0.5}>
                    <img className='w-full h-full p-4' src={brain} alt="smart-brain-logo" />
             </Tilty>
        </div>
    )
}

export default Logo;
