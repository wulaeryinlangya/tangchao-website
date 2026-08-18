import Hero from './sections/Hero'
import Marquee from './components/Marquee'
import About from './sections/About'
import Stats from './sections/Stats'
import Data from './sections/Data'
import Business from './sections/Business'
import Spaces from './sections/Spaces'
import Creators from './sections/Creators'
import Timeline from './sections/Timeline'
import Gallery from './sections/Gallery'
import MediaFooter from './sections/MediaFooter'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import ChatAgent from './components/ChatAgent'

const marqueeItems = ['创客', '研学', '文创', '体验', '美食', '婚庆', '度假', '街拍']

export default function App() {
  return (
    <main className="surface-dark">
      <ScrollProgress />
      <CursorGlow />
      <Hero />
      <Marquee
        items={marqueeItems}
        className="relative z-10 border-y border-white/10 bg-[#0a1412] py-5"
      />
      <About />
      <Stats />
      <Data />
      <Business />
      <Spaces />
      <Creators />
      <Timeline />
      <Gallery />
      <MediaFooter />
      <ChatAgent />
    </main>
  )
}
