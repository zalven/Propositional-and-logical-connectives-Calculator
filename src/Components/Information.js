import React,{Component} from 'react'
export default class Information extends Component{
    constructor(props){
        super(props)
    }
    closeComponent(event){
        this.props.closeInfo()
    }
    render(){

        return( 
            <div className = "information-body">
            <ul>
            <h4 onClick = {this.closeComponent.bind(this)} className = {"information-close"}> X</h4>
                <li>No numbers is allowed only letters (not case sensitive) and Logical operators </li>
                <li>
                    <table className = 'table-body-information'>
                        <tr>
                            <td colSpan = '2'> Logical operators can be replaced by the following </td>
                        </tr>
                        <tr>
                            <td>¬</td>
                            <td>~ </td>
                        </tr>
                        <tr>
                            <td>∧</td>
                            <td>&</td>
                        </tr>
                        <tr>
                            <td>∨</td>
                            <td>v</td>
                        </tr>
                        <tr>
                            <td>→</td>
                            <td>&gt;</td>
                        </tr>
                        <tr>
                            <td>⊕</td>
                            <td>*</td>
                        </tr>
                        <tr>
                            <td>↔</td>
                            <td>&lt;&gt;</td>
                        </tr>
                    </table>
                </li>
                <li>Input a valid formula or it will compute everything it sees fit </li>
                <li> <a href = "https://github.com/zalven/Propositional-and-logical-connectives-Calculator/tree/master" target="_blank"> Get source Code</a> </li>
            </ul>
        </div>
        );
    }
}