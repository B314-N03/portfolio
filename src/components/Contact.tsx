import Breadcrumb from './widgets/Breadcrumb'
import TypewriterComponent from 'typewriter-effect'
import BackgroundImage from './widgets/BackgroundImage'

function Contact(): JSX.Element {
    return (
        <div className='content'>
            <BackgroundImage></BackgroundImage>
            <div className="z-index-1">
                <Breadcrumb name="Kontakt"/>
            </div>
            <div className="flex-column z-index-1">
                <div className="w-100 h-100vh text-color-main flex-column justify-center align-center flex-gap-1rem">
                    <div className="flex-column align-center flex-gap-1rem">
                        <div className="h2">Email:</div>
                        <TypewriterComponent 
                            component={"h1"}
                            options={{
                                autoStart: true,
                                loop: true,
                                strings: ["bela-noe@web.de"],
                                delay: 150
                            }}
                            ></TypewriterComponent>
                    </div>
                    <div className="flex-column align-center flex-gap-1rem">
                        <div className="h2 ">LinkedIn:</div>
                        <TypewriterComponent 
                        component={"h1"}
                        options={{
                            autoStart: true,
                            loop: true,
                            
                            strings: ["Béla Noé"],
                            delay: 150
                        }}
                    ></TypewriterComponent>
                    </div>
                    <div className="flex-column align-center flex-gap-1rem">
                        <div className="h2 ">GitHub:</div>
                        <TypewriterComponent 
                        component={"h1"}
                        options={{
                            autoStart: true,
                            loop: true,
                            strings: ["B314-N03"],
                            delay: 150
                        }}
                    ></TypewriterComponent>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Contact