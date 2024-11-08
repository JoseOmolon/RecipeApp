import { MdOutlineManageSearch } from "react-icons/md";
import BabyChef1 from "../../assets/Babychef1.png"
import { motion } from "framer-motion";
import { FadeRight } from "../../utility/animation";


const Hero = () => {
  return (
    <section className="relative min-h-[800px] bg-gradient-to-r from-[#FFA500] to-white bg-cover bg-center" id="home">

        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
            {/* Brand Info*/}
            <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
                <div className="text-center md:text-left space-y-6 lg:max-w-[400px]">
                    <motion.h1 
                    variants={FadeRight(0.6)}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-loose font-averia">Chef Natalia's
                        <br />
                        Fresh <span className="text-secondary">Recipe!</span>
                    </motion.h1>
                    <motion.p 
                        variants={FadeRight(0.9)}
                        initial="hidden"
                        animate="visible"
                        className="text-2xl tracking-wide">Order Now for Fresh Healthy Life</motion.p>
                    <motion.p 
                        variants={FadeRight(1.2)}
                        initial="hidden"
                        animate="visible"
                        className="text-gray-400">
                        Healthy and delicious recipes for a fresh morning breakfast. Enjoy daily to boost your health and uplift your mind. Start your day with flavor and wellness!
                    </motion.p>
                    {/* button section */}
                    <motion.div 
                        variants={FadeRight(1.5)}
                        initial="hidden"
                        animate="visible"
                        className="flex justify-center md:justify-start">
                       <a href="#foodsearch" className="primary-btn flex items-center gap-2">
                            <span>
                                <MdOutlineManageSearch />
                            </span>
                            Discover Recipes
                        </a>
                    </motion.div>
                </div>
            </div>
            {/* Hero Images*/}
           <div className="flex justify-center items-center">
            <motion.img
                initial={{opacity:0, x:200, rotate: 75}}
                animate={{opacity: 1, x:0, rotate: 0}} 
                transition={{duration: 1, delay:0.2}}
                src={BabyChef1}   
                alt=""  
                className="w-[350px] md:w-[550px] drop-shadow" />
           </div>
        </div>
   </section>
  )
}

export default Hero