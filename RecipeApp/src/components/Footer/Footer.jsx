import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import ChefNataliaLogo from "../../assets/ChefNataliaLogo.png";

const Footer = () => {
  return (
    <section>
      <footer className="bg-secondary py-1">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="container flex flex-col md:flex-row justify-between items-center"
        >
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <a href="#" target="">
              <img 
                src={ChefNataliaLogo}
                alt="Natalia Logo" 
                className="h-48 w-48" // Adjust these classes as needed for size
              />
            </a>
          </div>
         
          {/* Social icons section */}
          <div className="text-3xl flex items-center gap-4 mt-6 md:mt-0 text-gray-700">
            <motion.a 
              href="https://github.com/BobchopGaming" 
              target="new" 
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer"
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://www.facebook.com/bobchopgaming565/" 
              target="new" 
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/jose-omolon-77b985197/" 
              target="new"
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer"
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </motion.div>
        
        {/* Copyright centered */}
        <div className="text-center text-white mt-4">
          <p>
            <a href="https://joseomolon.github.io/myprofile.io/" target="new">
              © Natalia's Fun World. All rights reserved.
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
