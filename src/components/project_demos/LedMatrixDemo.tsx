import { useState } from 'react'
import Accordion from '../widgets/Accordion'
import led_matrix_screen_1 from '../../assets/images/departureboard_1.jpg'
import led_matrix_screen_2 from '../../assets/images/elgio_stats_1.jpg'
import led_matrix_screen_3 from '../../assets/images/elgio_stats_2.jpg'
import led_matrix_screen_4 from '../../assets/images/match_display.jpg'


function LedMatrixDemo() {
  const [displayText,setDisplayText] = useState(<p>Hover über eines der Displays um mehr zu erfahren</p>)
  const textMap: { [key: number]: JSX.Element } = {
    0: <TextDepartures></TextDepartures>,
    1: <TextElgioStats></TextElgioStats>,
    2: <TextMatchDisplay></TextMatchDisplay>
  }
  




  const handleShowText = (index:number) => {
    setDisplayText(textMap[index])
   
    switch(index){
      case 0: {
        const ele = document.getElementById("sample-images-led-matrix-0") as HTMLElement;
        ele.style.opacity = '1'
        break;
      }
      case 1: {
        const ele = document.getElementById("sample-images-led-matrix-1") as HTMLElement;
        const ele2 = document.getElementById("sample-images-led-matrix-2") as HTMLElement;
        ele.style.opacity = '1';
        ele2.style.opacity = '1';
        break;
      }
      case 2: {
        const ele = document.getElementById("sample-images-led-matrix-3") as HTMLElement;
        ele.style.opacity = '1'
        break;
      }
      default: {
        const ele = document.getElementById("sample-images-led-matrix-0") as HTMLElement;
        ele.style.opacity = '1'
        break;
      }
    } 
  }

  const handleHideText = (index:number) => {
    setDisplayText(<p>Hover über eines der Displays um mehr zu erfahren</p>)
    switch(index){
      case 0: {
        const ele = document.getElementById("sample-images-led-matrix-0") as HTMLElement;
        ele.style.transition = 'opacity 0.5s ease-in-out';
        ele.style.opacity = '.5';
        break;
      }
      case 1: {
        const ele = document.getElementById("sample-images-led-matrix-1") as HTMLElement;
        const ele2 = document.getElementById("sample-images-led-matrix-2") as HTMLElement;
        ele.style.opacity = '.5';
        ele2.style.opacity = '.5';
        break;
      }
      case 2: {
        const ele = document.getElementById("sample-images-led-matrix-3") as HTMLElement;
        ele.style.opacity = '.5';
        break;
      }
      default: {
        const ele = document.getElementById("sample-images-led-matrix-0") as HTMLElement;
        ele.style.opacity = '.5';
        break;
      }
    }
  }

  const handleShowElgioStats = () => {
    handleShowText(1)
    const elgioStats = document.getElementsByClassName("elgio-stats-led-matrix")[0] as HTMLElement;
    elgioStats.style.rotate = '0deg'
    elgioStats.style.visibility = 'visible'
    elgioStats.style.left = '-1px'
    elgioStats.style.top = '-100%'
    setTimeout(() => {
      elgioStats.style.zIndex= '1'
    },200)
  }
  const handleHideElgioStats = () => {
    handleHideText(1)
    const elgioStats = document.getElementsByClassName("elgio-stats-led-matrix")[0] as HTMLElement
    elgioStats.style.rotate = '-2deg';
    if(window.innerWidth < 768) {
        elgioStats.style.left = '0px'
    }
    else{
        elgioStats.style.left = '15px'
    }
    elgioStats.style.top = '0%'
    elgioStats.style.zIndex= '-1'
    setTimeout(() => {
      elgioStats.style.zIndex= '-1'
    },200)
  }

  return (
    <div id="demo-modal-content-led-matrix" className="flex-column flex-gap-1rem overflow-scroll">
      <Accordion title="Einleitung" openPerDefault={true}>
        <div className='flex-column flex-gap-1rem'>
          <p>
            In meiner Wohnung hängt wie gesagt eine LED Matrix.
            <br />Diese LED Matrix wird durch den dahinterliegenden Raspberry Pi Zero W gesteuert.
            <br />Das Skript hat mehrere Modi welche z.B. nur ein einziges Display die ganze Zeit anzeigen kann oder die Animationen abspielen kann.
            <br/>Der Default-Mode zeigt das Match-Display für 20s (bzw. 40s wenn das Spiel live ist),  den Busfahrplan 30s und zuletzt die ELGIO-Stats für 20s und dann geht das ganze wieder von vorne los.
          </p>
          <div className="flex-column flex-gap-2rem w-100">
            <div className="flex-row flex-gap-3rem w-100 align-center position-relative flex-wrap justify-center ">
              <img src={led_matrix_screen_4} alt='led-matrix-screen-4' className="led-matrix-image animate__fadeInLeft transition-opacity-03" id="sample-images-led-matrix-3" onMouseEnter={() => handleShowText(2)} onMouseLeave={() => handleHideText(2)}></img>
              <img src={led_matrix_screen_1} alt='led-matrix-screen-1' className="led-matrix-image animate__fadeInLeft transition-opacity-03" id="sample-images-led-matrix-0" onMouseEnter={() => handleShowText(0)} onMouseLeave={() => handleHideText(0)}></img>
              <div className='position-relative'>
                <img src={led_matrix_screen_2} alt='led-matrix-screen-2' className="opacity-6 led-matrix-image animate__fadeInLeft transition-opacity-03" id="sample-images-led-matrix-1" onMouseEnter={handleShowElgioStats} onMouseLeave={handleHideElgioStats}></img>
                <img src={led_matrix_screen_3} alt='led-matrix-screen-3' className="elgio-stats-led-matrix led-matrix-image animate__fadeInLeft transition-opacity-03" id="sample-images-led-matrix-2"></img>
              </div>

            </div>

            <div className="flex-column flex-gap-1rem w-fit-content justify-center">
              {displayText}
            </div>
          </div>

        </div>

      </Accordion>
      <Accordion title="Diagramm Zur Erklärung der LED-Matrix und des Prozesses generell">
        <div className="iframe-container bg-main w-100">
          <iframe title='LED Matrix Diagram' className='border-radius-medium w-100 h-500p bg-main'  src="https://viewer.diagrams.net/?highlight=000000&nav=1&title=#R7V1rc%2BI4Fv01VM1uFS5bfuGP6ST0dFXPTLbTu7OzX7qMUUDTxmJskZD59auXjSQL4hCThoRUJQFZlmXdc4%2FuvXoN%2FMvF%2BmOZLue%2F4CnMB8Cdrgf%2B1QAA4Lk%2B%2FcdSHkWK54ahSJmVaCrTNgm36G9YZ5SpKzSFlZaRYJwTtNQTM1wUMCNaWlqW%2BEHPdodz%2FanLdCaf6G4SbrM0h61sv6MpmYvUUajk%2Fhmi2bx%2BsufKK5M0%2Bz4r8aqQzytwAcWVRVoXI7NW83SKH5Qk%2F3rgX5YYE%2FFpsb6EOWvXusXEfeMtV5sql7AgXW4IRuKO%2BzRfydeWFSOPdTvQOi7Zx7scri9Yuw78D7CYyo9XWZ5WFcpo4pwscprg0Y93uCBSoiDk%2BUn5%2BF%2F6zXX8aFQn%2FMFyO25cf79i4HGbb4%2FqtxtYogUksJSJ7TetMZKWMyiTQolBOJ2pQpVt8RFiWmL5SDM8bARcy3euyLZOK2GeEnSvAySVOJs1xTVPuMGI1g64UimGfiLvkToRxEYZFV6VGZS3qXIzSwprLWm0Sy9ItEKrIPpBee9NEofFFkwlT0NEgQMH%2B1Ys8O8ozy9xjkt%2Br%2B%2Fyn64SHR2XQD2vbp5aDiDaU6J%2BopcUREEnkdKGTx%2BVbEuWodpR5xEIHeAZtQZOPNpdv8hEnEktT90Q6jfQD6LqewMTdOeuB1QyVDLY3MqruCRzPMNFml9vUj9sUj9jvJQI%2FhMS8ighnK4I1vEtJVzz0%2B0yzVAxkzQlhWa%2F2FabbFXew6m8zLuQ5ltFSvwdKooTjaXiTNNqzrNZtGs8vr6%2BvpKZblJC61CwnKyd6B%2BWf31FL9XvQutbK2skaqh8MzVZYfXQi1VWdx2X9v990rpoZY0EVF6In88LTX%2F9YhIIDKD7ieMmys9%2BjFAziSw1drtR%2FLP5oFbkpvqS0rYqtnlD7HpPUFtsvspzb4i1G15MHX4H6jhsn6bCOTqqPg3EgQ6HyAlG7uYH7IfmAOjFeqPDwBmM9OcEu8FsVivc3am13iLot0%2BLnsZlWi2Ft0OZm7G%2BCkvZODRf%2BGEQMtpPczRjhJ9RADKS%2FYAW3O1REcz7AZl%2BhRYzWskcTejf9O9VCdnbFZA84PI767nA%2BFfx5dsnVuJdmsHKqe5nu8B%2BD0sC1zuxva6ZQWveYW1CqLTte23se97IAYa9pEJds393tH%2F8dPsrzc3eC1GH8XM6gfkNrhBBmDX2BBOCF7bWz1nOD41%2FqFDGHf9RCr2Q9xJmhsjev%2FZDgc0eaEincSo140Be4ebQYj1jTruDcBU7iDrQlbPABSKsqBa39SDWYWQINo7bgg2TuC1YYPZ6%2B0i1g5P7prVqGIBQJ8XolfXK5kNGOZEtpoki%2BmuF6wvDirflBc0AwuWat0Z9nX6asf9fqOgmsOTve4Pon%2F%2FBEtN%2Fv9dPoHUTDxH5W6KnjUha%2BiS7%2FJag1Y6%2BbRaYurtA0yl3Kx7miEBm%2FHNnhOpey7w%2FhNYFI13sYdIWO6ijcqrY%2FR6UrqZui8yn6N4qciaJoWxyJvMc3gmJuV3BUD%2BhWqaF9RGb2NwwE2Jk5SHKfSjNdxb5YqB%2Bpn4YcH9JSYnWW7HZJIs3aCXzptNT32drMmj5YM2CJG42T1FBNYkFiKkNOaeaSl0UVqrrrUU%2Bj3UCfbS5nTwUDmhRxlZSKCF9z3TCi3Lt%2FcyK4Ep2J9soysJIr9GDe67fJpPA5pfEfZCJZyGTc6zHjPWMr8cXh4%2F1BLEWwR%2ByYE%2BT5Y0Hezw9MBGa4O7qDntPFdRbdMc3o7BPRXeMG6LkiTivb1gZxg0vj%2FMGLd33Ae0V3i0VG%2BHGUdAm4tjCw0EfPBx25%2BEnxws5AXUeRtwrzLYXRWgOUF9B4iDWhJaY0ug8TmQUFHckjn0Ur0M06ixs69CXYSwl0b6jgk8V1KO027EvajS%2Fa541BjCTUZtoR4ci2nbMqhXoCN6taMwwcWgJZ0UHkgywuSJ9xbJWRcHDge6yxBmsKlj9k9%2FyrEjWmxc%2F7T01%2BQN%2F1JK%2FdYisF%2FmDV5Y%2FC2WcIWCSs2eSgFePGasgOBgJ%2BFtB8D7DcUN68TYrqTHIYm9jjMkk5S12S1KGoe0APkc8%2B6obH2QYVmKU4YKTCNxWEjWok%2B3Nz6Q5pjb6d2Zq4JKI4kJmf5%2FFeFpi%2FJwWsxUfhGRF3TySOS7q7JPSIqizWE9BrJRr0ZLVuJQmw4Zhz1I9Dam%2BMo%2FfwvKedc47ZX%2Bq2DlqQW9pq9diCpjDAq0WvFWZcfYAJ8OKmWrc03i%2B3M8CPi4BM6dskRI%2B%2Fp3lqwlLy%2FGMzYGZ4ocixym7khbs7xxXRDiYzApw1SeO%2BVylSqvEO8GG7rxcf%2F746bdneS6n%2BdY%2FqB9S%2FYmw8SfePsheubn7svvPjf161vi5rY%2BrZ7WbzmeJnrBEUTmBk7SC9PPVhP751wqWj1VjG5M55LVgPT%2BI0gWbp1tMqqVS6vsR%2F9G%2FqbWC59malgGyUeLUy2XVWULW0euoj%2FGR9pyt3uB5KfZ7QNyDuUep8GMMQHy84Tb8DSqqreDtDA6J0DcBjWGiD5uFtrHzxIKLPqbxgg7Tx55eVLVjqc6uxVNPLe3AK5KjAl4224nYVkxliE3fd%2BTwbD8i8UfGHgKWkczQsjgnAj1IpMMcr%2FcnkaHnBaFTb85Ri8WL6k0SXkMy9TTcQ1AoM4UuMrJKc9V5ESbQFFXLPH0UUSJrT2uYRW6VlRAynhVBJWFDaatddrlDWy2%2FE7Am1ZCGnKahjZI%2B421%2FpPf%2FqiI4frH%2BissF1wy2qdXxYPc9l3maDueFiMyjjLHsAyLZXMbe7wTtStZErCK4nMLycGDb9%2BZujXkMEDluLLwuheld9If%2FsF5aDGcA9ycvrP5xRtkRlXnccwg6o2zF0PWpuGO9p%2FTOf%2FLdM9aOqsxTZTRjVJZCCxwOWm9LUNzZu09RziNUG3ftbNgeQZmnqo87LIwzps6Y2o%2BlhAmBVBPiDKYzmHoxGM5AOgNpPyD59PcK3d1BPqAAXGdCuz42oRIJkjoWcPVsMQ7a81%2FkCEGGC1LiPBfBLBHuz1albJ4jaQ1rmebIxeuC1j5uolTDuEWMbf%2F89esN%2FfcF%2FrWCFdlptW9S%2BOgEJNmc9ar3E8VvuivxopFauUR8%2F6w0z%2Fn0YUjFzIbBQlY7mB2Rj9AvuB9KRFT0lpCsSrGD2DQlrNUJ3gZlC4b2SjpII5qPFa%2BX44yPZ2zKpMyVzYd8npPzZ8UNrc3Ttsj7PH9CDA03ez7Uk2vqfVK0vUwtMygi85CGvYaFX779gO9uGRZma80v%2BNNu6uXnrLYlV5FmaXrKE7mqwIXNRhdLDcRtbDM%2BSLsNvQgBSyoEJDKhBXxTuOsBZ6GrT%2BHyXMteyKFtn6ekD5TZpoU8D2UAbEGZ7NA2Fz5ef1VzNV2dnE%2Fw7y%2BftewNzfHqoGXzXcCDd1lKhiUfnNeyUNrkqz0sZRr0vD%2F2fuCEwhKTVE7RGQaBE%2FZEfH6i7zwF6p2oVED6thmFfQCywyk0%2BxxUpG1LJduv2eqQ7WzImkQ91yIJm80PX2OrQ6mHR3I2wDD2nVHApCF%2FQgMRruOBeHPwha8%2FoOuuV5HewXodT74YPH%2FTq%2BAZ%2B4rue%2F4VUCHlOZutMgWgQLLXQSlwjYjYjhMEQH7%2FQzxAnLhFv2%2FKY18elS97wTNqw%2FO4jmMKDdyYM5k7n7xizJH1DwhA0AKg7B8v2eQj2o2yZ9Ni3CvhmEygMKE2LsspdEmmPmhdVF8dlMkbjdgU9Pk2w7yPDiqw7QhkiKbzkTJAU%2FDIHekKLo5W6l%2FBazCqGh4ER6Xi5u60LWu3q44bXOGbGOhRxdtrIb7OEXOi2IEPm7VHE8za72JgizvcbTZUEt4VzGcID5qlSqfIAX2ovLFDow%2FaGt9od9%2BLGYIOixn21PgwUBSeWaFBdBiN9y19enBkNqcPEofaklHsJ%2F4oCRKgiTwZOew1Qnfk0avhaE%2BTcwjCxHGNCf%2B%2B30z4PwAttF3sMy305ap6cUuY9tUbwLccOhSFL2eHGv0HP1m3IY04VEjD28kXnbjh2A7PDVonUOyp6r5hJzanVvSv5GEHq7A%2BO0oRsu3YqCxHy28pi2WNCcxhhheLVUFVVcyTGLMHL%2BdUpb55YMSOO3GWbB%2BCHSeONRtqm5DqQwPDSA8NDD3LkVO25afmsYB76V7b4moFHW9%2Bu9Wjjk2s0TbmBZ2ZM3hWEFIsAxpXfNr%2FUC6qGvjj5tPVprB6vXlT9qnxdqi7dHHgBD3hKDJ9%2Bi2L8Gxxxz6MvLBt5G3xz29XmViAuB0%2BZM6HeytlKQgfZ5xRVuQX5IDwWfxNvNE4ataLQUv2zTbtL5Q9%2FVpipoAbrmcLTNkiMJbj%2Fw%3D%3D"></iframe>
        </div>
      </Accordion>
    </div>)
}

const TextDepartures = () => {
  return (
    <>
      <p>Es werden insgesamt 3 verschiedene Haltestellen gezeigt, die jeweils für 10s angezeigt werden.<br />Die Bus-Daten werden jede sekunde von einem öffentlichen Server geladen.  </p>
    </>
  )
}

const TextElgioStats = () => {
  return( 
    <>
      <p>Diese Screens zeigen 4 Kern-Statistiken für Elgio.<br /><br />Ticketing Events:<br />(a) steht für die aktiven Ticketing Events, also alle Events bei denen das Ticketing über ELGIO läuft und in der Zukunft liegen.<br />(i) steht für die Insgesamte Anzahl aller Ticketing Events.</p>
    </>
  )
}

const TextMatchDisplay = () => {
  return (
    <>
      <p>Zeigt das nächste bzw. in dem Fall das aktuelle Spiel von Borusia Dortmund an.
      <br />
      Diese Spieldaten werden von dem Raspberry Pi 4 jede 5s geladen (siehe Diagramm) und ermöglichen somit einen Live-Ticker</p>
    </>
  )
}

export default LedMatrixDemo