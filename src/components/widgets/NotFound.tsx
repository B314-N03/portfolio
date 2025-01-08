import SadSmiley from '../../assets/images/sad-xxl.png'
import TypewriterComponent from 'typewriter-effect'
import BackgroundImage from './BackgroundImage'

function NotFound(): JSX.Element {
  return (
    <div className='content justify-center align-center'>
      <BackgroundImage></BackgroundImage>
      <div className="w-50 text-color-main flex-column justify-center align-center flex-gap-1rem z-index-1">
        <img src={SadSmiley} className='mb-30' id='' alt='404-Not Found'></img>
        <TypewriterComponent 
        component={"h1"}
        options={{
          autoStart: true,
          loop: true,
          strings: ["404 - Not found"],
          delay: 150
        }}
        ></TypewriterComponent>
        <div className="h2 ">Hier gibt es nichts zu sehen!</div>
      </div>
    </div>
  )
}

export default NotFound