
import './App.css';
import logo from './logo.svg'
import {useQuery, gql} from '@apollo/client';
 function dobig() {
  document.getElementById("logo").style.transform="scale(1.1)";
  document.getElementById("logo").style.transitionTimingFunction="linear";
  document.getElementById("logo").style.transition=2+"s";


 }

 function dolittle() {
  document.getElementById("logo").style.transform="scale(1.0)";
  document.getElementById("logo").style.transitionTimingFunction="linear";
  document.getElementById("logo").style.transition=2+"s";
 }


export const AnimeList = gql`
{
  
    Page {
      media(episodes: 26) {
        siteUrl
        title {
          english
          native
        }
        description
        coverImage {
          medium
        }
        bannerImage
        volumes
        episodes
      }
    
    }
  
}

`;



function App() {
  const {loading, error, data} = useQuery(AnimeList);

  console.log(data?.Page?.media[0]); 
  if(loading) return(<> 
  <h1 style={{color:"#61dbfb", fontSize:"40px"}}>
  Loading
  </h1>
  
  
  </>);
  if(error) return(<>{JSON.stringify(error)}</>)
  return (
   <div className="container"> 
     <h1>
      
<img id='logo' onMouseOver={dobig} onMouseOut={dolittle} src={logo}></img>
 Anime List 
       
       </h1>
     <hr width="80%" />
   {data?.Page?.media.map(anime => (
  
     <>
     
   <div className="card" >
       <img  src={anime.coverImage.medium}/>
       

   
        <div> 
         <h1 >{anime.title.english} </h1>
           <div className="episodes" >Episodes: <b>{anime.episodes}  </b></div>
          <div  dangerouslySetInnerHTML={{__html: anime.description}} ></div> 
      </div> 
  </div>
  <hr width="75%"/>
 </>
   ))}
   </div>);
}

export default App;
