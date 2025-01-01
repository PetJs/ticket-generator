import patterLine from "./assets/images/pattern-lines.svg"
import patternTop from "./assets/images/pattern-squiggly-line-top.svg"
import patternCircle from "./assets/images/pattern-circle.svg"
import patternBottom from "./assets/images/pattern-squiggly-line-bottom.svg"
import Logo from "./assets/images/logo-mark.svg"
import './App.css'

function App() {
  return (
    <div className="bg-[url('./assets/images/background-desktop.png')] bg-cover bg-center h-screen">
      <div>
        <img src={patternCircle} alt="" className="relative md:w-32 w-20 md:ml-6 md:-top-12 -top-6 md:left-0 -left-3" />
        <img src={patterLine} className="absolute inset-0" />
        <img src={patternTop} className="absolute top-6 right-0 mt md:w-80 w-28 " />
        <img src={patternCircle} alt="" className="absolute md:right-32 -right-10 md:w-32 w-20 md:mt-64 mt-36 " />
        <img src={patternBottom} alt="" className="absolute bottom-0 w-96 " />
      </div>
      <div className="flex text-white absolute top-0 left-1/2 transform -translate-x-1/2 mt-8 gap-4">
        <img src={Logo} alt="" />
        <h2 className="font-inconsolata font-semibold md:text-xl text-lg">Coding Conf</h2>
      </div>
      <div className="text-white flex flex-col justify-center items-center font-inconsolata m-4">
        <h1 className="md:text-5xl text-2xl max-w-2xl mx-auto text-center font-semibold">Your Journey to Coding Conf 2025 Starts Here!</h1>
        <p className="max-w-2xl mx auto text-center">Secure your spot at next year's biggest coding conference</p>
      </div>
      
      
    
    </div>
  )
}

export default App
