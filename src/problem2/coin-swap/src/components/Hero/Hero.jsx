import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from 'react-icons/fa6'

import {centerVariants, primaryBtnVariants} from '../../constants/motion'
import "./hero.css";

export default function Hero() {
    const navigate = useNavigate();
    const goToSwappingForm = () => navigate('/swap')

    return (
        <section className="hero">
            <div className='hero__container container'>
                <div className='hero__content d-flex f-column align-center'>
                    <motion.div 
                        variants={centerVariants}
                        initial='hidden'
                        animate='visible'
                        className='group d-flex f-column align-center r-gap-2'
                    >
                        <motion.div  
                            variants={centerVariants}
                            initial='hidden'
                            animate='visible'
                            className='hero__label'
                        >
                            <a href='#' className='d-flex align-center'>
                                Introduction to CoinSwap <FaArrowRightLong />
                            </a>
                        </motion.div>
                        <motion.div  
                            variants={centerVariants}
                            initial='hidden'
                            animate='visible'
                            className='hero__title'
                        >
                            <h1> Crypto Your Gateway To <br/> Digital Prosperity</h1>
                        </motion.div>
                        <motion.div  
                            variants={centerVariants}
                            initial='hidden'
                            animate='visible'
                            className='hero__subtitle'
                        >
                            <p>Unlocking the Future of Financial Indepenece through <br/> Secure and Seamless Coin Swapping Solution</p>
                        </motion.div>
                        <motion.button 
                            type='button' 
                            variants={{...primaryBtnVariants, ...centerVariants}}
                            initial='default'
                            whileHover='hover'
                            whileTap='active'
                            className='btn btn-primary rounded-pill d-flex align-center'
                            style={{ columnGap: '0.5rem'}}
                            onClick={goToSwappingForm}
                        >
                            Start Swapping !!!
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
