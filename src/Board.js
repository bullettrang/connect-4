import React,{Component} from 'react';
import Cell from './Cell';
import ResetButton from './ResetButton';
import Modal from './Modal';
import HUD from './HUD';
import {GAME_CONSTANTS} from './GameConstants'
import './Board.css';



const {PLAYER_ONE,PLAYER_TWO,WIN,BEG_X,BEG_Y,END_X,END_Y,DEFAULT_BOARD}=GAME_CONSTANTS;


const VictoryDisplay = ({winner})=>{
    const p1style={
    color:'red'};
    const p2style={
    color:'black'
    };
    return(    
        <div className="Victory_wrapper">
            <h1 style={winner===1?p1style:p2style}>{`PLAYER ${winner} WINS`}</h1>
        </div>
    );
}
class Board extends Component{
    constructor(props){
      super(props);
      this.state={
        grid:[
            {x:0,y:0,value:null,key:1},{x:0,y:1,value:null,key:2},{x:0,y:2,value:null,key:3},{x:0,y:3,value:null,key:4},{x:0,y:4,value:null,key:5},{x:0,y:5,value:null,key:6},{x:0,y:6,value:null,key:7},
            {x:1,y:0,value:null,key:8},{x:1,y:1,value:null,key:9},{x:1,y:2,value:null,key:10},{x:1,y:3,value:null,key:11},{x:1,y:4,value:null,key:12},{x:1,y:5,value:null,key:13},{x:1,y:6,value:null,key:14},
            {x:2,y:0,value:null,key:15},{x:2,y:1,value:null,key:16},{x:2,y:2,value:null,key:17},{x:2,y:3,value:null,key:18},{x:2,y:4,value:null,key:19},{x:2,y:5,value:null,key:20},{x:2,y:6,value:null,key:21},
            {x:3,y:0,value:null,key:22},{x:3,y:1,value:null,key:23},{x:3,y:2,value:null,key:24},{x:3,y:3,value:null,key:25},{x:3,y:4,value:null,key:26},{x:3,y:5,value:null,key:27},{x:3,y:6,value:null,key:28},
            {x:4,y:0,value:null,key:29},{x:4,y:1,value:null,key:30},{x:4,y:2,value:null,key:31},{x:4,y:3,value:null,key:32},{x:4,y:4,value:null,key:33},{x:4,y:5,value:null,key:34},{x:4,y:6,value:null,key:35},
            {x:5,y:0,value:null,key:36},{x:5,y:1,value:null,key:37},{x:5,y:2,value:null,key:38},{x:5,y:3,value:null,key:39},{x:5,y:4,value:null,key:40},{x:5,y:5,value:null,key:41},{x:5,y:6,value:null,key:42},
        ],
        turn:1,      //player 1 or player 2,
        winner:null,
        gameover:false
      }
    }



    switchTurn=()=>{
        const {turn}= this.state;

        if(turn===PLAYER_ONE){
            this.setState({turn:PLAYER_TWO});
        }
        else{
            this.setState({turn:PLAYER_ONE});
        }
    }

    clickHandler=(origin)=>{
        const {turn,grid}=this.state;
        const {y:chosenCol}=origin;
       // console.log(grid);
        let copygrid = grid.slice();
        //console.log(copygrid);
        let openSlots = copygrid.filter(cell =>cell.y===chosenCol && cell.value===null);     //grab all adj cells in column
        if(openSlots.length !==0){           
            openSlots.reverse();
            let chosenCellIdx = copygrid.findIndex((cell)=>cell.key===openSlots[0].key);
            
            copygrid[chosenCellIdx].value=turn;                
            const updatedCell = copygrid[chosenCellIdx];
            this.setState({grid:copygrid});                     
            const verticalCells = this.getVerticalCells(updatedCell);
            const horizontalCells = this.getHorizontalCells(updatedCell);
            const upperLeftToLowerRightCells=this.getUpperLeftToLowerRightCells(updatedCell);
            const lowerLeftToUpperRightCells=this.getLowerLeftToUpperRightCells(updatedCell);
            if(this.checkWin(updatedCell,verticalCells) || this.checkWin(updatedCell,horizontalCells) || this.checkWin(updatedCell,upperLeftToLowerRightCells)||this.checkWin(updatedCell,lowerLeftToUpperRightCells)){
                this.setState({winner:turn});
            }
            this.switchTurn();
        }
    }

    getHorizontalCells=(origin)=>{
        const {x:startX}=origin;
        const {grid}=this.state;
        return grid.filter(cell=> cell.x ===startX );
    }

    getVerticalCells=(origin)=>{
        const {y:startY}=origin;
        const {grid}=this.state;
        return grid.filter(cell=> cell.y ===startY);
        
    }




    getUpperLeftToLowerRightCells=(origin)=>{
        const {x:startX,y:startY}=origin;
        const {grid}=this.state;
        let upperLeftX = startX;
        let upperLeftY = startY;
        const downToRightCells=[];       //from upperleftmost towards down rightmost 
                //moving left and up until we hit boundary
        while( (upperLeftX>BEG_X) && (upperLeftY >BEG_Y && upperLeftY <=END_Y)){ //finding starting pt for diagonal
            upperLeftX--;
            upperLeftY--;
        }

        for (let cell of grid){
            if(cell.x ===upperLeftX && cell.y===upperLeftY){
                downToRightCells.push(cell);
                upperLeftX++;
                upperLeftY++;
            }

            if( (upperLeftX >END_X || upperLeftY > END_Y)){
                break;
            } 
        }

        return downToRightCells

    }

    getLowerLeftToUpperRightCells=(origin)=>{
        const {x:startX,y:startY}=origin;
        const {grid}=this.state;
        let upperRightX=startX;
        let upperRightY=startY;
        const upToRightCells=[];
        while(   (upperRightY<END_Y)&&(upperRightX>BEG_X) ){        //finding starting pt for diagonal
            upperRightX--; 
            upperRightY++;
        }

        for (let cell of grid){
            if(cell.x===upperRightX && cell.y ===upperRightY){
                upToRightCells.push(cell);
                upperRightX++;
                upperRightY--;
            }

            if((upperRightX>END_X || upperRightY < BEG_Y) ){
                break;
            } 
        }
        return upToRightCells;
    }





    checkWin=(origin,range)=>{
        const {value:color}=origin;
        let count=0;
        for(let cell of range){
            if(cell.value===color){
                count++;
                
            }
            else if(cell.value !== color){
                count=0;
            }

            if(count===WIN) break;
        }
        return count ===WIN;
    }

    resetGame=()=>{
        const copydefault = DEFAULT_BOARD.map(cell=>Object.assign({},cell));       //https://stackoverflow.com/questions/50030433/setstate-not-working-for-updating-an-array-in-react
        this.setState({gameover:false })
        this.setState({grid:copydefault});
        this.setState({turn:1});
        this.setState({winner:null});
    }


  
    render(){
        const {turn,winner} = this.state;
      return(
          <div className="Board__container">
              {winner!==null? <Modal><VictoryDisplay winner={winner}/> <ResetButton clicked={this.resetGame}/></Modal> :null}
              <HUD playerturn ={turn}/>
        <div className="Board__wrapper">
            {this.state.grid.map((row,i)=>{
                return(
                    <Cell clicked={()=>this.clickHandler(row)}
                          key={i}
                          value={row.value}
                          x={row.x}
                          y={row.y}
                    />
                )
            })}
        </div> 
            <ResetButton clicked={this.resetGame}/>
        </div>
      );
    }
  }

  export default Board;