import React,{Component} from 'react'
import '../styles/MainMaths.css'
import SolvingLogicMath from './SolvingLogicMath'
import Information from './Information'
export default class MainMaths extends Component{
    constructor(props){
        super(props)
        this.state = {
            formula:"",
            enteredFormula:"",
            isClicked:false,
            textIndex:0,
            onInformationClick:false,
            onEnter:false,
        }
        this.setOnInformationClick = this.setOnInformationClick.bind(this)
    }
    setOnInformationClick(){
        this.setState({onInformationClick:this.state.onInformationClick==true?false:true })
    }
    render(){
        return(
            <div className = "MainBody">
               {this.state.onInformationClick? <Information closeInfo = {this.setOnInformationClick} />:null}
                <div className = "button-operators">
                    <input type="text" className ="textbox-operator"  placeholder= "Enter logical formula" onChange ={e => this.inputClicks(e)} value = {this.state.formula}  onClick = {this.getMousIndex.bind(this)} />
                     <button id= {'info-button'} onClick = {this.setOnInformationClick} ></button><br/>
                    <button name = "¬" onClick = {this.buttonClicks.bind(this)}> ¬ </button>
                    <button name = "∧" onClick = {this.buttonClicks.bind(this)}> ∧ </button>
                    <button name = "∨" onClick = {this.buttonClicks.bind(this)}> ∨ </button>
                    <button name = "⊕" onClick = {this.buttonClicks.bind(this)}> ⊕ </button>
                    <button name = "→" onClick = {this.buttonClicks.bind(this)}> → </button>
                    <button name = "↔" onClick = {this.buttonClicks.bind(this)}> ↔ </button>
                    <button name = "(" onClick = {this.buttonClicks.bind(this)}> ( </button>
                    <button name = ")" onClick = {this.buttonClicks.bind(this)}> ) </button><br/>
                    <div className = "button-variables">
                        <button name = "p" onClick = {this.buttonClicks.bind(this)}> p </button>
                        <button name = "q" onClick = {this.buttonClicks.bind(this)}> q </button>
                        <button name = "x" onClick = {this.buttonClicks.bind(this)}> x </button>
                        <button name = "y" onClick = {this.buttonClicks.bind(this)}> y </button>
                        <button name = "z" onClick = {this.buttonClicks.bind(this)}> z </button>
                        <button name = "a" onClick = {this.buttonClicks.bind(this)}> a </button>
                        <button name = "b" onClick = {this.buttonClicks.bind(this)}> b </button>
                    </div>
                    <div className = "execute-button">
                        <button 
                            onMouseDown = {()=>this.setState({isClicked:true})}
                            onMouseUp = {()=>this.setState({isClicked:false})} 
                            onClick = {this.setEnteredFormula.bind(this)}> Enter </button>
                        <button onClick = {this.clearForm.bind(this)}> Reset </button>
                    </div>
                </div>
                { this.state.onEnter? <SolvingLogicMath isClicked = {this.state.isClicked} formula = {this.state.enteredFormula}/>:null }
                <p className = 'credits-owner'>Zalven Dayao - Descrete Math Logical calculator yr.2020</p> 
            </div>
        )
    }
    // Guys may ginawa akung truth table calculator . If you want to use it . just visit the link .
    // Meron din akung iba pang projects . follow nyo lng ako sa github  and if you want the source code .
    // free lng naman .check nyo lng sa website meron doon]]],meron din sa aking github.
    // Just let me know guys if may bug kayung nakita or mali yung sagot. Arigathanksssss  :D 
    // 
    /*
                Test Cases 
        o+(c-(a+b)-d)+(m+(i+(e+f)+(g+h)+j)+(k+L)+n)+p
        (p→(a∧r))∧(¬p→(¬a∧¬r))
        ¬p∧r∨z→¬x
        (p→(¬a∧r))∧(¬¬¬¬¬¬p→(¬a∧¬r))⊕¬p→(¬a∧¬r)
        (p∧¬q)∨¬p
        (p>(~a&r))&(~~~~~~p>(~a&~r))
    */
    setEnteredFormula(event){

        let formula = this.state.formula.toLowerCase().replace(/ /g,'');
        formula = formula.replaceAll( '~' , '¬')
        formula = formula.replaceAll('&' , '∧')
        formula = formula.replaceAll( 'v' , '∨');
        formula = formula.replaceAll( '>' , '→');
        formula = formula.replaceAll( '*' , '⊕');
        formula = formula.replaceAll( '<>' , '↔');
        event.preventDefault();
        this.setState({  
            onEnter:true,  
            enteredFormula:formula   
        }, () => console.log(this.state.onEnter+ " "+this.state.enteredFormula))
          this.setState({ enteredFormula:formula  })
    }
    getMousIndex(event){
        this.setState( { textIndex:event.target.selectionStart })
    }
    clearForm(event){
        this.setState({  formula:"", enteredFormula:"",onEnter : false})
    }
    buttonClicks(event){
        let index = this.state.textIndex;
        this.setState({textIndex:index+1, formula: this.state.formula.substring(0,index) +event.target.name +this.state.formula.substring(index)    });
    }
    inputClicks(event){
        this.setState({  formula: event.target.value });
    }
}