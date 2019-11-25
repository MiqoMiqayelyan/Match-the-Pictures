import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Boxs from './components/boxs';
import Win from './components/win'

const imgsArr = ['cat','glass','glass','cat','home','home','nokia','nokia','rocket','rocket','Zoo','Zoo','girl','girl','wellness','wellness','bugati','bugati','tree','tree']
let shuffle = (arr)=>{
  var ctr = arr.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
    // Pick a random index
        index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
        ctr--;
    // And swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
} 
class App extends React.Component {
   state = {
     min: 0,
     sec: 0,
     winCount: 0,
     selected: null,
     secondClick: false,
     rightChoose: null,
     showWinBlock: false,
     cards: shuffle(imgsArr.slice())
   }
   componentDidMount(){
     if( this.state.min === 0 && this.state.sec === 0){
      this.timeInterval = setInterval(this.secTick, 1000); //star timer
    }
   }
  secTick = () => {
    let seconds = this.state.sec + 1; // plus seconds
    this.setState({
      sec: seconds
    });
    if(seconds === 60){//chnage sec to min
      this.minTick();
      this.setState({
        sec : 0
      });
    };
  }
  minTick = () => {
    let minuts = this.state.min + 1; // plus mins
    this.setState({
      min: minuts
    });
  }
  cardClick = (event) => {
    event.preventDefault();
    const {selected, secondClick, winCount} = this.state;
    if(!!secondClick){ //check bug  showing more then 2 imgs
      return;
    }
    event.target.style.opacity = 1;
    let clickedName = event.target.attributes.alt.value; //get img name
    
    if(!selected){
       this.setState({
         selected: clickedName 
       })
       
    }else if(selected){
       this.setState({
         secondClick: true
       })
      if(selected === clickedName){
        setTimeout(()=>{
          this.deleteCards(clickedName); //delete right imgs
          this.setState({
            selected: null,
            secondClick: false,
            winCount: winCount + 1
          });
          if(winCount === (this.state.cards.length / 2) - 1){ //if you open all imgs right
            this.setState({
              showWinBlock: true
            })
            clearInterval(this.timeInterval);
          }
        },1000)
         
       }else{
         setTimeout(()=>{
           this.hidCards();
           this.setState({
             selected: null,
             secondClick: false
           }); 
         }, 600)
      }
    }
     
  }

  hidCards = () => {
    const node = ReactDOM.findDOMNode(this);
   
    if (node instanceof HTMLElement) {
     let img = node.querySelectorAll('img');
     
     for(let i = 0; i < img.length ; i++){
      img[i].style.opacity = 0
     }
    }
    
  }
  deleteCards = (clickedName) => {
    const node = ReactDOM.findDOMNode(this);
   
    if (node instanceof HTMLElement) {
      let divs = node.querySelectorAll('.game-picturs');

      for(let i = 0; i < divs.length ; i++){
         if(divs[i].dataset.name === clickedName){
          divs[i].style.opacity = 0;
         }
       }
    }
  }
  playAgain = () => {
    window.location.reload(false);
  }
  
  render(){
    const {min, sec, cardClick, showWinBlock, cards} = this.state;
    return (
    <div className="App">
      <h1>Match the Pictures</h1>
       <div className="time">
          <span>Timer</span> <span>{min} : {sec}</span>
       </div>
       <div className="game-container">
          <div className="game-content">
              {cards.map((img, i) => (
                <Boxs
                 id={i}
                 img={img}
                 onSelect={cardClick}
                />
               ))
              }
          </div>
       </div>
       <Win 
       showWinBlock={showWinBlock}
       min={min}
       sec={sec}
       playAgain={this.playAgain}
       />
    </div>
    )
  }
}

export default App;
