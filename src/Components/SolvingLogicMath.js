import React,{Component} from 'react'
import '../styles/TableStyle.css'
export default class SolvingLogicMath extends Component{
    constructor(props){
        super(props)
        this.state = {
            formula: props.formula ,
            isClicked:props.isClicked,
            table:[],
        }
    }
    
    isOperator(val
        ){
        return val === '¬' || val === '∧' ||  val === '∨' || val === '→' || val === '↔' || val === '⊕';
    }
    ifExpressionHasVariable(formula){
        for(let i = 0 ; i < formula.length ; i++ )
            if(/^[A-Za-z]{1,1}$/.test(formula.charAt(i) ) )
                return true;
        return false;
    }
    ifExpressionHasOperatorAtEnd(formula){
        // If it has operator in front 
        if( this.isOperator (formula.charAt(0)) && formula.charAt(0) != '¬' )
            return true;
        // if it has operator in back 
        if( this.isOperator (formula.slice(-1)) )
            return true;
        return false;
    }
    ifExpressionHasOperator(formula){
        for(let i = 0 ; i < formula.length ; i++ )
            if( this.isOperator(formula.charAt(i) ) )
                return true;
        return false;
    }
    // Creates a truth table for variables 
    creatingTruthTable(string){
        var values = this.findAllVariables(string)
        if(values.length <= 0)return [];
        let x = values.length
        let answer = [values] 
        for(let i = 0 ; i < Math.pow(2,x) ; i++){
            let stored = [] ; 
            for(let j = 0 ; j < x ; j++)
                stored.push( Boolean(1<<(x-1)-j&i)+0 )
            answer.push(stored)
        }
        return answer;
    }
    // Finds all distinct character from a given string [array] 
    findAllVariables(string){
        return  string.toUpperCase().replace(/[^a-z]/gi, '') .split('').filter((v, i, a) => a.indexOf(v) === i) ;
    }
    expressionTable(formula){
        let expressionTree = new BinaryExpressionTree(formula);
        expressionTree.list_eval()
        return expressionTree .list_getResult()
    }
    
    table(formula){
        let table = this.creatingTruthTable(formula);
        try{
            let finilizedTable = [];
            let expTree = this.expressionTable(formula);
            // table[0] = table[0].concat( this.expressionTable(formula))
            for(let i = 0 ; i < expTree.length ; i++)
                // Need to be legal  
                // Check if the given formulae has variable in it 
                // Check if it doesn't have an operator in the end of it 
                // Check if it has operator in it 
                if( this.ifExpressionHasVariable(expTree[i]) && !this.ifExpressionHasOperatorAtEnd(expTree[i])
                    && this. ifExpressionHasOperator(expTree[i]) )
                    finilizedTable.push( expTree[i] );
            finilizedTable = finilizedTable.filter((v, i, a) => a.indexOf(v) == i); 
            table[0] = table[0].concat(finilizedTable)
            // Create table based on how long table 0 is 
            for(let i = 1 ; i < table.length ; i++)
                table[i] = table[i].concat( finilizedTable );
        }catch(err){}
        for(let i = 1 ; i < table.length ; i++){
            let obj = {}
            // Loop through Expression Except the first table 
            for( let j = 0 ; j < table[0].length ; j++ ){
                // Check if its only 1 character 
                if(table[0][j].length <= 1){
                    obj[table[0][j]] =  table[i][j] 
                }else{
                    let distribution = table[0][j] ;
                    for(let keys in obj)  distribution = distribution.replaceAll(keys,obj[keys]);
                    table[i][j] = new BinaryExpressionTree(distribution).eval();
                }
            }   
        }
        return table
    }
    _parenthesisIsLegal(formula){
        let j;
        for(let i = 0 ; i < formula.length ; i++ ){
            if(formula.charAt(i) == '(') j = i;
            if(formula.charAt(i) == ')' && j != null)
                return this._parenthesisIsLegal(formula.substring(0,j)+ formula.substring(i+1) );
            }
        return formula
    }

    parenthesisIsLegal(formula){
        let form = '';
        for(let i = 0 ; i < formula.length ; i ++)
            if( formula.charAt(i) == '(' || formula.charAt(i) == ')' )
                form += formula.charAt(i);
        return this._parenthesisIsLegal(form) == '';
    }
    // If not a letter and an operator 
    variablesLegal(formula){
        for(let i = 0 ; i<formula.length ; i++) {
            let c = formula.charAt(i);
            // console.log( c+"  =  "+ !(c.match(/[a-z]/i) != null)  )
            if( !(c === '(' || c === ')')  && !(c.match(/[a-z]/i) != null)  && !this.isOperator(c)) return false;
            
        }
        return true;
    }


    checkingFormulaIfLegal(formula){
        // Check if the table is legal ( parenthesis / legal variables / legal operators / legal formula )
        if(this.parenthesisIsLegal(formula) == false)return false;
        if(this.variablesLegal(formula) == false)return false;
        return true;
    }

    // Test Cases 
    //  o+(c-(a+b)-d)+(m+(i+(e+f)+(g+h)+j)+(k+L)+n)+p
    // (p→(a∧r))∧(¬p→(¬a∧¬r))
    // ¬p∧r∨z→¬x
    // (p→(¬a∧r))∧(¬¬¬¬¬¬p→(¬a∧¬r))⊕¬p→(¬a∧¬r)
    // (p∧¬q)∨¬p
    // 
    problemSolving(formula){
        formula = formula.replace(/ /g,'').toUpperCase();
        if(this.checkingFormulaIfLegal(formula) == true ){
            let theTable  = this.table(formula);
            this.setState({table:theTable})
         }
    }

    // Updates the current state everytime the props updates
    componentWillReceiveProps(props){
        this.setState({formula:props.formula,isClicked:props.isClicked}) 
        this.problemSolving(props.formula)  
       
    }
    //(p→(¬a∧r))∧(¬¬¬¬¬¬p→(¬a∧¬r))⊕¬p→(¬a∧¬r)

    render(){
     
        return(
            <div className = "table-container">
                <p className = 'given-formula'>Formula : {this.state.formula} </p>
                <table className = "table-body">
                {
                    this.state.table.map(function(data, i){
                        return (
                            <tbody key = {i}>
                            <tr key = {i}>{
                                data.map(function(value, index){
                                    if( value == 0 || value == 1)
                                        return<td key= {index}>{value}</td>
                                    else
                                        return<th key= {index}>{value}</th>
                                })
                            }
                            </tr>   
                            </tbody>
                        )
                    })
                }
               </table>
            </div>
        )
    }
}



// ==========================================================================
// EXPRESSION TREE

class Node{
    constructor(value ){
      this.value = value;
      this.left =  null;
      this.right = null;
    }
  }
  
  class BinaryExpressionTree{
    prints(){
        if(this.root != null)
          this._prints(this.root);
      }
      _prints(root){
        if(root != null){
          console.log(root.value)
          this._prints(root.left)
          this._prints(root.right) 
        }
    }
    constructor(value){
        this.root = null;
        this.result = [];
        this.solves(value)
      
    }
    outerParenthesisRemover(value){
        if( this.removeEndParenthesis(value) && value.length >= 2) 
            value =  value.substring(1,value.length-1) ;
        return value;
    }
    removeEndParenthesis(value){
        let index = 0, parenthesis = 0 , len = value.length , zeroes =0;
        while(index < len){
            let val = value.charAt(index++);
            if(val == '(')parenthesis ++;
            if(val == ')') parenthesis--;
            if(parenthesis == 0 &&  val == ')') zeroes++;
            if(zeroes >=2) return false;
        }
        return zeroes == 1 && value.slice(-1) == ')';
    }
    // val == '¬' || 
    isOperator(val){
        return val === '∧' || val === '∨' || val === '→' || val === '↔' || val ===   '⊕';
    }
    // val == '¬' ||
    precedent(value){
        // if(value === '¬')
        //     return -1;
        return 1 
    }
    findLowestValue(value){
        let result = 0,index = 0 , minValue = 5 , len = value.length, parenthesis = 0;
        for(index = 0 ; index < len; index++){
            let chr = value.charAt(index);
            if(chr == '(')parenthesis++;
            if(chr == ')')parenthesis--;
            if( parenthesis == 0){
                if( this.precedent(chr) <= minValue && this.isOperator(chr) ){
                    minValue = this.precedent(chr) ;
                    result = index;
                }
            }
        }
        return result;
    }

    solves(value){
      this.root = this._solves(this.root, value);
      return this.root;
    }
    //(p∧¬q)∨¬p
    _solves(root,value){
        if(value !== ""){ 
            value = this.outerParenthesisRemover(value)
            let index = this.findLowestValue(value);
            root = new Node( value.charAt(index));
            root.left = this._solves(root.left , value.substring(0,index))
            root.right = this._solves(root.right, value.substring(index+1));
        }
        return root;
    }
    list_eval(){
        return this._list_eval(this.root)
    }

    _list_eval(root){
        if(root != null){
            if(root.left == null && root.right == null) 
                return root.value;
            let left = this._list_eval(root.left)
            let right = this._list_eval(root.right) 
            // console.log( left+" - "+root.value+" - " + right)
            this.result.push(left+root.value+right )
            if( left  != "" && right != "") 
                return "("+left+root.value+right +")"
            return left +root.value + right
            }
        return ""
    }

    
    list_getResult(){
        return this.result
    }

    eval(){
        return this._eval(this.root)
    }
    // (p∧¬q)∨¬p
    _eval(root){
        if(root!= null){
            if(root.left == null && root.right == null) return root.value;
            let right = this._eval( root .right)
            let left = this._eval(root.left);
            // console.log(left+" - "+root.value+" - "+right);
            if(root.value === '∧')
                return left == 1 && right == 1?1:0;
            if(root.value === '∨')
                return left  == 1 || right == 1 ?1:0;
            if(root.value === '¬')
                return right == 1?0:1 ;
            if(root.value === '→')
                return (left == 1 && right == 0)?0:1;
            if(root.value === '⊕')
                return left != right?1:0;
            if(root.value === '↔')
                return left == right?1:0;
        }
        return '';
    }
  }
 

  