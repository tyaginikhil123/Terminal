import React from "react";
import Blinker from "./Blinker";
import "../styles/TextareaInput.css";
import "../styles/shadow.css";

export default class TextArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
        };
        this.inputKeyPressed=this.inputKeyPressed.bind(this);
    }
    inputKeyPressed(event){
        var isPrintable=/^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\]^_`{|}~-]$/i.test(event.key);
        var prev=this.state.value;
        var value;
        if(isPrintable){
            value=prev+event.key;
            this.setState({value});
        }else if(event.key===' '){
            event.preventDefault();
            value=prev+' ';
            this.setState({value});
        }
        else if(event.key==="Backspace"){
            value=prev.substring(0,prev.length-1);
            this.setState({value});
        }else if(event.key==="Enter"){
            this.props.onEnterPressed(this.state.value);
            this.setState({value:""});
        }
    }


    componentDidMount(){
        document.addEventListener("keydown",this.inputKeyPressed,false);
    }
    componentWillMount(){
        document.removeEventListener("keydown",this.inputKeyPressed,false);
    }

   

    render(){
        return (
            <div className="command-input shadow">
                <span>&gt;&nbsp;</span>
                {this.state.value.length>0 && <input type="text" className="inputBox" value={this.state.value} size={this.state.value.length}  readOnly />}
                <Blinker color="green"/>
            </div>
        );
    }
}